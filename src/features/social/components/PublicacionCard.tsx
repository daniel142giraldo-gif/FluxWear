import { Publicacion } from '../../../types/publicacion';

import { useRef } from 'react';
import {
    Animated,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

import Like from '../../../../assets/images/Like1.png';
import LogoComentarios from '../../../../assets/images/LogoComentarios.svg';
import LogoCompartir from '../../../../assets/images/LogoCompartir.svg';
import LogoParaTi from '../../../../assets/images/LogoParaTi.svg';

type Props = {
    publicacion: Publicacion;
    onLike: (id: string) => void;
}

export default function PublicacionCard({ publicacion, onLike}: Props) {

  const escalaCorazon = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    onLike(publicacion.id);
    
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

  return (
    <View style={styles.Publicacion}>
      <View style={styles.ContenedorFoto}>
        <Image
          source={publicacion.foto_url}
          style={styles.ImagenPublicacion}
          resizeMode="cover"
        />
        <View style={styles.Seccion1Publicacion}>
          <View style={styles.InformacionUsuario}>
            <Image
              source={publicacion.foto_perfil}
              style={styles.ImagenPerfil}
            />
            <View style={styles.Nombres}>
              <Text style={styles.Nombre}>{publicacion.nombre_usuario}</Text>
              {publicacion.verificado && <Text style={styles.Nombre1}>Informacion verificado</Text>}
            </View>
          </View>
          <Pressable style={styles.BotonSeguir}>
            <Text style={styles.TextoSeguir}>Seguir</Text>
          </Pressable>
        </View>
        <View style={styles.ContenedorHashtag}>
          {publicacion.hashtags.map((tag, index) => (
            <View key={index} style={styles.BotonHashtag}>
              <Text style={styles.DescripcionHashtag}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.Seccion3Publicacion}>
        <View style={styles.Logos}>
          <View style={styles.Seccion1Logos}>
            <View style={styles.Likes}>
              <Pressable onPress={handleLike}>
                <Animated.View style={{ transform: [{ scale: escalaCorazon }] }}>
                  {publicacion.liked ? (
                      <Image source={Like} style={styles.LogoLike} />
                  ) : (
                        <LogoParaTi width={32} height={32} />
                  )}
                </Animated.View>
              </Pressable>
              <Text style={styles.Conteo}>{publicacion.likes}</Text>
            </View>
            <View style={styles.Comentarios}>
              <Pressable>
                <LogoComentarios width={32} height={32} />
              </Pressable>
              <Text style={styles.Conteo}>{publicacion.comentarios}</Text>
            </View>
          </View>
          <View style={styles.Seccion2Logos}>
            <View style={styles.Compartir}>
              <Pressable>
                <LogoCompartir width={32} height={32} />
              </Pressable> 
            </View>
          </View>
        </View> 
        <View style={styles.ContenedorDescripcion}>
          <Text style={styles.DescripcionTexto}>
            <Text style={{ fontWeight: "bold" }}>{publicacion.nombre_usuario}</Text>
            {publicacion.descripcion}
          </Text>
        </View> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Publicacion: {
    width: "95%",
    height: 700,
    marginLeft: 10,
    marginTop: 8,
    flexDirection: "column",
  },
  ContenedorFoto: { 
    width: "100%", 
    height: 530, 
    borderRadius: 18, 
    overflow: "hidden", 
    position: "relative" 
  },
  ImagenPublicacion: {
    width: "100%",
    height: 530,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  Seccion1Publicacion: {
    position: "absolute",
    top: 15,
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
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
  ContenedorHashtag: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
    left: 15,
    gap: 8,
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
  DescripcionHashtag: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: 900,
  },
  Seccion3Publicacion: {
    width: "96%",
    height: 58,
    flexDirection: "column",
    marginLeft: 20,
  },
  Logos: {
    flexDirection: "row",
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
  ContenedorDescripcion: {
    marginBottom: 15,
  },
  DescripcionTexto: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 500,
  },
});