// Translated from SwiftUI CategoryView.swift
// Shows filtered website list for a category (or Favourites from AsyncStorage)
// Header: back button (left) + category title (center) + hamburger (right)

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import DrawerMenu from '@/components/DrawerMenu'
import WebsiteRow from '@/components/WebsiteRow'
import { Colors } from '@/constants/colors'
import { websiteItems } from '@/constants/data'
import { useDrawer, DRAWER_WIDTH } from '@/hooks/useDrawer'
import { useFavourites } from '@/hooks/useFavourites'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function CategoryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>()
  const router = useRouter()
  const { isOpen, open, close, slideAnim } = useDrawer()
  const { favourites } = useFavourites()

  const categoryName = decodeURIComponent(name ?? '')

  const items =
    categoryName === 'Favourite'
      ? favourites
      : websiteItems.filter(item => item.category === categoryName)

  return (
    <View style={styles.root}>
      {/* Drawer behind content */}
      <View style={styles.drawer}>
        <DrawerMenu onClose={close} />
      </View>

      {/* Main content slides right when drawer opens */}
      <Animated.View
        style={[styles.content, { transform: [{ translateX: slideAnim }] }]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={22} color={Colors.white} />
            </TouchableOpacity>

            <Text style={styles.title}>{categoryName}</Text>

            <TouchableOpacity onPress={isOpen ? close : open} style={styles.menuBtn}>
              <Ionicons name="menu" size={26} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.divider} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map(item => (
            <View key={`${item.id}-${item.url}`}>
              <WebsiteRow item={item} />
              <View style={styles.divider} />
            </View>
          ))}
        </ScrollView>
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
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  backBtn: {
    padding: 8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 21,
    letterSpacing: 2.4,
  },
  menuBtn: {
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH - DRAWER_WIDTH,
  },
})
