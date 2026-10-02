import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Image, TouchableOpacity, Linking, FlatList } from 'react-native';
import { colors } from '../constants/theme';

export default function EventsCalendarPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleCalendarDownload = () => {
    Linking.openURL('https://dreamacademy.edu.et/calendar-2026-2027.pdf');
  };

  // Dynamic gallery items for the top section
  const galleryImages = [
    { id: '1', title: 'Annual Science & Tech Fair', uri: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=800&auto=format&fit=crop' },
    { id: '2', title: 'Inter-House Football Championship', uri: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop' },
    { id: '3', title: 'Cultural & Art Gala Night', uri: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop' },
    { id: '4', title: 'Debate & Quiz Bowl Finals', uri: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop' },
  ];

  return (
    <Animated.ScrollView 
      contentContainerStyle={styles.container} 
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBadge}>
        <Text style={styles.headerBadgeText}>KASANCHIS CAMPUS CALENDAR</Text>
      </View>
      <Text style={styles.title}>Events & Academic Calendar</Text>
      <Text style={styles.subtitle}>Explore our vibrant student life, exciting extracurriculars, and term milestones</Text>

      {/* Top Dynamic Image Gallery Slider */}
      <View style={styles.galleryWrapper}>
        <Text style={styles.galleryHeading}>📸 Campus Life & Highlights</Text>
        <FlatList
          data={galleryImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.galleryList}
          renderItem={({ item }) => (
            <View style={styles.galleryCard}>
              <Image source={{ uri: item.uri }} style={styles.galleryImage} />
              <View style={styles.galleryOverlay}>
                <Text style={styles.galleryTitle}>{item.title}</Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Quick Download Banner */}
      <TouchableOpacity style={styles.downloadBanner} onPress={handleCalendarDownload} activeOpacity={0.85}>
        <Text style={styles.downloadEmoji}>📥</Text>
        <View style={styles.downloadTextWrap}>
          <Text style={styles.downloadTitle}>Download Full Academic Calendar (PDF)</Text>
          <Text style={styles.downloadSub}>Includes exam timetables, holiday breaks, and parent meeting dates.</Text>
        </View>
      </TouchableOpacity>

      {/* Section 1: Term 1 Events & Milestones */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🍂 Term 1: August – December</Text>
        
        {[
          { date: 'Aug 24, 2026', title: 'Orientation & Welcome Day for New Students', type: 'Administrative', location: 'Main Assembly Hall' },
          { date: 'Sep 07, 2026', title: 'Official Classes Begin for Academic Year 2026/27', type: 'Academic', location: 'All Campus Blocks' },
          { date: 'Oct 12, 2026', title: 'Inter-House Football & Basketball Tournament Kickoff', type: 'Sports', location: 'Campus Sports Pavilion' },
          { date: 'Nov 04, 2026', title: 'Term 1 Mid-Term Assessments & Parent-Teacher Conf.', type: 'Academic', location: 'Classrooms' },
          { date: 'Nov 20, 2026', title: 'Annual Dream Academy Science & Tech Fair', type: 'Event', location: 'Science Building' },
          { date: 'Dec 18, 2026', title: 'Term 1 Closing & Cultural Talent Show Gala', type: 'Celebration', location: 'Main Hall' },
        ].map((event, index, arr) => (
          <View key={index} style={[styles.eventRow, index === arr.length - 1 && styles.lastRow]}>
            <View style={styles.dateBox}>
              <Text style={styles.dateText}>{event.date}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventMeta}>📍 {event.location} • <Text style={styles.eventType}>{event.type}</Text></Text>
            </View>
          </View>
        ))}
      </View>

      {/* Section 2: Term 2 Events & Milestones */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>❄️ Term 2: January – March</Text>
        
        {[
          { date: 'Jan 05, 2027', title: 'Classes Resume for Term 2', type: 'Academic', location: 'All Campus Blocks' },
          { date: 'Jan 22, 2027', title: 'Inter-School Spelling Bee & Debate Championship', type: 'Competition', location: 'Auditorium' },
          { date: 'Feb 12, 2027', title: 'High School University & Career Guidance Fair', type: 'Workshop', location: 'Upper Secondary Hall' },
          { date: 'Feb 26, 2027', title: 'Term 2 Mid-Term Progress Check & Evaluation', type: 'Academic', location: 'Classrooms' },
          { date: 'Mar 15, 2027', title: 'Annual Charity & Community Outreach Day', type: 'Community', location: 'Kasanchis Neighborhood' },
          { date: 'Mar 31, 2027', title: 'Term 2 Closing & Math Olympiad Finals', type: 'Academic', location: 'Main Hall' },
        ].map((event, index, arr) => (
          <View key={index} style={[styles.eventRow, index === arr.length - 1 && styles.lastRow]}>
            <View style={styles.dateBox}>
              <Text style={styles.dateText}>{event.date}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventMeta}>📍 {event.location} • <Text style={styles.eventType}>{event.type}</Text></Text>
            </View>
          </View>
        ))}
      </View>

      {/* Section 3: Term 3 Events & Milestones */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>☀️ Term 3: April – July</Text>
        
        {[
          { date: 'Apr 12, 2027', title: 'Classes Resume for Term 3', type: 'Academic', location: 'All Campus Blocks' },
          { date: 'Apr 30, 2027', title: 'Spring Arts, Drama & Music Festival', type: 'Celebration', location: 'Open-Air Amphitheater' },
          { date: 'May 18, 2027', title: 'Grade 8 & Grade 12 National Mock Examinations', type: 'Examination', location: 'Examination Halls' },
          { date: 'Jun 04, 2027', title: 'Annual Kindergarten & Primary Sports Day', type: 'Sports', location: 'Main Sports Ground' },
          { date: 'Jun 25, 2027', title: 'Final End-of-Year Examinations Begin', type: 'Examination', location: 'All Classrooms' },
          { date: 'Jul 16, 2027', title: 'Grand Graduation & Award Ceremony 2027', type: 'Ceremony', location: 'Addis Ababa Millennium Hall' },
        ].map((event, index, arr) => (
          <View key={index} style={[styles.eventRow, index === arr.length - 1 && styles.lastRow]}>
            <View style={styles.dateBox}>
              <Text style={styles.dateText}>{event.date}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventMeta}>📍 {event.location} • <Text style={styles.eventType}>{event.type}</Text></Text>
            </View>
          </View>
        ))}
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
  
  /* Gallery Slider Styles */
  galleryWrapper: { marginBottom: 16 },
  galleryHeading: { fontSize: 13.5, fontWeight: '800', color: colors.primaryDark, marginBottom: 10 },
  galleryList: { paddingRight: 16 },
  galleryCard: { width: 210, height: 130, borderRadius: 12, overflow: 'hidden', marginRight: 12, position: 'relative', backgroundColor: '#e2e8f0', borderWidth: 1, borderColor: '#cbd5e1' },
  galleryImage: { width: '100%', height: '100%' },
  galleryOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(15, 23, 42, 0.7)', padding: 8 },
  galleryTitle: { color: '#ffffff', fontSize: 11, fontWeight: '800', textAlign: 'center' },

  downloadBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0fdf4', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#bbf7d0', marginBottom: 14 },
  downloadEmoji: { fontSize: 24, marginRight: 12 },
  downloadTextWrap: { flex: 1 },
  downloadTitle: { fontSize: 13, fontWeight: '900', color: '#166534', marginBottom: 2 },
  downloadSub: { fontSize: 11, color: '#15803d', lineHeight: 15 },

  card: { backgroundColor: '#ffffff', borderRadius: 14, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: colors.primaryDark, marginBottom: 14 },

  eventRow: { flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 12, marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  lastRow: { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 },
  dateBox: { width: 95, backgroundColor: '#f1f5f9', paddingVertical: 6, paddingHorizontal: 8, borderRadius: 8, marginRight: 12, alignItems: 'center' },
  dateText: { fontSize: 11, fontWeight: '800', color: colors.primaryDark, textAlign: 'center' },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 13, fontWeight: '800', color: colors.primaryDark, marginBottom: 3, lineHeight: 17 },
  eventMeta: { fontSize: 11, color: '#64748b' },
  eventType: { fontWeight: '800', color: '#0369a1' },
});