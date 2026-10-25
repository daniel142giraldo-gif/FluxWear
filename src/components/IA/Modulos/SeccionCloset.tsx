import { Ionicons } from "@expo/vector-icons";

import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
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
          <Text style={styles.Titulo}>Armario Virtual</Text>
        </View>
        <Pressable>
          <Ionicons
            name="notifications-outline"
            size={26}
            color="#fff"
            style={{ marginRight: 16 }}
          />
        </Pressable>
      </View>

      <View style={styles.Seccion1}>
        <Pressable style={styles.ContenedorBoton}>
          <Text>Icono</Text>
          <Text style={styles.TextoPrenda}>Todo</Text>
        </Pressable>
        <Pressable style={styles.ContenedorBoton}>
          <Text>Icono</Text>
          <Text style={styles.TextoPrenda}>Camisetas</Text>
        </Pressable>
        <Pressable style={styles.ContenedorBoton}>
          <Text>Icono</Text>
          <Text style={styles.TextoPrenda}>Camisa</Text>
        </Pressable>
        <Pressable style={styles.ContenedorBoton}>
          <Text>Icono</Text>
          <Text style={styles.TextoPrenda}>Pantalones</Text>
        </Pressable>
        <Pressable style={styles.ContenedorBoton}>
          <Text>Icono</Text>
          <Text style={styles.TextoPrenda}>Bermudas</Text>
        </Pressable>
        <Pressable style={styles.ContenedorBoton}>
          <Text>Icono</Text>
          <Text style={styles.TextoPrenda}>Chaquetas</Text>
        </Pressable>
        <Pressable style={styles.ContenedorBoton}>
          <Text>Icono</Text>
          <Text style={styles.TextoPrenda}>Hoodies</Text>
        </Pressable>
        <Pressable style={styles.ContenedorBoton}>
          <Text>Icono</Text>
          <Text style={styles.TextoPrenda}>Zapatos</Text>
        </Pressable>
      </View>

      <View style={styles.ContenedorBusqueda}>
        <Text>Lupa</Text>
        <TextInput 
          style={styles.Input}
          placeholder="Buscar en tu closet..."
          placeholderTextColor={"#a09f9f"}
        />
      </View>
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
  Seccion1: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ContenedorBoton: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#213660",
    borderWidth: 0.8,
    borderColor: "#31559d",
    borderRadius: 20,
  },
  TextoPrenda: {
    fontSize: 15, 
    color: "#b0aeae",
  },
  ContenedorBusqueda: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    backgroundColor: "#213660",
    borderWidth: 0.8,
    borderColor: "#31559d",
    borderRadius: 20,
  },
  Input: {
    flex: 1,
  },
});