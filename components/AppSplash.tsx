// Custom animated splash screen
// Displays the Sri Chinmoy aphorism with sequential animations
// Called from _layout.tsx before the main Stack renders

import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'
import { Colors } from '@/constants/colors'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface Props {
  onFinish: () => void
}

export default function AppSplash({ onFinish }: Props) {
  const birdOpacity  = useRef(new Animated.Value(0)).current
  const birdScale    = useRef(new Animated.Value(0.7)).current
  const lineWidth    = useRef(new Animated.Value(0)).current
  const quoteOpacity = useRef(new Animated.Value(0)).current
  const godScale     = useRef(new Animated.Value(0.6)).current
  const authorOpacity = useRef(new Animated.Value(0)).current
  const screenOpacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.sequence([
      // 1. Bird appears — gentle fade + scale
      Animated.parallel([
        Animated.timing(birdOpacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.spring(birdScale, {
          toValue: 1,
          friction: 7,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),

      // 2. Orange divider line draws outward
      Animated.timing(lineWidth, {
        toValue: 70,
        duration: 400,
        useNativeDriver: false, // width cannot use native driver
      }),

      // 3. Quote fades in + "God." springs to life
      Animated.parallel([
        Animated.timing(quoteOpacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.spring(godScale, {
          toValue: 1,
          friction: 5,
          tension: 55,
          useNativeDriver: true,
        }),
      ]),

      // 4. Attribution appears
      Animated.timing(authorOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      // 5. Hold — let the words sink in
      Animated.delay(2200),

      // 6. Fade to black
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish())
  }, [])

  return (
    // Tap anywhere to skip
    <TouchableWithoutFeedback onPress={onFinish}>
      <Animated.View style={[styles.container, { opacity: screenOpacity }]}>

        {/* Bird — tinted Delight orange for sunrise warmth */}
        <Animated.Image
          source={require('@/assets/images/bird.png')}
          style={[
            styles.bird,
            {
              opacity: birdOpacity,
              transform: [{ scale: birdScale }],
            },
          ]}
        />

        {/* Thin orange divider */}
        <Animated.View style={[styles.divider, { width: lineWidth }]} />

        {/* The aphorism — three lines + God */}
        <Animated.View style={[styles.quoteBlock, { opacity: quoteOpacity }]}>
          <Text style={styles.quoteLine}>When the power of love</Text>
          <Text style={styles.quoteLine}>replaces the love of power,</Text>
          <Text style={styles.quoteLine}>man will have a new name:</Text>
        </Animated.View>

        {/* "God." — larger, orange, springs in */}
        <Animated.Text
          style={[
            styles.godWord,
            { transform: [{ scale: godScale }] },
          ]}
        >
          God.
        </Animated.Text>

        {/* Attribution */}
        <Animated.Text style={[styles.attribution, { opacity: authorOpacity }]}>
          — Sri Chinmoy
        </Animated.Text>

      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.unity,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
  },
  bird: {
    width: SCREEN_WIDTH * 0.26,
    height: SCREEN_WIDTH * 0.26,
    resizeMode: 'contain',
    tintColor: Colors.delight,
    marginBottom: 28,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.delight,
    marginBottom: 28,
  },
  quoteBlock: {
    alignItems: 'center',
    marginBottom: 20,
  },
  quoteLine: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: 'serif',
    fontStyle: 'italic',
    letterSpacing: 0.6,
    textAlign: 'center',
    lineHeight: 30,
    opacity: 0.92,
  },
  godWord: {
    color: Colors.delight,
    fontSize: 42,
    fontFamily: 'serif',
    fontWeight: '300',
    letterSpacing: 8,
    textAlign: 'center',
    marginBottom: 32,
  },
  attribution: {
    color: Colors.consciousness,
    fontSize: 13,
    fontFamily: 'serif',
    fontStyle: 'italic',
    letterSpacing: 2.5,
    textAlign: 'center',
  },
})
