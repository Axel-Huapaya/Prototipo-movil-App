// src/app/camera.tsx — S13 AP7: funcionalidad avanzada "Cámara"
import { COLORS, RADIUS, SPACING } from '@/constants/theme';
import { deletePhoto, listPhotos, SavedPhoto, savePhoto } from '@/lib/photoStorage';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CameraScreen() {
  const router = useRouter();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedPhotos, setSavedPhotos] = useState<SavedPhoto[]>([]);

  useEffect(() => {
    setSavedPhotos(listPhotos());
  }, []);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permiso denegado',
        'Necesitamos acceso a la cámara para tomar la foto del producto.',
        permission.canAskAgain
          ? [{ text: 'OK' }]
          : [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
            ]
      );
      return;
    }

    setLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });
      if (!result.canceled) setPhotoUri(result.assets[0].uri);
    } catch {
      Alert.alert('Error', 'No se pudo abrir la cámara. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const savePhotoToDevice = async () => {
    if (!photoUri) return;

    setSaving(true);
    try {
      await savePhoto(photoUri);
      setPhotoUri(null);
      setSavedPhotos(listPhotos());
      Alert.alert('Foto guardada', 'La foto se guardó en el almacenamiento local de la app.');
    } catch {
      Alert.alert('Error', 'No se pudo guardar la foto. Intenta de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (photo: SavedPhoto) => {
    Alert.alert('Eliminar foto', '¿Quieres borrar esta foto guardada?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          try {
            deletePhoto(photo.uri);
            setSavedPhotos(listPhotos());
          } catch {
            Alert.alert('Error', 'No se pudo eliminar la foto.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Pressable style={styles.backRow} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={COLORS.text} />
            <Text style={styles.backText}>Volver</Text>
          </Pressable>

          <Text style={styles.title}>Foto del producto</Text>
          <Text style={styles.desc}>Toma una foto de tu pedido o del local.</Text>

          <View style={styles.imageWrap}>
            {loading || saving ? (
              <ActivityIndicator size="large" color={COLORS.red} />
            ) : photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.photo} />
            ) : (
              <MaterialCommunityIcons name="camera-outline" size={56} color={COLORS.textFaint} />
            )}
          </View>

          {photoUri ? (
            <>
              <Pressable style={styles.button} onPress={savePhotoToDevice} disabled={saving}>
                <Text style={styles.buttonText}>Guardar foto</Text>
              </Pressable>

              <Pressable style={styles.secondaryButton} onPress={takePhoto} disabled={saving}>
                <Text style={styles.secondaryText}>Tomar otra foto</Text>
              </Pressable>

              <Pressable
                style={styles.secondaryButton}
                onPress={() => setPhotoUri(null)}
                disabled={saving}
              >
                <Text style={styles.secondaryText}>Descartar foto</Text>
              </Pressable>
            </>
          ) : (
            <Pressable style={styles.button} onPress={takePhoto} disabled={loading}>
              <Text style={styles.buttonText}>Tomar foto</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Fotos guardadas ({savedPhotos.length})</Text>

          {savedPhotos.length === 0 ? (
            <Text style={styles.empty}>Aún no has guardado fotos.</Text>
          ) : (
            savedPhotos.map((photo) => (
              <View key={photo.uri} style={styles.savedRow}>
                <Image source={{ uri: photo.uri }} style={styles.thumb} />
                <Text style={styles.savedName} numberOfLines={1}>
                  {photo.name}
                </Text>
                <Pressable onPress={() => confirmDelete(photo)} hitSlop={8}>
                  <Ionicons name="trash-outline" size={20} color={COLORS.red} />
                </Pressable>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.lg, gap: SPACING.md },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs, marginBottom: SPACING.md },
  backText: { color: COLORS.text, fontSize: 13, fontWeight: '600' },
  title: { color: COLORS.text, fontSize: 20, fontWeight: '700' },
  desc: { color: COLORS.textMuted, fontSize: 13, marginTop: 6, marginBottom: SPACING.md },
  imageWrap: {
    height: 260,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  photo: { width: '100%', height: '100%' },
  button: {
    backgroundColor: COLORS.red,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm + 4,
    alignItems: 'center',
  },
  buttonText: { color: COLORS.text, fontWeight: '700', fontSize: 15 },
  secondaryButton: { alignItems: 'center', marginTop: SPACING.md },
  secondaryText: { color: COLORS.link, fontSize: 13, fontWeight: '600' },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: '700', marginBottom: SPACING.md },
  empty: { color: COLORS.textMuted, fontSize: 13 },
  savedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  thumb: { width: 48, height: 48, borderRadius: RADIUS.sm, backgroundColor: COLORS.cardAlt },
  savedName: { flex: 1, color: COLORS.textMuted, fontSize: 12 },
});