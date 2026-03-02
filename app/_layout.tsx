import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import AppSplash from '@/components/AppSplash'

// Keep native splash visible until React is ready
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [showCustomSplash, setShowCustomSplash] = useState(true)

  useEffect(() => {
    // Hide the native splash — our beautiful custom one takes over
    SplashScreen.hideAsync()
  }, [])

  if (showCustomSplash) {
    return (
      <>
        <StatusBar hidden />
        <AppSplash onFinish={() => setShowCustomSplash(false)} />
      </>
    )
  }

  return (
    <>
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
