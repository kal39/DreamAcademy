import React, { useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  StatusBar 
} from 'react-native';
import { colors } from '../src/constants/theme';

import AllTab from '../src/screens/AllTab';

export default function Page() {
  const [activeTab] = useState<'home'>('home'); 

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />
      
      {/* New Dark Green Header & Content handled entirely inside AllTab */}
      <AllTab />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: colors.canvas 
  },
});