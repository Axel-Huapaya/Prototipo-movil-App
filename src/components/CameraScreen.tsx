import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const [uri, setUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Activa el acceso a la cámara en Ajustes para tomar fotos.');
      return;
    }
    setLoading(true);
    try {
      const res = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });
      if (!res.canceled) setUri(res.assets[0].uri);
    } catch {
      Alert.alert('Error', 'No se pudo abrir la cámara. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Foto del producto</Text>
      {loading && <ActivityIndicator size="large" />}
      {uri ? (
        <Image source={{ uri }} style={s.img} />
      ) : (
        <Text style={s.empty}>Aún no hay foto</Text>
      )}
      <TouchableOpacity style={s.btn} onPress={tomarFoto}>
        <Text style={s.btnText}>{uri ? 'Tomar otra foto' : 'Tomar foto'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, gap: 16 },
  title: { fontSize: 22, fontWeight: '700' },
  img: { width: 300, height: 225, borderRadius: 12 },
  empty: { color: '#888' },
  btn: { backgroundColor: '#2e7d32', paddingVertical: 12, paddingHorizontal: 28, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});