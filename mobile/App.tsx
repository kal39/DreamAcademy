import React from 'react';
import { 
  SafeAreaView, 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar, 
  ImageBackground 
} from 'react-native';

const colors = {
  primary: '#092C23', 
  primaryDark: '#051813', 
  primarySoft: '#E6F0ED',
  gold: '#E29B38', 
  goldDark: '#B37522',
  goldSoft: '#FDF5E6',
  surface: '#FFFFFF', 
  ink: '#1A1C1E', 
  inkSoft: '#6C757D',
  canvas: '#F8F9FA',
  border: '#E9ECEF'
};

const NAV_LINKS = ['Home', 'About Us', 'Admissions', 'Academics', 'Campus Life', 'Contact'];

const FEATURES = [
  { icon: '🏛️', label: 'Holistic Education' },
  { icon: '👩‍🏫', label: 'Expert Educators' },
  { icon: '💡', label: 'Innovative Learning' },
  { icon: '🌍', label: 'Global Perspective' },
  { icon: '🛡️', label: 'Safe & Supportive' },
];

const PROGRAMS = [
  { title: 'Early Years', desc: 'A nurturing start for young learners.', ages: 'Ages 3-5', icon: '🎨' },
  { title: 'Primary School', desc: 'Building strong foundations for the future.', ages: 'Grades 1-5', icon: '📚' },
  { title: 'Middle School', desc: 'Encouraging curiosity and critical thinking.', ages: 'Grades 6-8', icon: '🔬' },
  { title: 'High School', desc: 'Preparing leaders for college and beyond.', ages: 'Grades 9-12', icon: '🎓' },
  { title: 'Co-Curricular', desc: 'Explore talents beyond the classroom.', ages: 'Clubs & Activities', icon: '⚽' },
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
      
      {/* Main Container ScrollView with explicit flex: 1 */}
      <ScrollView style={styles.mainScroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. Top Utility Bar */}
        <View style={styles.topUtilityBar}>
          <Text style={styles.topUtilText}>📞 +1 (555) 123-4567</Text>
          <Text style={styles.topUtilText}>✉️ info@dreamacademy.edu</Text>
        </View>

        {/* 2. Main School Header Bar */}
        <View style={styles.schoolHeader}>
          <View>
            <Text style={styles.brandTitle}>DREAM ACADEMY</Text>
            <Text style={styles.brandSubtitle}>INTERNATIONAL SCHOOL</Text>
          </View>
          <TouchableOpacity style={styles.applyNowBtn}>
            <Text style={styles.applyNowText}>APPLY NOW</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Website Navigation Links Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.webNavScroll}>
          {NAV_LINKS.map((link, idx) => (
            <TouchableOpacity key={idx} style={styles.webNavLinkItem}>
              <Text style={styles.webNavLinkText}>{link}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 4. Hero Banner */}
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.heroBg} 
          imageStyle={{ borderRadius: 12 }}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>EST. 2010</Text></View>
            <Text style={styles.heroTitle}>Inspiring Minds.{'\n'}Shaping Futures.</Text>
            <Text style={styles.heroDesc}>A nurturing environment where students learn, grow, and thrive to become tomorrow's leaders.</Text>
            <View style={styles.heroBtnRow}>
              <TouchableOpacity style={styles.heroPrimaryBtn}>
                <Text style={styles.heroPrimaryBtnText}>DISCOVER OUR SCHOOL →</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroSecondaryBtn}>
                <Text style={styles.heroSecondaryBtnText}>▶ WATCH VIDEO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* 5. Feature Icons Scroll Bar */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featureBar}>
          {FEATURES.map((item, idx) => (
            <View key={idx} style={styles.featureChip}>
              <Text style={styles.featureChipIcon}>{item.icon}</Text>
              <Text style={styles.featureChipText}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 6. About Our School Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionCategory}>ABOUT OUR SCHOOL</Text>
          <Text style={styles.sectionHeading}>Excellence in Education{'\n'}Character for Life</Text>
          <Text style={styles.sectionBody}>
            At Dream Academy International School, we believe in developing curious minds, strong values, and confident individuals ready to make a difference in the world.
          </Text>
          
          <TouchableOpacity style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>LEARN MORE ABOUT US →</Text>
          </TouchableOpacity>

          <View style={styles.aboutStatsGrid}>
            <View style={styles.aboutStatItem}><Text style={styles.aboutStatNum}>15:1</Text><Text style={styles.aboutStatLabel}>Student-Teacher Ratio</Text></View>
            <View style={styles.aboutStatItem}><Text style={styles.aboutStatNum}>30+</Text><Text style={styles.aboutStatLabel}>Clubs & Activities</Text></View>
            <View style={styles.aboutStatItem}><Text style={styles.aboutStatNum}>20+</Text><Text style={styles.aboutStatLabel}>Countries Represented</Text></View>
          </View>
        </View>

        {/* 7. Discover Our Programs */}
        <View style={{ marginBottom: 24 }}>
          <Text style={styles.mainSectionTitle}>Discover Our Programs</Text>
          <Text style={styles.mainSectionSub}>A comprehensive curriculum designed to inspire and challenge every learner.</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.programsScroll}>
            {PROGRAMS.map((prog, idx) => (
              <View key={idx} style={styles.programCard}>
                <View style={styles.programIconContainer}><Text style={{ fontSize: 22 }}>{prog.icon}</Text></View>
                <Text style={styles.programTitle}>{prog.title}</Text>
                <Text style={styles.programDesc}>{prog.desc}</Text>
                <Text style={styles.programAges}>{prog.ages}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 8. Stats Banner */}
        <View style={styles.statsBanner}>
          <View style={styles.statsBannerCol}><Text style={styles.statsBannerNum}>25+</Text><Text style={styles.statsBannerLabel}>Years of Excellence</Text></View>
          <View style={styles.statsBannerCol}><Text style={styles.statsBannerNum}>1500+</Text><Text style={styles.statsBannerLabel}>Students Enrolled</Text></View>
          <View style={styles.statsBannerCol}><Text style={styles.statsBannerNum}>120+</Text><Text style={styles.statsBannerLabel}>Qualified Teachers</Text></View>
          <View style={styles.statsBannerCol}><Text style={styles.statsBannerNum}>98%</Text><Text style={styles.statsBannerLabel}>University Acceptance</Text></View>
        </View>

        {/* 9. Bottom Journey CTA */}
        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Begin Your Journey{'\n'}Toward a Bright Future</Text>
          <Text style={styles.ctaDesc}>Join a community where your child will be inspired, supported, and empowered to achieve their dreams.</Text>
          <View style={styles.ctaBtnRow}>
            <TouchableOpacity style={styles.ctaPrimaryBtn}><Text style={styles.ctaPrimaryText}>APPLY NOW</Text></TouchableOpacity>
            <TouchableOpacity style={styles.ctaSecondaryBtn}><Text style={styles.ctaSecondaryText}>SCHEDULE A TOUR</Text></TouchableOpacity>
          </View>
        </View>

        {/* 10. Footer Section */}
        <View style={styles.footerContainer}>
          <View style={styles.footerTopRow}>
            <View>
              <Text style={styles.footerBrand}>DREAM ACADEMY</Text>
              <Text style={styles.footerSub}>INTERNATIONAL SCHOOL</Text>
            </View>
            <TouchableOpacity style={styles.footerAiBtn}>
              <Text style={styles.footerAiBtnText}>✨</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerDivider} />
          <Text style={styles.footerCopy}>© 2026 Dream Academy International School. All Rights Reserved.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.canvas },
  mainScroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  // Top Utility Bar
  topUtilityBar: { backgroundColor: colors.primaryDark, paddingVertical: 6, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8, marginBottom: 10 },
  topUtilText: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '600' },

  // School Header
  schoolHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  brandTitle: { fontSize: 15, fontWeight: '900', color: colors.primary, letterSpacing: 0.5 },
  brandSubtitle: { fontSize: 9, fontWeight: '700', color: colors.goldDark, letterSpacing: 1 },
  applyNowBtn: { backgroundColor: colors.gold, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 },
  applyNowText: { color: colors.primaryDark, fontWeight: '900', fontSize: 11 },

  // Web Nav Links Bar
  webNavScroll: { paddingVertical: 6, gap: 8, marginBottom: 12 },
  webNavLinkItem: { backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  webNavLinkText: { fontSize: 11, fontWeight: '700', color: colors.primary },

  // Hero Section
  heroBg: { height: 320, justifyContent: 'flex-end', marginBottom: 14, backgroundColor: colors.primaryDark, borderRadius: 12 },
  heroOverlay: { backgroundColor: 'rgba(5, 24, 19, 0.75)', padding: 18, borderRadius: 12, height: '100%', justifyContent: 'flex-end' },
  heroBadge: { backgroundColor: colors.gold, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginBottom: 8 },
  heroBadgeText: { color: colors.primaryDark, fontSize: 9, fontWeight: '900' },
  heroTitle: { color: colors.surface, fontSize: 24, fontWeight: '900', lineHeight: 30, marginBottom: 6 },
  heroDesc: { color: 'rgba(255,255,255,0.85)', fontSize: 12, lineHeight: 17, marginBottom: 14 },
  heroBtnRow: { flexDirection: 'row', gap: 8 },
  heroPrimaryBtn: { flex: 1, backgroundColor: colors.gold, paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  heroPrimaryBtnText: { color: colors.primaryDark, fontWeight: '900', fontSize: 10 },
  heroSecondaryBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 10, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  heroSecondaryBtnText: { color: colors.surface, fontWeight: '800', fontSize: 10 },

  // Feature Bar
  featureBar: { paddingVertical: 4, gap: 8, marginBottom: 16 },
  featureChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: colors.border, gap: 6 },
  featureChipIcon: { fontSize: 13 },
  featureChipText: { fontSize: 11, fontWeight: '700', color: colors.primary },

  // About Section Card
  sectionCard: { backgroundColor: colors.surface, borderRadius: 12, padding: 18, borderWidth: 1, borderColor: colors.border, marginBottom: 20 },
  sectionCategory: { fontSize: 9, fontWeight: '900', color: colors.goldDark, letterSpacing: 1, marginBottom: 6 },
  sectionHeading: { fontSize: 18, fontWeight: '900', color: colors.primary, marginBottom: 8, lineHeight: 24 },
  sectionBody: { fontSize: 12, color: colors.inkSoft, lineHeight: 18, marginBottom: 14 },
  outlineBtn: { borderWidth: 1, borderColor: colors.primary, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 16 },
  outlineBtnText: { color: colors.primary, fontWeight: '900', fontSize: 10 },
  aboutStatsGrid: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 14, justifyContent: 'space-between' },
  aboutStatItem: { alignItems: 'center', flex: 1 },
  aboutStatNum: { fontSize: 16, fontWeight: '900', color: colors.primary, marginBottom: 2 },
  aboutStatLabel: { fontSize: 9, color: colors.inkSoft, textAlign: 'center', fontWeight: '700' },

  // Programs Section
  mainSectionTitle: { fontSize: 18, fontWeight: '900', color: colors.primary, textAlign: 'center', marginBottom: 2 },
  mainSectionSub: { fontSize: 11, color: colors.inkSoft, textAlign: 'center', marginBottom: 14 },
  programsScroll: { gap: 10, paddingHorizontal: 2 },
  programCard: { width: 170, backgroundColor: colors.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.border, justifyContent: 'space-between' },
  programIconContainer: { width: 36, height: 36, borderRadius: 8, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  programTitle: { fontSize: 14, fontWeight: '900', color: colors.primary, marginBottom: 4 },
  programDesc: { fontSize: 10, color: colors.inkSoft, lineHeight: 15, marginBottom: 10 },
  programAges: { fontSize: 9, fontWeight: '900', color: colors.goldDark },

  // Stats Banner
  statsBanner: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20, gap: 12 },
  statsBannerCol: { width: '46%', alignItems: 'center' },
  statsBannerNum: { fontSize: 20, fontWeight: '900', color: colors.gold, marginBottom: 2 },
  statsBannerLabel: { fontSize: 10, color: 'rgba(255,255,255,0.85)', textAlign: 'center', fontWeight: '700' },

  // CTA Section
  ctaCard: { backgroundColor: colors.goldSoft, borderRadius: 12, padding: 18, borderWidth: 1, borderColor: colors.gold, alignItems: 'center', marginBottom: 20 },
  ctaTitle: { fontSize: 17, fontWeight: '900', color: colors.primary, textAlign: 'center', marginBottom: 6, lineHeight: 22 },
  ctaDesc: { fontSize: 11, color: colors.inkSoft, textAlign: 'center', lineHeight: 16, marginBottom: 14 },
  ctaBtnRow: { flexDirection: 'row', gap: 8, width: '100%' },
  ctaPrimaryBtn: { flex: 1, backgroundColor: colors.primary, paddingVertical: 10, borderRadius: 6, alignItems: 'center' },
  ctaPrimaryText: { color: colors.surface, fontWeight: '900', fontSize: 11 },
  ctaSecondaryBtn: { flex: 1, backgroundColor: colors.surface, paddingVertical: 10, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: colors.primary },
  ctaSecondaryText: { color: colors.primary, fontWeight: '900', fontSize: 11 },

  // Footer
  footerContainer: { backgroundColor: colors.primaryDark, borderRadius: 12, padding: 16 },
  footerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerBrand: { fontSize: 13, fontWeight: '900', color: colors.surface, letterSpacing: 0.5 },
  footerSub: { fontSize: 8, fontWeight: '700', color: colors.gold, letterSpacing: 1 },
  footerAiBtn: { backgroundColor: 'rgba(255,255,255,0.1)', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  footerAiBtnText: { fontSize: 14 },
  footerDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 12 },
  footerCopy: { color: 'rgba(255,255,255,0.6)', fontSize: 9, textAlign: 'center', fontWeight: '600' }
});