// Privacy Policy screen — required by Google Play
// Loads the official privacy policy from akling.com

import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { WebView } from 'react-native-webview'
import { Colors } from '@/constants/colors'

export default function PrivacyScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

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

      <WebView
        source={{ uri: 'https://akling.com/privacy-policy.html' }}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.delight} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.unity },
  safeArea: { backgroundColor: Colors.unity, paddingTop: 24 },
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
})
