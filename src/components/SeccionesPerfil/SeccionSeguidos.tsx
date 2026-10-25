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
          <Text style={styles.Titulo}>Seguidores</Text>
        </View>
        <Pressable style={styles.Filtros}>
          
        </Pressable>
      </View>
      <View style={styles.ContenedorBotones}>
        <View style={styles.BotonesSecciones}>
          <Pressable style={styles.Boton}>
              <Text style={styles.TextoBotones}>Seguidos</Text>
          </Pressable>
          <Pressable style={styles.Boton}>
              <Text style={styles.TextoBotones}>Seguidores</Text>
          </Pressable>
        </View>
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
  Filtros: { 
    width: "70%",
    height: "70%",
    borderRadius: 4,
    backgroundColor: "#03b4dc",
  },
  ContenedorBotones: { 
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  BotonesSecciones: { 
    width: "70%",
    height: 60,
    backgroundColor: "#222224da",
  },
  Boton: { 
    width: "50%",
    borderRadius: 20,
    backgroundColor: "#03b4dc",
  },
  TextoBotones: { 
    fontSize: 18,
    color: "#fff",
  },
});