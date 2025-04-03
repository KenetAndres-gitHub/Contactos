import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, useColorScheme } from 'react-native';
import ContactList from '../../components/ContactList';

export default function Index() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={[styles.headerContainer, isDarkMode ? styles.darkHeader : styles.lightHeader]}>
        <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>Contact App</Text>
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
    backgroundColor: '#6200ee',
  },
  darkHeader: {
    backgroundColor: '#3700b3',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  lightText: {
    color: '#ffffff',
  },
  darkText: {
    color: '#ffffff',
  },
});