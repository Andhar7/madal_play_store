// Privacy Policy screen — required by Google Play
// Loads the official privacy policy from akling.com

import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { WebView } from 'react-native-webview'
import { Colors } from '@/constants/colors'

export default function PrivacyScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  function handleRetry() {
    setError(false)
    setLoading(true)
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Privacy Policy</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      <View style={styles.divider} />

      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="shield-outline" size={64} color={Colors.consciousness} />
          <Text style={styles.errorTitle}>Unable to Load</Text>
          <Text style={styles.errorMessage}>
            Please check your internet connection and try again.
          </Text>
          <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          source={{ uri: 'https://akling.com/privacy-policy.html' }}
          style={{ marginBottom: insets.bottom }}
          userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => { setLoading(false); setError(true) }}
          onHttpError={() => { setLoading(false); setError(true) }}
        />
      )}
      {loading && !error && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.delight} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.unity },
  safeArea: { backgroundColor: Colors.unity },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingBottom: 8 },
  backBtn: { padding: 8 },
  title: { flex: 1, textAlign: 'center', color: Colors.white, fontSize: 21, letterSpacing: 2.4 },
  placeholder: { width: 38 },
  divider: { height: 1, backgroundColor: Colors.divider },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.unity,
  },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, gap: 16 },
  errorTitle: { color: Colors.white, fontSize: 22, fontWeight: 'bold', letterSpacing: 1.5 },
  errorMessage: { color: Colors.consciousness, fontSize: 15, textAlign: 'center', lineHeight: 22 },
  retryBtn: { marginTop: 8, paddingHorizontal: 40, paddingVertical: 14, backgroundColor: Colors.delight, borderRadius: 12 },
  retryText: { color: Colors.white, fontSize: 17, fontWeight: 'bold', letterSpacing: 1.5 },
})
