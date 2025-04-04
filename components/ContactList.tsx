import React, { useState } from 'react';
import { View, FlatList, Button, StyleSheet, TextInput, useColorScheme, TouchableOpacity, Text } from 'react-native';
import ContactItem from './ui/ContactItem';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
}

const ContactList = ({ searchQuery }: { searchQuery: string }) => {
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

  const updateContact = (idToUpdate: string, newName: string, newPhone: string) => {
    setContacts(contacts.map(contact =>
      contact.id === idToUpdate ? { ...contact, name: newName, phoneNumber: newPhone } : contact
    ));
  };

  const renderItem = ({ item }) => (
    <ContactItem
      name={item.name}
      phoneNumber={item.phoneNumber}
      onDelete={() => deleteContact(item.id)}
      onUpdate={(newName, newPhone) => updateContact(item.id, newName, newPhone)} // Updated to handle name and phone
    />
  );

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Button title="Agregar Contacto" onPress={addContact} color={isDarkMode ? '#00897b' : '#004d40'} />
        </View>
      )}
      {filteredContacts.length === 0 ? (
        <Text style={[styles.noContactsText, isDarkMode ? styles.darkText : styles.lightText]}>
          No se encontraron contactos.
        </Text>
      ) : (
        <FlatList
          data={[...filteredContacts].sort((a, b) => parseInt(b.id) - parseInt(a.id))} // Sort contacts
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    backgroundColor: '#f4f8fc', // Soft light blue-gray
  },
  darkContainer: {
    backgroundColor: '#102a43', // Deep navy blue
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
    borderColor: '#b0d4f1', // Light blue border
    backgroundColor: '#ffffff', // White background
    color: '#102a43', // Deep navy blue text
  },
  darkInput: {
    borderColor: '#1c3d5a', // Dark blue border
    backgroundColor: '#1e3a5f', // Dark blue background
    color: '#d1e8ff', // Soft light blue text
  },
  listContent: {
    paddingBottom: 80, // Add padding to avoid overlap with FAB
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  lightFab: {
    backgroundColor: '#00897b', // Teal
  },
  darkFab: {
    backgroundColor: '#004d40', // Dark teal
  },
  fabText: {
    fontSize: 24,
    color: '#ffffff', // White text for contrast
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  noContactsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  lightText: {
    color: '#333',
  },
  darkText: {
    color: '#ccc',
  },
});

export default ContactList;