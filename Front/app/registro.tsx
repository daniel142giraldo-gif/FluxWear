import { useRouter } from "expo-router";
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";


import { useSocialStore } from '../src/features/social/store/useSocialStore';

export default function Registro() {

  const router = useRouter();

  const { registrar: registrarStore } = useSocialStore();
  const [acepta, setAcepta] = useState(false);

  const [nuevoUsuario, setNuevoUsuario] = useState(
    {
      nombre: "",
      nombre_usuario: "",
      correo: "",
      telefono: "",
      edad: "",
      peso: "",
      estatura: "",
      password: "",
      confirmarPassword: ""

    }
  );

  const registrar = () => {

    if (nuevoUsuario.nombre.trim() === "")
      {
        alert("Ingresar nombre completo")
  
        return; 
    }

    if (nuevoUsuario.nombre_usuario.trim() === "")
      {
        alert("Ingresar nombre de usuario")
  
        return; 
    }

    if (nuevoUsuario.correo.trim() === "")
      {
        alert("Ingresar correo electronico")
  
        return; 
    }

    if (nuevoUsuario.password.trim() === "")
      {
        alert("Ingresar contraseña")
  
        return; 
    }

    if (nuevoUsuario.confirmarPassword.trim() === "")
      {
        alert("Ingresar contraseña")
  
        return; 
    }

    if (nuevoUsuario.password !== nuevoUsuario.confirmarPassword)
      {
        alert("Las contraseñas no coinciden")
  
        return; 
    }

    if (nuevoUsuario.telefono.trim() === "")
      {
        alert("Ingresar telefono")
  
        return; 
    }
      
    if (nuevoUsuario.edad.length === 0)
      {
        alert("Ingresar la edad")
  
        return; 
    }

    const edad = Number(nuevoUsuario.edad)

    if(edad < 1 || edad > 100) {
        alert("La edad debe estar entre 1 y 100")
        return;
    }

    if (nuevoUsuario.peso.trim() === "")
      {
        alert("Ingresar el peso") 
  
        return; 
    }

    if (nuevoUsuario.estatura.trim() === "")
      {
        alert("Ingresar la estatura")
  
        return; 
    }

    if (!acepta) { 
      alert("Debes aceptar los términos"); 
      return; 
    }

    const result = registrarStore({
      nombre: nuevoUsuario.nombre,
      nombre_usuario: nuevoUsuario.nombre_usuario,
      correo: nuevoUsuario.correo,
      telefono: nuevoUsuario.telefono,
      edad: Number(nuevoUsuario.edad),
      peso: Number(nuevoUsuario.peso),
      estatura: Number(nuevoUsuario.estatura),
      password: nuevoUsuario.password,
      confirmarPassword: nuevoUsuario.confirmarPassword,
    })

    if(!result.ok){ alert(result.error); return; }
    router.push("/home");
}


  return (
    <ScrollView style={styles.Fondo}>
      <View style={styles.ContenedorForm}>
  
        <Text  style={styles.CrearCuenta}>Crear Cuenta</Text>
        <View style={styles.CajaLogo}>
          <View style={styles.Logo}>
        
          </View>
        </View>
        <View style={styles.CajaTitulo}>
          <Text style={styles.Titulo}>Flux</Text>
          <Text style={styles.Titulo1}>Wear</Text>
        </View>
  
        <View style={styles.Contenedor}>
          <View style={styles.SeccionDetalles}>
            <Text style={styles.TituloDatos}>Detalles personales</Text>
          </View>
  
          <View style={styles.Form}>  
    
            <Text style={styles.label}>Nombres</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu nombre completo"
              value={nuevoUsuario.nombre}
              onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, nombre: text })}
            />
    
            <Text style={styles.label}>Nombre de usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="@ username"
              value={nuevoUsuario.nombre_usuario}
              onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, nombre_usuario: text })}
            />
    
            <Text style={styles.label}>Correo Electronico</Text>
            <TextInput
              style={styles.input}
              placeholder="email@example.com"
              value={nuevoUsuario.correo}
              onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, correo: text })}
            />
    
            <Text style={styles.label}>Telefono</Text>
            <TextInput
              style={styles.input}
              placeholder="3232323232"
              value={nuevoUsuario.telefono}
              onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, telefono: text })}
            />
      
            <Text style={styles.label}>Edad</Text>
            <TextInput
              style={styles.input}
              placeholder="example: 20 años"
              value={nuevoUsuario.edad}
              onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, edad: text })}
            />
    
            <Text style={styles.label}>Peso</Text>
            <TextInput
              style={styles.input}
              placeholder="70 kg"
              value={nuevoUsuario.peso}
              onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, peso: text })}
            />
      
            <Text style={styles.label}>Estatura</Text>
            <TextInput
              style={styles.input}
              placeholder="1.75"
              value={nuevoUsuario.estatura}
              onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, estatura: text })}
            />
    
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="......"
              value={nuevoUsuario.password}
              onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, password: text })}
            />
      
            <Text style={styles.label}>Confirmar contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="......"
              value={nuevoUsuario.confirmarPassword}
              onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, confirmarPassword: text })}
            />

            <View style={styles.SeccionAcepta}>
              <Pressable 
                style={styles.BotonAcepta}
                onPress={() => setAcepta(!acepta)}>
                <Text style={styles.CuadroAcepta}>{acepta ? '☑' : '☐'}</Text>
              </Pressable>
              <View style={styles.CajaTexto}>
                <Text style={styles.TextoAcepta}>Al unirme a FluxWear, acepto los </Text>
                <Text style={styles.TextoAceptaAzul}>Términos y Condiciones y la Política de Procesamiento de IA</Text>
              </View>
            </View>
            <Pressable style={styles.BotonPrincipal} onPress={registrar}>
              <Text style={styles.TextoBoton}>Crear mi Cuenta</Text>
            </Pressable>
      
            <View style={styles.SeccionInferior}>
              <Text style={styles.Registrado}>Ya eres miembro?</Text>
        
              <Pressable style={styles.Boton} onPress={() => router.push("/")}>
                <Text style={styles.TextoBotonInicio}>Iniciar Sesion</Text>
              </Pressable>
            </View>
    
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  Fondo: {
    backgroundColor: "#09090a",
  },
  ContenedorForm: {
    height: 1600,
    width: "95%",
  },
  CrearCuenta: {
    fontSize: 20,
    color: "#ffffff",
    marginLeft: 30,
    marginTop: 50,
    fontWeight: 700,
  },
  CajaLogo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
  Contenedor: {
    width: "92%",
    height: 1330,
    backgroundColor: "#02060f",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(9, 59, 71, 0.35)",
    shadowColor: "#00ddff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 6,
    padding: 15,
    marginLeft: 23,
    marginTop: 30,
  },
  SeccionDetalles: {
    flexDirection: "row",
  },
  ImagenDatos: {
    
  },
  TituloDatos: {
    marginTop: 15,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 700,
  },
  Form: {
    width: "97%",
    marginLeft: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#e1e2e4",
    letterSpacing: 1,
    marginBottom: 18,
    marginTop: 18,
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
  BotonPrincipal: {
    backgroundColor: "#00C3FF",
    borderRadius: 30,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  TextoBoton: {
    color: "#0c141f",
    fontSize: 17,
    fontWeight: 700,
  },
  SeccionAcepta: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    marginTop: 30,
  },
  BotonAcepta: {
    width: 22,
    height: 22,
    backgroundColor: "#00C3FF",
  },
  CuadroAcepta: {
    width: "100%",
    height: "100%",
  },
  CajaTexto: {
    marginLeft: 15,
  },
  TextoAcepta: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  TextoAceptaAzul: {
    color: "#00d2ff",
    fontSize: 16,
  },
  SeccionInferior: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "69%",
    marginLeft: 45,
  },
  Registrado: {
    color: "#b7b0b0",
  },
  Boton: {
    width: 90,

  },
  TextoBotonInicio: {
    color: "#ffffff",
    fontWeight: 700,
  },
});