import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, TextInput, Linking, ActivityIndicator, Alert, Platform } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../constants/theme';

// ============================================================================
// DYNAMIC API ROUTER (No Hardcoded IPs)
// ============================================================================
const getBackendUrl = () => {
  if (!__DEV__) return 'https://api.dreamacademy.edu.et';
  if (Platform.OS === 'web') return 'http://127.0.0.1:8000';
  const debuggerHost = Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    const ip = debuggerHost.split(':')[0];
    return `http://${ip}:8000`;
  }
  return Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://127.0.0.1:8000';
};

const BACKEND_URL = getBackendUrl();

const SecureTokenManager = {
  async getToken(): Promise<string | null> { return null; },
  async setToken(token: string): Promise<void> {},
  async clearToken(): Promise<void> {}
};

export default function PortalPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [portalId, setPortalId] = useState('');
  const [pin, setPin] = useState('');
  const [parentNameInput, setParentNameInput] = useState('');
  const [studentNameInput, setStudentNameInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'grades' | 'attendance' | 'fees' | 'messages'>('grades');
  const [portalData, setPortalData] = useState<any>(null);

  useEffect(() => {
    checkExistingSession();
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  const checkExistingSession = async () => {
    try {
      const token = await SecureTokenManager.getToken();
      if (token) setIsAuthenticated(true);
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleLogin = async () => {
    setLoginError('');
    if (!portalId.trim() || !pin.trim() || !parentNameInput.trim() || !studentNameInput.trim()) {
      setLoginError('Please fill in all required fields.');
      return;
    }

    if (pin.length < 4) {
      setLoginError('Invalid PIN format. Must be at least 4 digits.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          portalId: portalId,
          pin: pin,
          parentName: parentNameInput,
          studentName: studentNameInput
        })
      });

      const result = await response.json();

      if (response.ok) {
        await SecureTokenManager.setToken(result.token);
        setPortalData(result.studentData);
        setIsAuthenticated(true);
      } else {
        setLoginError(result.detail || 'Authentication failed.');
      }
    } catch (err) {
      console.error('API Error:', err);
      setLoginError(`Network error. Could not connect to server at ${BACKEND_URL}. Ensure your Python server is running.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to end your secure portal session?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Sign Out', style: 'destructive', 
        onPress: async () => {
          await SecureTokenManager.clearToken();
          setIsAuthenticated(false);
          setPortalId(''); setPin(''); setParentNameInput(''); setStudentNameInput(''); setPortalData(null);
        }
      }
    ]);
  };

  const handlePortalHelp = () => Linking.openURL('mailto:ithelp@dreamacademy.edu.et');

  if (isInitializing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primaryDark} />
        <Text style={styles.loaderText}>Verifying secure credentials...</Text>
      </View>
    );
  }

  // ============================================================================
  // LOGIN SCREEN
  // ============================================================================
  if (!isAuthenticated) {
    return (
      <ScrollView contentContainerStyle={styles.loginScrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.loginCard}>
          <View style={styles.headerBadge}><Text style={styles.headerBadgeText}>🔒 256-BIT SECURED PORTAL</Text></View>
          <Text style={styles.title}>Dream Academy Portal</Text>
          <Text style={styles.subtitle}>Enter your secure credentials and details to access confidential academic records</Text>

          {loginError ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️️ {loginError}</Text>
            </View>
          ) : null}

          <Text style={styles.inputLabel}>Parent / Guardian Full Name</Text>
          <TextInput style={styles.textInput} value={parentNameInput} onChangeText={setParentNameInput} placeholder="e.g., Kebede Tadesse" placeholderTextColor="#94a3b8" autoCapitalize="words" />

          <Text style={styles.inputLabel}>Student Full Name</Text>
          <TextInput style={styles.textInput} value={studentNameInput} onChangeText={setStudentNameInput} placeholder="e.g., Elias Kebede" placeholderTextColor="#94a3b8" autoCapitalize="words" />

          <Text style={styles.inputLabel}>Portal ID / Student Reg Number</Text>
          <TextInput style={styles.textInput} value={portalId} onChangeText={setPortalId} placeholder="e.g., DA-2026-8942" placeholderTextColor="#94a3b8" autoCapitalize="characters" autoCorrect={false} />

          <Text style={styles.inputLabel}>Access PIN / Password</Text>
          <View style={styles.passwordInputWrap}>
            <TextInput style={[styles.textInput, { flex: 1, marginBottom: 0, borderWidth: 0 }]} value={pin} onChangeText={setPin} secureTextEntry={!showPin} placeholder="Enter secure PIN" placeholderTextColor="#94a3b8" keyboardType="number-pad" maxLength={6} />
            <TouchableOpacity onPress={() => setShowPin(!showPin)} style={styles.eyeBtn}><Text style={styles.eyeText}>{showPin ? 'Hide' : 'Show'}</Text></TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} onPress={handleLogin} disabled={isLoading} activeOpacity={0.85}>
            {isLoading ? <ActivityIndicator color="#ffffff" size="small" /> : <Text style={styles.loginButtonText}>🔐 Authenticate Secure Session</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePortalHelp} style={styles.helpLinkWrap}>
            <Text style={styles.helpLinkText}>Forgot PIN or need credentials? Contact IT Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // ============================================================================
  // DASHBOARD SCREEN
  // ============================================================================
  return (
    <Animated.ScrollView contentContainerStyle={styles.container} style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }} showsVerticalScrollIndicator={false}>
      <View style={styles.topBar}>
        <View style={styles.headerBadgeSecure}><Text style={styles.headerBadgeSecureText}>🛡️ ENCRYPTED SESSION ACTIVE</Text></View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}><Text style={styles.logoutText}>Sign Out</Text></TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome, {portalData?.parentName}</Text>
      <Text style={styles.subtitle}>Student: {portalData?.studentName} • {portalData?.gradeLevel}</Text>

      {/* Summary Stat Cards */}
      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}><Text style={styles.summaryLabel}>Term GPA</Text><Text style={styles.summaryVal}>{portalData?.termGpa}</Text><Text style={styles.summarySub}>Verified Record</Text></View>
        <View style={styles.summaryCard}><Text style={styles.summaryLabel}>Attendance</Text><Text style={[styles.summaryVal, { color: '#166534' }]}>{portalData?.attendanceRate}</Text><Text style={styles.summarySub}>Verified Log</Text></View>
        <View style={styles.summaryCard}><Text style={styles.summaryLabel}>Fee Status</Text><Text style={[styles.summaryVal, { color: '#0369a1' }]}>{portalData?.feeStatus}</Text><Text style={styles.summarySub}>Finance Cleared</Text></View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity style={[styles.tabBtn, activeTab === 'grades' && styles.tabBtnActive]} onPress={() => setActiveTab('grades')}><Text style={[styles.tabText, activeTab === 'grades' && styles.tabTextActive]}>📊 Grades</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tabBtn, activeTab === 'attendance' && styles.tabBtnActive]} onPress={() => setActiveTab('attendance')}><Text style={[styles.tabText, activeTab === 'attendance' && styles.tabTextActive]}>📅 Attendance</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tabBtn, activeTab === 'fees' && styles.tabBtnActive]} onPress={() => setActiveTab('fees')}><Text style={[styles.tabText, activeTab === 'fees' && styles.tabTextActive]}>💳 Fees</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.tabBtn, activeTab === 'messages' && styles.tabBtnActive]} onPress={() => setActiveTab('messages')}><Text style={[styles.tabText, activeTab === 'messages' && styles.tabTextActive]}>💬 Messages</Text></TouchableOpacity>
      </View>

      {activeTab === 'grades' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 Official Term 1 Transcript</Text>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeadText, { flex: 2 }]}>Subject</Text>
            <Text style={[styles.tableHeadText, { flex: 1, textAlign: 'center' }]}>Mid-Term</Text>
            <Text style={[styles.tableHeadText, { flex: 1, textAlign: 'center' }]}>Quiz / Test</Text>
            <Text style={[styles.tableHeadText, { flex: 1, textAlign: 'right' }]}>Letter</Text>
          </View>
          {portalData?.grades.map((item: any, index: number) => (
            <View key={index} style={[styles.tableRow, index === portalData.grades.length - 1 && styles.lastRow]}>
              <Text style={[styles.tableCellBold, { flex: 2 }]}>{item.subject}</Text>
              <Text style={[styles.tableCellVal, { flex: 1, textAlign: 'center' }]}>{item.mid}</Text>
              <Text style={[styles.tableCellVal, { flex: 1, textAlign: 'center' }]}>{item.quiz}</Text>
              <Text style={[styles.tableCellGrade, { flex: 1, textAlign: 'right' }]}>{item.grade}</Text>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'attendance' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🕒 Verified Attendance & Gate Logs</Text>
          {portalData?.attendance.map((att: any, index: number) => (
            <View key={index} style={[styles.recordRow, index === portalData.attendance.length - 1 && styles.lastRow]}>
              <View><Text style={styles.recordDate}>{att.date}</Text><Text style={styles.recordSub}>Check-in: {att.time}</Text></View>
              <View><Text style={[styles.statusBadge, att.status.includes('Excused') ? styles.badgeYellow : styles.badgeGreen]}>{att.status}</Text></View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'fees' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💳 Tuition & Financial Clearance</Text>
          {portalData?.fees.map((fee: any, index: number) => (
            <View key={index} style={[styles.feeReceiptBox, fee.color_theme === 'yellow' ? { backgroundColor: '#f8fafc', borderColor: '#cbd5e1' } : {}]}>
              <View style={styles.feeTopRow}>
                <Text style={[styles.receiptTitle, fee.color_theme === 'yellow' ? { color: colors.primaryDark } : {}]}>{fee.title}</Text>
                <Text style={[styles.receiptStatus, fee.color_theme === 'yellow' ? { backgroundColor: '#fef3c7', color: '#b45309' } : {}]}>{fee.status}</Text>
              </View>
              {fee.details.map((detail: string, idx: number) => <Text key={idx} style={styles.feeDetail}>{detail}</Text>)}
            </View>
          ))}
        </View>
      )}

      {activeTab === 'messages' && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💬 Confidential Communications</Text>
          {portalData?.messages.map((msgItem: any, index: number) => (
            <View key={index} style={[styles.msgBox, index === portalData.messages.length - 1 && styles.lastRow]}>
              <View style={styles.msgHeader}><Text style={styles.msgSender}>{msgItem.sender}</Text><Text style={styles.msgDate}>{msgItem.date}</Text></View>
              <Text style={styles.msgBody}>{msgItem.msg}</Text>
            </View>
          ))}
        </View>
      )}
    </Animated.ScrollView>
  );
}

// STYLES
const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.canvas },
  loaderText: { marginTop: 12, fontSize: 13, fontWeight: '800', color: colors.primaryDark },
  container: { padding: 16, paddingBottom: 50, backgroundColor: colors.canvas },
  loginScrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: colors.canvas },
  loginCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  headerBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(15, 23, 42, 0.08)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginBottom: 8 },
  headerBadgeText: { fontSize: 10, fontWeight: '800', color: colors.primaryDark, letterSpacing: 0.8 },
  headerBadgeSecure: { alignSelf: 'flex-start', backgroundColor: '#f0fdf4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#bbf7d0', marginBottom: 8 },
  headerBadgeSecureText: { fontSize: 10, fontWeight: '800', color: '#166534', letterSpacing: 0.8 },
  title: { fontSize: 24, fontWeight: '900', color: colors.primaryDark, marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#64748b', marginBottom: 16, fontWeight: '600' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  logoutBtn: { backgroundColor: '#fee2e2', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  logoutText: { fontSize: 11, fontWeight: '800', color: '#991b1b' },
  errorBox: { backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fecaca', borderRadius: 8, padding: 10, marginBottom: 12 },
  errorText: { fontSize: 11.5, color: '#991b1b', fontWeight: '800', lineHeight: 16 },
  inputLabel: { fontSize: 11.5, fontWeight: '800', color: colors.primaryDark, marginBottom: 6, marginTop: 12 },
  textInput: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 13, color: colors.primaryDark, marginBottom: 4 },
  passwordInputWrap: { flexDirection: 'row', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, alignItems: 'center', paddingRight: 10 },
  eyeBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  eyeText: { fontSize: 11.5, fontWeight: '800', color: '#0369a1' },
  loginButton: { backgroundColor: colors.primaryDark, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  loginButtonDisabled: { opacity: 0.7 },
  loginButtonText: { color: '#ffffff', fontSize: 13, fontWeight: '900', letterSpacing: 0.5 },
  helpLinkWrap: { alignItems: 'center', marginTop: 14 },
  helpLinkText: { fontSize: 11.5, color: '#0369a1', fontWeight: '800' },
  summaryGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  summaryCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 12, padding: 12, marginHorizontal: 4, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  summaryLabel: { fontSize: 10.5, fontWeight: '800', color: '#64748b', marginBottom: 4 },
  summaryVal: { fontSize: 15, fontWeight: '900', color: colors.primaryDark, marginBottom: 2 },
  summarySub: { fontSize: 9.5, color: '#64748b', fontWeight: '600' },
  tabsRow: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 10, padding: 4, marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  tabBtnActive: { backgroundColor: colors.primaryDark },
  tabText: { fontSize: 11, fontWeight: '800', color: '#475569' },
  tabTextActive: { color: '#ffffff' },
  card: { backgroundColor: '#ffffff', borderRadius: 14, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: colors.primaryDark, marginBottom: 6 },
  tableIntro: { fontSize: 11.5, color: '#64748b', marginBottom: 12, lineHeight: 16 },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#f1f5f9', paddingVertical: 8, paddingHorizontal: 8, borderRadius: 6, marginBottom: 6 },
  tableHeadText: { fontSize: 11, fontWeight: '900', color: colors.primaryDark },
  tableRow: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
  lastRow: { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 },
  tableCellBold: { fontSize: 12, fontWeight: '800', color: colors.primaryDark },
  tableCellVal: { fontSize: 12, fontWeight: '800', color: '#0369a1' },
  tableCellGrade: { fontSize: 12, fontWeight: '900', color: '#166534' },
  recordRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  recordDate: { fontSize: 12, fontWeight: '800', color: colors.primaryDark },
  recordSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
  statusBadge: { fontSize: 10.5, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeGreen: { backgroundColor: '#dcfce7', color: '#166534' },
  badgeYellow: { backgroundColor: '#fef3c7', color: '#b45309' },
  feeReceiptBox: { backgroundColor: '#f0fdf4', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#bbf7d0', marginBottom: 10 },
  feeTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  receiptTitle: { fontSize: 13, fontWeight: '900', color: '#166534' },
  receiptStatus: { fontSize: 10, fontWeight: '900', backgroundColor: '#dcfce7', color: '#166534', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  feeDetail: { fontSize: 11.5, color: '#334155', lineHeight: 17, marginTop: 2 },
  msgBox: { backgroundColor: '#f8fafc', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 10 },
  msgHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  msgSender: { fontSize: 12, fontWeight: '900', color: colors.primaryDark },
  msgDate: { fontSize: 10, color: '#64748b', fontWeight: '600' },
  msgBody: { fontSize: 11.5, color: '#334155', lineHeight: 17 },
});