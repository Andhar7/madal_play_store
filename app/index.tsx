// Translated from SwiftUI OpeningPageView.swift
// Main entry: embedded srichinmoy.org + slide-out drawer menu
// BUG-001 fix: WebView error handling + Retry button
// BUG-002 fix: Back button confirmation dialog (Android)
// BUG-003 fix: Loading indicator while page loads

import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { Ionicons } from '@expo/vector-icons'
import DrawerMenu from '@/components/DrawerMenu'
import { Colors } from '@/constants/colors'
import { useDrawer, DRAWER_WIDTH } from '@/hooks/useDrawer'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function OpeningPage() {
  const { isOpen, open, close, slideAnim } = useDrawer()
  const webViewRef = useRef<WebView>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // BUG-002: Intercept Android hardware back button — show Exit confirmation
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Exit Madal?',
        'Are you sure you want to exit?',
        [
          { text: 'Stay', style: 'cancel' },
          { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() },
        ]
      )
      return true
    })
    return () => sub.remove()
  }, [])

  function handleRetry() {
    setError(false)
    setLoading(true)
    webViewRef.current?.reload()
  }

  return (
    <View style={styles.root}>
      <View style={styles.drawer}>
        <DrawerMenu onClose={close} />
      </View>

      <Animated.View
        style={[styles.content, { transform: [{ translateX: slideAnim }] }]}
      >
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={isOpen ? close : open} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color={Colors.white} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* BUG-001: Custom error screen with Retry */}
        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="cloud-offline-outline" size={64} color={Colors.consciousness} />
            <Text style={styles.errorTitle}>Unable to Load</Text>
            <Text style={styles.errorMessage}>
              Please check your internet connection and try again.
            </Text>
            <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <WebView
              ref={webViewRef}
              source={{ uri: 'https://www.srichinmoy.org' }}
              style={styles.webview}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => { setLoading(false); setError(true) }}
              onHttpError={() => { setLoading(false); setError(true) }}
            />
            {/* BUG-003: Loading indicator */}
            {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={Colors.delight} />
              </View>
            )}
          </>
        )}
      </Animated.View>

      {isOpen && (
        <TouchableOpacity
          style={[styles.overlay, { left: DRAWER_WIDTH }]}
          onPress={close}
          activeOpacity={1}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.unity },
  drawer: { position: 'absolute', left: 0, top: 0, bottom: 0, width: DRAWER_WIDTH },
  content: { flex: 1, width: SCREEN_WIDTH, backgroundColor: Colors.unity },
  header: { backgroundColor: Colors.unity, paddingHorizontal: 8, paddingTop: 24, paddingBottom: 8 },
  menuBtn: { padding: 8 },
  webview: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.unity,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  errorTitle: { color: Colors.white, fontSize: 22, fontWeight: 'bold', letterSpacing: 1.5 },
  errorMessage: { color: Colors.consciousness, fontSize: 15, textAlign: 'center', lineHeight: 22 },
  retryBtn: { marginTop: 8, paddingHorizontal: 40, paddingVertical: 14, backgroundColor: Colors.delight, borderRadius: 12 },
  retryText: { color: Colors.white, fontSize: 17, fontWeight: 'bold', letterSpacing: 1.5 },
  overlay: { position: 'absolute', top: 0, right: 0, bottom: 0, width: SCREEN_WIDTH - DRAWER_WIDTH },
})
