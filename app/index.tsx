// Translated from SwiftUI OpeningPageView.swift
// Main entry: embedded srichinmoy.org + slide-out drawer menu
// Drawer opens via hamburger button (top-left), closes by tapping overlay

import React from 'react'
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
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

  return (
    <View style={styles.root}>
      {/* Drawer sits behind — revealed when content slides right */}
      <View style={styles.drawer}>
        <DrawerMenu onClose={close} />
      </View>

      {/* Main content — slides right by DRAWER_WIDTH when menu opens */}
      <Animated.View
        style={[styles.content, { transform: [{ translateX: slideAnim }] }]}
      >
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={isOpen ? close : open} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color={Colors.white} />
          </TouchableOpacity>
        </SafeAreaView>

        <WebView
          source={{ uri: 'https://www.srichinmoy.org' }}
          style={styles.webview}
        />
      </Animated.View>

      {/* Overlay over visible content when menu is open — tap to close */}
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
  root: {
    flex: 1,
    backgroundColor: Colors.unity,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
  },
  content: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.unity,
  },
  header: {
    backgroundColor: Colors.unity,
    paddingHorizontal: 8,
    paddingTop: 24,
    paddingBottom: 8,
  },
  menuBtn: {
    padding: 8,
  },
  webview: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH - DRAWER_WIDTH,
  },
})
