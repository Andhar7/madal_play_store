// Translated from SwiftUI MenuView.swift
// Slide-out left drawer with category navigation links
// SF Symbols → Ionicons mapping

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/colors'
import { menuItems } from '@/constants/data'
import { DRAWER_WIDTH } from '@/hooks/useDrawer'

interface Props {
  onClose: () => void
}

export default function DrawerMenu({ onClose }: Props) {
  const router = useRouter()

  function handleSelect(category: string) {
    onClose()
    router.push(`/category/${encodeURIComponent(category)}`)
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {menuItems.map(item => (
          <View key={item.id}>
            <TouchableOpacity style={styles.row} onPress={() => handleSelect(item.id)}>
              <Ionicons name={item.icon as any} size={16} color={Colors.white} />
              <Text style={styles.label}>{item.id}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
          </View>
        ))}
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
    paddingTop: 70, // clear the status bar area
    paddingBottom: 40,
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
})
