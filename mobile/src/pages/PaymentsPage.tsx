import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Image, TouchableOpacity, Linking } from 'react-native';
import { colors } from '../constants/theme';

export default function PaymentsPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleFinanceEmail = () => {
    Linking.openURL('mailto:finance@dreamacademy.edu.et');
  };

  const handleCallCashier = () => {
    Linking.openURL('tel:+251115500111');
  };

  return (
    <Animated.ScrollView 
      contentContainerStyle={styles.container} 
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerBadge}>
        <Text style={styles.headerBadgeText}>FINANCIAL SERVICES & FEE STRUCTURE</Text>
      </View>
      <Text style={styles.title}>Tuition & Payments</Text>
      <Text style={styles.subtitle}>Detailed Grade-by-Grade Tuition Rates, Bank Accounts, and Payment Schedules</Text>

      {/* One-Sided Asymmetric Banner Header */}
      <View style={styles.asymmetricBanner}>
        <View style={styles.bannerTextSide}>
          <Text style={styles.bannerTag}>KASANCHIS CAMPUS</Text>
          <Text style={styles.bannerMainTitle}>Structured & Transparent Fees</Text>
          <Text style={styles.bannerSubText}>Committed to accessible quality education from daycare through Grade 12.</Text>
        </View>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.bannerImageSide} 
        />
      </View>

      {/* Early Settlement Incentive Banner */}
      <View style={styles.bannerBox}>
        <Text style={styles.bannerTitle}>💡 Annual Settlement Incentive</Text>
        <Text style={styles.bannerText}>
          Families who settle the full academic year tuition prior to Term 1 commencement are eligible for an exclusive administrative courtesy discount. Contact the finance desk for details.
        </Text>
      </View>

      {/* Section 1: Grade-by-Grade Tuition Table per Term */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Tuition Fees per Grade (Per Term)</Text>
        <Text style={styles.tableIntro}>Dream Academy operates on a 3-term academic calendar. Fees vary by developmental stage:</Text>
        
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeadText, { flex: 2 }]}>Grade Level</Text>
          <Text style={[styles.tableHeadText, { flex: 1.5, textAlign: 'right' }]}>Per Term (ETB)</Text>
          <Text style={[styles.tableHeadText, { flex: 1.5, textAlign: 'right' }]}>Annual Total</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCellBold, { flex: 2 }]}>Daycare & Kindergarten</Text>
          <Text style={[styles.tableCellVal, { flex: 1.5, textAlign: 'right' }]}>12,500 ETB</Text>
          <Text style={[styles.tableCellAnnual, { flex: 1.5, textAlign: 'right' }]}>37,500 ETB</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCellBold, { flex: 2 }]}>Primary (Grades 1–4)</Text>
          <Text style={[styles.tableCellVal, { flex: 1.5, textAlign: 'right' }]}>15,000 ETB</Text>
          <Text style={[styles.tableCellAnnual, { flex: 1.5, textAlign: 'right' }]}>45,000 ETB</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCellBold, { flex: 2 }]}>Middle School (Grades 5–8)</Text>
          <Text style={[styles.tableCellVal, { flex: 1.5, textAlign: 'right' }]}>18,500 ETB</Text>
          <Text style={[styles.tableCellAnnual, { flex: 1.5, textAlign: 'right' }]}>55,500 ETB</Text>
        </View>

        <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
          <Text style={[styles.tableCellBold, { flex: 2 }]}>High School (Grades 9–12)</Text>
          <Text style={[styles.tableCellVal, { flex: 1.5, textAlign: 'right' }]}>22,000 ETB</Text>
          <Text style={[styles.tableCellAnnual, { flex: 1.5, textAlign: 'right' }]}>66,000 ETB</Text>
        </View>
      </View>

      {/* Section 2: Official School Bank & Mobile Accounts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💳 Official School Payment Accounts</Text>
        <Text style={styles.tableIntro}>Please use the following verified corporate accounts for tuition and fee transfers:</Text>
        
        <View style={styles.accountBox}>
          <View style={styles.accountHeaderRow}>
            <Text style={styles.bankName}>Commercial Bank of Ethiopia (CBE)</Text>
            <Text style={styles.accountBadge}>Primary</Text>
          </View>
          <Text style={styles.accountDetail}><Text style={styles.bold}>Account Name:</Text> Dream Academy PLC</Text>
          <Text style={styles.accountDetail}><Text style={styles.bold}>Account Number:</Text> 1000584920381</Text>
          <Text style={styles.accountDetail}><Text style={styles.bold}>Branch:</Text> Kasanchis Branch, Addis Ababa</Text>
        </View>

        <View style={styles.accountBox}>
          <View style={styles.accountHeaderRow}>
            <Text style={styles.bankName}>Awash Bank S.C.</Text>
            <Text style={[styles.accountBadge, { backgroundColor: '#fef3c7', color: '#b45309' }]}>Secondary</Text>
          </View>
          <Text style={styles.accountDetail}><Text style={styles.bold}>Account Name:</Text> Dream Academy PLC</Text>
          <Text style={styles.accountDetail}><Text style={styles.bold}>Account Number:</Text> 01325894102900</Text>
          <Text style={styles.accountDetail}><Text style={styles.bold}>Branch:</Text> Olympia Branch</Text>
        </View>

        <View style={[styles.accountBox, { marginBottom: 0 }]}>
          <View style={styles.accountHeaderRow}>
            <Text style={styles.bankName}>Telebirr Merchant Code</Text>
            <Text style={[styles.accountBadge, { backgroundColor: '#e0f2fe', color: '#0369a1' }]}>Digital</Text>
          </View>
          <Text style={styles.accountDetail}><Text style={styles.bold}>Merchant Name:</Text> Dream Academy Official</Text>
          <Text style={styles.accountDetail}><Text style={styles.bold}>Shortcode / Merchant ID:</Text> *127# followed by Code 889231</Text>
          <Text style={styles.accountDetail}><Text style={styles.bold}>Note:</Text> Always include student full name and ID in transaction remarks.</Text>
        </View>
      </View>

      {/* Section 3: Term Installment Schedule */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Installment Payment Deadlines</Text>
        
        <View style={styles.rowItem}>
          <View style={styles.rowLabelWrap}>
            <Text style={styles.rowKey}>Term 1 Payment</Text>
            <Text style={styles.rowSub}>Includes registration & material fees</Text>
          </View>
          <Text style={styles.rowVal}>Due before Aug 30</Text>
        </View>

        <View style={styles.rowItem}>
          <View style={styles.rowLabelWrap}>
            <Text style={styles.rowKey}>Term 2 Payment</Text>
            <Text style={styles.rowSub}>Mid-year instructional installment</Text>
          </View>
          <Text style={styles.rowVal}>Due before Dec 15</Text>
        </View>

        <View style={[styles.rowItem, { borderBottomWidth: 0 }]}>
          <View style={styles.rowLabelWrap}>
            <Text style={styles.rowKey}>Term 3 Payment</Text>
            <Text style={styles.rowSub}>Final term clearance</Text>
          </View>
          <Text style={styles.rowVal}>Due before Mar 30</Text>
        </View>
      </View>

      {/* Section 4: Policy Guidelines & Sibling Discounts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📜 Policy Guidelines & Sibling Discounts</Text>
        
        <View style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>•</Text>
          <Text style={styles.bulletText}><Text style={styles.bold}>Sibling Tuition Relief: </Text>Families enrolling two or more children simultaneously receive a percentage deduction on the younger sibling's tuition.</Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>•</Text>
          <Text style={styles.bulletText}><Text style={styles.bold}>Late Payment Surcharges: </Text>Payments executed more than 14 days past the terminal deadline are subject to a standard administrative delay fee.</Text>
        </View>

        <View style={styles.bulletRow}>
          <Text style={styles.bulletIcon}>•</Text>
          <Text style={styles.bulletText}><Text style={styles.bold}>Receipt Verification: </Text>All bank deposit slips or digital transaction references must be submitted to finance@dreamacademy.edu.et for portal clearance.</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionGrid}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCallCashier} activeOpacity={0.85}>
          <Text style={styles.actionButtonText}>📞 Call Finance Office</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.emailButton]} onPress={handleFinanceEmail} activeOpacity={0.85}>
          <Text style={styles.actionButtonText}>✉️ Email Finance Desk</Text>
        </TouchableOpacity>
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
  
  /* One-Sided Asymmetric Banner Styles */
  asymmetricBanner: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 14, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: '#e2e8f0', elevation: 2 },
  bannerTextSide: { flex: 1.3, padding: 16, justifyContent: 'center' },
  bannerTag: { fontSize: 9.5, fontWeight: '900', color: '#0369a1', letterSpacing: 1, marginBottom: 4 },
  bannerMainTitle: { fontSize: 15, fontWeight: '900', color: colors.primaryDark, marginBottom: 4 },
  bannerSubText: { fontSize: 11, color: '#64748b', lineHeight: 16 },
  bannerImageSide: { flex: 1, height: '100%', minHeight: 130 },

  bannerBox: { backgroundColor: '#f0fdf4', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#bbf7d0', marginBottom: 14 },
  bannerTitle: { fontSize: 13.5, fontWeight: '800', color: '#166534', marginBottom: 4 },
  bannerText: { fontSize: 12, color: '#15803d', lineHeight: 18 },

  card: { backgroundColor: '#ffffff', borderRadius: 14, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: colors.primaryDark, marginBottom: 8 },
  tableIntro: { fontSize: 11.5, color: '#64748b', marginBottom: 12, lineHeight: 16 },

  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#f1f5f9', paddingVertical: 8, paddingHorizontal: 8, borderRadius: 6, marginBottom: 6 },
  tableHeadText: { fontSize: 11, fontWeight: '900', color: colors.primaryDark },
  tableRow: { flexDirection: 'row', paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
  tableCellBold: { fontSize: 12, fontWeight: '800', color: colors.primaryDark },
  tableCellVal: { fontSize: 12, fontWeight: '800', color: '#0369a1' },
  tableCellAnnual: { fontSize: 12, fontWeight: '700', color: '#64748b' },

  accountBox: { backgroundColor: '#f8fafc', borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  accountHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  bankName: { fontSize: 13, fontWeight: '900', color: colors.primaryDark },
  accountBadge: { fontSize: 9.5, fontWeight: '800', backgroundColor: '#dcfce7', color: '#166534', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  accountDetail: { fontSize: 11.5, color: '#475569', lineHeight: 17, marginTop: 2 },

  rowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  rowLabelWrap: { flex: 1 },
  rowKey: { fontSize: 13, fontWeight: '800', color: colors.primaryDark },
  rowSub: { fontSize: 11, color: '#64748b', marginTop: 1 },
  rowVal: { fontSize: 12.5, fontWeight: '900', color: '#0369a1', textAlign: 'right' },

  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 },
  bulletIcon: { fontSize: 14, fontWeight: '900', color: colors.primaryDark, marginRight: 8, marginTop: 1 },
  bulletText: { fontSize: 12.5, color: '#334155', flex: 1, lineHeight: 18 },
  bold: { fontWeight: '700', color: colors.primaryDark },

  actionGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  actionButton: { flex: 1, backgroundColor: colors.primaryDark, borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginHorizontal: 4 },
  emailButton: { backgroundColor: '#0284c7' },
  actionButtonText: { color: '#ffffff', fontSize: 11.5, fontWeight: '800', letterSpacing: 0.5 },
});