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
        <Text style={styles.TituloPrincipal}>FluxWear</Text>
        <Text style={styles.Logo}>Logo</Text>
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
          <View style={styles.ImagenModulo}></View>
          <Text style={styles.TextoM}>Tu módulo inteligente</Text>
        </View>
        <View style={styles.InferiorModulo}>
          <View style={styles.ContenedorMo}>
            <Text style={styles.TextoM1}>Closet Inteligente</Text>
            <Text>Imagen contenedor 1 de la seccion modulo</Text>
          </View>
          <View style={styles.ContenedorMo}>
            <Text style={styles.TextoM1}>Calendario de outfits</Text>
            <Text>Imagen contenedor 2 de la seccion modulo</Text>
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
          >
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
                 <Text style={styles.DescripcionHashtag}>Hashtags de la publicacion</Text>
                </Pressable>
                <Pressable style={styles.BotonHashtag}>
                 <Text style={styles.DescripcionHashtag}>Hashtags de la publicacion</Text>
                </Pressable>
              </View>
            </View>
          </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Fondo: {
    backgroundColor: "#07090ffa",
  },
  Superior: {
    flexDirection: "row",
    width: "100%",
    height: 120,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#3b3a3a",
  },
  TituloPrincipal: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00d2ff",
    letterSpacing: 0.5,
    marginLeft: 15,
  },
  Logo: {
    color: "#ffffff",
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
    marginLeft: "4.5%",
    width: "90%",
    height: "90%",
    backgroundColor: "#181717",
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
  },
  SeccionModulo: {
    flexDirection: "column",
    height: 235,
    marginTop: 45,
  },
  SuperiorModulo: {
    width: "93%",
    flexDirection: "row",
    height: "20%",
    marginLeft: "4.7%",
  },
  InferiorModulo: {
    flexDirection: "row",
    width: "100%",
    height: "80%",
    marginLeft: "3.5%",
    marginTop: 20,
  },
  ImagenModulo: {
    height: "80%",
    width: "1.3%",
    backgroundColor: "#00d2ff",
    borderRadius: 20,
    shadowColor: "#994DE6FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  TextoM: {
    color: "#ffffff",
    fontSize: 26,
    marginLeft: 13,
  },
  ContenedorMo: {
    width: "42%",
    backgroundColor: "#235b770f",
    marginLeft: "3.2%",
    height: "100%",
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#045669",
    alignItems: "center",
    padding: 30,
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  TextoM1: {
    color: "#ffffff",
    fontSize: 26,
  },
  SeccionTendencias: {
    flexDirection: "column",
    height: 500,
    marginTop: 90,
  },
  SuperiorTendencias: {
    width: "93%",
    flexDirection: "row",
    height: "8%",
    marginLeft: "6.5%",
    justifyContent: "space-between",
  },
  SuperiorTendencias1: {
    flexDirection: "row",
  },
  InferiorTendencias: {
    width: "80%",
    height: "92%",
    marginLeft: "3.5%",
    marginTop: 25,
  },
  LogoTendencias: {
    width: 30,
    height: 30,
  },
  TextoT: {
    color: "#ffffff",
    fontSize: 26,
    marginLeft: 15,
  },
  BotonVerTodo: {
    marginRight: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  TextoVerTodo: {
    color: "#03b4dc",
  },
  Carrusel: {
    width: "93%",
    height: "100%",
    overflow: "hidden",
    marginLeft: "22%",
  },
  ImagenCarrusel: {
    width: "80%",
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
    marginTop: 130,
  },
  SuperiorParaTi: {
    width: "93%",
    flexDirection: "row",
    height: "4.5%",
    marginLeft: "3.5%",
  },
  LogoParaTi: {
    width: 30,
    height: 30,
    marginLeft: 15,
    marginTop: 4,
  },
  TextoParaTi: {
    color: "#ffffff",
    fontSize: 26,
    marginLeft: 15,
  },
  Publicacion: {
    width: "90%",
    height: 800,
    marginLeft: "4.8%",
    marginTop: 13,
  },
  ImagenPublicacion: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "space-between",
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
    height: 70,
    width: 70,
    borderRadius: 35,
    marginLeft: 25,
  },
  Nombres: {
    marginLeft: 18,
  },
  Nombre: {
    color: "#ffffff",
    fontSize: 20,
  },
  Nombre1: {
    color: "#dad6d6",
  },
  BotonSeguir: {
    width: "20%",
    height: "55%",
    backgroundColor: "#29282836",
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "#797878cc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 25,
  },
  TextoSeguir: {
    color: "#dedfe3",
    fontSize: 18,
  },
  InferiorPublicacion: {
    flexDirection: "column",
  },
  Seccion2Publicacion: {
    width: "96%",
    height: "16%",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  Seccion1Logos: {
    flexDirection: "row",
  },
  Likes: {
    flexDirection: "row",
    marginLeft: 8,
  },
  LogoLike: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  Comentarios: {
    flexDirection: "row",
    marginLeft: 30,
  },
  LogoComentario: {
    width: 40,
    height: 40,
  },
  Conteo: {
    color: "#dad6d6",
    fontSize: 22,
  },
  Seccion2Logos: {
    flexDirection: "row",
  },
  Compartir: {
    marginRight: 25,
  },
  LogoCompartir: {
    width: 40,
    height: 40,
  },
  Seccion3Publicacion: {
    width: "96%",
    height: "20%",
    flexDirection: "column",
    marginLeft: 20,
  },
  ContenedorDescripcion: {
    flexDirection: "row",
    marginBottom: 35,
  },
  BotonHashtag: {
    width: "27%",
    height: "70%",
    backgroundColor: "#031c3d61",
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "#30286f81",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 25,
    marginLeft: 15,
  },
  DescripcionTexto: {
    color: "#ffffff",
    fontSize: 18,
  },
  DescripcionHashtag: {
    color: "#ffffff",
    fontSize: 18,
  },
});