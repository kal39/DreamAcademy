import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ImageBackground, Animated } from 'react-native';
import { colors } from '../constants/theme';

const VALUE_PROPS = [
  { icon: '🌿', title: 'Relaxed & Safe', desc: 'A peaceful, non-boarding environment tailored for balanced growth.' },
  { icon: '⏰', title: '08:00 – 16:00', desc: 'Structured day hours designed for optimal learning and family time.' },
  { icon: '🧸', title: 'Daycare to Grade 12', desc: 'A continuous, supportive educational journey under one roof.' },
];

const PROGRAMS = [
  { 
    title: 'Early Years', 
    desc: 'A gentle, playful start for lifelong learning.', 
    ages: 'Ages 3–5', 
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    title: 'Primary School', 
    desc: 'Building strong foundations for the future.', 
    ages: 'Grades 1–5', 
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    title: 'Middle School', 
    desc: 'Encouraging independent thought and critical thinking.', 
    ages: 'Grades 6–8', 
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    title: 'High School', 
    desc: 'Preparing leaders for college and beyond.', 
    ages: 'Grades 9–12', 
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop' 
  },
];

interface HomePageProps {
  slideAnim: Animated.Value;
  highlightFade: Animated.Value;
  highlightTransforms: Animated.Value[];
  onNavigate: (route: string, index: number) => void;
  onOpenApply: () => void;
}

export default function HomePage({ slideAnim, highlightFade, highlightTransforms, onNavigate, onOpenApply }: HomePageProps) {
  return (
    <>
      {/* Hero Section */}
      <Animated.View style={[{ transform: [{ translateY: slideAnim }] }]}>
        <ImageBackground 
          source={{ uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop' }} 
          style={styles.heroBackground}
          imageStyle={styles.heroBackgroundImageStyle}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroTextContent}>
              <Text style={styles.heroHeadline}>Inspiring Minds.{'\n'}Shaping Futures.</Text>
              <Text style={styles.heroSubText}>
                A nurturing environment where students learn, grow, and thrive together within our campus community.
              </Text>
              <TouchableOpacity 
                style={styles.heroBtnPrimary}
                onPress={onOpenApply}
              >
                <Text style={styles.heroBtnPrimaryText}>DISCOVER OUR SCHOOL →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>

      {/* Core Highlights */}
      <Animated.View style={[{ opacity: highlightFade, flexDirection: 'row', gap: 12, marginBottom: 20 }]}>
        {VALUE_PROPS.map((item, idx) => (
          <Animated.View 
            key={idx} 
            style={[
              styles.highlightCard, 
              { transform: [{ translateY: highlightTransforms[idx] }] }
            ]}
          >
            <Text style={styles.highlightIcon}>{item.icon}</Text>
            <Text style={styles.highlightTitle}>{item.title}</Text>
            <Text style={styles.highlightDesc}>{item.desc}</Text>
          </Animated.View>
        ))}
      </Animated.View>

      {/* About Preview Card */}
      <View style={styles.aboutCard}>
        <View style={styles.aboutHeaderRow}>
          <View style={{ flex: 1.1 }}>
            <Text style={styles.aboutSectionTag}>ABOUT OUR SCHOOL</Text>
            <Text style={styles.aboutHeading}>Excellence in Education.{'\n'}Character for Life.</Text>
            <Text style={styles.aboutBody}>
              At Dream Academy International School, we believe in developing curious minds, strong values, and confident individuals ready to make a difference.
            </Text>
            <TouchableOpacity 
              style={styles.aboutLearnMoreBtn}
              onPress={() => onNavigate('about', 1)}
            >
              <Text style={styles.aboutLearnMoreText}>LEARN MORE ABOUT US →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.aboutImageWrapper}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop' }} 
              style={styles.aboutImageFeatured} 
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Programs Section */}
      <View style={styles.programsSectionContainer}>
        <View style={styles.programsHeaderWrapper}>
          <Text style={styles.sectionHeaderTitle}>Discover Our Programs</Text>
          <Text style={styles.sectionHeaderSub}>A comprehensive curriculum designed to inspire every learner.</Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.programScrollContainer}
        >
          {PROGRAMS.map((prog, idx) => (
            <View key={idx} style={styles.programCardWrapper}>
              <View style={styles.programCardItem}>
                <View style={styles.programCardImageContainer}>
                  <Image source={{ uri: prog.image }} style={styles.programCardImage} resizeMode="cover" />
                </View>
                <View style={styles.programCardBody}>
                  <Text style={styles.programCardTitle}>{prog.title}</Text>
                  <Text style={styles.programCardDesc} numberOfLines={2}>{prog.desc}</Text>
                  <Text style={styles.programCardAgeBadgeText}>{prog.ages}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footerWrap}>
        <View style={styles.footerHeader}>
          <Text style={styles.footerBrandName}>DREAM ACADEMY</Text>
          <Text style={styles.footerLocationBadge}>Kasanchis, Addis Ababa</Text>
        </View>
        <Text style={styles.footerTextBio}>
          An international day school committed to nurturing character, academic excellence, and life-ready skills (Daycare to Grade 12).
        </Text>
        <View style={styles.footerContactInfoBox}>
          <Text style={styles.footerContactRow}>📍 Kasanchis District, Near Main Avenue, Addis Ababa</Text>
          <Text style={styles.footerContactRow}>📞 +251 11 555 7890   |   ✉ info@dreamacademy-addis.edu</Text>
        </View>
        <View style={styles.footerRule} />
        <Text style={styles.footerCopyright}>© 2026 Dream Academy International School. All Rights Reserved.</Text>
      </View>
    </>
  );
}

const styles = {
  heroBackground: { width: '100%', minHeight: 310, justifyContent: 'center', borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: colors.border, marginBottom: 20 },
  heroBackgroundImageStyle: { borderRadius: 18 },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.65)', padding: 28, justifyContent: 'center' },
  heroTextContent: { maxWidth: '100%' as const },
  heroHeadline: { color: colors.surface, fontSize: 26, fontWeight: '900' as const, lineHeight: 32, marginBottom: 10 },
  heroSubText: { color: 'rgba(255,255,255,0.88)', fontSize: 12, lineHeight: 18, marginBottom: 18 },
  heroBtnPrimary: { backgroundColor: colors.gold, paddingVertical: 11, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' as const, alignSelf: 'flex-start' as const },
  heroBtnPrimaryText: { color: colors.primaryDark, fontWeight: '900' as const, fontSize: 10 },
  highlightCard: { flex: 1, backgroundColor: colors.surface, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: colors.border, alignItems: 'center' as const },
  highlightIcon: { fontSize: 20, marginBottom: 8 },
  highlightTitle: { fontSize: 11, fontWeight: '900' as const, color: colors.primary, textAlign: 'center' as const, marginBottom: 4 },
  highlightDesc: { fontSize: 9.5, color: colors.inkSoft, textAlign: 'center' as const, lineHeight: 14 },
  aboutCard: { backgroundColor: colors.surface, borderRadius: 18, padding: 22, borderWidth: 1, borderColor: colors.border, marginBottom: 22 },
  aboutHeaderRow: { flexDirection: 'row' as const, gap: 24, alignItems: 'center' as const },
  aboutSectionTag: { fontSize: 8.5, fontWeight: '900' as const, color: colors.goldDark, letterSpacing: 1, marginBottom: 6 },
  aboutHeading: { fontSize: 19, fontWeight: '900' as const, color: colors.primary, marginBottom: 12, lineHeight: 26 },
  aboutBody: { fontSize: 11.5, color: colors.inkSoft, lineHeight: 18, marginBottom: 16 },
  aboutLearnMoreBtn: { alignSelf: 'flex-start' as const },
  aboutLearnMoreText: { fontSize: 10.5, fontWeight: '900' as const, color: colors.primary },
  aboutImageWrapper: { flex: 1, height: 190, backgroundColor: colors.canvas, borderRadius: 12, overflow: 'hidden' as const, justifyContent: 'center' as const, alignItems: 'center' as const },
  aboutImageFeatured: { width: '100%', height: '100%' },
  programsSectionContainer: { marginBottom: 30 },
  programsHeaderWrapper: { alignItems: 'center' as const, marginBottom: 16 },
  sectionHeaderTitle: { fontSize: 19, fontWeight: '900' as const, color: colors.primary, marginBottom: 4, textAlign: 'center' as const },
  sectionHeaderSub: { fontSize: 11.5, color: colors.inkSoft, textAlign: 'center' as const },
  programScrollContainer: { gap: 14, paddingHorizontal: 6, paddingVertical: 10 },
  programCardWrapper: { width: 200 },
  programCardItem: { backgroundColor: colors.primaryDark, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', overflow: 'hidden' as const },
  programCardImageContainer: { width: '100%', height: 130, backgroundColor: 'rgba(0,0,0,0.15)', justifyContent: 'center' as const, alignItems: 'center' as const },
  programCardImage: { width: '100%', height: '100%' },
  programCardBody: { padding: 14 },
  programCardTitle: { fontSize: 13, fontWeight: '900' as const, color: colors.surface, marginBottom: 4 },
  programCardDesc: { fontSize: 10, color: 'rgba(255,255,255,0.75)', lineHeight: 15, marginBottom: 8 },
  programCardAgeBadgeText: { fontSize: 8.5, fontWeight: '900' as const, color: colors.gold },
  footerWrap: { backgroundColor: colors.primaryDark, borderRadius: 18, padding: 24 },
  footerHeader: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const, marginBottom: 12 },
  footerBrandName: { fontSize: 15, fontWeight: '900' as const, color: colors.surface, letterSpacing: 0.5 },
  footerLocationBadge: { fontSize: 9.5, fontWeight: '700' as const, color: colors.gold },
  footerTextBio: { color: 'rgba(255,255,255,0.75)', fontSize: 11.5, lineHeight: 17, marginBottom: 18 },
  footerContactInfoBox: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 14, borderRadius: 12, marginBottom: 16, gap: 6 },
  footerContactRow: { color: 'rgba(255,255,255,0.85)', fontSize: 10.5, fontWeight: '600' as const },
  footerRule: { height: 1, backgroundColor: 'rgba(255,255,255,0.12)', marginVertical: 14 },
  footerCopyright: { color: 'rgba(255,255,255,0.45)', fontSize: 9.5, textAlign: 'center' as const, fontWeight: '600' as const },
};