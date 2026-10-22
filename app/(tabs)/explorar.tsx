import { Text, View } from 'react-native';

import {
  Image,
  Pressable,
  StyleSheet
} from "react-native";

import { useEffect, useState } from "react";

import LogoFuego from "../../assets/images/LogoFuego.svg";

import Streetwear from "../../assets/images/Imagen1.jpg";
import Elegante from "../../assets/images/Imagen2.jpg";
import Techwear from "../../assets/images/Imagen3.jpg";
import Retro from "../../assets/images/Imagen4.jpg";

export default function Explorar() {

  const [indice, setIndice] = useState(0);

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
    <View style={{ flex: 1, backgroundColor: '#06080e', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 20 }}>Explorar - En construcción</Text>
      <View style={styles.SeccionTendencias}>
        <View style={styles.SuperiorTendencias}>
          <View style={styles.SuperiorTendencias1}>
            <LogoFuego width={28} height={28} />
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
    </View>
    
  );
}
const styles = StyleSheet.create({
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
});