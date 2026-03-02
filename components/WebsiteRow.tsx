// Translated from SwiftUI WebsiteRowView.swift
// Row item in the category list — bird image + title + chevron

import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/colors'
import { WebsiteItem } from '@/constants/data'

interface Props {
  item: WebsiteItem
}

export default function WebsiteRow({ item }: Props) {
  const router = useRouter()

  function handlePress() {
    router.push({
      pathname: '/website',
      params: { id: item.id, url: item.url, category: item.category },
    })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <Image source={require('@/assets/images/bird.png')} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{item.id}</Text>
      <View style={{ flex: 1 }} />
      <Ionicons name="chevron-forward" size={14} color={Colors.white} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    paddingHorizontal: 12,
    gap: 21,
  },
  image: {
    width: 33,
    height: 33,
    borderRadius: 16.5,
  },
  title: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 2.7,
    flexShrink: 1,
  },
})
