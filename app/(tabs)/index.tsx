import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, useColorScheme } from 'react-native';
import ContactList from '../../components/ContactList';

export default function Index() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={[styles.headerContainer, isDarkMode ? styles.darkHeader : styles.lightHeader]}>
        <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>Contactos</Text>
      </View>
      <ContactList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  headerContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  lightHeader: {
    backgroundColor: '#4a90e2', // Vibrant blue
  },
  darkHeader: {
    backgroundColor: '#1c3d5a', // Deep navy blue
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lightText: {
    color: '#ffffff', // White text for contrast
  },
  darkText: {
    color: '#d1e8ff', // Soft light blue for dark mode
  },
});