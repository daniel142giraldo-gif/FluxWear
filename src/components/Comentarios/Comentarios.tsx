import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export const Comentarios = () => {

    
  return (
    <ScrollView style={styles.Fondo} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>

      <View style={styles.Contenedor}>
        <View style={styles.CajaImagen}>
          <Text>ImagenPerfil</Text>
        </View>
        <View>
          <View style={styles.Informacion}>
            <Text style={styles.Nombre}>Nombre</Text>
            <View style={styles.Separacion}/>
            <Text style={styles.TextoTiempo}>Tiempo</Text>
          </View>
          <Text style={styles.Comentario}>Descripcion</Text>
          <View style={styles.Interacciones}>
            <View style={styles.ContenedorLike}>
              <Pressable style={styles.Like}>
                <Ionicons name="heart" size={24} color="#ff0000"/>
              </Pressable>
              <Text style={styles.Conteo}>0</Text>
            </View>
            <Pressable style={styles.BotonResponder}>
              <Text style={styles.TextoResponder}>Responder</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.SeccionInput}>
        <View style={styles.SeccionIzquierda}>
          <Text>Imagen</Text>
          <TextInput
            style={styles.Input}
            placeholder='Escribe un comentario...'
            placeholderTextColor={"#4a4a4a"}
          />
        </View>
        <View style={styles.SeccionDerecha}>
            <Text>Emoujis</Text>
            <Text>Enviar</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Fondo: { 
    backgroundColor: "#080808",
    flex: 1,
  },
  Contenedor: { 
    flexDirection: 'row', 
    gap: 12, 
    alignItems: "center",
  },
  CajaImagen: { 
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  Informacion: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  Nombre: { 
    fontSize: 16,
    color: "#fff",
  },
  TextoTiempo: { 
    fontSize: 16,
     color: "#aeadad",
  },
  Separacion: { 
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#c4c8c9",
  },
  Comentario: { 
    fontSize: 16,
    color: "#f7f7f7",
  },
  Interacciones: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ContenedorLike: { 
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  Conteo: { 
    fontSize: 16,
    color: "#bf0404"
  },
  Like: {
    
  },
  BotonResponder: { 
    
  },
  TextoResponder: { 
    fontSize: 15,
    color: "#3862bc"
  },
  SeccionInput: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#191818",
    borderColor: "#2a2929",
    borderWidth: 0.8,
    borderRadius: 20,
    width: "95%",
    height: 30,
    marginLeft: 10,
  },
  SeccionIzquierda: { 
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  SeccionDerecha: { 
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  Input: { 
    
  },
});