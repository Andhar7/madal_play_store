const {withAppBuildGradle, withDangerousMod} = require('@expo/config-plugins')
const path = require('path')
const fs = require('fs')


// ── The Kotlin code that will be injected into your Android project ──────────
const KOTLIN_MODULE = `package com.andhar7.madalapp.agesignals

  import com.facebook.react.ReactPackage
  import com.facebook.react.bridge.Promise
  import com.facebook.react.bridge.ReactApplicationContext
  import com.facebook.react.bridge.ReactContextBaseJavaModule
  import com.facebook.react.bridge.ReactMethod
  import com.facebook.react.bridge.WritableNativeMap
  import com.facebook.react.uimanager.ViewManager
  import com.google.android.play.agesignals.AgeSignalsManagerFactory
  import com.google.android.play.agesignals.AgeSignalsRequest

  class AgeSignalsModule(reactContext: ReactApplicationContext) :
      ReactContextBaseJavaModule(reactContext) {

      override fun getName(): String = "AgeSignals"

      @ReactMethod
      fun checkAgeSignals(promise: Promise) {
          try {
              val manager = AgeSignalsManagerFactory.create(reactApplicationContext)
              manager
                  .checkAgeSignals(AgeSignalsRequest.builder().build())
                  .addOnSuccessListener { result ->
                      val map = WritableNativeMap()
                      map.putString("userStatus", result.userStatus()?.name ?: "null")
                      val lower = result.ageLower()
                      val upper = result.ageUpper()
                      if (lower != null) map.putInt("ageLower", lower) else map.putNull("ageLower")
                      if (upper != null) map.putInt("ageUpper", upper) else map.putNull("ageUpper")
                      promise.resolve(map)
                  }
                  .addOnFailureListener { e ->
                      promise.reject("AGE_SIGNALS_ERROR", e.message ?: "Unknown error")
                  }
          } catch (e: Exception) {
              promise.reject("AGE_SIGNALS_ERROR", e.message ?: "Unknown error")
          }
      }
  }

  class AgeSignalsPackage : ReactPackage {
      override fun createNativeModules(reactContext: ReactApplicationContext) =
          listOf(AgeSignalsModule(reactContext))

      override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
          emptyList()
  }
  `

// ── Step 1: Add the Play Age Signals library to Android build.gradle ─────────
function withAgeSignalsDependency(config) {
    return withAppBuildGradle(config, (config) => {
        const gradle = config.modResults.contents
        if (!gradle.includes('age-signals')) {
            config.modResults.contents = gradle.replace(
                /dependencies\s*\{/,
                "dependencies {\n    implementation 'com.google.android.play:age-signals:0.0.3'"
            )
        }
        return config
    })
}

// ── Step 2: Write the Kotlin module file into the Android project ─────────────
function withAgeSignalsKotlinModule(config) {
    return withDangerousMod(config, [
        'android',
        (config) => {
            const platformRoot = config.modRequest.platformProjectRoot
            const packageDir = path.join(
                platformRoot,
                'app', 'src', 'main', 'java', 'com', 'andhar7', 'madalapp', 'agesignals'
            )
            fs.mkdirSync(packageDir, {recursive: true})
            fs.writeFileSync(path.join(packageDir, 'AgeSignalsModule.kt'), KOTLIN_MODULE, 'utf-8')
            return config
        }
    ])
}

// ── Step 3: Register AgeSignalsPackage in MainApplication.kt ─────────────────
function withAgeSignalsMainApplication(config) {
    return withDangerousMod(config, [
        'android',
        (config) => {
            const platformRoot = config.modRequest.platformProjectRoot
            const mainAppPath = path.join(
                platformRoot,
                'app', 'src', 'main', 'java', 'com', 'andhar7', 'madalapp', 'MainApplication.kt'
            )
            if (!fs.existsSync(mainAppPath)) return config
            let content = fs.readFileSync(mainAppPath, 'utf-8')
            if (content.includes('AgeSignalsPackage')) return config

            const lastImport = content.lastIndexOf('\nimport ')
            const endOfLine = content.indexOf('\n', lastImport + 1)
            content =
                content.slice(0, endOfLine + 1) +
                'import com.andhar7.madalapp.agesignals.AgeSignalsPackage\n' +
                content.slice(endOfLine + 1)

            content = content.replace(
                'PackageList(this).packages.apply {',
                'PackageList(this).packages.apply {\n              add(AgeSignalsPackage())'
            )
            fs.writeFileSync(mainAppPath, content, 'utf-8')
            return config
        }
    ])
}

// ── Combine all three steps into one plugin ───────────────────────────────────
module.exports = function withAgeSignals(config) {
    config = withAgeSignalsDependency(config)
    config = withAgeSignalsKotlinModule(config)
    config = withAgeSignalsMainApplication(config)
    return config
}































