import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import SeccionBusqueda from "@/components/search/SeccionBusqueda";
import { NotificationList } from "../../src/components/notifications/NotificationList";
import { BottomSheet } from "../../src/components/ui/BottomSheet/BottomSheet";

import Logo from '@/assets/images/Logo10.png';
import Streetwear from "../../assets/images/Imagen1.jpg";
import Elegante from "../../assets/images/Imagen2.jpg";
import Techwear from "../../assets/images/Imagen3.jpg";
import Retro from "../../assets/images/Imagen4.jpg";

export default function Explorar() {

  const [indice, setIndice] = useState(0);

  const [showNotifications, setShowNotifications] = useState(false);
    const [busquedaVisible, setBusquedaVisible] = useState(false);
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

  const slides = [
      {
        titulo: "STEETWEAR",
        imagen: Streetwear,
      },
      {
        titulo: "ELEGANTE",
        imagen: Elegante,
      },
      {
        titulo: "TECHWEAR",
        imagen: Techwear,
      },
      {
        titulo: "RETRO",
        imagen: Retro,
      },
    ];

    useEffect(() => {
    const timer = setInterval(() => {
      setIndice((prevIndice) => (prevIndice + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);
  return (
      
    <View style={styles.Fondo}>
          <>
            <View style={styles.Superior}>
              <View style={styles.CajaTitulo}>
                <Text style={styles.Titulo}>Explore</Text>
              </View>

              <Pressable
                style={styles.LogoCampana}
                onPress={() => setShowNotifications(true)}
              >
                <Ionicons
                  name="notifications-outline"
                  size={26}
                  color="#fff"
                  style={{ marginRight: 16 }}
                />
              </Pressable>
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

            <View style={styles.SeccionTendencias}>
              <View style={styles.SuperiorTendencias}>
                <View style={styles.SuperiorTendencias1}>
                  <Text style={styles.TextoT}>Tendencias para ti</Text>
                </View>
                <Pressable style={styles.BotonVerTodo}>
                  <Text style={styles.TextoVerTodo}>Ver todo</Text>
                </Pressable>
              </View>
              <View style={styles.InferiorTendencias}>
                <View style={styles.Carrusel}>
                  <Image
                    source={slides[indice].imagen}
                    style={styles.ImagenCarrusel}
                    resizeMode="cover"
                  />
                  <View style={styles.ContenedorTexto}>
                    <Text style={styles.TextoCarrusel}>
                      {slides[indice].titulo}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.Secciones}>
              <View style={styles.SeccionSuperior}>
                <View style={styles.Contenedor1}>
                  <Text style={styles.TextoParaTi}>Para TI</Text>
                  <View style={styles.Recomendacion}>
                    <Text style={styles.TextoRecomendacion}>AI Recomemended</Text>
                  </View>
                </View>
                <Pressable style={styles.BotonVerTodo}>
                  <Text style={styles.TextoVerTodo}>Ver todo</Text>
                </Pressable>
              </View>

            </View>

            <View style={styles.Secciones}>
              <View style={styles.SeccionSuperior}>
                <View style={styles.Contenedor1}>
                  <Text style={styles.TextoParaTi}>Para TI</Text>
                  <View style={styles.Recomendacion}>
                    <Text style={styles.TextoRecomendacion}>AI Recomemended</Text>
                  </View>
                </View>
                <Pressable style={styles.BotonVerTodo}>
                  <Text style={styles.TextoVerTodo}>Ver todo</Text>
                </Pressable>
              </View>

            </View>

            <View style={styles.Secciones}>
              <View style={styles.SeccionSuperior}>
                <View style={styles.Contenedor1}>
                  <Text style={styles.TextoParaTi}>Para TI</Text>
                  <View style={styles.Recomendacion}>
                    <Text style={styles.TextoRecomendacion}>AI Recomemended</Text>
                  </View>
                </View>
                <Pressable style={styles.BotonVerTodo}>
                  <Text style={styles.TextoVerTodo}>Ver todo</Text>
                </Pressable>
              </View>

            </View>

            <View style={styles.Secciones}>
              <View style={styles.SeccionSuperior}>
                <View style={styles.Contenedor1}>
                  <Text style={styles.TextoParaTi}>Para TI</Text>
                  <View style={styles.Recomendacion}>
                    <Text style={styles.TextoRecomendacion}>AI Recomemended</Text>
                  </View>
                </View>
                <Pressable style={styles.BotonVerTodo}>
                  <Text style={styles.TextoVerTodo}>Ver todo</Text>
                </Pressable>
              </View>

            </View>

            <View style={styles.Secciones}>
              <View style={styles.SeccionSuperior}>
                <View style={styles.Contenedor1}>
                  <Text style={styles.TextoParaTi}>Para TI</Text>
                  <View style={styles.Recomendacion}>
                    <Text style={styles.TextoRecomendacion}>AI Recomemended</Text>
                  </View>
                </View>
                <Pressable style={styles.BotonVerTodo}>
                  <Text style={styles.TextoVerTodo}>Ver todo</Text>
                </Pressable>
              </View>

            </View>

            <View style={styles.Secciones}>
              <View style={styles.SeccionSuperior}>
                <View style={styles.Contenedor1}>
                  <Text style={styles.TextoParaTi}>Para TI</Text>
                  <View style={styles.Recomendacion}>
                    <Text style={styles.TextoRecomendacion}>AI Recomemended</Text>
                  </View>
                </View>
                <Pressable style={styles.BotonVerTodo}>
                  <Text style={styles.TextoVerTodo}>Ver todo</Text>
                </Pressable>
              </View>

            </View>

            <View style={styles.Secciones}>
              <View style={styles.SeccionSuperior}>
                <View style={styles.Contenedor1}>
                  <Text style={styles.TextoParaTi}>Para TI</Text>
                  <View style={styles.Recomendacion}>
                    <Text style={styles.TextoRecomendacion}>AI Recomemended</Text>
                  </View>
                </View>
                <Pressable style={styles.BotonVerTodo}>
                  <Text style={styles.TextoVerTodo}>Ver todo</Text>
                </Pressable>
              </View>

            </View>

            <View style={styles.Secciones}>
              <View style={styles.SeccionSuperior}>
                <View style={styles.Contenedor1}>
                  <Text style={styles.TextoParaTi}>Para TI</Text>
                  <View style={styles.Recomendacion}>
                    <Text style={styles.TextoRecomendacion}>AI Recomemended</Text>
                  </View>
                </View>
                <Pressable style={styles.BotonVerTodo}>
                  <Text style={styles.TextoVerTodo}>Ver todo</Text>
                </Pressable>
              </View>

            </View>

            <View style={styles.Secciones}>
              <View style={styles.SeccionSuperior}>
                <View style={styles.Contenedor1}>
                  <Text style={styles.TextoParaTi}>Para TI</Text>
                  <View style={styles.Recomendacion}>
                    <Text style={styles.TextoRecomendacion}>AI Recomemended</Text>
                  </View>
                </View>
                <Pressable style={styles.BotonVerTodo}>
                  <Text style={styles.TextoVerTodo}>Ver todo</Text>
                </Pressable>
              </View>

            </View>
          </>
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
    height: 70,
    marginLeft: 10,
  },
  Titulo: {
    marginTop: 25,
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
  },
  LogoCampana: {
    marginTop: 10,
    height: 26,
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
  Secciones: {
    marginTop: 20,
  },
  SeccionSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginLeft: 10,
  },
  Contenedor1: {
    flexDirection: "row",
    alignItems: "center",
  },
  TextoParaTi: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  Recomendacion: {
    backgroundColor: "#151821",
    borderColor: "#3a476e",
    borderWidth: 1,
    borderRadius: 80,
    width: 160,
    marginTop: 20,
    padding: 3,
    marginLeft: 10,
  },
  TextoRecomendacion: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
});