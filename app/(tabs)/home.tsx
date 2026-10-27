import SeccionBusqueda from "@/components/search/SeccionBusqueda";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { NotificationList } from "../../src/components/notifications/NotificationList";
import { BottomSheet } from "../../src/components/ui/BottomSheet/BottomSheet";

import Logo from '@/assets/images/Logo10.png';
import { Calendario } from "@/components/IA/Modulos/SeccionCalendario";
import { Closet } from "@/components/IA/Modulos/SeccionCloset";
import PublicacionCard from "@/features/social/components/PublicacionCard";
import { mockPublicaciones } from "@/features/social/data/mockPublicaciones";
import { Publicacion } from "../../src/types/publicacion";

export default function Inicio() {
  const [publicaciones, setPublicaciones] =
    useState<Publicacion[]>(mockPublicaciones);
  const [showNotifications, setShowNotifications] = useState(false);
  const [busquedaVisible, setBusquedaVisible] = useState(false);
  const [calendarioVisible, setCalendarioVisible] = useState(false);
  const [closetVisible, setClosetVisible] = useState(false);
  const barraBusquedaRef = useRef<View>(null);

  const [origen, setOrigen] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const abrirBusqueda = () => {
    barraBusquedaRef.current?.measureInWindow(
      (x, y, width, height) => {
        setOrigen({ x, y, width, height });
        setBusquedaVisible(true);
      },
    );
  };

  const handleLike = (id: string) => {
    setPublicaciones((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p,
      ),
    );
  };

  const [lactivo, setActivo] = useState("casa");

  /*const imagenesMenu = {
    casa: {
      gris: require('./IMGE/Casa.png'), morado: require('./IMGE/Casita.png')
    },
    explorar: {
      gris: require('./IMGE/Explora.png'), morado: require('./IMGE/Explorar.png')
    },
    ia: {
      gris: require('./IMGE/ias.png'), morado: require('./IMGE/IA.png')
    },
    comunidad: {
      gris: require('./IMGE/Comunidades.png'), morado: require('./IMGE/Comunidad.png')
    },
    perfil: {
      gris: require('./IMGE/Perfiles.png'), morado: require('./IMGE/Perfil.png')
    },
  };
  */

  return (
    <View style={styles.Fondo}>
      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PublicacionCard publicacion={item} onLike={handleLike} />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.Superior}>
              <View style={styles.CajaTitulo}>
                <Text style={styles.Titulo}>Flux</Text>
                <Text style={styles.Titulo1}>Wear</Text>
              </View>

              <View style={styles.ContenedorBotones}>
                <Pressable style={styles.BotonPublicar}>
                  <Ionicons name="add" size={22} color="#fff" />
                </Pressable>
                <Pressable
                  style={styles.LogoCampana}
                  onPress={() => setShowNotifications(true)}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="#fff"
                    style={{ marginRight: 16 }}
                  />
                </Pressable>
              </View>
            </View>

            <Pressable 
              style={styles.SeccionBusqueda}
              ref={barraBusquedaRef}
              onPress={abrirBusqueda}
            >
              <View>
                <Image
                  source={Logo}
                  style={styles.Logo}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.ContenedorBusqueda}>
                <Pressable style={styles.ContenedorLogo}>
                  <Ionicons name="search" size={24} color="#8A9BB5" />
                </Pressable>
                <Pressable style={styles.ContenedorLogo}>
                  <Ionicons name="mic-outline" size={24} color="#8A9BB5" />
                </Pressable>
              </View>
            </Pressable>

            <View style={styles.SeccionModulo}>
              <View style={styles.SuperiorModulo}>
                <View style={styles.ImagenModulo}>
                  <LinearGradient
                    colors={["#00d2ff", "#ffffff", "#994DE6FF"]}
                    locations={[0, 0.5, 1]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.DegradadoModulo}
                  />
                </View>
                <Text style={styles.TextoM}>Tu módulo inteligente</Text>
              </View>
              <View style={styles.InferiorModulo}>
                <Pressable
                 style={styles.ContenedorMo}
                 onPress={() => setClosetVisible(true)}
                >
                  <Text style={styles.TextoM1}>Closet Inteligente</Text>
                  <View style={styles.CajaImagen}>
                    <Text></Text>
                  </View>
                </Pressable>
                <Pressable 
                  style={styles.ContenedorMo}
                  onPress={() => setCalendarioVisible(true)}
                >
                  <Text style={styles.TextoM1}>Calendario de outfits</Text>
                  <View style={styles.CajaImagen}>
                    <Text></Text>
                  </View>
                </Pressable>
              </View>
            </View>

            <View style={styles.SeccionParaTi}>
            </View>
          </>
        }
      />
      <BottomSheet
        isVisible={showNotifications}
        initialSnap={25}
        showBlur={true}
        onClose={() => setShowNotifications(false)}
      >
        <NotificationList />
      </BottomSheet>
      <SeccionBusqueda
        visible={busquedaVisible}
        origen={origen}
        onClose={() => setBusquedaVisible(false)}
      />
      <Calendario 
        visible={calendarioVisible}
        onClose={() => setCalendarioVisible(false)}
      />
      <Closet 
        visible={closetVisible}
        onClose={() => setClosetVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Fondo: {
    flex: 1,
    backgroundColor: "#040609fa",
    paddingBottom: 100,
  },
  Superior: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginTop: 20,
  },
  CajaTitulo: {
    flexDirection: "row",
    marginLeft: "33%",
    height: 70,
    
  },
  Titulo: {
    marginTop: 25,
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  Titulo1: {
    marginTop: 25,
    fontSize: 28,
    fontWeight: "bold",
    color: "#00d2ff",
    letterSpacing: 0.5,
  },
  ContenedorBotones: {
    width: "23%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 50,
  },
  BotonPublicar: {
    borderWidth: 2,
    borderColor: "#00d2ff",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  LogoCampana: {
    width: "50%",
    height: "100%"
  },
  SeccionBusqueda: {
    marginLeft: 20,
    width: "90%",
    height: 58,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 50,
    backgroundColor: "#151821",
  },
  ContenedorLogo: {
    height: 24,
  },
  Logo: {
    width: 55,
    height: 70,
  },
  ContenedorBusqueda: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "22%",
  },
  Busqueda: {
    color: "#fff",
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    height: "100%",
  },
  SeccionModulo: {
    flexDirection: "column",
    height: 235,
    marginTop: 30,
  },
  SuperiorModulo: {
    width: "93%",
    flexDirection: "row",
    height: 40,
    marginLeft: 20,
  },
  InferiorModulo: {
    flexDirection: "row",
    width: "95%",
    height: 160,
    marginTop: 20,
    justifyContent: "space-between",
    marginLeft: 8,
  },
  ImagenModulo: {
    height: 30,
    width: "2%",
    borderRadius: 20,
    shadowColor: "#994DE6FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  DegradadoModulo: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  TextoM: {
    color: "#ffffff",
    fontSize: 23,
    marginLeft: 13,
    fontWeight: 700,
  },
  ContenedorMo: {
    width: "48%",
    backgroundColor: "#070714",
    height: "100%",
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#045669",
    alignItems: "center",
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    justifyContent: "space-between",
    padding: 10,
  },
  CajaImagen: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00d2ff",
    width: 60,
    height: 60,
    borderRadius: 20,
    shadowColor: "#00ddff",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 60,
    elevation: 6,
  },
  TextoM1: {
    color: "#ffffff",
    fontSize: 20,
    width: "60%",
    fontWeight: 800,
  },
  SeccionTendencias: {
    flexDirection: "column",
    height: 350,
    marginTop: 20,
    width: "100%",
  },
  SuperiorTendencias: {
    width: "93%",
    flexDirection: "row",
    height: 40,
    marginLeft: 20,
    justifyContent: "space-between",
  },
  SuperiorTendencias1: {
    flexDirection: "row",
    alignItems: "center",
  },
  InferiorTendencias: {
    width: "100%",
    height: 300,
    marginTop: 15,
  },
  LogoTendencias: {
    width: 30,
    height: 30,
  },
  TextoT: {
    color: "#ffffff",
    fontSize: 23,
    marginLeft: 15,
    fontWeight: 700,
  },
  BotonVerTodo: {
    justifyContent: "center",
  },
  TextoVerTodo: {
    color: "#03b4dc",
  },
  Carrusel: {
    width: "75%",
    height: "100%",
    overflow: "hidden",
    marginLeft: 50,
    borderRadius: 20,
  },
  ImagenCarrusel: {
    width: "100%",
    height: "100%",
  },
  ContenedorTexto: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  TextoCarrusel: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  SeccionParaTi: {
    marginTop: 20,
  },
});
