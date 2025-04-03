import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet, TextInput, useColorScheme, TouchableOpacity, Text } from 'react-native';
import ContactItem from './ui/ContactItem';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

const ContactList = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Kenet Chungandro', phoneNumber: '099999999999' },
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addContact = () => {
    if (newContactName && newContactPhone) {
      const newContact = { id: String(Date.now()), name: newContactName, phoneNumber: newContactPhone };
      setContacts([...contacts, newContact]);
      setNewContactName('');
      setNewContactPhone('');
    } else {
      alert('Por favor, ingresa nombre y número de teléfono.');
    }
  };

  const deleteContact = (idToDelete: string) => {
    setContacts(contacts.filter(contact => contact.id !== idToDelete));
  };

  const updateContactPhone = (idToUpdate: string, newPhone: string) => {
    setContacts(contacts.map(contact =>
      contact.id === idToUpdate ? { ...contact, phoneNumber: newPhone } : contact
    ));
  };

  const renderItem = ({ item }) => (
    <ContactItem
      name={item.name}
      phoneNumber={item.phoneNumber}
      onDelete={() => deleteContact(item.id)}
      onUpdate={(newPhone) => updateContactPhone(item.id, newPhone)}
    />
  );

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {isFormVisible && (
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
            placeholder="Nombre del contacto"
            placeholderTextColor={isDarkMode ? '#aaaaaa' : '#666666'}
            value={newContactName}
            onChangeText={setNewContactName}
          />
          <TextInput
            style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
            placeholder="Número de teléfono"
            placeholderTextColor={isDarkMode ? '#aaaaaa' : '#666666'}
            value={newContactPhone}
            onChangeText={setNewContactPhone}
            keyboardType="phone-pad"
          />
          <Button title="Agregar Contacto" onPress={addContact} color={isDarkMode ? '#bb86fc' : '#6200ee'} />
        </View>
      )}
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={[styles.fab, isDarkMode ? styles.darkFab : styles.lightFab]}
        onPress={toggleFormVisibility}
      >
        <Text style={styles.fabText}>{isFormVisible ? 'x' : '+'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingHorizontal: 16,
  },
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  lightInput: {
    borderColor: '#cccccc',
    backgroundColor: '#f9f9f9',
    color: '#000000',
  },
  darkInput: {
    borderColor: '#444444',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  },
  listContent: {
    paddingBottom: 80, // Add padding to avoid overlap with FAB
  },
  fab: {
    position: 'absolute',
    bottom: 80, // Adjusted to avoid overlap with the navigation bar
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  lightFab: {
    backgroundColor: '#6200ee',
  },
  darkFab: {
    backgroundColor: '#bb86fc',
  },
  fabText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
});

export default ContactList;