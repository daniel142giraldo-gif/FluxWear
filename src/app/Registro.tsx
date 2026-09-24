import { useRouter } from "expo-router";
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useUsuarios } from '../context/UsuarioContext';

export default function Registro() {

  const router = useRouter();

  const {usuarios, setUsuarios} = useUsuarios();
  const [acepta, setAcepta] = useState(false)

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
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    const usuario = {
      ...nuevoUsuario,
      edad: edad,
      peso: Number(nuevoUsuario.peso),
      estatura: Number(nuevoUsuario.estatura),
    };

    setUsuarios([
      ...usuarios,
      usuario
    ])

    router.push("/");
}


  return (
    <View style={styles.Fondo}>

      <Text  style={styles.CrearCuenta}>Crear Cuenta</Text>
      <View style={styles.Logo}>

      </View>
      <Text style={styles.TituloPrincipal}>FluxWear</Text>

      <View style={styles.Contenedor}>
        <View style={styles.ImagenDatos}>

        </View>
        <Text style={styles.TituloDatos}>Datos personales</Text>

        <View style={styles.Form}>  
  
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu nombre completo"
            value={nuevoUsuario.nombre}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, nombre: text })}
          />
  
          <Text style={styles.label}>Correo Electronico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese su nombre de usuario"
            value={nuevoUsuario.nombre_usuario}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, nombre_usuario: text })}
          />
  
          <Text style={styles.label}>Correo Electronico</Text>
          <TextInput
            style={styles.input}
            placeholder="correo@example.com"
            value={nuevoUsuario.correo}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, correo: text })}
          />
  
          <Text style={styles.label}>Telefono</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu numero de telefono"
            value={nuevoUsuario.telefono}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, telefono: text })}
          />
    
          <Text style={styles.label}>Edad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu edad"
            value={nuevoUsuario.edad}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, edad: text })}
          />
  
          <Text style={styles.label}>Peso</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu peso"
            value={nuevoUsuario.peso}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, peso: text })}
          />
    
          <Text style={styles.label}>Estatura</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu estatura"
            value={nuevoUsuario.estatura}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, estatura: text })}
          />
  
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            value={nuevoUsuario.password}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, password: text })}
          />
    
          <Text style={styles.label}>Confirmar contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña nuevamente"
            value={nuevoUsuario.confirmarPassword}
            onChangeText={(text) => setNuevoUsuario({ ...nuevoUsuario, confirmarPassword: text })}
          />
  
          <Pressable onPress={() => setAcepta(!acepta)}>
            <View>
              <Text>{acepta ? '☑' : '☐'}</Text>
              <Text>Acepto los términos y condiciones</Text>
            </View>
         </Pressable>
  
         <Text>Al crear una cuenta, aceptas nuestros Términos y Condiciones y la Política de Privacidad de FluxWear.</Text>
        </View>
      </View>

      <Pressable style={styles.BotonPrincipal} onPress={registrar}>
        <Text>Crear mi Cuenta</Text>
      </Pressable>

      <Text style={styles.Registrado}></Text>

      <Pressable style={styles.Boton} onPress={() => router.push("/")}>
        <Text>Iniciar Sesion</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Fondo: {
    flex: 1,
    backgroundColor: "#030A16",
  },
  CrearCuenta: {
    
  },
  Logo: {
    justifyContent: "center",
    alignItems: "center",
  },
  TituloPrincipal: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00d2ff",
    letterSpacing: 0.5,
  },
  Contenedor: {
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
  ImagenDatos: {
    
  },
  TituloDatos: {

  },
  Form: {

  },
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
  BotonPrincipal: {

  },
  Registrado: {
    
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
});