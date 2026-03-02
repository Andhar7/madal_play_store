// Translated from SwiftUI WebsitePageView.swift
// Embedded WebView with: back button + category label (left), star favourite (right)
// Favourites stored in AsyncStorage (replaces CoreData)

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
  const { id, url, category } = useLocalSearchParams<{
    id: string
    url: string
    category: CategoryId
  }>()
  const router = useRouter()
  const { isOpen, open, close, slideAnim } = useDrawer()
  const { isFavourite, add, remove } = useFavourites()

  const starred = isFavourite(url)

  function toggleFavourite() {
    if (starred) {
      remove(url)
    } else {
      add({ id, category, url })
    }
  }

  return (
    <View style={styles.root}>
      {/* Drawer behind content */}
      <View style={styles.drawer}>
        <DrawerMenu onClose={close} />
      </View>

      {/* Main content */}
      <Animated.View
        style={[styles.content, { transform: [{ translateX: slideAnim }] }]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerRow}>
            {/* Back button with category name — mirrors SwiftUI chevron.left + Text(category) */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={20} color={Colors.white} />
              <Text style={styles.backLabel}>{category}</Text>
            </TouchableOpacity>

            <View style={styles.rightButtons}>
              {/* Star favourite button */}
              <TouchableOpacity onPress={toggleFavourite} style={styles.iconBtn}>
                <Ionicons
                  name={starred ? 'star' : 'star-outline'}
                  size={22}
                  color={Colors.white}
                />
              </TouchableOpacity>

              {/* Hamburger — open drawer menu */}
              <TouchableOpacity onPress={isOpen ? close : open} style={styles.iconBtn}>
                <Ionicons name="menu" size={26} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        <WebView source={{ uri: url }} style={styles.webview} />
      </Animated.View>

      {/* Tap overlay to close menu */}
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
  safeArea: {
    backgroundColor: Colors.unity,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  backLabel: {
    color: Colors.white,
    fontSize: 19,
    letterSpacing: 2.4,
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
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
