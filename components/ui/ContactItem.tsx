import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ContactItemProps {
  name: string;
  phoneNumber: string;
  onDelete: () => void;
  onUpdate: (newPhone: string) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ name, phoneNumber, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleEditToggle = () => {
    if (isEditing) {
      onUpdate(localPhoneNumber);
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={[styles.item, isDarkMode ? styles.darkItem : styles.lightItem]}>
      <View style={styles.avatarContainer}>
        <MaterialCommunityIcons
          name="account-circle"
          size={40}
          color={isDarkMode ? '#bb86fc' : '#6200ee'}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.name, isDarkMode ? styles.darkText : styles.lightText]}>{name}</Text>
        {isEditing ? (
          <TextInput
            style={[styles.phoneInput, isDarkMode ? styles.darkInput : styles.lightInput]}
            value={localPhoneNumber}
            onChangeText={setLocalPhoneNumber}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={[styles.phoneNumber, isDarkMode ? styles.darkText : styles.lightText]}>{phoneNumber}</Text>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleEditToggle} style={styles.iconButton}>
          <MaterialIcons
            name={isEditing ? 'save' : 'edit'}
            size={24}
            color={isDarkMode ? '#bb86fc' : '#6200ee'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
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
    borderBottomColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  darkItem: {
    borderBottomColor: '#444444',
    backgroundColor: '#1e1e1e',
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
    color: '#000000',
  },
  darkText: {
    color: '#ffffff',
  },
  phoneInput: {
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 16,
  },
  lightInput: {
    borderColor: '#cccccc',
    backgroundColor: '#f9f9f9',
    color: '#000000',
  },
  darkInput: {
    borderColor: '#444444',
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
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
});

export default ContactItem;