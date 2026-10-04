import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

export default function IA () {
    return (
        <View style={styles.Fondo}>
            <View style={styles.SeccionTitulo}>
                <Text>Logo</Text>
                <Text style={styles.TituloPrincipal}>Escaner IA</Text>
                <Text style={styles.Parrafo}>
                    Escanea tu cuerpo con IA y recibe outfits personalizados según tu estilo y apariencia
                </Text>
            </View>

            <View style={styles.SeccionEscaner}>
                <Text style={styles.ImagenEscanear}>Imagen escaner</Text>
                <Pressable style={styles.BotonEscanear}>
                    <Text>Camara boton escaner</Text>
                    <Text style={styles.TextoEscanear}>Escanear ahora</Text>
                </Pressable>
            </View>

            <View style={styles.SeccionFunciones}>
                <Text style={styles.TituloFuncion}>¿Qué función IA deseas usar?</Text>
                <View style={styles.Funciones}>
                    <Pressable style={styles.BotonFunciones}>
                        <Text>Imagen detectar prendas</Text>
                        <Text style={styles.TextoFunciones}>Detectar Prendas</Text>
                    </Pressable>
                    <Pressable style={styles.BotonFunciones}>
                        <Text>Imagen recomendaciones</Text>
                        <Text style={styles.TextoFunciones}>Recomendar Outfits</Text>
                    </Pressable>
                    <Pressable style={styles.BotonFunciones}>
                        <Text>Imagen estilos</Text>
                        <Text style={styles.TextoFunciones}>Analizar Estilos</Text>
                    </Pressable>
                    <Pressable style={styles.BotonFunciones}>
                        <Text>imagen Colores</Text>
                        <Text style={styles.TextoFunciones}>Analizar Colores</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.SeccionChat}>
                <Text>Imagen Microfono</Text>
                <TextInput
                    style={styles.Input}
                    placeholder="Preguntale a tu acesor personal..."
                />
                <View>
                    <Pressable style={styles.BotonChat}>
                        <Text>Imagen</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Fondo: {
        backgroundColor: "#0A0A0A",
        flex: 1,
        alignItems: "center",
    },
    SeccionTitulo: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "92%",
        height: 190,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: "#00d2ff",
        paddingVertical: 15,
    },
    TituloPrincipal: {
        fontSize: 40,
        color: "#ffffff",
        fontWeight: "700",
    },
    Parrafo: {
        fontSize: 17,
        color: "#ffffff",
        width: "65%",
        textAlign: "center",
    },
    SeccionEscaner: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: 320,
    },
    ImagenEscanear: {
        height: 260,
        backgroundColor: "#00d2ff",
    },
    BotonEscanear: {
        height: 60,
        backgroundColor: "#00d2ff",
        width: 220,
        borderRadius: 40,
        flexDirection: "row",
        alignItems: "center",
    },
    TextoEscanear: {
        color: "#ffffff",
        fontSize: 25,
        fontWeight: "700",
    },
    SeccionFunciones: {
        flexDirection: "column",
        alignItems: "center",
    },
    TituloFuncion: {
        color: "#ffffff",
        fontSize: 19,
        fontWeight: "700",
    },
    Funciones: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    BotonFunciones: {
        width: "21%",
        height: 130,
        backgroundColor: "#151821",
        borderRadius: 26,
        borderWidth: 1.5,
        borderColor: "#2A2F3A",
    },
    TextoFunciones: {
        color: "#ffffff",
        fontSize: 14,
        textAlign: "center",
    },
    SeccionChat: {
        width: "95%",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151821d3",
        height: 70,
    },
    Input: {
        fontSize: 18,
        fontWeight: "400",
    },
    BotonChat: {
        
    },
})