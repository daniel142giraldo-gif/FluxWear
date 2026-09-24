import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { router } from "expo-router";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  return (
    <View style={styles.Fondo}>
      <View style={styles.CajaForm}>
        <View>
          <Text>imagen</Text>
        </View>

        <View style={styles.CajaTitulo}>
          <Text style={styles.Titulo}>FluxWear</Text>
        </View>

        <View>
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

          <View style={styles.Contra}>
            <Text style={styles.label}>CONTRASEÑA</Text>

            <Pressable style={styles.Boton1}>
              <Text style={styles.Recuperar}>¿Olvidaste tu contraseña?</Text>
            </Pressable>

            <TextInput
              style={styles.input}
              placeholder="Ingresa tu contraseña"
              value={contraseña}
              onChangeText={setContraseña}
              secureTextEntry
            />
          </View>

          <View style={styles.Botones}>
            <Pressable style={styles.Boton}>
              <Text>Iniciar sesion</Text>
            </Pressable>
          </View>

          <View>
            <Text style={styles.Texto}>O INICIA SESION CON</Text>
          </View>

          <View style={styles.BotonesP}>
            <Pressable style={styles.Boton3}>
              <Text style={styles.TextoS}>Google</Text>
            </Pressable>

            <Pressable style={styles.Boton3}>
              <Text style={styles.TextoS}>Apple</Text>
            </Pressable>
          </View>

          <View>
            <Text style={styles.Nuevo}>Nuevo en FluxWear</Text>

            <Pressable
              style={styles.Boton2}
              onPress={() => router.push("/Registro")}
            >
              <Text style={styles.textoCrear}>Crear Cuenta</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Fondo: {
    flex: 1,
    backgroundColor: "#030A16",
  },
  CajaForm: {
    height: "75%",
    width: "90%",
    backgroundColor: "rgba(6, 20, 39, 0.88)",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(0, 210, 255, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: "5%",
  },
  CajaTitulo: {
    justifyContent: "center",
    alignItems: "center",
  },
  Titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00d2ff",
    letterSpacing: 0.5,
  },
  SubTitulo: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 4,
    marginBottom: 24,
  },
  Formulario: {
    width: "100%",
  },
  Correo: {},
  Contra: {},
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
  },
  Botones: {},
  BotonesP: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  Boton: {
    backgroundColor: "#00C3FF",
    borderRadius: 25,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  Boton1: {
    marginBottom: 8,
  },
  Recuperar: {
    color: "#00C3FF",
    fontSize: 12,
  },
  Nuevo: {
    color: "#94A3B8",
    fontSize: 13,
  },
  Texto: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    paddingHorizontal: 10,
  },
  TextoS: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  textoCrear: {
    color: "#00d2ff",
  },
  Boton3: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0B192C",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1E293B",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  Boton2: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
