import { SeccionComentarios } from '@/components/Comentarios/SeccionComentarios';
import { Publicacion } from '../../../types/publicacion';

import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";


type Props = {
    publicacion: Publicacion;
    onLike: (id: string) => void;
}

export default function PublicacionCard({ publicacion, onLike}: Props) {

  const escalaCorazon = useRef(new Animated.Value(1)).current;
  const [comentariosVisible, setComentariosVisible] = useState(false);

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
      <View style={styles.ContenedorFoto}>
        <Image
          source={publicacion.foto_url}
          style={styles.ImagenPublicacion}
          resizeMode="cover"
        />
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
                      <Ionicons name="heart" size={30} color="#ff0000"/>
                  ) : (
                        <Ionicons name="heart-outline" size={30} color="#838282"/>
                  )}
                </Animated.View>
              </Pressable>
              <Text style={styles.Conteo}>{publicacion.likes}</Text>
            </View>
            <View style={styles.Comentarios}>
              <Pressable onPress={() => setComentariosVisible(true)}>
                <Ionicons name="chatbubble-outline" size={30} color="#838282"/>
              </Pressable>
              <Text style={styles.Conteo}>{publicacion.comentarios}</Text>
            </View>
          </View>
          <View style={styles.Seccion2Logos}>
            <View>
              <Pressable>
                <Ionicons name="share-social-outline" size={30} color="#838282"/>
              </Pressable> 
            </View>
            <View>
              <Pressable>
                <Ionicons name="bookmark-outline" size={30} color="#838282"/>
              </Pressable> 
            </View>
          </View>
        </View> 
        <View style={styles.ContenedorDescripcion}>
          <Text style={styles.DescripcionTexto}>
            <Text style={{ fontWeight: "bold" }}>{publicacion.nombre_usuario}: </Text>
            {publicacion.descripcion}
          </Text>
        </View> 
      </View>
      <SeccionComentarios 
          visible={comentariosVisible}
          onClose={() => setComentariosVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Publicacion: {
    width: "95%",
    height: 670,
    marginLeft: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 40,
  },
  ContenedorFoto: { 
    width: "100%", 
    height: 570, 
    borderBottomEndRadius: 12, 
    overflow: "hidden", 
    position: "relative", 
    marginTop: 10,
  },
  ImagenPublicacion: {
    width: "100%",
    height: 570,
    borderBottomEndRadius: 18,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  Seccion1Publicacion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  InformacionUsuario: {
    flexDirection: "row",
    alignItems: "center",
  },
  ImagenPerfil: {
    height: 43,
    width: 43,
    borderRadius: 35,
    marginLeft: 5,
  },
  Nombres: {
    marginLeft: 10,
  },
  Nombre: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 600,
  },
  Nombre1: {
    color: "#dad6d6",
    fontSize: 12,
  },
  BotonSeguir: {
    width: "22%",
    height: "65%",
    backgroundColor: "#11151dcc",
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
    maxWidth: 200,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginLeft: 5,
  },
  DescripcionHashtag: {
    color: "#fcfcfc",
    fontSize: 14,
  },
  Seccion3Publicacion: {
    width: "100%",
    height: 58,
    flexDirection: "column",
    marginLeft: 5,
  },
  Logos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  Seccion1Logos: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
  },
  Likes: {
    flexDirection: "row",
    alignItems: "center",
  },
  Comentarios: {
    flexDirection: "row",
    alignItems: "center",
  },
  Conteo: {
    color: "#fffcfc",
    fontSize: 16,
    fontWeight: 700,
  },
  Seccion2Logos: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "22%",
    marginRight: 15,
  },
  ContenedorDescripcion: {
    marginTop: 10,
  },
  DescripcionTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 400,
  },
});