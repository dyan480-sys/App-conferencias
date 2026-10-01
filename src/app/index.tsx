import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function HomeScreen() {
  const [areaInput, setAreaInput] = useState<string>('');
  const [areaGuardada, setAreaGuardada] = useState<string>('Sin asignar');
  const [disponible, setDisponible] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#831843" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Encabezado Principal */}
        <View style={styles.header}>
          <Text style={styles.title}>Corporate Spaces</Text>
          <Text style={styles.subtitle}>Área: {areaGuardada}</Text>
        </View>

        {/* Ficha Visual del Espacio (Requerimiento 1) */}
        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
            }}
            style={styles.roomImage}
            resizeMode="cover"
          />
          <View style={styles.cardContent}>
            <Text style={styles.roomName}>Sala de Conferencias</Text>
            <Text style={styles.roomCode}>Ejecutiva A-1</Text>
            <Text style={styles.roomCapacity}>Aforo: 25 Personas</Text>
          </View>
        </View>

        {/* Inventario de Equipamiento (Requerimiento 2) */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>EQUIPAMIENTO</Text>
          <View style={styles.equipmentList}>
            <Text style={styles.equipmentItem}>• Pantalla 4K de 85"</Text>
            <Text style={styles.equipmentItem}>• Sistema de Micrófonos Omnidireccionales</Text>
            <Text style={styles.equipmentItem}>• Cámara PTZ para videollamadas</Text>
            <Text style={styles.equipmentItem}>• Red Wi-Fi dedicada</Text>
            <Text style={styles.equipmentItem}>• Tomas Eléctricas</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf2f8', // Fondo rosa suave
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    backgroundColor: '#831843', // Rosa corporativo oscuro
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fbcfe8',
    marginTop: 4,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#9d174d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderColor: '#fbcfe8',
    borderWidth: 1,
  },
  roomImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardContent: {
    gap: 4,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#831843',
  },
  roomCode: {
    fontSize: 14,
    color: '#9d174d',
    fontWeight: '600',
  },
  roomCapacity: {
    fontSize: 14,
    color: '#475569',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9d174d',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  equipmentList: {
    gap: 6,
  },
  equipmentItem: {
    fontSize: 14,
    color: '#334155',
  },
});