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
          <Text style={styles.Titulo}>Calendario de outfits</Text>
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
        <Pressable style={styles.Calendario}>
          <Pressable>
            <Ionicons name="chevron-back" size={24} color="#ffffff" />
          </Pressable>
          <Text style={styles.TextoCalendario}>Todo</Text>
          <Pressable>
            <Ionicons name="chevron-back" size={24} color="#ffffff" />
          </Pressable>
        </Pressable>
        <View style={styles.ContenedorBoton}>
          <Pressable style={styles.Boton}>
            <Text style={styles.TextoBoton}>Semana</Text>
          </Pressable>
          <Pressable style={styles.Boton}>
            <Text style={styles.TextoBoton}>Mes</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
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
  Calendario: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#213660",
    borderWidth: 0.8,
    borderColor: "#31559d",
    borderRadius: 20,
  },
  TextoCalendario: {
    fontSize: 15, 
    color: "#e1dede",
  },
  ContenedorBoton: {
    flexDirection: "row",
    backgroundColor: "#213660",
    borderWidth: 0.8,
    borderColor: "#31559d",
    borderRadius: 20,
  },
  Boton: {
    width: "47%",
    height: "97%",
    borderRadius: 20,
    backgroundColor: "#03b4dc",
  },
  TextoBoton: {
    textAlign: "center",
  },
});