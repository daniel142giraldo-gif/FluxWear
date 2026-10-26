import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type ComentariosProps = {
  visible: boolean;
  onClose: () => void;
};

export const SeccionComentarios = ({ visible, onClose }: ComentariosProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <ScrollView style={styles.Fondo} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
  
        <View style={styles.Header}>
          <Pressable onPress={onClose}>
              <Ionicons name="chevron-back" size={35} color="#00d2ff" />
          </Pressable>
          <Text style={styles.TextoComentarios}>Comentarios</Text>
          <View style={styles.Separacion} />
          <Text style={styles.ContadorComentarios}>0</Text>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Fondo: { 
    backgroundColor: "#080808"
  },
  Header: { 
    flexDirection: 'row', 
    gap: 12, 
    alignItems: "center",
  },
  TextoComentarios: { 
    fontSize: 20,
    color: "#fff",
  },
  ContadorComentarios: { 
    fontSize: 18,
     color: "#aeadad",
  },
  Separacion: { 
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#03b4dc",
  },
});