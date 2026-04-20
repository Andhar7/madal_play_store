// Translated from SwiftUI WebsitePageView.swift
// Embedded WebView with: back button + category label (left), star favourite (right)
// BUG-001 fix: WebView error handling + Retry button
// BUG-003 fix: Loading indicator while page loads

import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import DrawerMenu from '@/components/DrawerMenu'
import { Colors } from '@/constants/colors'
import { CategoryId } from '@/constants/data'
import { useDrawer, DRAWER_WIDTH } from '@/hooks/useDrawer'
import { useFavourites } from '@/hooks/useFavourites'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function WebsiteScreen() {
  const insets = useSafeAreaInsets()
  const { id, url, category } = useLocalSearchParams<{
    id: string
    url: string
    category: CategoryId
  }>()
  const router = useRouter()
  const { isOpen, open, close, slideAnim } = useDrawer()
  const { isFavourite, add, remove } = useFavourites()
  const webViewRef = useRef<WebView>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearLoadingTimer = useCallback(() => {
    if (loadingTimer.current) {
      clearTimeout(loadingTimer.current)
      loadingTimer.current = null
    }
  }, [])

  useEffect(() => () => clearLoadingTimer(), [clearLoadingTimer])

  const starred = isFavourite(url)

  function toggleFavourite() {
    if (starred) { remove(url) } else { add({ id, category, url }) }
  }

  function handleError() {
    clearLoadingTimer()
    setLoading(false)
    setError(true)
  }

  function handleRetry() {
    setError(false)
    setLoading(true)
  }

  return (
    <View style={styles.root}>
      <StatusBar hidden />
      <View style={styles.drawer}>
        <DrawerMenu onClose={close} />
      </View>

      <Animated.View
        style={[styles.content, { transform: [{ translateX: slideAnim }] }]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={20} color={Colors.white} />
              <Text style={styles.backLabel}>{category}</Text>
            </TouchableOpacity>
            <View style={styles.rightButtons}>
              <TouchableOpacity onPress={toggleFavourite} style={styles.iconBtn}>
                <Ionicons name={starred ? 'star' : 'star-outline'} size={22} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity onPress={isOpen ? close : open} style={styles.iconBtn}>
                <Ionicons name="menu" size={26} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
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
              source={{ uri: url ?? 'https://srichinmoy.org' }}
              style={[styles.webview, { marginBottom: insets.bottom }]}
              userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onLoadStart={() => {
                setLoading(true)
                clearLoadingTimer()
                loadingTimer.current = setTimeout(handleError, 30000)
              }}
              onLoadEnd={() => {
                clearLoadingTimer()
                setLoading(false)
              }}
              onError={handleError}
              onHttpError={({ nativeEvent }) => {
                if (nativeEvent.statusCode >= 400) handleError()
              }}
              renderError={() => (
                <View style={styles.renderErrorContainer}>
                  <Ionicons name="cloud-offline-outline" size={64} color={Colors.consciousness} />
                  <Text style={styles.errorTitle}>Unable to Load</Text>
                  <Text style={styles.errorMessage}>
                    Please check your internet connection and try again.
                  </Text>
                  <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
                    <Text style={styles.retryText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  safeArea: { backgroundColor: Colors.unity },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4, paddingVertical: 2 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
  backLabel: { color: Colors.white, fontSize: 19, letterSpacing: 2.4 },
  rightButtons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 8 },
  webview: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.unity,
  },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, gap: 16 },
  renderErrorContainer: { ...StyleSheet.absoluteFillObject, backgroundColor: Colors.unity, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, gap: 16 },
  errorTitle: { color: Colors.white, fontSize: 22, fontWeight: 'bold', letterSpacing: 1.5 },
  errorMessage: { color: Colors.consciousness, fontSize: 15, textAlign: 'center', lineHeight: 22 },
  retryBtn: { marginTop: 8, paddingHorizontal: 40, paddingVertical: 14, backgroundColor: Colors.delight, borderRadius: 12 },
  retryText: { color: Colors.white, fontSize: 17, fontWeight: 'bold', letterSpacing: 1.5 },
  overlay: { position: 'absolute', top: 0, right: 0, bottom: 0, width: SCREEN_WIDTH - DRAWER_WIDTH },
})
