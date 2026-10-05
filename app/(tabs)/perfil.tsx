import { Ionicons } from '@expo/vector-icons';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

export default function Perfil () {

    return (
        <View style={styles.Fondo}>
            <ScrollView contentContainerStyle={styles.Contenido} showsVerticalScrollIndicator={false}>
                <View style={styles.Header}>
                    <Text>Monograma</Text>
                    <View style={styles.BotonesHeader}>
                        <Ionicons name="notifications-outline" size={24} color="#fff" style={{marginRight: 16}} />
                        <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
                    </View>
                </View>
    
                <View style={styles.SeccionSuperior}>
                    <Text style={styles.FotoPerfil}>Foto perfil</Text>
                    <Text style={styles.Nombre}>Kora_Neon</Text>
                    <Text style={styles.NombreUsuario}>@flux_queen_kora</Text>
                    <View style={styles.InformacionPersonal}>
                        <Text style={styles.Informacion}>Editorial stylist</Text>
                        <Text style={styles.Informacion}>Sustainable fashion</Text>
                        <Text style={styles.Informacion}>NYC</Text>
                    </View>
                </View>
    
                <View style={styles.SeccionBotones}>
                    <View style={styles.Botones1}>
                        <Pressable style={styles.Contenedor1}>
                            <Text style={styles.Texto1}>Follow</Text>
                        </Pressable>
                        <Pressable style={styles.Contenedor1}>
                            <Text style={styles.Texto1}>Message</Text>
                        </Pressable>
                    </View>

                    <LinearGradient
                        colors={['#2DD4FF', '#0899e1', '#0a4aca']}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        style={styles.BotonEditar}
                    >
                        <Pressable style={styles.BotonEditar}>
                           <Text style={styles.TextoEditar}>Edit Profile</Text>
                        </Pressable>
                    </LinearGradient>
    
                    <View style={styles.Botones2}>
                        <Pressable style={styles.Contenedor2}>
                            <Text style={styles.Texto2}>1,247</Text>
                            <Text style={styles.Texto3}>Posts</Text>
                        </Pressable>
                        <Pressable style={styles.Contenedor2}>
                            <Text style={styles.Texto2}>56.3K</Text>
                            <Text style={styles.Texto3}>Seguidores</Text>
                        </Pressable>
                        <Pressable style={styles.Contenedor2}>
                            <Text style={styles.Texto2}>412</Text>
                            <Text style={styles.Texto3}>Seguidos</Text>
                        </Pressable>
                    </View>
    
                    <View style={styles.Destacados}>
                        <View style={styles.ContenedorDestacado}>
                            <Pressable style={styles.BotonDestacado}>
                                <Text>Imagen</Text>
                            </Pressable>
                            <Text style={styles.DescripcionDestacado}>LookBook</Text>
                        </View>
                        <View style={styles.ContenedorDestacado}>
                            <Pressable style={styles.BotonDestacado}>
                                <Text>Imagen</Text>
                            </Pressable>
                            <Text style={styles.DescripcionDestacado}>Campaigns</Text>
                        </View>
                        <View style={styles.ContenedorDestacado}>
                            <Pressable style={styles.BotonDestacado}>
                                <Text>Imagen</Text>
                            </Pressable>
                            <Text style={styles.DescripcionDestacado}>Paris</Text>
                        </View>
                        <View style={styles.ContenedorDestacado}>
                            <Pressable style={styles.BotonDestacado}>
                                <Text>Imagen</Text>
                            </Pressable>
                            <Text style={styles.DescripcionDestacado}>Editorial</Text>
                        </View>
                    </View>
                </View>
    
                <View style={styles.SeccionPublicaciones}>
                    <Pressable style={styles.Opcion}>
                        <Text>Grid</Text>
                    </Pressable>
                    <Pressable style={styles.Opcion}>
                        <Text>Escaneos</Text>
                    </Pressable>
                    <Pressable style={styles.Opcion}>
                        <Text>Guardados</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create ({
    Fondo: {
        flex: 1,
        backgroundColor: "#06080efa",
    },
    Contenido: {
        paddingBottom: 120,
        paddingHorizontal: 16,
    },
    Header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 20,
    },
    BotonesHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    SeccionSuperior: {
        alignItems: "center",
        gap: 6,
    },
    FotoPerfil: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#12151F",
    },
    Nombre: {
        fontSize: 20,
        color: '#00D1FF',
        fontWeight: "600",
        marginTop: 8,
    },
    NombreUsuario: {
        fontSize: 14,
        color: "#8A9BB5",
    },
    InformacionPersonal: {
        flexDirection: "row",
        marginTop: 4,
    },
    Informacion: {
        fontSize: 13,
        color: "#a6adb7",
        textAlign: "center",
    },
    SeccionBotones: {
        marginTop: 20,
        gap: 12,
    },
    Botones1: {
        flexDirection: "row",
        gap: 12,
    },
    Contenedor1: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#1E232F",
        alignItems:"center",
        paddingVertical: 10,
    },
    Texto1: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },
    BotonEditar: {
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    TextoEditar: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
    Botones2: {
        flexDirection: "row",
        backgroundColor: "#0F121C",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#1E232F",
        paddingVertical: 12,
        marginTop: 4,
    },
    Contenedor2: {
        flex: 1,
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#1E232F",
    },
    Texto2: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "700",
    },
    Texto3: {
        fontSize: 12,
        color: "#8A9BB5",
    },
    Destacados: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    ContenedorDestacado: {
        alignItems: "center",
        gap: 6,
    },
    BotonDestacado: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 1.5,
        borderColor: "#2A2E3A",
        backgroundColor: "#12151F",
        justifyContent: "center",
        alignItems: "center",
    },
    DescripcionDestacado: {
        fontSize: 11,
        color: "#8A9BB5",
    },
    SeccionPublicaciones: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 24,
        borderTopWidth: 1,
        borderTopColor: "#1E232F",
        paddingTop: 10,
    },
    Opcion: {
        padding: 6,
    },
})