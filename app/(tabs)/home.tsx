import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import PublicacionCard from '@/features/social/components/PublicacionCard';
import { mockPublicaciones } from '@/features/social/data/mockPublicaciones';
import { Publicacion } from '../../src/types/publicacion';

import Campana from '../../assets/images/Campana.svg';
import Streetwear from "../../assets/images/Imagen1.jpg";
import Elegante from '../../assets/images/Imagen2.jpg';
import Techwear from '../../assets/images/Imagen3.jpg';
import Retro from '../../assets/images/Imagen4.jpg';
import LogoFuego from '../../assets/images/LogoFuego.svg';
import LogoParaTi from '../../assets/images/LogoParaTi.svg';


export default function Inicio() {

  const [publicaciones, setPublicaciones] = useState<Publicacion[]>(mockPublicaciones);

  const [indice, setIndice] = useState(0);
  const slides = [
      {
        titulo: 'STEETWEAR',
        imagen: Streetwear
      }, 
      {
        titulo: 'ELEGANTE',
        imagen: Elegante
      }, 
      {
        titulo: 'TECHWEAR',
        imagen: Techwear
      },
      {
        titulo: 'RETRO',
        imagen: Retro
      }
  ];

  const handleLike = (id: string) => {
    setPublicaciones(prev => prev.map(p =>
      p.id === id ? { 
        ...p, 
        liked: !p.liked, 
        likes: p.liked ? p.likes - 1 : p.likes + 1 
      } : p
    ));

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
              <Text style={styles.Logo}></Text>
              <Pressable style={styles.LogoCampana}>
                <Campana width={28} height={28} />
              </Pressable>
            </View>
            
            <View style={styles.SeccionBusqueda}>
              <View style={styles.ContenedorBusqueda}>
                <Pressable>
                  <Text style={styles.Lupa}>Lupa</Text>
                </Pressable>
                <TextInput
                style={styles.Busqueda}
                placeholder="Busar outfits, estilos, prendas..."
                />
              </View>
            </View>
      
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
                <View style={styles.ContenedorMo}>
                  <Text style={styles.TextoM1}>Closet Inteligente</Text>
                  <View style={styles.CajaImagen}>
                    <Text></Text>
                  </View>
                </View>
                <View style={styles.ContenedorMo}>
                  <Text style={styles.TextoM1}>Calendario de outfits</Text>
                  <View style={styles.CajaImagen}>
                    <Text></Text>
                  </View>
                </View>
              </View>
            </View>
      
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
      
            <View style={styles.SeccionParaTi}>
              <View style={styles.SuperiorParaTi}>
                <LogoParaTi width={28} height={28} />
                <Text style={styles.TextoParaTi}>Para ti</Text>
              </View>
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Fondo: {
    flex: 1,
    backgroundColor: "#06080efa",
    paddingBottom: 90,
  },
  Superior: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#3b3a3a",
  },
  CajaTitulo: {
    flexDirection: "row",
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
  Logo: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00d2ff",
    width: 75,
    height: 75,
    borderRadius: 20,
    shadowColor: "#00ddff",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 60,
    elevation: 6,
    marginRight: 35,
    marginTop: 20,
  },
  LogoCampana: {
    marginRight: 30,
    width: 30,
    height: 30,
  },
  SeccionBusqueda: {
    width: "100%",
    height: 80,
    marginTop: 20,
  },
  ContenedorBusqueda: {
    marginLeft: 20,
    width: "90%",
    height: 68,
    backgroundColor: "#101015",
    flexDirection: "row",
    borderRadius: 15,
    padding: 20,
    borderWidth: 0.5,
    borderColor: "#3b3a3a",
  },
  Lupa: {
    color: "#ffffff",
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
    alignItems: "center"
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
  SuperiorParaTi: {
    width: "93%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 13,
  },
  LogoParaTi: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginTop: 4,
  },
  TextoParaTi: {
    color: "#ffffff",
    fontSize: 23,
    marginLeft: 15,
    fontWeight: 700,
  },
});