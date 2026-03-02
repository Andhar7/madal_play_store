// Reusable hook for the slide-out drawer animation
// Used in: index.tsx, category/[name].tsx, website.tsx
// Mirrors SwiftUI's showMenu + .offset(x:) + easeIn animation

import { useRef, useState } from 'react'
import { Animated, Dimensions } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
export const DRAWER_WIDTH = SCREEN_WIDTH / 2

export function useDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const slideAnim = useRef(new Animated.Value(0)).current

  function open() {
    setIsOpen(true)
    Animated.timing(slideAnim, {
      toValue: DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  function close() {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsOpen(false))
  }

  function toggle() {
    isOpen ? close() : open()
  }

  return { isOpen, open, close, toggle, slideAnim }
}
