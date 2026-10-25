import { Ionicons } from "@expo/vector-icons";

import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

export const NotificationList = () => {
  return (
    <ScrollView style={styles.Fondo} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>

      <View style={styles.Header}>
        <View style={styles.ContenedorIz}>
          <Pressable>
              <Ionicons name="chevron-back" size={35} color="#00d2ff" />
          </Pressable>
          <Text style={styles.Titulo}>Editar Perfil</Text>
        </View>
        <Pressable
          style={styles.BotonEditar}
        >
          <Text style={styles.TextoEditar}>Guardar</Text>
        </Pressable>
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
            <Text style={styles.TextoEtiquetas}>Nombre Etiqueta</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.Seccion2}>
        <View style={styles.Contenedor2}>
          <Text style={styles.TextoMostrar}>Mostrar seguidores</Text>
          <Pressable style={styles.BotonMostrar}>

          </Pressable>
        </View>
        <View style={styles.Contenedor2}>
          <Text style={styles.TextoMostrar}>Cuenta Privada</Text>
          <Pressable style={styles.BotonMostrar}>
              
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.BotonEliminar}>
        <Text style={styles.TextoEliminar}>Eliminar Cuenta</Text>
      </Pressable>

      <Pressable style={styles.BotonGuardar}>
        <Text style={styles.TextoGuardar}>Guardar Cambios</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Fondo: { 
    backgroundColor: "#040609fa",
  },
  Header: { 
    flexDirection: 'row', 
    gap: 12, 
    alignItems: "center",
  },
 ContenedorIz: { 
    flexDirection: 'row', 
    gap: 12, 
  },
  Titulo: { 
    fontSize: 22,
    color: "#fff",
  },
  BotonEditar: { 
    width: "70%",
    height: "70%",
    borderRadius: 4,
    backgroundColor: "#03b4dc",
  },
  TextoEditar: { 
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  ContadorComentarios: { 
    fontSize: 18,
     color: "#aeadad",
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
    color: "#3361cc",
  },
  Informacion: {
    flexDirection: "column",
  },
  ContenedorInfo: {
    backgroundColor: "#111114da",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
  },
  TituloEtiquetas: {
    fontSize: 14,
    color: "#aeadad",
  },
  ContenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  BotonEtiqueta: {
    borderWidth: 1,
    borderColor: "#aeadad",
    width: "24%",
    height: 20,
    borderRadius: 20,
  },
  TextoEtiquetas: {
    color: "#b4b3b3",
    fontSize: 15,
    textAlign: "center",
  },
  Seccion2: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Contenedor2: {
    backgroundColor: "#111114da",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  TextoMostrar: {
    fontSize: 15,
    color: "#fff",
  },
  BotonMostrar: {
    width: "10%",
    height: "95%",
    backgroundColor: "#222224da",
    borderRadius: 25,
  },
  BotonEliminar: { 
    borderBottomColor: "#8d1616"
  },
  TextoEliminar: { 
    fontSize: 14,
    color: "#8d1616",
  },
  BotonGuardar: { 
    width: "95%",
    height: 100,
    borderRadius: 20,
    backgroundColor: "#03b4dc",
  },
  TextoGuardar: { 
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});