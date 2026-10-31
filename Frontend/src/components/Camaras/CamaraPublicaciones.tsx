import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from 'expo-camera';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { useEffect, useRef, useState } from "react";

type ComentariosProps = {
  visible: boolean;
  onClose: () => void;
};

export const Camara = ({ visible, onClose }: ComentariosProps) => {

  const [permission, requestPermission] = useCameraPermissions();
  const [camaraFrontal, setCamaraFrontal] = useState(false);
  const [flashActivo, setFlashActivo] = useState(false);
  const [opcionActiva, setOpcionActiva] =  useState<string | null>(null);
  const [mostrarHerramientas, setMostrarHerramientas] = useState(false);

  const animacionHerramientas = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && !permission?.granted && permission?.canAskAgain) {
        requestPermission();
    }
  }, [visible, permission?.granted, permission?.canAskAgain]);

  const alternarHerramientas = () => {
    const mostrar = !mostrarHerramientas;
  
    if (!mostrar) {
      setOpcionActiva(null);
    }
  
    setMostrarHerramientas(mostrar);
  
    Animated.timing(animacionHerramientas, {
      toValue: mostrar ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
      presentationStyle="fullScreen"
    >
      <View style={styles.Fondo}>
        {permission?.granted ? (
          <CameraView
            style={StyleSheet.absoluteFill}
            facing={camaraFrontal ? "front" : "back"}
            enableTorch={flashActivo}
          />
        ) : (
          <View
          />
        )}
        <View style={styles.Header}>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={32} color="#b4b2b2" />
          </Pressable>
          <Pressable>
            <Ionicons onPress={() => setFlashActivo(!flashActivo)} name="flash" size={28} color="#b4b2b2" />
          </Pressable>
          <Pressable>
            <Ionicons onPress={() => setCamaraFrontal(!camaraFrontal)} name="sync" size={32} color="#b4b2b2" />
          </Pressable>
        </View>

        <Animated.View
            pointerEvents="box-none"
            style={[
              styles.ContenedorHerramientas,
              {
                top: "50%",
                transform: [{ translateY: -27.5 }],
              },
            ]}
          >
            <Animated.View
              pointerEvents={mostrarHerramientas ? "auto" : "none"}
              style={[
                styles.PanelHerramientas,
                {
                  opacity: animacionHerramientas,
                  transform: [
                    {
                      translateX: animacionHerramientas.interpolate({
                        inputRange: [0, 1],
                        outputRange: [110, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Pressable
                style={styles.Boton}
                onPress={() =>
                  setOpcionActiva(
                    opcionActiva === "musica" ? null : "musica"
                  )
                }
              >
                <Ionicons name="musical-notes" size={32} color="#b4b2b2" />
                <Text style={styles.TextoBoton}>Música</Text>
              </Pressable>
          
              <View style={styles.Barra} />
          
              <Pressable
                style={styles.Boton}
                onPress={() =>
                  setOpcionActiva(
                    opcionActiva === "tiempo" ? null : "tiempo"
                  )
                }
              >
                <Ionicons name="stopwatch-outline" size={32} color="#b4b2b2" />
                <Text style={styles.TextoBoton}>Tiempo</Text>
              </Pressable>
          
              <View style={styles.Barra} />
          
              <Pressable
                style={styles.Boton}
                onPress={() =>
                  setOpcionActiva(
                    opcionActiva === "velocidad" ? null : "velocidad"
                  )
                }
              >
                <Ionicons name="speedometer-outline" size={32} color="#b4b2b2" />
                <Text style={styles.TextoBoton}>Velocidad</Text>
              </Pressable>
          
              <View style={styles.Barra} />
          
              <Pressable
                style={styles.Boton}
                onPress={() =>
                  setOpcionActiva(
                    opcionActiva === "belleza" ? null : "belleza"
                  )
                }
              >
                <Ionicons name="sparkles" size={32} color="#b4b2b2" />
                <Text style={styles.TextoBoton}>Belleza</Text>
              </Pressable>
            </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: animacionHerramientas.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -110],
                  }),
                },
              ],
            }}
          >
            <Pressable
              style={styles.BotonHerramientas}
              onPress={alternarHerramientas}
            >
              <Ionicons
                name="options-outline"
                size={30}
                color="#ffffff"
              />
            </Pressable>
          </Animated.View>
        </Animated.View>


        {opcionActiva !== null && (
          <View style={styles.MenuOpciones}>
            {opcionActiva === "musica" && (
              <>
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>Sin música</Text>
                </Pressable>
        
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>Elegir música</Text>
                </Pressable>
              </>
            )}
        
            {opcionActiva === "tiempo" && (
              <>
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>15 s</Text>
                </Pressable>
        
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>30 s</Text>
                </Pressable>
        
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>60 s</Text>
                </Pressable>
              </>
            )}
        
            {opcionActiva === "velocidad" && (
              <>
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>0.5x</Text>
                </Pressable>
        
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>1x</Text>
                </Pressable>
        
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>2x</Text>
                </Pressable>
        
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>3x</Text>
                </Pressable>
              </>
            )}
        
            {opcionActiva === "belleza" && (
              <>
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>Natural</Text>
                </Pressable>
        
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>Suave</Text>
                </Pressable>
        
                <Pressable style={styles.Opcion}>
                  <Text style={styles.TextoOpcion}>Intenso</Text>
                </Pressable>
              </>
            )}
          </View>
        )}

        <View style={styles.SeccionInferior}>
          <Pressable style={styles.Boton}>
            <Ionicons name="images-outline" size={32} color="#b4b2b2" />
          </Pressable>
          <Pressable style={styles.BotonFoto}>
            <Ionicons name="ellipse" size={75} color="#fff" />
          </Pressable>
          <Pressable style={styles.Boton}>
            <Text style={styles.TextoBoton}>Filtros</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Fondo: {
    flex: 1,
  },
  Header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: "#070707f0",
  },
  ContenedorHerramientas: {
    position: "absolute",
    right: 0,
    top: "50%",
    zIndex: 20,
    alignItems: "flex-end",
    transform: [{ translateY: -27.5 }]
  },
  PanelHerramientas: {
    position: "absolute",
    right: 0,
    width: 110,
    zIndex: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#070707e8",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    paddingVertical: 12,
  },
  BotonHerramientas: {
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  Boton: {
    padding: 10,
    alignItems: "center",
  },
  TextoBoton: {
    fontSize: 15,
    color: "#b4b2b2",
  },
  Barra: {
    width: "60%",
    borderBottomWidth: 1,
    borderBottomColor: "#616161",
  },
  MenuOpciones: {
  position: "absolute",
  right: "21%",
  zIndex: 20,
  backgroundColor: "#070707eF",
  borderRadius: 15,
  paddingVertical: 8,
  paddingHorizontal: 12,
  minWidth: 80,
},
Opcion: {
  paddingVertical: 12,
  paddingHorizontal: 10,
  alignItems: "center",
},
TextoOpcion: {
  color: "#ffffff",
  fontSize: 15,
},
  SeccionInferior: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 25,
    backgroundColor: "#070707e4",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  BotonFoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#0899e1',
    alignItems: "center",
    justifyContent: "center",
  },
});
