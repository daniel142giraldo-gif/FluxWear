import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";

import {
    Animated,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View
} from "react-native";

import Logo from '@/assets/images/Logo10.png';

type OrigenChat = {
    x: number;
    y: number;
    width: number;
    height: number;
};

type SeccionChatIAProps = {
    visible: boolean;
    origen: OrigenChat;
    onClose: () => void;
};

export default function SeccionChatIA({
    visible,
    origen,
    onClose,
}: SeccionChatIAProps) {

    const [modalVisible, setModalVisible] = useState(visible);

    const animacionX = useRef(
        new Animated.Value(origen.x)
    ).current;

    const animacionY = useRef(
        new Animated.Value(origen.y)
    ).current;

    const animacionAncho = useRef(
        new Animated.Value(origen.width)
    ).current;

    const animacionAlto = useRef(
        new Animated.Value(origen.height)
    ).current;

    const { width: anchoPantalla, height: altoPantalla } = useWindowDimensions();

    useEffect(() => {
        if (!visible) return;
            
            setModalVisible(true);

            animacionX.setValue(origen.x);
            animacionY.setValue(origen.y);
            animacionAncho.setValue(origen.width);
            animacionAlto.setValue(origen.height);

            Animated.parallel([
                Animated.timing(animacionX, {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: false,
                }),
                Animated.timing(animacionY, {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: false,
                }),
                Animated.timing(animacionAncho, {
                    toValue: anchoPantalla,
                    duration: 350,
                    useNativeDriver: false,
                }),
                Animated.timing(animacionAlto, {
                    toValue: altoPantalla,
                    duration: 350,
                    useNativeDriver: false,
                }),
            ]).start();
    }, [
        visible,
        origen.x,
        origen.y,
        origen.width,
        origen.height,
        anchoPantalla,
        altoPantalla,
    ])

    const cerrarChat = () => {
        Animated.parallel([
            Animated.timing(animacionX, {
                    toValue: origen.x,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(animacionY, {
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
                    onClose();
                }
            });
    };

    return (
        <Modal
          visible={modalVisible}
          transparent
          animationType="none"
          statusBarTranslucent
          onRequestClose={cerrarChat}
        >
          <Animated.View
            style={[
              styles.contenedorModal,
              {
                left: animacionX,
                top: animacionY,
                width: animacionAncho,
                height: animacionAlto,
              },
            ]}
          >
            
            <Pressable
                onPress={cerrarChat}
                style={styles.BotonCerrar}
             >
                <Ionicons name="chevron-back" size={35} color="#00d2ff" />
            </Pressable>
            <View style={styles.Seccion1}>
                <View style={styles.ContenedorLogo}>
                    <Image
                      source={Logo}
                      style={styles.Logo}
                      resizeMode="cover"
                    />
                </View>
                <Text style={styles.TextoSeccion1}>FluxWear ChatIA</Text>
            </View>
            <Pressable style={styles.SeccionChat}>
                <Ionicons name="mic-outline" size={24} color="#8A9BB5" />
                <TextInput
                    style={styles.Input}
                    placeholder="Preguntale a tu acesor personal..."
                    placeholderTextColor="#8A9BB5"
                    editable={false}
                    pointerEvents="none"
                />
                <Pressable style={styles.BotonChat}>
                    <Ionicons name="paper-plane" size={20} color="#fff" />
                </Pressable>
            </Pressable>
          </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create ({
    contenedorModal: {
        position: "absolute",
        backgroundColor: "#03040c",
        overflow: "hidden",
        borderRadius: 0,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    BotonCerrar: {
        height: 35,
        width: 30,
        marginTop: 40,
    },
    Seccion1: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 120,
        marginTop: 30,
    },
    ContenedorLogo: {
        height: 75,
        width: 75,
        borderColor: "#1c5d7b",
        borderWidth: 1.5,
        borderRadius: 65,
        justifyContent: "center",
        alignItems: "center",
    },
    Logo: {
        width: 90,
        height: 110,
        marginTop: 10,
    },
    TextoSeccion1: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "600",
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
})