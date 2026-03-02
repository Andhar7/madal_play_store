// Favourites management using AsyncStorage
// Replaces SwiftUI CoreData (All entity) from WebsitePageView.swift
// Persists across app launches

import { useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from 'expo-router'
import { WebsiteItem } from '@/constants/data'

const STORAGE_KEY = 'madal_favourites'

export function useFavourites() {
  const [favourites, setFavourites] = useState<WebsiteItem[]>([])

  // Reload every time screen comes into focus (e.g. returning from WebsiteScreen)
  useFocusEffect(
    useCallback(() => {
      load()
    }, [])
  )

  async function load() {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY)
      if (json) setFavourites(JSON.parse(json))
    } catch (e) {
      console.error('useFavourites load error:', e)
    }
  }

  async function add(item: WebsiteItem) {
    const updated = [...favourites, item]
    setFavourites(updated)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  async function remove(url: string) {
    const updated = favourites.filter(f => f.url !== url)
    setFavourites(updated)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  function isFavourite(url: string) {
    return favourites.some(f => f.url === url)
  }

  return { favourites, add, remove, isFavourite }
}
