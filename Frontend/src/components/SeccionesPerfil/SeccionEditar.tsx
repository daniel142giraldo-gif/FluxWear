import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

type EditarProps = {
  visible: boolean;
  onClose: () => void;
};

export const Editar = ({ visible, onClose }: EditarProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <ScrollView style={styles.Fondo} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
  
        <View style={styles.Header}>
          <View style={styles.ContenedorIz}>
            <Pressable onPress={onClose}>
                <Ionicons name="chevron-back" size={35} color="#00d2ff" />
            </Pressable>
            <Text style={styles.Titulo}>Editar Perfil</Text>
          </View>
          <LinearGradient
            colors={['#2DD4FF', '#0899e1', '#0a4aca']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.BotonEditar}
          >
            <Pressable
              style={styles.BotonEditar}
            >
              <Text style={styles.TextoEditar}>Editar</Text>
            </Pressable>
          </LinearGradient>
        </View>
  
        <View style={styles.Seccion1}>
          <View style={styles.ContenedorImg}>
            <View style={styles.ContenedorFoto}>
              <Text>Imagen</Text>
            </View>
            <View style={styles.ContenedorCamara}>
              <Text>Imagen</Text>
            </View>
          </View>
          <Text style={styles.TextoCambiarFoto}>Cambiar Foto</Text>
        </View>
  
        <View style={styles.Seccion2}>
          <View style={styles.Informacion}>
            <View style={styles.ContenedorInfo}>
              <Text style={styles.TipoInfo}>Nombre</Text>
              <Text style={styles.TextoInfo}>Nombre que tiene el usuario</Text>
            </View>
          </View>
    
          <View style={styles.SeccionEtiquetas}>
            <Text style={styles.TituloEtiquetas}>Etiquetas de estilo</Text>
            <View style={styles.ContenedorBotones}>
              <Pressable style={styles.BotonEtiqueta}>
                <Text style={styles.TextoEtiquetas}>Etiqueta</Text>
              </Pressable>
              <Pressable style={styles.BotonEtiqueta}>
                <Text style={styles.TextoEtiquetas}>Etiqueta</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.Seccion3}>
            <View style={styles.Contenedor3}>
              <Text style={styles.TextoMostrar}>Mostrar seguidores</Text>
              <Pressable style={styles.BotonMostrar}>
    
              </Pressable>
            </View>
            <View style={styles.Contenedor3}>
              <Text style={styles.TextoMostrar}>Cuenta Privada</Text>
              <Pressable style={styles.BotonMostrar}>
                  
              </Pressable>
            </View>
          </View>
          </View>
  
        <Pressable style={styles.BotonEliminar}>
          <Text style={styles.TextoEliminar}>Eliminar Cuenta</Text>
        </Pressable>
  
        <LinearGradient
          colors={['#2DD4FF', '#0899e1', '#0a4aca']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.BotonGuardar}
        >
          <Pressable>
            <Text style={styles.TextoGuardar}>Guardar Cambios</Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Fondo: { 
    backgroundColor: "#040609fa",
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  Header: { 
    flexDirection: 'row', 
    gap: 12, 
    alignItems: "center",
    justifyContent: "space-between",
  },
 ContenedorIz: { 
    flexDirection: 'row', 
    gap: 12, 
  },
  Titulo: { 
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
  },
  BotonEditar: {
    borderRadius: 11,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  TextoEditar: { 
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  Seccion1: { 
    flexDirection: "column",
    alignItems: "center",
  },
  ContenedorImg: { 
    height: 140,
  },
  ContenedorFoto: { 
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  ContenedorCamara: { 
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  TextoCambiarFoto: { 
    fontSize: 18,
    color: "#436ac6",
    fontWeight: "600",
  },
  Seccion2: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  Informacion: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ContenedorInfo: {
    backgroundColor: "#111114da",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 14,
    padding: 8,
  },
  TipoInfo: {
    color: "#a9a7a7",
    fontSize: 14,
  },
  TextoInfo: {
    color: "#ffffff",
    fontSize: 16,
  },
  SeccionEtiquetas: {
    backgroundColor: "#111114da",
    borderRadius: 14,
    paddingVertical: 10,
  },
  TituloEtiquetas: {
    fontSize: 15,
    color: "#aeadad",
    marginLeft: 10,
  },
  ContenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  BotonEtiqueta: {
    borderWidth: 1,
    borderColor: "#5b5858",
    borderRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  TextoEtiquetas: {
    color: "#b4b3b3",
    fontSize: 16,
    textAlign: "center",
  },
  Seccion3: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 7,
  },
  Contenedor3: {
    backgroundColor: "#111114da",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: 14,
  },
  TextoMostrar: {
    fontSize: 16,
    color: "#fff",
  },
  BotonMostrar: {
    width: "10%",
    height: "100%",
    backgroundColor: '#2c8bdd',
    borderRadius: 25,
  },
  BotonEliminar: { 
    width: "35%",
  },
  TextoEliminar: { 
    fontSize: 16,
    color: "#c42121",
    borderBottomColor: "#c42121",
    borderWidth: 1,
    marginTop: 20,
    textAlign: "center",
  },
  BotonGuardar: {
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
  },
  TextoGuardar: { 
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});