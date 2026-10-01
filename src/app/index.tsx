import React, { useState, useEffect } from 'react';
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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@area_encargada';

export default function HomeScreen() {
  const [areaInput, setAreaInput] = useState<string>('');
  const [areaGuardada, setAreaGuardada] = useState<string>('Sin asignar');
  const [disponible, setDisponible] = useState<boolean>(true);
  const [mensajeExito, setMensajeExito] = useState<string>('');

  // Requerimiento 4: Carga automática al abrir o refrescar la aplicación
  useEffect(() => {
    cargarAreaGuardada();
  }, []);

  const cargarAreaGuardada = async () => {
    try {
      const valorGuardado = await AsyncStorage.getItem(STORAGE_KEY);
      if (valorGuardado !== null) {
        setAreaGuardada(valorGuardado);
        setAreaInput(valorGuardado);
      }
    } catch (error) {
      console.error('Error al cargar el área:', error);
    }
  };

  // Requerimiento 3: Persistencia de Área
  const guardarArea = async () => {
    const textoLimpio = areaInput.trim();
    if (!textoLimpio) {
      Alert.alert('Atención', 'Por favor ingresa un nombre de área válido.');
      return;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, textoLimpio);
      setAreaGuardada(textoLimpio);
      setMensajeExito('¡Área guardada exitosamente!');
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setMensajeExito(''), 3000);

      Alert.alert('Éxito', `Área "${textoLimpio}" guardada correctamente.`);
    } catch (error) {
      console.error('Error al guardar el área:', error);
      Alert.alert('Error', 'No se pudo guardar el área.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#831843" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Encabezado con el nombre del área recuperado */}
        <View style={styles.header}>
          <Text style={styles.title}>Corporate Spaces</Text>
          <Text style={styles.subtitle}>Área: {areaGuardada}</Text>
        </View>

        {/* Requerimiento 1: Ficha Visual del Espacio */}
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

        {/* Requerimiento 2: Inventario de Equipamiento */}
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

        {/* Requerimiento 3: Formulario de Entrada y Guardado */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Área encargada:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Gerencia de Tecnología / Cocina"
            placeholderTextColor="#f472b6"
            value={areaInput}
            onChangeText={setAreaInput}
          />
          <TouchableOpacity style={styles.saveButton} onPress={guardarArea} activeOpacity={0.7}>
            <Text style={styles.saveButtonText}>GUARDAR</Text>
          </TouchableOpacity>

          {mensajeExito !== '' && (
            <Text style={styles.successText}>{mensajeExito}</Text>
          )}
        </View>

        {/* Requerimiento 5: Estado de Disponibilidad (Verde / Rojo) */}
        <TouchableOpacity
          style={[
            styles.statusCard,
            disponible ? styles.statusAvailable : styles.statusInUse,
          ]}
          onPress={() => setDisponible(!disponible)}
          activeOpacity={0.8}
        >
          <Text style={styles.statusTitle}>
            {disponible ? 'SALA DISPONIBLE' : 'SALA EN USO'}
          </Text>
          <Text style={styles.statusIcon}>{disponible ? '🟢' : '🔴'}</Text>
          <Text style={styles.statusHint}>(Toca para cambiar estado)</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf2f8',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    backgroundColor: '#831843',
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
  input: {
    borderWidth: 1,
    borderColor: '#f472b6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff1f2',
    marginBottom: 12,
    color: '#831843',
  },
  saveButton: {
    backgroundColor: '#db2777',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  successText: {
    color: '#059669',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  statusCard: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  statusAvailable: {
    backgroundColor: '#dcfce7',
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  statusInUse: {
    backgroundColor: '#fee2e2',
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  statusIcon: {
    fontSize: 26,
    marginVertical: 4,
  },
  statusHint: {
    fontSize: 12,
    color: '#64748b',
  },
});
