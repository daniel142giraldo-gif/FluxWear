import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import Campana from '../../assets/images/Campana.svg';
import Streetwear from "../../assets/images/Imagen1.jpg";
import Elegante from '../../assets/images/Imagen2.jpg';
import Techwear from '../../assets/images/Imagen3.jpg';
import Retro from '../../assets/images/Imagen4.jpg';
import ImagenPerfil from '../../assets/images/ImagenPerfil1.png';
import Like from '../../assets/images/Like1.png';
import LogoComentarios from '../../assets/images/LogoComentarios.svg';
import LogoCompartir from '../../assets/images/LogoCompartir.svg';
import LogoFuego from '../../assets/images/LogoFuego.svg';
import LogoParaTi from '../../assets/images/LogoParaTi.svg';
import ImagenPublicacion from '../../assets/images/Publicacion1.jpg';

export default function Inicio() {

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

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const escalaCorazon = useRef(new Animated.Value(1)).current;

  const [lactivo, setActivo] = useState("casa");

  useEffect(() => {
    const timer = setInterval(() => {
      setIndice((prevIndice) => (prevIndice + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleLike = () => {
    setLiked(prevLiked => {
      setLikes(prevLikes => prevLiked ? prevLikes - 1 : prevLikes + 1);
      return !prevLiked;
    })

    Animated.sequence([
      Animated.timing(escalaCorazon, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),

      Animated.timing(escalaCorazon, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),

      Animated.timing(escalaCorazon, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }
  
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
    <ScrollView style={styles.Fondo}>
      <View style={styles.Superior}>
        <View style={styles.CajaTitulo}>
          <Text style={styles.Titulo}>Flux</Text>
          <Text style={styles.Titulo1}>Wear</Text>
        </View>
        <Text style={styles.Logo}></Text>
        <Pressable>
          <Image
            source={Campana}
            style={styles.LogoCampana}
          />
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
            <Image
              source={LogoFuego}
              style={styles.LogoTendencias}
            />
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
          <Image
            source={LogoParaTi}
            style={styles.LogoParaTi}
          />
          <Text style={styles.TextoParaTi}>Para ti</Text>
        </View>
        <View style={styles.Publicacion}>
          <ImageBackground
          source={ImagenPublicacion}
          style={styles.ImagenPublicacion}
          resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0)"]}
              style={styles.DegradadoSuperior}
            />
            <View style={styles.Seccion1Publicacion}>
              <View style={styles.InformacionUsuario}>
                <Image
                  source={ImagenPerfil}
                  style={styles.ImagenPerfil}
                />
                <View style={styles.Nombres}>
                  <Text style={styles.Nombre}>Nombre de quien publica</Text>
                  <Text style={styles.Nombre1}>Informacion verificado</Text>
                </View>
              </View>
              <Pressable style={styles.BotonSeguir}>
                <Text style={styles.TextoSeguir}>Seguir</Text>
              </Pressable>
            </View>
            <View style={styles.InferiorPublicacion}>
              <View style={styles.Seccion2Publicacion}>
                <View style={styles.Seccion1Logos}>
                  <View style={styles.Likes}>
                    <Pressable onPress={handleLike}>
                      <Animated.Image
                        source={liked ? Like : LogoParaTi}
                        style={[
                          styles.LogoLike,
                          {
                            transform: [{ scale: escalaCorazon}]
                          }
                        ]}
                      />
                    </Pressable>
                    <Text style={styles.Conteo}>{likes}</Text>
                  </View>
                  <View style={styles.Comentarios}>
                    <Pressable>
                      <Image
                        source={LogoComentarios}
                        style={styles.LogoComentario}
                      />
                    </Pressable>
                    <Text style={styles.Conteo}>Conteo comentarios</Text>
                  </View>
                </View>
                <View style={styles.Seccion2Logos}>
                  <View style={styles.Compartir}>
                    <Pressable>
                      <Image
                        source={LogoCompartir}
                        style={styles.LogoCompartir}
                      />
                     </Pressable> 
                  </View>
                </View>
              </View>
              <View style={styles.Seccion3Publicacion}>
                <View style={styles.ContenedorDescripcion}>
                  <Text style={styles.DescripcionTexto}>Texto descripcion de la publicacion</Text>
                </View>
                <View style={styles.ContenedorDescripcion}>
                  <Pressable style={styles.BotonHashtag}>
                   <Text style={styles.DescripcionHashtag}>#Techwear</Text>
                  </Pressable>
                  <Pressable style={styles.BotonHashtag}>
                   <Text style={styles.DescripcionHashtag}>Hashtags de la publicacion</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
              style={styles.DegradadoInferior}
            />
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Fondo: {
    backgroundColor: "#06080efa",
  },
  Superior: {
    flexDirection: "row",
    width: "100%",
    height: 150,
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
    marginTop: 30,
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
    color: "#7d7d7d",
    flex: 1,
    fontSize: 20,
    marginLeft: 15,
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
    height: 500,
    marginTop: 40,
    width: "100%",
  },
  SuperiorTendencias: {
    width: "93%",
    flexDirection: "row",
    height: "8%",
    marginLeft: 20,
    justifyContent: "space-between",
  },
  SuperiorTendencias1: {
    flexDirection: "row",
  },
  InferiorTendencias: {
    width: "100%",
    height: "92%",
    marginTop: 25,
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
    marginRight: 30,
    alignItems: "center",
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
    shadowColor: "#00ddff",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
  },
  ImagenCarrusel: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
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
    flexDirection: "column",
    height: 1000,
    marginTop: 95,
    justifyContent: "flex-start",
  },
  SuperiorParaTi: {
    width: "93%",
    flexDirection: "row",
    height: "4.5%",
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
  Publicacion: {
    width: "95%",
    height: 530,
    marginLeft: 10,
    marginTop: 8,
  },
  ImagenPublicacion: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  DegradadoSuperior: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  Seccion1Publicacion: {
    width: "96%",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
  },
  InformacionUsuario: {
    flexDirection: "row",
    alignItems: "center",
  },
  ImagenPerfil: {
    height: 43,
    width: 43,
    borderRadius: 35,
    marginLeft: 20,
  },
  Nombres: {
    marginLeft: 10,
  },
  Nombre: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 600,
  },
  Nombre1: {
    color: "#dad6d6",
    fontSize: 13,
  },
  BotonSeguir: {
    width: "22%",
    height: "65%",
    backgroundColor: "#0a0a0a36",
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "#797878cc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
  },
  TextoSeguir: {
    color: "#e6e7eb",
    fontSize: 15,
    fontWeight: 700,
  },
  InferiorPublicacion: {
    flexDirection: "column",
    height: 150,
    justifyContent: "flex-start",
  },
  Seccion2Publicacion: {
    width: "96%",
    flexDirection: "row",
    height: 45,
    justifyContent: "space-between",
    alignItems: "center",
  },
  Seccion1Logos: {
    flexDirection: "row",
  },
  Likes: {
    flexDirection: "row",
    marginLeft: 15,
  },
  LogoLike: {
    width: 40,
    height: 40,
  },
  Comentarios: {
    flexDirection: "row",
    marginLeft: 20,
  },
  LogoComentario: {
    width: 40,
    height: 40,
  },
  Conteo: {
    color: "#fffcfc",
    fontSize: 22,
    fontWeight: 700,
  },
  Seccion2Logos: {
    flexDirection: "row",
  },
  Compartir: {
    marginRight: 20,
  },
  LogoCompartir: {
    width: 40,
    height: 40,
  },
  Seccion3Publicacion: {
    width: "96%",
    height: 58,
    flexDirection: "column",
    marginLeft: 20,
  },
  ContenedorDescripcion: {
    flexDirection: "row",
    marginBottom: 15,
  },
  BotonHashtag: {
    maxHeight: 50,
    maxWidth: "35%",
    backgroundColor: "#031c3d61",
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "#30286f81",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginLeft: 5,
    padding: 11,
  },
  DescripcionTexto: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 500,
  },
  DescripcionHashtag: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: 900,
  },
  DegradadoInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
});