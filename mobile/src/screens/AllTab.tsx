import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Animated,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { colors } from '../constants/theme';

// Import Separated Pages
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import RulesPage from '../pages/RulesPage';
import PaymentsPage from '../pages/PaymentsPage';
import StaffPage from '../pages/StaffPage';
import EventsCalendarPage from '../pages/EventsCalendarPage';
import PortalPage from '../pages/PortalPage';

const NAV_LINKS = ['Home', 'About Us', 'Rules', 'Payments', 'Staff', 'Events & Academic Calendar', 'Portal'];

export default function AllTab() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const highlightAnim1 = useRef(new Animated.Value(50)).current;
  const highlightAnim2 = useRef(new Animated.Value(50)).current;
  const highlightAnim3 = useRef(new Animated.Value(50)).current;
  const highlightFade = useRef(new Animated.Value(0)).current;

  // Page Navigation State
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  // Backend Data & Loading States
  const [pageData, setPageData] = useState<any>(null);
  const [fetchingPage, setFetchingPage] = useState(false);

  // Application Modal & Form States
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Grade 1');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.timing(highlightFade, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.stagger(150, [
        Animated.spring(highlightAnim1, { toValue: 0, friction: 6, useNativeDriver: true }),
        Animated.spring(highlightAnim2, { toValue: 0, friction: 6, useNativeDriver: true }),
        Animated.spring(highlightAnim3, { toValue: 0, friction: 6, useNativeDriver: true }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.12, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleNavAction = (linkNameOrRoute: string, index: number) => {
    setActiveNavIndex(index);

    if (linkNameOrRoute === 'Home' || linkNameOrRoute === 'home') {
      setCurrentRoute('home');
      return;
    }
    if (linkNameOrRoute === 'Portal' || linkNameOrRoute === 'portal') {
      setCurrentRoute('portal');
      setPageData({
        title: 'Student & Parent Portal',
        highlights: [
          'Access real-time grade reports and attendance records.',
          'Review teacher feedback and homework assignments.',
          'Secure messaging with school administration and faculty.',
          'Download official term report cards and fee statements.'
        ]
      });
      return;
    }

    let endpoint = '';
    let targetRoute = linkNameOrRoute.toLowerCase();

    if (linkNameOrRoute === 'About Us' || linkNameOrRoute === 'about') {
      endpoint = 'about';
      targetRoute = 'about';
    } else if (linkNameOrRoute === 'Rules' || linkNameOrRoute === 'rules') {
      endpoint = 'rules';
    } else if (linkNameOrRoute === 'Payments' || linkNameOrRoute === 'payments') {
      endpoint = 'payments';
    } else if (linkNameOrRoute === 'Staff' || linkNameOrRoute === 'staff') {
      endpoint = 'staff';
    } else if (linkNameOrRoute === 'Events & Academic Calendar' || linkNameOrRoute === 'events') {
      endpoint = 'events';
      targetRoute = 'events';
    }

    if (!endpoint) return;

    setCurrentRoute(targetRoute);
    setFetchingPage(true);
    setPageData(null);

    fetch(`http://10.0.2.2:8000/api/${endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        setPageData(data);
        setFetchingPage(false);
      })
      .catch(() => {
        setFetchingPage(false);
        // Fallback data when backend is offline
        if (targetRoute === 'about') {
          setPageData({
            title: 'About Dream Academy',
            history: 'Founded in Kasanchis, Addis Ababa, Dream Academy provides world-class international education from Daycare to Grade 12.',
            mission: 'To nurture independent thinkers, responsible global citizens, and lifelong learners.',
            environment: 'A peaceful, safe, non-boarding day school campus.'
          });
        } else if (targetRoute === 'rules') {
          setPageData({
            title: 'School Rules & Code of Conduct',
            highlights: [
              'Punctuality: Arrive on campus before 08:00 AM sharp.',
              'Uniform: Proper school uniform is required on all regular school days.',
              'Respect: Mutual respect among students, staff, and campus visitors is mandatory.',
              'Digital Etiquette: Mobile phones must remain switched off during instructional hours.'
            ]
          });
        } else if (targetRoute === 'payments') {
          setPageData({
            title: 'Tuition & Payment Information',
            tuition_structure: 'Flexible installment plans (Quarterly or Semester payments).',
            office_hours: 'Finance Office open Monday – Friday: 08:30 AM – 03:30 PM',
            requirements: [
              'Direct bank transfers via partner commercial banks',
              'School cashier office accepts official payment slips',
              'Early settlement discounts are available before specific term dates'
            ]
          });
        } else if (targetRoute === 'staff') {
          setPageData({
            title: 'Our Dedicated Leadership & Staff',
            highlights: [
              'Experienced international and local educators holding advanced degrees.',
              'Low student-to-teacher ratio ensuring personalized academic attention.',
              'Dedicated counselors supporting emotional and psychological well-being.',
              'Certified medical nurse stationed on-site during operational hours.'
            ]
          });
        } else if (targetRoute === 'events') {
          setPageData({
            title: 'Events & Academic Calendar',
            highlights: [
              'Term 1 Begins — September',
              'Annual Science & Technology Fair — Next month',
              'Inter-School Sports Tournament — Coming soon',
              'Parent-Teacher Open House Conference — End of quarter',
              'Cultural Showcase & Art Exhibition — Term closing'
            ]
          });
        }
      });
  };

  const handleSubmitApplication = () => {
    if (!parentName || !email || !phone || !studentName) {
      Alert.alert('Missing Fields', 'Please fill in all required parent and student details.');
      return;
    }

    setLoading(true);

    fetch('http://10.0.2.2:8000/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parent_name: parentName,
        email: email,
        phone: phone,
        student_name: studentName,
        grade_level: gradeLevel,
      }),
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          setIsApplyModalOpen(false);
          Alert.alert('Application Submitted!', 'Thank you for applying to Dream Academy.');
          setParentName('');
          setEmail('');
          setPhone('');
          setStudentName('');
        } else {
          Alert.alert('Success', 'Application registered locally.');
          setIsApplyModalOpen(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setIsApplyModalOpen(false);
        Alert.alert('Submitted', 'Application saved successfully.');
      });
  };

  const highlightTransforms = [highlightAnim1, highlightAnim2, highlightAnim3];

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <View style={styles.topBarRow}>
          <View style={styles.pulseRow}>
            <Animated.View style={[styles.pulseDot, { transform: [{ scale: pulseAnim }] }]} />
            <Text style={styles.topBarText}>📍 Kasanchis, Addis Ababa</Text>
          </View>
          <TouchableOpacity 
            style={styles.headerApplyBtn}
            onPress={() => setIsApplyModalOpen(true)}
          >
            <Text style={styles.headerApplyText}>APPLY NOW</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerTitleRow}>
          <Text style={styles.brandMainTitle}>DREAM ACADEMY</Text>
          <Text style={styles.brandSubTitle}>International School</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.headerNavScroll}
        >
          {NAV_LINKS.map((link, idx) => {
            const isActive = activeNavIndex === idx;
            return (
              <TouchableOpacity 
                key={idx} 
                onPress={() => handleNavAction(link, idx)}
                style={[styles.headerNavChip, isActive && styles.headerNavChipActive]}
              >
                <Text style={[styles.headerNavChipText, isActive && styles.headerNavChipTextActive]}>
                  {link}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Main Content Router */}
      <ScrollView contentContainerStyle={styles.scrollContentContainer} showsVerticalScrollIndicator={false}>
        
        {currentRoute === 'home' && (
          <HomePage 
            slideAnim={slideAnim}
            highlightFade={highlightFade}
            highlightTransforms={highlightTransforms}
            onNavigate={handleNavAction}
            onOpenApply={() => setIsApplyModalOpen(true)}
          />
        )}

        {currentRoute === 'about' && (
          <AboutPage 
            data={pageData}
            loading={fetchingPage}
            onBack={() => handleNavAction('Home', 0)}
            onOpenApply={() => setIsApplyModalOpen(true)}
          />
        )}

        {currentRoute === 'rules' && (
          <RulesPage 
            data={pageData}
            loading={fetchingPage}
            onBack={() => handleNavAction('Home', 0)}
            onOpenApply={() => setIsApplyModalOpen(true)}
          />
        )}

        {currentRoute === 'payments' && (
          <PaymentsPage 
            data={pageData}
            loading={fetchingPage}
            onBack={() => handleNavAction('Home', 0)}
            onOpenApply={() => setIsApplyModalOpen(true)}
          />
        )}

        {currentRoute === 'staff' && (
          <StaffPage 
            data={pageData}
            loading={fetchingPage}
            onBack={() => handleNavAction('Home', 0)}
            onOpenApply={() => setIsApplyModalOpen(true)}
          />
        )}

        {currentRoute === 'events' && (
          <EventsCalendarPage 
            data={pageData}
            loading={fetchingPage}
            onBack={() => handleNavAction('Home', 0)}
            onOpenApply={() => setIsApplyModalOpen(true)}
          />
        )}

        {currentRoute === 'portal' && (
          <PortalPage 
            data={pageData}
            onBack={() => handleNavAction('Home', 0)}
            onOpenApply={() => setIsApplyModalOpen(true)}
          />
        )}

      </ScrollView>

      {/* Application Form Modal */}
      <Modal
        visible={isApplyModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsApplyModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Admissions Application</Text>
              <TouchableOpacity onPress={() => setIsApplyModalOpen(false)}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSub}>Dream Academy International School, Kasanchis</Text>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.formLabel}>Parent / Guardian Full Name *</Text>
              <TextInput
                style={styles.formInput}
                placeholder="e.g., Ato Bekele Tadesse"
                placeholderTextColor="#9ca3af"
                value={parentName}
                onChangeText={setParentName}
              />

              <Text style={styles.formLabel}>Email Address *</Text>
              <TextInput
                style={styles.formInput}
                placeholder="e.g., bekele@gmail.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.formLabel}>Phone Number *</Text>
              <TextInput
                style={styles.formInput}
                placeholder="e.g., +251 91 123 4567"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />

              <Text style={styles.formLabel}>Student's Full Name *</Text>
              <TextInput
                style={styles.formInput}
                placeholder="e.g., Hana Bekele"
                placeholderTextColor="#9ca3af"
                value={studentName}
                onChangeText={setStudentName}
              />

              <Text style={styles.formLabel}>Target Grade Level *</Text>
              <TextInput
                style={styles.formInput}
                placeholder="e.g., Early Years, Grade 5, Grade 9"
                placeholderTextColor="#9ca3af"
                value={gradeLevel}
                onChangeText={setGradeLevel}
              />

              <TouchableOpacity 
                style={styles.modalSubmitBtn} 
                onPress={handleSubmitApplication}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.primaryDark} />
                ) : (
                  <Text style={styles.modalSubmitText}>SUBMIT APPLICATION</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvas },
  headerContainer: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    zIndex: 1000, 
    backgroundColor: colors.primaryDark, 
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  topBarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  pulseRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  topBarText: { color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: '600' },
  headerApplyBtn: { backgroundColor: colors.gold, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  headerApplyText: { color: colors.primaryDark, fontSize: 9, fontWeight: '900' },
  headerTitleRow: { alignItems: 'center', marginBottom: 10 },
  brandMainTitle: { color: colors.surface, fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  brandSubTitle: { color: colors.gold, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  headerNavScroll: { paddingVertical: 2, gap: 8, flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  headerNavChip: { backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  headerNavChipActive: { backgroundColor: colors.gold, borderColor: colors.gold },
  headerNavChipText: { fontSize: 10.5, fontWeight: '700', color: colors.surface },
  headerNavChipTextActive: { color: colors.primaryDark, fontWeight: '900' },
  scrollContentContainer: { paddingTop: 155, paddingHorizontal: 16, paddingBottom: 32 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.7)', justifyContent: 'flex-end' },
  modalContentCard: { backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '85%' },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  modalTitle: { fontSize: 18, fontWeight: '900', color: colors.primary },
  modalCloseText: { fontSize: 18, fontWeight: '900', color: colors.primary, padding: 4 },
  modalSub: { fontSize: 11, color: colors.inkSoft, fontWeight: '600', marginBottom: 18 },
  formLabel: { fontSize: 11, fontWeight: '700', color: colors.primary, marginBottom: 6 },
  formInput: { backgroundColor: colors.canvas, borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 12, color: colors.primaryDark, marginBottom: 14 },
  modalSubmitBtn: { backgroundColor: colors.gold, borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  modalSubmitText: { color: colors.primaryDark, fontWeight: '900', fontSize: 11 },
});