import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'
import {useEffect, useState} from 'react'
import * as SplashScreen from 'expo-splash-screen'
import AppSplash from '@/components/AppSplash'
import {View, Text, StyleSheet} from 'react-native'
import {checkAgeSignals, isAccessDenied} from '@/utils/ageSignals'
import {Colors} from '@/constants/colors'


// Keep native splash visible until React is ready
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [showCustomSplash, setShowCustomSplash] = useState(true)
    const [accessDenied, setAccessDenied] = useState(false)


    useEffect(() => {
        // Hide the native splash — our beautiful custom one takes over
        SplashScreen.hideAsync()
    }, [])

    useEffect(() => {
        checkAgeSignals().then(result => {
            if (isAccessDenied(result)) setAccessDenied(true)
        })
    }, [])

    if (accessDenied) {
        return (
            <View style={styles.denied}>
                <Text style={styles.deniedTitle}>Parental Approval Required</Text>
                <Text style={styles.deniedText}>
                    A parent or guardian has not yet approved access to this app.
                    Please ask them to approve it in the Google Family Link app.
                </Text>
            </View>
        )
    }


    if (showCustomSplash) {
        return (
            <>
                <StatusBar hidden/>
                <AppSplash onFinish={() => setShowCustomSplash(false)}/>
            </>
        )
    }

    return (
        <>
            <StatusBar hidden/>
            <Stack screenOptions={{headerShown: false}}/>
        </>
    )
}

const styles = StyleSheet.create({
    denied: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.unity,
        padding: 32,
        gap: 16,
    },
    deniedTitle: {
        color: Colors.white,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    deniedText: {
        color: Colors.consciousness,
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
    },
})


