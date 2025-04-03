import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Oculta el encabezado de cada pantalla
        tabBarStyle: { display: 'none' }, // Oculta la barra de pestañas
        tabBarButton: () => null, // Otra forma de ocultar los botones de las pestañas
      }}>
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} /> {/* Ajusta el título si es necesario */}
      {/* ... otras pantallas de pestañas si las tuvieras */}
    </Tabs>
  );
}
