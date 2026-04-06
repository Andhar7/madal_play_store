// Translated from SwiftUI MenuView.swift
// Slide-out left drawer with category navigation links
// IMP-003: Privacy Policy link added at the bottom

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/colors'
import { menuItems } from '@/constants/data'
import { DRAWER_WIDTH } from '@/hooks/useDrawer'

interface Props {
  onClose: () => void
}

export default function DrawerMenu({ onClose }: Props) {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  function handleSelect(category: string) {
    onClose()
    router.push(`/category/${encodeURIComponent(category)}`)
  }

  function handlePrivacy() {
    onClose()
    router.push('/privacy' as any)
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.list, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        {menuItems.map(item => (
          <View key={item.id}>
            <TouchableOpacity style={styles.row} onPress={() => handleSelect(item.id)}>
              <Ionicons name={item.icon as any} size={16} color={Colors.white} />
              <Text style={styles.label}>{item.id}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
          </View>
        ))}

        {/* Privacy Policy — required by Google Play */}
        <TouchableOpacity style={styles.row} onPress={handlePrivacy}>
          <Ionicons name="shield-checkmark-outline" size={16} color={Colors.consciousness} />
          <Text style={styles.privacyLabel}>Privacy Policy</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: DRAWER_WIDTH,
    flex: 1,
    backgroundColor: Colors.unity,
  },
  list: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 14,
  },
  label: {
    color: Colors.white,
    fontSize: 17,
    letterSpacing: 2.4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },
  privacyLabel: {
    color: Colors.consciousness,
    fontSize: 14,
    letterSpacing: 1.8,
  },
})
