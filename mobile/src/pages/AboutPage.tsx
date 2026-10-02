import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Image, TouchableOpacity, Linking } from 'react-native';
import { colors } from '../constants/theme';

export default function AboutPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleCall = () => {
    Linking.openURL('tel:+251115500000');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:info@dreamacademy.edu.et');
  };

  const handleMap = () => {
    Linking.openURL('https://maps.google.com/?q=Kasanchis+Addis+Ababa');
  };

  return (
    <Animated.ScrollView 
      contentContainerStyle={styles.container} 
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Header Section */}
      <View style={styles.heroSection}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.heroImage} 
        />
        <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>ESTABLISHED EXCELLENCE IN ADDIS ABABA</Text></View>
        <Text style={styles.title}>Dream Academy International</Text>
        <Text style={styles.subtitle}>Comprehensive Daycare through Grade 12 Education</Text>
      </View>

      {/* Comprehensive Introduction */}
      <View style={styles.card}>
        <Text style={styles.sectionHeading}>🏛️ Our Institution & Legacy</Text>
        <Text style={styles.bodyText}>
          Strategically situated in the vibrant heart of Kasanchis, Addis Ababa, Dream Academy has established a proud tradition of empowering young minds. Our institution provides a continuous, uninterrupted educational roadmap starting from early childhood daycare and kindergarten, advancing through dynamic primary and middle school stages, and culminating in high school graduation (Grade 12).
        </Text>
        <Text style={[styles.bodyText, { marginTop: 10 }]}>
          We pride ourselves on offering an environment that seamlessly bridges global academic rigor with deep-rooted community values, ensuring that every learner grows into a confident, self-driven, and socially responsible global citizen.
        </Text>
      </View>

      {/* Core Educational Qualities */}
      <View style={styles.card}>
        <Text style={styles.sectionHeading}>🌟 Core Qualities & Pillars</Text>
        
        <View style={styles.qualityItem}>
          <Text style={styles.qualityEmoji}>🎯</Text>
          <View style={styles.qualityContent}>
            <Text style={styles.qualityTitle}>Rigorous Holistic Curriculum</Text>
            <Text style={styles.qualityDesc}>A balanced integration of advanced STEM programs, language arts, critical thinking workshops, and creative arts.</Text>
          </View>
        </View>

        <View style={styles.qualityItem}>
          <Text style={styles.qualityEmoji}>👩‍🏫</Text>
          <View style={styles.qualityContent}>
            <Text style={styles.qualityTitle}>Distinguished Faculty & Mentorship</Text>
            <Text style={styles.qualityDesc}>Highly accredited local and international educators holding advanced degrees, dedicated to personalized student attention.</Text>
          </View>
        </View>

        <View style={styles.qualityItem}>
          <Text style={styles.qualityEmoji}>🔬</Text>
          <View style={styles.qualityContent}>
            <Text style={styles.qualityTitle}>State-of-the-Art Facilities</Text>
            <Text style={styles.qualityDesc}>Equipped computer laboratories, modern science spaces, a comprehensive library, and secure indoor/outdoor play zones.</Text>
          </View>
        </View>

        <View style={styles.qualityItem}>
          <Text style={styles.qualityEmoji}>🛡️</Text>
          <View style={styles.qualityContent}>
            <Text style={styles.qualityTitle}>Secure & Nurturing Atmosphere</Text>
            <Text style={styles.qualityDesc}>24/7 campus security monitoring, clean dining areas, and on-site professional nursing care.</Text>
          </View>
        </View>
      </View>

      {/* Key School Achievements */}
      <View style={styles.card}>
        <Text style={styles.sectionHeading}>🏆 Proud Achievements & Milestones</Text>
        
        <View style={styles.achievementBox}>
          <Text style={styles.achievementTitle}>100% University Placement Record</Text>
          <Text style={styles.achievementDesc}>Consistently preparing graduating seniors who secure admissions into elite domestic institutions and top-ranked global universities.</Text>
        </View>

        <View style={styles.achievementBox}>
          <Text style={styles.achievementTitle}>Regional STEM & Innovation Honors</Text>
          <Text style={styles.achievementDesc}>Our students regularly achieve top positions in Addis Ababa inter-school science fairs, coding competitions, and robotics challenges.</Text>
        </View>

        <View style={styles.achievementBox}>
          <Text style={styles.achievementTitle}>Excellence in Arts & Leadership</Text>
          <Text style={styles.achievementDesc}>Award-winning student debate teams, annual musical showcases, and proactive community engagement projects across the city.</Text>
        </View>
      </View>

      {/* Detailed Location & Contact Information */}
      <View style={styles.card}>
        <Text style={styles.sectionHeading}>📍 Location & Direct Contacts</Text>
        
        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Campus Location:</Text>
          <Text style={styles.contactValue}>Kasanchis District (Near UN ECA), Addis Ababa, Ethiopia</Text>
        </View>

        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Administrative Hours:</Text>
          <Text style={styles.contactValue}>Monday – Friday: 08:00 AM – 04:00 PM{'\n'}Saturday: 09:00 AM – 12:30 PM (Registration only)</Text>
        </View>

        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Primary Phone:</Text>
          <Text style={styles.contactValue}>+251 11 550 0000 / +251 91 100 0000</Text>
        </View>

        <View style={styles.contactRow}>
          <Text style={styles.contactLabel}>Official Email:</Text>
          <Text style={styles.contactValue}>info@dreamacademy.edu.et</Text>
        </View>

        {/* Interactive Action Buttons */}
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall} activeOpacity={0.85}>
            <Text style={styles.actionButtonText}>📞 Call Office</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.emailButton]} onPress={handleEmail} activeOpacity={0.85}>
            <Text style={styles.actionButtonText}>✉️ Email Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.mapButton]} onPress={handleMap} activeOpacity={0.85}>
            <Text style={styles.actionButtonText}>🗺️ View Map</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 50, backgroundColor: colors.canvas },
  heroSection: { marginBottom: 16, alignItems: 'center' },
  heroImage: { width: '100%', height: 180, borderRadius: 16, marginBottom: 10 },
  heroBadge: { backgroundColor: '#e0f2fe', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginBottom: 6 },
  heroBadgeText: { fontSize: 10, fontWeight: '800', color: '#0369a1', letterSpacing: 0.8 },
  title: { fontSize: 24, fontWeight: '900', color: colors.primaryDark, textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#64748b', fontWeight: '600', marginTop: 2, textAlign: 'center' },

  card: { backgroundColor: '#ffffff', borderRadius: 14, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  sectionHeading: { fontSize: 15, fontWeight: '800', color: colors.primaryDark, marginBottom: 10 },
  bodyText: { fontSize: 13, color: '#334155', lineHeight: 20 },

  qualityItem: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 12 },
  qualityEmoji: { fontSize: 20, marginRight: 12, marginTop: 1 },
  qualityContent: { flex: 1 },
  qualityTitle: { fontSize: 13.5, fontWeight: '800', color: colors.primaryDark, marginBottom: 2 },
  qualityDesc: { fontSize: 12, color: '#475569', lineHeight: 17 },

  achievementBox: { backgroundColor: '#f8fafc', borderRadius: 10, padding: 12, marginTop: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  achievementTitle: { fontSize: 13, fontWeight: '800', color: colors.primaryDark, marginBottom: 2 },
  achievementDesc: { fontSize: 11.5, color: '#475569', lineHeight: 16 },

  contactRow: { marginBottom: 10 },
  contactLabel: { fontSize: 11.5, fontWeight: '700', color: '#64748b' },
  contactValue: { fontSize: 12.5, fontWeight: '600', color: colors.primaryDark, marginTop: 1, lineHeight: 18 },

  actionGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  actionButton: { flex: 1, backgroundColor: colors.primaryDark, borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginHorizontal: 3 },
  emailButton: { backgroundColor: '#0284c7' },
  mapButton: { backgroundColor: '#059669' },
  actionButtonText: { color: '#ffffff', fontSize: 11.5, fontWeight: '800', letterSpacing: 0.5 },
});