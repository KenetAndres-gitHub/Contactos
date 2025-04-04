import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TextInput, useColorScheme } from 'react-native';
import ContactList from '../../components/ContactList';

export default function Index() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={[styles.headerContainer, isDarkMode ? styles.darkHeader : styles.lightHeader]}>
        <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>Contactos</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchBar, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder="Buscar contactos..."
          placeholderTextColor={isDarkMode ? '#aaaaaa' : '#666666'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ContactList searchQuery={searchQuery} />
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
  searchContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  searchBar: {
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  lightInput: {
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  darkInput: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
});