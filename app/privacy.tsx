// Privacy Policy screen — required by Google Play
// Embedded text — no external URL dependency

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'

const LAST_UPDATED = 'April 16, 2026'

export default function PrivacyScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Privacy Policy</Text>
          <View style={styles.placeholder} />
        </View>
      </SafeAreaView>

      <View style={styles.divider} />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.updated}>Last updated: {LAST_UPDATED}</Text>

        <Section title="Overview">
          Madal is a free app that provides easy access to Sri Chinmoy related websites.
          We are committed to protecting your privacy. This policy explains how the app works
          and what data, if any, is collected.
        </Section>

        <Section title="Data We Do NOT Collect">
          Madal does not collect, store, or transmit any personal information.{'\n\n'}
          We do not collect:{'\n'}
          • Your name, email address, or any contact details{'\n'}
          • Location data{'\n'}
          • Device identifiers{'\n'}
          • Usage analytics or crash reports sent to us{'\n'}
          • Cookies or tracking data
        </Section>

        <Section title="Data Stored Locally on Your Device">
          The app stores your saved Favourites locally on your device using Android's
          secure storage. This data never leaves your device and is not accessible to us
          or any third party.{'\n\n'}
          You can remove this data at any time by uninstalling the app.
        </Section>

        <Section title="Internet Access">
          Madal requires internet access solely to display websites from srichinmoy.org
          and related Sri Chinmoy domains within the app's built-in browser.{'\n\n'}
          We do not control the content or privacy practices of these external websites.
          Please refer to their own privacy policies for information about how they
          handle your data.
        </Section>

        <Section title="Third-Party Services">
          The app does not integrate any third-party advertising, analytics, or
          tracking services. No data is shared with any third parties.
        </Section>

        <Section title="Children's Privacy">
          Madal does not knowingly collect any personal information from children
          under the age of 13. The app contains no user accounts or data submission
          forms of any kind.
        </Section>

        <Section title="Changes to This Policy">
          If we update this Privacy Policy, the new version will be published within
          the app. Continued use of the app after any changes constitutes acceptance
          of the updated policy.
        </Section>

        <Section title="Contact">
          If you have any questions about this Privacy Policy, please contact us
          through the Google Play Store listing for Madal.
        </Section>
      </ScrollView>
    </View>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.unity },
  safeArea: { backgroundColor: Colors.unity },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  backBtn: { padding: 8 },
  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 21,
    letterSpacing: 2.4,
  },
  placeholder: { width: 38 },
  divider: { height: 1, backgroundColor: Colors.divider },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  updated: {
    color: Colors.consciousness,
    fontSize: 12,
    letterSpacing: 1.2,
    marginBottom: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: Colors.delight,
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1.8,
    marginBottom: 10,
  },
  sectionBody: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.88,
    letterSpacing: 0.4,
  },
})
