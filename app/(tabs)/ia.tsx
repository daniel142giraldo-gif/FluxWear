import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
    Alert,
    Image,
    Linking,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

export default function IA () {

    const [ permission, requestPermission ] = useCameraPermissions();

    const [showCamera, setShowCamera] = useState(false);

    const abrirEscaner = async () => {

        if (permission && !permission.granted && !permission.canAskAgain) {
            Alert.alert(
                "Permiso necesario",
                "Ve a Configuración para activar la camara",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Abrir Configuración", onPress: () => Linking.openSettings() }
                ]
            );
            return;
        }

        if (!permission?.granted) {
            const { granted } = await requestPermission();
            if (!granted) {
                alert("Necesitas dar permiso de camara para escanear")
                return;
            }
        }
        setShowCamera(true);
    };

    return (
        <>
        <ScrollView style={{flex: 1, backgroundColor: "#0A0A0A"}} contentContainerStyle={styles.Fondo}>
            <View style={styles.SeccionTitulo}>
                <Text style={{fontSize: 24}}>✨</Text>
                <Text style={styles.TituloPrincipal}>Escaner IA</Text>
                <Text style={styles.Parrafo}>
                    Escanea tu cuerpo con IA y recibe outfits personalizados según tu estilo y apariencia
                </Text>
            </View>

            <View style={styles.SeccionEscaner}>
                <Image 
                  style={styles.ImagenEscanear}
                  source={require('@/assets/images/Holograma.png')}
                  resizeMode='contain'
                />
                <Pressable style={styles.BotonWrapper} onPress={abrirEscaner}>
                    <LinearGradient
                        colors={['#2DD4FF', '#0899e1', '#0a4aca']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.BotonEscanear}
                    >
                        <Ionicons name="scan-outline" size={22} color="#fff" />
                        <Text style={styles.TextoEscanear}>Escanear Ahora</Text>
                    </LinearGradient>
                </Pressable>
            </View>

            <View style={styles.SeccionFunciones}>
                <Text style={styles.TituloFuncion}>¿Qué función IA deseas usar?</Text>
                <View style={styles.Funciones}>
                    <Pressable style={styles.BotonFunciones}>
                        <Image source={require('@/assets/images/DetectarPrendas.png')} style={{width: 80, height: 80}} />
                        <Text style={styles.TextoFunciones}>Detectar Prendas</Text>
                    </Pressable>
                    <Pressable style={styles.BotonFunciones}>
                        <Image source={require('@/assets/images/RecomendarOutfits.png')} style={{width: 80, height: 80}} />
                        <Text style={styles.TextoFunciones}>Recomendar Outfits</Text>
                    </Pressable>
                    <Pressable style={styles.BotonFunciones}>
                        <Image source={require('@/assets/images/AnalizarEstilos.png')} style={{width: 80, height: 80}} />
                        <Text style={styles.TextoFunciones}>Analizar Estilos</Text>
                    </Pressable>
                    <Pressable style={styles.BotonFunciones}>
                        <Image source={require('@/assets/images/AnalizarColores.png')} style={{width: 80, height: 80}} />
                        <Text style={styles.TextoFunciones}>Analizar Colores</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.SeccionChat}>
                <Ionicons name="mic-outline" size={24} color="#8A9BB5" />
                <TextInput
                    style={styles.Input}
                    placeholder="Preguntale a tu acesor personal..."
                    placeholderTextColor="#8A9BB5"
                />
                <Pressable style={styles.BotonChat}>
                    <Ionicons name="paper-plane" size={20} color="#fff" />
                </Pressable>
            </View>
        </ScrollView>

        <Modal visible={showCamera} animationType="slide" statusBarTranslucent presentationStyle='fullScreen'>
            <View style={styles.CamaraContainer}>
                {permission?.granted && (
                    <CameraView style={styles.Camara} facing="front">
                        <View style={styles.CamaraHeader}>
                            <Pressable onPress={() => setShowCamera(false)} style={styles.BotonCerrar}>
                                <Ionicons name="close" size={28} color="#fff" />
                            </Pressable>
                            <Text style={styles.TextoCamara}>Coloca tu cuerpo en el marco</Text>
                            <View style={{width: 44}} />
                        </View>
                        <View style={styles.CamaraFooter}>
                            <Pressable style={styles.BotonCapturar} onPress={() => {
                                setShowCamera(false);
                            }}>
                                <View style={styles.CirculoInterno} />
                            </Pressable>
                        </View>
                    </CameraView>
                )}
            </View>
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    Fondo: {
        backgroundColor: "#03040c",
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 120, 
        alignItems: "center",
        gap: 24,
    },
    SeccionTitulo: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: 170,
        borderRadius: 24,
        borderWidth: 1.2,
        borderColor: "#0d71b0",
        backgroundColor: "#12151F",
        paddingVertical: 20,
        paddingHorizontal: 16,
        gap: 10,
        marginTop: 20,
        shadowColor: "#31a9f9",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 16,
    },
    TituloPrincipal: {
        fontSize: 40,
        color: "#ffffff",
        fontWeight: "700",
        letterSpacing: 1,
    },
    Parrafo: {
        fontSize: 13.5,
        color: "#8A9BB5",
        width: "85%",
        textAlign: "center",
        lineHeight: 18,
    },
    SeccionEscaner: {
        alignItems: "center",
        width: "100%",
    },
    ImagenEscanear: {
        height: 340,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BotonWrapper: {
        borderRadius: 40,
        shadowColor: '#00D1FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
        marginTop: -10,
    },
    BotonEscanear: {
        height: 56,
        backgroundColor: "#00d2ff",
        paddingHorizontal: 28,
        borderRadius: 40,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.2,
        borderColor: '#4ddff6',
    },
    TextoEscanear: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "800",
    },
    SeccionFunciones: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        gap: 12,
        marginBottom: 20,
    },
    TituloFuncion: {
        color: "#ffffff",
        fontSize: 17,
        fontWeight: "700",
    },
    Funciones: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        width: "100%",
    },
    BotonFunciones: {
        flex: 1,
        height: 110,
        backgroundColor: "#151821",
        borderRadius: 20,
        borderWidth: 1.2,
        borderColor: "#00D1FF20",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    TextoFunciones: {
        color: "#00D1FF",
        fontSize: 11,
        textAlign: "center",
        marginTop: -10,
    },
    SeccionChat: {
        width: "100%",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#151821",
        height: 62,
        gap: 12,
    },
    Input: {
        fontSize: 18,
        fontWeight: "400",
        color: "#fff",
    },
    BotonChat: {
        width: 42,
        height: 42,
        borderRadius:21,
        backgroundColor: '#00D1FF',
        justifyContent: "center",
        alignItems: "center",
    },
    CamaraContainer: { 
        flex: 1, 
        backgroundColor: "#000",
        width: "100%",
        height: "100%",
    },
    Camara: { 
        flex: 1,
        width: "100%",
        height: "100%",
    },
    CamaraHeader: { 
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingTop: 60, 
        paddingHorizontal: 20,
        paddingBottom: 20,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    BotonCerrar: { 
        width: 44, 
        height: 44, 
        borderRadius: 22, 
        backgroundColor: "rgba(255,255,255,0.2)", 
        justifyContent: "center", 
        alignItems: "center",
    },
    TextoCamara: { 
        color: "#00D1FF", 
        fontWeight: "600",
    },
    CamaraFooter: { 
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        paddingBottom: 50,
        paddingTop: 20,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    BotonCapturar: { 
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        borderWidth: 4,
        borderColor: "#fff", 
        justifyContent: "center", 
        alignItems: "center" 
    },
    CirculoInterno: { 
        width: 64, 
        height: 64,
        borderRadius: 32, 
        backgroundColor: "#fff" 
    },
})