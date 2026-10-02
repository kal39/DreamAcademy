import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, Linking } from 'react-native';
import { colors } from '../constants/theme';

export default function StaffPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleEmailContact = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <Animated.ScrollView 
      contentContainerStyle={styles.container} 
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBadge}>
        <Text style={styles.headerBadgeText}>KASANCHIS CAMPUS DIRECTORY</Text>
      </View>
      <Text style={styles.title}>Faculty & Staff Directory</Text>
      <Text style={styles.subtitle}>Complete roster of leadership, departmental educators, and support professionals</Text>

      {/* 1. Executive & Administrative Leadership (10 Members) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🏛️ Executive & Administrative Leadership (10)</Text>
        
        {[
          { name: 'Dr. Dawit Kebede', role: 'Principal & Chief Executive Officer', meta: 'Admin Block A | Ext. 101', email: 'd.kebede@dreamacademy.edu.et' },
          { name: 'W/ro Tigist Bekele', role: 'Vice Principal (Academics - Upper School)', meta: 'Admin Block A | Ext. 103', email: 't.bekele@dreamacademy.edu.et' },
          { name: 'Ato Samuel Tadesse', role: 'Vice Principal (Operations & Student Affairs)', meta: 'Admin Block B | Ext. 105', email: 's.tadesse@dreamacademy.edu.et' },
          { name: 'W/ro Hirut Mengistu', role: 'Head of Human Resources & Staff Relations', meta: 'HR Suite Room 108', email: 'h.mengistu@dreamacademy.edu.et' },
          { name: 'Ato Ermias Kassahun', role: 'Director of Admissions & Public Relations', meta: 'Admissions Office Room 102', email: 'admissions@dreamacademy.edu.et' },
          { name: 'W/t Meaza Zewde', role: 'Finance Director & Comptroller', meta: 'Finance Suite Room 106', email: 'finance@dreamacademy.edu.et' },
          { name: 'Ato Mulugeta Assefa', role: 'Director of Facilities & Campus Infrastructure', meta: 'Operations Wing Room 109', email: 'm.assefa@dreamacademy.edu.et' },
          { name: 'W/ro Senait Demissie', role: 'Academic Curriculum Coordinator', meta: 'Curriculum Office Room 111', email: 's.demissie@dreamacademy.edu.et' },
          { name: 'Ato Bereket Lemma', role: 'Quality Assurance & Accreditation Officer', meta: 'Admin Block A Room 114', email: 'b.lemma@dreamacademy.edu.et' },
          { name: 'W/t Rahel Kebede', role: 'Executive Assistant to the Principal', meta: 'Principal Office Suite', email: 'r.kebede@dreamacademy.edu.et' },
        ].map((staff, index, arr) => (
          <View key={index} style={[styles.staffRow, index === arr.length - 1 && styles.lastRow]}>
            <View style={styles.staffInfo}>
              <Text style={styles.staffName}>{staff.name}</Text>
              <Text style={styles.staffRole}>{staff.role}</Text>
              <Text style={styles.staffMeta}>{staff.meta}</Text>
            </View>
            <TouchableOpacity style={styles.contactBtn} onPress={() => handleEmailContact(staff.email)}>
              <Text style={styles.contactBtnText}>Email</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* 2. Kindergarten & Early Childhood Department (10 Members) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧸 Kindergarten & Daycare Department (10)</Text>
        
        {[
          { name: 'W/ro Hana Mulugeta', role: 'Head of Early Childhood Section', meta: 'KG Block 1', email: 'h.mulugeta@dreamacademy.edu.et' },
          { name: 'W/t Bethlehem Alemu', role: 'Senior KG Lead Teacher (LKG)', meta: 'KG Room 102', email: 'b.alemu@dreamacademy.edu.et' },
          { name: 'Ato Yared Kasahun', role: 'Daycare Specialist & Play Coordinator', meta: 'Daycare Ground Floor', email: 'y.kasahun@dreamacademy.edu.et' },
          { name: 'W/ro Tsion Haile', role: 'Upper Kindergarten (UKG) Lead Instructor', meta: 'KG Room 105', email: 't.haile@dreamacademy.edu.et' },
          { name: 'W/t Senait Abebe', role: 'Early Childhood Assistant & Arts Teacher', meta: 'KG Creative Studio', email: 's.abebe@dreamacademy.edu.et' },
          { name: 'Ato Tamirat Bekele', role: 'Kindergarten Music & Movement Instructor', meta: 'KG Activity Hall', email: 't.bekele.kg@dreamacademy.edu.et' },
          { name: 'W/ro Meron Tadesse', role: 'Nursery Section Lead Instructor', meta: 'KG Room 108', email: 'm.tadesse@dreamacademy.edu.et' },
          { name: 'W/t Etsub Worku', role: 'Early Childhood Special Needs Support', meta: 'Support Wing Room 104', email: 'e.worku@dreamacademy.edu.et' },
          { name: 'Ato Kidus Getachew', role: 'Daycare Assistant Coordinator', meta: 'Daycare Center Room 1', email: 'k.getachew@dreamacademy.edu.et' },
          { name: 'W/ro Almaz Tilahun', role: 'Kindergarten Health & Safety Supervisor', meta: 'KG Clinic Post', email: 'a.tilahun@dreamacademy.edu.et' },
        ].map((staff, index, arr) => (
          <View key={index} style={[styles.staffRow, index === arr.length - 1 && styles.lastRow]}>
            <View style={styles.staffInfo}>
              <Text style={styles.staffName}>{staff.name}</Text>
              <Text style={styles.staffRole}>{staff.role}</Text>
              <Text style={styles.staffMeta}>{staff.meta}</Text>
            </View>
            <TouchableOpacity style={styles.contactBtn} onPress={() => handleEmailContact(staff.email)}>
              <Text style={styles.contactBtnText}>Email</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* 3. Primary Section (Grades 1-4) (10 Members) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📚 Primary Section (Grades 1–4) (10)</Text>
        
        {[
          { name: 'Ato Girma Mekonnen', role: 'Primary Section Coordinator', meta: 'Primary Block 2nd Floor | Ext. 201', email: 'g.mekonnen@dreamacademy.edu.et' },
          { name: 'W/ro Mestawet Assefa', role: 'Lead Mathematics Instructor (Grades 3–4)', meta: 'Primary Block Room 204', email: 'm.assefa@dreamacademy.edu.et' },
          { name: 'W/t Rahel Worku', role: 'Languages & Social Studies Instructor (Grades 1–2)', meta: 'Primary Block Room 208', email: 'r.worku@dreamacademy.edu.et' },
          { name: 'Ato Abiy Negash', role: 'Amharic & Environmental Science Instructor', meta: 'Primary Block Room 212', email: 'a.negash@dreamacademy.edu.et' },
          { name: 'W/ro Lulit Tesfahun', role: 'Primary Physical Education & Health Lead', meta: 'Sports Pavilion Office', email: 'l.tesfahun@dreamacademy.edu.et' },
          { name: 'Ato Nahom Berhane', role: 'Grade 1 Homeroom & Literacy Lead', meta: 'Primary Block Room 201', email: 'n.berhane@dreamacademy.edu.et' },
          { name: 'W/t Betelhem Kassahun', role: 'Grade 2 Mathematics & Science Instructor', meta: 'Primary Block Room 203', email: 'b.kassahun@dreamacademy.edu.et' },
          { name: 'Ato Michael Tadesse', role: 'Grade 3 Social Studies & Moral Education', meta: 'Primary Block Room 206', email: 'm.tadesse.pr@dreamacademy.edu.et' },
          { name: 'W/ro Selam Tefera', role: 'Grade 4 English Language Instructor', meta: 'Primary Block Room 210', email: 's.tefera@dreamacademy.edu.et' },
          { name: 'Ato Ephrem Desta', role: 'Primary Arts, Craft & Music Instructor', meta: 'Primary Creative Studio', email: 'e.desta@dreamacademy.edu.et' },
        ].map((staff, index, arr) => (
          <View key={index} style={[styles.staffRow, index === arr.length - 1 && styles.lastRow]}>
            <View style={styles.staffInfo}>
              <Text style={styles.staffName}>{staff.name}</Text>
              <Text style={styles.staffRole}>{staff.role}</Text>
              <Text style={styles.staffMeta}>{staff.meta}</Text>
            </View>
            <TouchableOpacity style={styles.contactBtn} onPress={() => handleEmailContact(staff.email)}>
              <Text style={styles.contactBtnText}>Email</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* 4. Middle School Section (Grades 5-8) (10 Members) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔬 Middle School Section (Grades 5–8) (10)</Text>
        
        {[
          { name: 'Dr. Fikadu Lemma', role: 'Middle School Principal & Science Chair', meta: 'Science Building Room 302', email: 'f.lemma@dreamacademy.edu.et' },
          { name: 'W/ro Kalkidan Zewdu', role: 'General Science & Biology Instructor', meta: 'Lab Block Room 305', email: 'k.zewdu@dreamacademy.edu.et' },
          { name: 'Ato Brook Tesfaye', role: 'Geography & History Instructor', meta: 'Middle Block Room 310', email: 'b.tesfaye@dreamacademy.edu.et' },
          { name: 'W/t Mahlet Asnake', role: 'Advanced Mathematics Instructor (Grades 7–8)', meta: 'Middle Block Room 314', email: 'm.asnake@dreamacademy.edu.et' },
          { name: 'Ato Solomon Worku', role: 'English Language & Literature Instructor', meta: 'Middle Block Room 318', email: 's.worku@dreamacademy.edu.et' },
          { name: 'W/ro Tigist Hailemariam', role: 'Physics & Chemistry Intro Instructor', meta: 'Science Lab Room 308', email: 't.hailemariam@dreamacademy.edu.et' },
          { name: 'Ato Fitsum Mekonnen', role: 'Civics & Ethical Education Instructor', meta: 'Middle Block Room 320', email: 'f.mekonnen@dreamacademy.edu.et' },
          { name: 'W/t Hanna Tadesse', role: 'Information Technology & Coding Lead', meta: 'Middle Computer Lab 1', email: 'h.tadesse@dreamacademy.edu.et' },
          { name: 'Ato Daniel Kassa', role: 'Middle School Sports & Athletics Coach', meta: 'Sports Complex Office', email: 'd.kassa@dreamacademy.edu.et' },
          { name: 'W/ro Aster Mulugeta', role: 'Middle School Discipline & Welfare Officer', meta: 'Middle Block Room 301', email: 'a.mulugeta@dreamacademy.edu.et' },
        ].map((staff, index, arr) => (
          <View key={index} style={[styles.staffRow, index === arr.length - 1 && styles.lastRow]}>
            <View style={styles.staffInfo}>
              <Text style={styles.staffName}>{staff.name}</Text>
              <Text style={styles.staffRole}>{staff.role}</Text>
              <Text style={styles.staffMeta}>{staff.meta}</Text>
            </View>
            <TouchableOpacity style={styles.contactBtn} onPress={() => handleEmailContact(staff.email)}>
              <Text style={styles.contactBtnText}>Email</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* 5. High School Section (Grades 9-12) (10 Members) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎓 High School Section (Grades 9–12) (10)</Text>
        
        {[
          { name: 'Ato Henok Gebru', role: 'High School Academic Supervisor', meta: 'Upper Secondary Block | Ext. 401', email: 'h.gebru@dreamacademy.edu.et' },
          { name: 'Dr. Meron Haile', role: 'Senior Physics & Advanced Mathematics Lead', meta: 'Science Lab Wing Room 412', email: 'm.haile@dreamacademy.edu.et' },
          { name: 'W/ro Selamawit Desta', role: 'English Literature & University Prep Counselor', meta: 'Counseling Suite Room 415', email: 's.desta@dreamacademy.edu.et' },
          { name: 'Ato Daniel Berhane', role: 'ICT & Computer Science Lead Instructor', meta: 'Computer Lab 2', email: 'd.berhane@dreamacademy.edu.et' },
          { name: 'W/t Medina Jibril', role: 'Chemistry & Organic Sciences Instructor', meta: 'Chemistry Lab Wing Room 420', email: 'm.jibril@dreamacademy.edu.et' },
          { name: 'Ato Kebede Tilahun', role: 'Civics & Ethical Education Coordinator', meta: 'Upper Block Room 425', email: 'k.tilahun@dreamacademy.edu.et' },
          { name: 'W/ro Hiwot Bekele', role: 'Biology & Environmental Science Department Head', meta: 'Biology Lab Room 418', email: 'h.bekele@dreamacademy.edu.et' },
          { name: 'Ato Samuel Alemu', role: 'History & Economics Instructor', meta: 'Upper Block Room 422', email: 's.alemu@dreamacademy.edu.et' },
          { name: 'W/t Rahwa Mengistu', role: 'Geography & Regional Studies Instructor', meta: 'Upper Block Room 426', email: 'r.mengistu@dreamacademy.edu.et' },
          { name: 'Ato Tekle Michael', role: 'Technical Drawing & Applied Design Lead', meta: 'Design Workshop Room 430', email: 't.michael@dreamacademy.edu.et' },
        ].map((staff, index, arr) => (
          <View key={index} style={[styles.staffRow, index === arr.length - 1 && styles.lastRow]}>
            <View style={styles.staffInfo}>
              <Text style={styles.staffName}>{staff.name}</Text>
              <Text style={styles.staffRole}>{staff.role}</Text>
              <Text style={styles.staffMeta}>{staff.meta}</Text>
            </View>
            <TouchableOpacity style={styles.contactBtn} onPress={() => handleEmailContact(staff.email)}>
              <Text style={styles.contactBtnText}>Email</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* 6. Counseling & Student Support Services (10 Members) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🛡️ Counseling & Student Support Services (10)</Text>
        
        {[
          { name: 'W/t Etsub Demissie', role: 'Lead Student Guidance & Mental Health Counselor', meta: 'Support Office Room 110', email: 'e.demissie@dreamacademy.edu.et' },
          { name: 'Nurse Aster Kebede', role: 'Campus Head Nurse', meta: 'Clinic Building Ground Floor', email: 'clinic@dreamacademy.edu.et' },
          { name: 'Ato Getachew Lemma', role: 'Head Librarian & Media Center Specialist', meta: 'Main Campus Library', email: 'library@dreamacademy.edu.et' },
          { name: 'W/ro Bethlehem Fikru', role: 'IT Helpdesk & Student Portal Administrator', meta: 'ICT Support Center Room 115', email: 'ithelp@dreamacademy.edu.et' },
          { name: 'Ato Tesfaye Bekele', role: 'Campus Security & Transport Coordinator', meta: 'Security Gate Lodge 1', email: 'security@dreamacademy.edu.et' },
          { name: 'W/t Yordanos Assefa', role: 'Junior Student Guidance Counselor', meta: 'Support Office Room 112', email: 'y.assefa@dreamacademy.edu.et' },
          { name: 'Nurse Dawit Mekonnen', role: 'Assistant Campus Nurse & First Aid Lead', meta: 'Clinic Building Room 2', email: 'nurse.dawit@dreamacademy.edu.et' },
          { name: 'Ato Binyam Tadesse', role: 'Assistant Librarian & Digital Archives Specialist', meta: 'Main Library Digital Wing', email: 'b.tadesse@dreamacademy.edu.et' },
          { name: 'W/ro Tigist Worku', role: 'Cafeteria & Nutritional Services Supervisor', meta: 'Main Dining Hall Office', email: 'cafeteria@dreamacademy.edu.et' },
          { name: 'Ato Fikru Kassahun', role: 'Maintenance & Laboratory Equipment Technician', meta: 'Technical Workshop Room 3', email: 'maintenance@dreamacademy.edu.et' },
        ].map((staff, index, arr) => (
          <View key={index} style={[styles.staffRow, index === arr.length - 1 && styles.lastRow]}>
            <View style={styles.staffInfo}>
              <Text style={styles.staffName}>{staff.name}</Text>
              <Text style={styles.staffRole}>{staff.role}</Text>
              <Text style={styles.staffMeta}>{staff.meta}</Text>
            </View>
            <TouchableOpacity style={styles.contactBtn} onPress={() => handleEmailContact(staff.email)}>
              <Text style={styles.contactBtnText}>Email</Text>
            </TouchableOpacity>
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
  
  card: { backgroundColor: '#ffffff', borderRadius: 14, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: colors.primaryDark, marginBottom: 12 },

  staffRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  lastRow: { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 },
  staffInfo: { flex: 1, marginRight: 12 },
  staffName: { fontSize: 13.5, fontWeight: '800', color: colors.primaryDark, marginBottom: 2 },
  staffRole: { fontSize: 12, fontWeight: '700', color: '#0369a1', marginBottom: 2 },
  staffMeta: { fontSize: 11, color: '#64748b' },

  contactBtn: { backgroundColor: '#f1f5f9', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1' },
  contactBtnText: { fontSize: 11, fontWeight: '800', color: colors.primaryDark },
});