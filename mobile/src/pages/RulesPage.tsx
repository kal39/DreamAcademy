import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Image } from 'react-native';
import { colors } from '../constants/theme';

export default function RulesPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.ScrollView 
      contentContainerStyle={styles.container} 
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBadge}>
        <Text style={styles.headerBadgeText}>COMPREHENSIVE CAMPUS POLICIES</Text>
      </View>
      <Text style={styles.title}>Rules & Code of Conduct</Text>
      <Text style={styles.subtitle}>20 Essential Standards Covering All Aspects of Student Life at Dream Academy</Text>

      {/* Featured Banner Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.featuredImage} 
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.imageOverlayText}>Fostering Accountability, Respect, and Academic Excellence</Text>
        </View>
      </View>

      {/* Introduction Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📌 Introduction to Our Guidelines</Text>
        <Text style={styles.bodyText}>
          At Dream Academy (Kasanchis, Addis Ababa), our comprehensive code of conduct ensures a safe, disciplined, and enriching learning atmosphere for all students from daycare through Grade 12. Please review the 20 core regulations outlined below.
        </Text>
      </View>

      {/* Category 1: Attendance & Punctuality */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>⏰ Part I: Attendance & Punctuality (Rules 1–4)</Text>
        
        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>01</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Strict Punctuality</Text>
            <Text style={styles.ruleDesc}>Students must arrive on campus by 08:00 AM. Morning assembly and homeroom sessions begin promptly.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>02</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Late Arrival Protocol</Text>
            <Text style={styles.ruleDesc}>Arrival after 08:15 AM requires obtaining an official late entry slip from the main administrative desk.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>03</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Absence Notification</Text>
            <Text style={styles.ruleDesc}>Parents must notify the administration by 08:30 AM via phone or portal message in case of student illness or emergency.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>04</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Minimum Attendance Requirement</Text>
            <Text style={styles.ruleDesc}>Students must maintain at least 90% attendance per term to qualify for grade advancement and final examinations.</Text>
          </View>
        </View>
      </View>

      {/* Category 2: Uniform & Grooming */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👔 Part II: Uniform & Grooming (Rules 5–7)</Text>
        
        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>05</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Official Uniform Compliance</Text>
            <Text style={styles.ruleDesc}>Complete, clean, and properly ironed school uniforms must be worn on all instructional days without modification.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>06</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Footwear & Sports Gear</Text>
            <Text style={styles.ruleDesc}>Standard black or brown leather shoes are mandatory for classes; approved athletic sneakers are restricted to PE days.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>07</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Conservative Personal Grooming</Text>
            <Text style={styles.ruleDesc}>Hair must be neatly styled and clean. Extreme coloring, visible tattoos, and distracting accessories are prohibited.</Text>
          </View>
        </View>
      </View>

      {/* Category 3: Classroom & Conduct */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤝 Part III: Conduct & Interpersonal Ethics (Rules 8–11)</Text>
        
        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>08</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Zero Tolerance for Bullying</Text>
            <Text style={styles.ruleDesc}>Verbal harassment, physical intimidation, emotional bullying, or cyberbullying results in immediate disciplinary action.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>09</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Mutual Respect</Text>
            <Text style={styles.ruleDesc}>Polite behavior and respectful dialogue toward teachers, administrative personnel, and fellow peers are required at all times.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>10</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Classroom Attentive Participation</Text>
            <Text style={styles.ruleDesc}>Active engagement, preparedness with required books, and refraining from disrupting lessons are expected during lectures.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>11</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Campus Bounds & Movement</Text>
            <Text style={styles.ruleDesc}>Students must remain within authorized compound zones during school hours and cannot leave without exit authorization.</Text>
          </View>
        </View>
      </View>

      {/* Category 4: Academic Integrity */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📚 Part IV: Academic Integrity (Rules 12–14)</Text>
        
        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>12</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Original Work & Honesty</Text>
            <Text style={styles.ruleDesc}>Plagiarism, copying assignments, or cheating on quizzes or exams will lead to failing grades and formal review.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>13</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Exam Hall Protocols</Text>
            <Text style={styles.ruleDesc}>Strict silence, turning in all unauthorized papers, and adherence to invigilator instructions are mandatory during testing.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>14</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Homework Accountability</Text>
            <Text style={styles.ruleDesc}>All assigned projects and homework must be submitted on time unless a valid medical excuse is presented.</Text>
          </View>
        </View>
      </View>

      {/* Category 5: Technology & Property */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💻 Part V: Technology & Campus Property (Rules 15–17)</Text>
        
        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>15</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Mobile Phone Restrictions</Text>
            <Text style={styles.ruleDesc}>Smartphones must remain turned off and stored in bags/lockers during instructional hours to avoid classroom distractions.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>16</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Care of School Property</Text>
            <Text style={styles.ruleDesc}>Desks, laboratory equipment, library books, and sports facilities must be treated with respect; intentional damage incurs fines.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>17</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Environmental Cleanliness</Text>
            <Text style={styles.ruleDesc}>Littering is strictly forbidden. Waste must be disposed of properly in the designated recycling and trash containers across campus.</Text>
          </View>
        </View>
      </View>

      {/* Category 6: Health, Safety & Prohibitions */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛡️ Part VI: Health, Safety & Prohibited Items (Rules 18–20)</Text>
        
        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>18</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Prohibited Substances</Text>
            <Text style={styles.ruleDesc}>Possession or use of tobacco products, electronic cigarettes, alcohol, or unauthorized substances results in immediate expulsion.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>19</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Weapons & Dangerous Objects</Text>
            <Text style={styles.ruleDesc}>Bringing sharp tools, weapons, firecrackers, or hazardous materials onto campus is strictly prohibited under all circumstances.</Text>
          </View>
        </View>

        <View style={styles.ruleRow}>
          <Text style={styles.ruleNumber}>20</Text>
          <View style={styles.ruleContent}>
            <Text style={styles.ruleHeading}>Health & Safety Compliance</Text>
            <Text style={styles.ruleDesc}>Students must follow all campus emergency drills, fire evacuation procedures, and hygiene guidelines issued by the nurse's office.</Text>
          </View>
        </View>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 50, backgroundColor: colors.canvas },
  headerBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(15, 23, 42, 0.08)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginBottom: 8 },
  headerBadgeText: { fontSize: 10, fontWeight: '800', color: colors.primaryDark, letterSpacing: 0.8 },
  title: { fontSize: 24, fontWeight: '900', color: colors.primaryDark, marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#64748b', marginBottom: 16, fontWeight: '600' },
  imageContainer: { width: '100%', height: 160, borderRadius: 14, overflow: 'hidden', marginBottom: 16, position: 'relative' },
  featuredImage: { width: '100%', height: '100%' },
  imageOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', padding: 10 },
  imageOverlayText: { color: '#ffffff', fontSize: 11, fontWeight: '800', textAlign: 'center' },
  card: { backgroundColor: '#ffffff', borderRadius: 14, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: colors.primaryDark, marginBottom: 12 },
  bodyText: { fontSize: 13, color: '#334155', lineHeight: 20 },
  ruleRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 10 },
  ruleNumber: { fontSize: 13, fontWeight: '900', color: '#0369a1', width: 28, marginTop: 1 },
  ruleContent: { flex: 1 },
  ruleHeading: { fontSize: 13, fontWeight: '800', color: colors.primaryDark, marginBottom: 2 },
  ruleDesc: { fontSize: 12, color: '#475569', lineHeight: 17 },
});