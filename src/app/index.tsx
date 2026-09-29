import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { router } from "expo-router";

import { useUsuarios } from '../context/UsuarioContext';

import FondoInicio from '../../assets/images/FondoInicio.png';

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const {usuarios, setUsuarioActual} = useUsuarios();

  const inicioSesion = () => {
    const usuarioEncontrado = usuarios.find(
        (usuario) =>
            usuario.correo === correo &&
            usuario.password === contraseña
    );
  
    if (!usuarioEncontrado) {
      alert("Correo o contraseña incorrectos");
      return;
    }
  
    setUsuarioActual(usuarioEncontrado);
  
    router.push("/inicio");
  }  
  
  return (
    <View style={styles.Fondo}>
      <ImageBackground
        source={FondoInicio}
        style={styles.ImagenFondo}
        >
      <View style={styles.Sombra}>
        <View style={styles.ContenedorForm}>
          <View style={styles.CajaForm}>
            <View>
              <Text>imagen</Text>
            </View>
    
            <View style={styles.CajaTitulo}>
              <Text style={styles.Titulo}>Flux</Text>
              <Text style={styles.Titulo1}>Wear</Text>
            </View>
    
            <View style={styles.CajaSubTitulo}>
              <Text style={styles.SubTitulo}>Step into the future of fashion.</Text>
            </View>
    
            <View style={styles.Formulario}>
              <View style={styles.Correo}>
                <Text style={styles.label}>CORREO ELECTRONICO</Text>
    
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu correo"
                  value={correo}
                  onChangeText={setCorreo}
                />
              </View>
    
              <View style={styles.Contraseña}> 
                <Text style={styles.label}>CONTRASEÑA</Text>
                <Pressable style={styles.Boton1}>
                  <Text style={styles.Recuperar}>¿Olvidaste tu contraseña?</Text>
                </Pressable>
              </View>
    
              <View style={styles.Contra}>
    
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu contraseña"
                  value={contraseña}
                  onChangeText={setContraseña}
                  secureTextEntry
                />
              </View>
    
              <View style={styles.Botones}>
                <Pressable 
                  style={styles.Boton}
                  onPress={inicioSesion}>
                  <Text style={styles.TextoInicio}>Iniciar sesion</Text>
                </Pressable>
              </View>
    
              <View style={styles.Opciones}>
                <View style={styles.Lineas}></View>
                <Text style={styles.Texto}>O INICIA SESION CON</Text>
                <View style={styles.Lineas}></View>
              </View>
    
              <View style={styles.BotonesP}>
                <Pressable style={styles.Boton3}>
                  <Text style={styles.TextoS}>Google</Text>
                </Pressable>
    
                <Pressable style={styles.Boton3}>
                  <Text style={styles.TextoS}>Apple</Text>
                </Pressable>
              </View>
    
              <View style={styles.NuevoFlux}>
                <Text style={styles.Nuevo}>Nuevo en FluxWear</Text>
    
                <Pressable
                  style={styles.Boton2}
                  onPress={() => router.push("/registro")}
                >
                  <Text style={styles.textoCrear}>Crear Cuenta</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  Sombra: {
    height: "100%",
    backgroundColor: "#0a0e169a",
  },
  Fondo: {
    height: "100%",
  },
  ImagenFondo: {
    height: "100%",
  },
  ContenedorForm: {
    height: 650,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 130,
  },
  CajaForm: {
    width: "85%",
    height: 650,
    backgroundColor: "#030914",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(0, 210, 255, 0.35)",
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
    padding: 5,
  },
  CajaTitulo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
  Titulo1: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00d2ff",
    letterSpacing: 0.5,
  },
  CajaSubTitulo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  SubTitulo: {
    fontSize: 16,
    color: "#e3e8ee",
  },
  Formulario: {
    width: "100%",
  },
  Correo: {
    width: "90%",
    marginLeft: 15,
    marginTop: 40,
  },
  Contraseña: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginLeft: 15,
    marginTop: 20,
  },
  Contra: {
    width: "90%",
    marginLeft: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#f3f3f3",
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    fontSize: 20,
    backgroundColor: "#171921",
    borderRadius: 17,
    borderColor: "#303133",
    borderWidth: 1,
    height: 50,
    color: "#b7b7b7",
  },
  Botones: {
    width: "90%",
    marginLeft: 15,
  },
  BotonesP: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
    marginLeft: 15,
    width: "90%",
  },
  Boton: {
    backgroundColor: "#00C3FF",
    borderRadius: 30,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  TextoInicio: {
    color: "#0c141f",
    fontSize: 17,
  },
  Boton1: {
    marginBottom: 8,
  },
  Recuperar: {
    color: "#00C3FF",
    fontSize: 13,
    marginRight: 10,
  },
  Opciones: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginLeft: 13,
    marginTop: 13,
  },
  Lineas: {
    backgroundColor: "#18212d",
    height: 3,
    width: "27%",
  },
  Texto: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.8,
    paddingHorizontal: 10,
  },
  TextoS: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  Boton3: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#131922",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1E293B",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  NuevoFlux: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "65%",
    alignItems: "center",
    marginLeft: 50,
  },
  Nuevo: {
    color: "#94A3B8",
    fontSize: 16,
  },
  Boton2: {
    width: 110,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textoCrear: {
    color: "#00d2ff",
  },
});
