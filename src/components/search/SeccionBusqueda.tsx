import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";

import {
    Animated,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";

import Logo from "@/assets/images/Logo10.png";
import Titulo from "@/assets/images/Titulo.png";

type OrigenBusqueda = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type SeccionBusquedaProps = {
  visible: boolean;
  origen: OrigenBusqueda;
  onClose: () => void;
};

export default function SeccionBusqueda({
  visible,
  origen,
  onClose,
}: SeccionBusquedaProps) {
  const [modalVisible, setModalVisible] = useState(visible);

  const animacionx = useRef(new Animated.Value(origen.x)).current;

  const animaciony = useRef(new Animated.Value(origen.y)).current;

  const animacionAncho = useRef(new Animated.Value(origen.width)).current;

  const animacionAlto = useRef(new Animated.Value(origen.height)).current;

  const { width: anchoPantalla, height: altoPantalla } = useWindowDimensions();

  useEffect(() => {
    if (visible) {
      setModalVisible(true);

      animacionx.setValue(origen.x);
      animaciony.setValue(origen.y);
      animacionAncho.setValue(origen.width);
      animacionAlto.setValue(origen.height);

      Animated.parallel([
        Animated.timing(animacionx, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animaciony, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animacionAncho, {
          toValue: anchoPantalla,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animacionAlto, {
          toValue: altoPantalla,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animacionx, {
          toValue: origen.x,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animaciony, {
          toValue: origen.y,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animacionAncho, {
          toValue: origen.width,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animacionAlto, {
          toValue: origen.height,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setModalVisible(false);
        }
      });
    }
  }, [visible, origen, anchoPantalla, altoPantalla]);

  return (
    <ScrollView>
      <Modal visible={modalVisible} transparent={true} animationType="none">
        <Animated.View
          style={[
            styles.Contenedor,
            {
              left: animacionx,
              top: animaciony,
              width: animacionAncho,
              height: animacionAlto,
            },
          ]}
        >
          <View style={styles.Seccion1}>
            <View style={styles.ContenedorIz}>
              <Pressable onPress={onClose} style={styles.BotonCerrar}>
                <Ionicons name="chevron-back" size={35} color="#00d2ff" />
              </Pressable>
            </View>
            <View style={styles.CajaTitulo}>
              <Image source={Titulo} style={styles.Titulo} />
            </View>
            <View style={styles.ContenedorDe}>
              <Image source={Logo} style={styles.Logo} resizeMode="cover" />
            </View>
          </View>

          <View style={styles.Seccion2}>
            <View style={styles.BarraBusqueda}>
              <Pressable style={styles.BotonLupa}>
                <Ionicons name="search" size={28} color="#00d2ff" />
              </Pressable>
              <TextInput
                style={styles.Input}
                placeholder="Buscar outfits, estilos, personas..."
                placeholderTextColor="#8A9BB5"
              />
            </View>
          </View>

          <View style={styles.Seccion3}>
            <View style={styles.ContenedorSuperior}>
              <View style={styles.ContenedorSuperiorR}>
                <View style={styles.PuntoAzul} />
                <Text style={styles.TextoRecientes}>Recientes</Text>
              </View>
              <Pressable style={styles.BotonBorrar}>
                <Text style={styles.TextoBorrar}>Borrar todo</Text>
              </Pressable>
            </View>
            <View style={styles.ContenedorInferior}>
              <Pressable style={styles.Reciente}>
                <View style={styles.Contenedor1}>
                  <Text>Imagen</Text>
                  <View style={styles.Descripcion}>
                    <Text style={styles.Nombre}>@sofia_moda</Text>
                    <View style={styles.Contenedor2}>
                      <Text style={styles.Fecha}>Hace 2h</Text>
                      <Text style={styles.TipoBusqueda}>Perfil</Text>
                    </View>
                  </View>
                </View>
                <Pressable style={styles.BotonEliminar}>
                  <Ionicons name="close-sharp" size={24} color="#7f8282" />
                </Pressable>
              </Pressable>
              <Pressable style={styles.Reciente}>
                <View style={styles.Contenedor1}>
                  <Text>Imagen</Text>
                  <View style={styles.Descripcion}>
                    <Text style={styles.Nombre}>Chaqueta Oversize</Text>
                    <View style={styles.Contenedor2}>
                      <Text style={styles.Fecha}>Hace 1 Dia</Text>
                      <Text style={styles.TipoBusqueda}>Prenda</Text>
                    </View>
                  </View>
                </View>
                <Pressable style={styles.BotonEliminar}>
                  <Ionicons name="close-sharp" size={24} color="#7f8282" />
                </Pressable>
              </Pressable>
              <Pressable style={styles.Reciente}>
                <View style={styles.Contenedor1}>
                  <Text>Imagen</Text>
                  <View style={styles.Descripcion}>
                    <Text style={styles.Nombre}>@lukedesign</Text>
                    <View style={styles.Contenedor2}>
                      <Text style={styles.Fecha}>Hace 2 Dias</Text>
                      <Text style={styles.TipoBusqueda}>Perfil</Text>
                    </View>
                  </View>
                </View>
                <Pressable style={styles.BotonEliminar}>
                  <Ionicons name="close-sharp" size={24} color="#7f8282" />
                </Pressable>
              </Pressable>
              <Pressable style={styles.Reciente}>
                <View style={styles.Contenedor1}>
                  <Text>Imagen</Text>
                  <View style={styles.Descripcion}>
                    <Text style={styles.Nombre}>Hoodie Streetwear</Text>
                    <View style={styles.Contenedor2}>
                      <Text style={styles.Fecha}>Hace 3 Dias</Text>
                      <Text style={styles.TipoBusqueda}>Prenda</Text>
                    </View>
                  </View>
                </View>
                <Pressable style={styles.BotonEliminar}>
                  <Ionicons name="close-sharp" size={24} color="#7f8282" />
                </Pressable>
              </Pressable>
            </View>
          </View>

          <View style={styles.Seccion4}>
            <View style={styles.ContenedorSuperior4}>
              <View style={styles.PuntoAzul} />
              <Text style={styles.TextoSugerencias}>Sugerencias para ti</Text>
            </View>
            <View style={styles.ContenedorInferior4}>
              <Pressable style={styles.Card}>
                <Text>Imagen perfil</Text>
                <Text style={styles.Name}>emma_style</Text>
                <Pressable style={styles.BotonSeguir}>
                  <Text style={styles.TextoSeguir}>Seguir</Text>
                </Pressable>
              </Pressable>
              <Pressable style={styles.Card}>
                <Text>Imagen perfil</Text>
                <Text style={styles.Name}>dani_looks</Text>
                <Pressable style={styles.BotonSeguir}>
                  <Text style={styles.TextoSeguir}>Seguir</Text>
                </Pressable>
              </Pressable>
              <Pressable style={styles.Card}>
                <Text>Imagen perfil</Text>
                <Text style={styles.Name}>tienda_flux</Text>
                <Pressable style={styles.BotonSeguir}>
                  <Text style={styles.TextoSeguir}>Seguir</Text>
                </Pressable>
              </Pressable>
              <Pressable style={styles.Card}>
                <Text>Imagen perfil</Text>
                <Text style={styles.Name}>vika_fashion</Text>
                <Pressable style={styles.BotonSeguir}>
                  <Text style={styles.TextoSeguir}>Seguir</Text>
                </Pressable>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Contenedor: {
    position: "absolute",
    backgroundColor: "#030508",
    overflow: "hidden",
    padding: 7,
  },
  Seccion1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    marginTop: 10,
    width: "100%",
  },
  ContenedorIz: {
    width: "25%",
    marginLeft: 10,
  },
  BotonCerrar: {
    height: 35,
    width: 30,
  },
  ContenedorMedio: {
    flexDirection: "row",
    width: "40%",
    height: 50,
  },
  CajaTitulo: {
    height: 70,
  },
  Titulo: {
    width: 130,
    height: 80,
    marginRight: 25,
  },
  ContenedorDe: {
    marginRight: 10,
  },
  Logo: {
    width: 55,
    height: 70,
  },
  Seccion2: {
    height: 40,
    marginTop: 20,
  },
  BarraBusqueda: {
    borderRadius: 28,
    borderColor: "#00d2ff",
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    width: "93%",
    marginLeft: 13,
  },
  BotonLupa: {
    width: 28,
    height: 28,
    marginLeft: 5,
  },
  Input: {
    flex: 1,
    fontSize: 18,
    height: "100%",
  },
  Seccion3: {
    flexDirection: "column",
  },
  ContenedorSuperior: {
    height: 50,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  ContenedorSuperiorR: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  TextoRecientes: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 10,
  },
  BotonBorrar: {
    width: "25%",
  },
  TextoBorrar: {
    fontSize: 17,
    color: "#00d2ff",
  },
  ContenedorInferior: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 375,
    marginTop: 15,
  },
  Reciente: {
    backgroundColor: "#111114da",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: 87,
  },
  Contenedor1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Descripcion: {
    flexDirection: "column",
  },
  Nombre: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "600",
  },
  Contenedor2: {
    flexDirection: "row",
  },
  Fecha: {
    color: "#b5b5b5",
    fontSize: 14,
  },
  TipoBusqueda: {
    color: "#b5b5b5",
    fontSize: 14,
  },
  BotonEliminar: {
    height: 38,
    width: 35,
    borderRadius: 19,
    backgroundColor: "#222325",
    alignItems: "center",
    justifyContent: "center",
  },
  Seccion4: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ContenedorSuperior4: {
    width: "100%",
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  TextoSugerencias: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    textAlign: "left",
    marginLeft: 10,
  },
  ContenedorInferior4: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  Card: {
    backgroundColor: "#111114da",
    borderRadius: 15,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "24%",
    height: 170,
    padding: 5,
  },
  Name: {
    color: "#cdcdcd",
    fontSize: 17,
  },
  BotonSeguir: {
    backgroundColor: "#00d0ffeb",
    width: "80%",
    height: 35,
    justifyContent: "center",
    borderRadius: 20,
  },
  TextoSeguir: {
    fontSize: 15,
    textAlign: "center",
  },
  PuntoAzul: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#00d2ff",
  },
});
