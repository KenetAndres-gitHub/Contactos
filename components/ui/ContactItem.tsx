import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useColorScheme, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ContactItemProps {
  name: string;
  phoneNumber: string;
  onDelete: () => void;
  onUpdate: (newName: string, newPhone: string) => void; // Updated to include newName
}

const ContactItem: React.FC<ContactItemProps> = ({ name, phoneNumber, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localName, setLocalName] = useState(name); // State for editing name
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleEditToggle = () => {
    if (isEditing) {
      onUpdate(localName, localPhoneNumber); // Pass updated name and phone number
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que deseas eliminar a ${name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  return (
    <View style={[styles.item, isDarkMode ? styles.darkItem : styles.lightItem]}>
      <View style={styles.avatarContainer}>
        <MaterialCommunityIcons
          name="account-circle"
          size={40}
          color={isDarkMode ? '#00897b' : '#004d40'} // Updated to teal tones
        />
      </View>
      <View style={styles.textContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={[styles.nameInput, isDarkMode ? styles.darkInput : styles.lightInput]}
              value={localName}
              onChangeText={setLocalName}
              placeholder="Nombre"
            />
            <TextInput
              style={[styles.phoneInput, isDarkMode ? styles.darkInput : styles.lightInput]}
              value={localPhoneNumber}
              onChangeText={setLocalPhoneNumber}
              keyboardType="phone-pad"
              placeholder="Teléfono"
            />
          </>
        ) : (
          <>
            <Text style={[styles.name, isDarkMode ? styles.darkText : styles.lightText]}>{name}</Text>
            <Text style={[styles.phoneNumber, isDarkMode ? styles.darkText : styles.lightText]}>{phoneNumber}</Text>
          </>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleEditToggle} style={styles.iconButton}>
          <MaterialIcons
            name={isEditing ? 'save' : 'edit'}
            size={24}
            color={isDarkMode ? '#00897b' : '#004d40'} // Updated to teal tones
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
          <MaterialIcons name="delete" size={24} color={isDarkMode ? '#cf6679' : '#d32f2f'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lightItem: {
    borderBottomColor: '#b0d4f1', // Light blue border
    backgroundColor: '#ffffff', // White background
  },
  darkItem: {
    borderBottomColor: '#1c3d5a', // Dark blue border
    backgroundColor: '#102a43', // Deep navy blue
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
  },
  lightText: {
    color: '#102a43', // Deep navy blue text
  },
  darkText: {
    color: '#d1e8ff', // Soft light blue text
  },
  phoneInput: {
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 16,
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  avatarContainer: {
    marginRight: 10,
  },
  nameInput: {
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ContactItem;