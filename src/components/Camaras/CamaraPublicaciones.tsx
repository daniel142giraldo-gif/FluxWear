import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ComentariosProps = {
  visible: boolean;
  onClose: () => void;
};

export const Camara = ({ visible, onClose }: ComentariosProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.Fondo}>
        <View style={styles.Header}>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={32} color="#b4b2b2" />
          </Pressable>
          <Pressable>
            <Ionicons name="flash" size={32} color="#b4b2b2" />
          </Pressable>
          <Pressable>
            <Ionicons name="sync" size={32} color="#b4b2b2" />
          </Pressable>
        </View>

        <View style={styles.Botones}>
          <Pressable style={styles.Boton}>
            <Ionicons name="camera" size={32} color="#b4b2b2" />
          </Pressable>
          <Pressable style={styles.Boton}>
            <Ionicons name="camera" size={32} color="#b4b2b2" />
          </Pressable>
          <Pressable style={styles.Boton}>
            <Ionicons name="camera" size={32} color="#b4b2b2" />
          </Pressable>
          <Pressable style={styles.Boton}>
            <Ionicons name="camera" size={32} color="#b4b2b2" />
          </Pressable>
        </View>

        <View style={styles.SeccionInferior}>
          <Pressable style={styles.Boton}>
            <Ionicons name="camera" size={32} color="#b4b2b2" />
          </Pressable>
          <Pressable style={styles.Boton}>
            <Ionicons name="camera" size={32} color="#b4b2b2" />
          </Pressable>
          <Pressable style={styles.Boton}>
            <Text>Filtros</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Fondo: {
    backgroundColor: "#080808",
    flex: 1,
  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  Botones: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
  },
  Boton: {
    padding: 10,
    alignItems: "center",
  },
  SeccionInferior: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
  },
});
