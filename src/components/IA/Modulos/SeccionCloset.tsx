import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ComponentProps, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

type ClosetProps = {
  visible: boolean;
  onClose: () => void;
};

type IconoPrenda = ComponentProps<typeof MaterialCommunityIcons>["name"];

type Categoria =
  | "camisetas"
  | "pantalones"
  | "chaquetas"
  | "zapatos"
  | "accesorios";

type CategoriaFiltro = "todo" | Categoria;

type Prenda = {
  id: string;
  nombre: string;
  tipo: string;
  color: string;
  categoria: Categoria;
  // Cuando tengas la foto de la prenda: imagen: require("@/assets/images/MiPrenda.png")
  imagen?: ImageSourcePropType;
};

const CATEGORIAS: {
  id: CategoriaFiltro;
  etiqueta: string;
  icono: IconoPrenda;
}[] = [
  { id: "todo", etiqueta: "Todo", icono: "hanger" },
  { id: "camisetas", etiqueta: "Camisetas", icono: "tshirt-crew-outline" },
  { id: "pantalones", etiqueta: "Pantalones", icono: "wardrobe-outline" },
  { id: "chaquetas", etiqueta: "Chaquetas", icono: "coat-rack" },
  { id: "zapatos", etiqueta: "Zapatos", icono: "shoe-sneaker" },
  { id: "accesorios", etiqueta: "Accesorios", icono: "hat-fedora" },
];

const PRENDAS: Prenda[] = [
  { id: "1", nombre: "Buzo Nike", tipo: "Hoodie", color: "Negro", categoria: "chaquetas" },
  { id: "2", nombre: "Camiseta Nike", tipo: "Camiseta", color: "Blanco", categoria: "camisetas" },
  { id: "3", nombre: "Jean Relaxed", tipo: "Pantalón", color: "Azul", categoria: "pantalones" },
  { id: "4", nombre: "Chaqueta TNF", tipo: "Chaqueta", color: "Negro", categoria: "chaquetas" },
  { id: "5", nombre: "Air Force 1", tipo: "Zapatillas", color: "Blanco", categoria: "zapatos" },
  { id: "6", nombre: "Buzo Oversize", tipo: "Hoodie", color: "Café", categoria: "chaquetas" },
  { id: "7", nombre: "Gorra NY", tipo: "Accesorio", color: "Negro", categoria: "accesorios" },
  { id: "8", nombre: "Cargo", tipo: "Pantalón", color: "Beige", categoria: "pantalones" },
  { id: "9", nombre: "Suéter", tipo: "Suéter", color: "Crema", categoria: "chaquetas" },
];

const COLUMNAS = 3;
const PADDING_LATERAL = 20;
const SEPARACION = 10;

// Quita tildes y mayúsculas para que "camiseta" encuentre "Camíseta"
const normalizar = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const TarjetaPrenda = ({ prenda, ancho }: { prenda: Prenda; ancho: number }) => {
  const icono =
    CATEGORIAS.find((c) => c.id === prenda.categoria)?.icono ?? "hanger";

  return (
    <Pressable style={[styles.Card, { width: ancho }]}>
      <View style={styles.ContenedorEscaner}>
        <Ionicons name="scan-outline" size={20} color="#00d2ff" />
      </View>

      <View style={styles.ContenedorImagen}>
        {prenda.imagen ? (
          <Image
            source={prenda.imagen}
            style={styles.ImagenPrenda}
            resizeMode="contain"
          />
        ) : (
          <MaterialCommunityIcons name={icono} size={54} color="#1d3c5c" />
        )}
      </View>

      <View style={styles.InfoPrenda}>
        <MaterialCommunityIcons name={icono} size={18} color="#cfd8e3" />
        <View style={styles.TextosPrenda}>
          <Text style={styles.NombrePrenda} numberOfLines={1}>
            {prenda.nombre}
          </Text>
          <Text style={styles.DetallePrenda} numberOfLines={1}>
            {prenda.tipo} · {prenda.color}
          </Text>
        </View>
        <Pressable style={styles.BotonOpciones} hitSlop={8}>
          <Ionicons name="ellipsis-vertical" size={16} color="#cfd8e3" />
        </Pressable>
      </View>
    </Pressable>
  );
};

export const Closet = ({ visible, onClose }: ClosetProps) => {
  const { width: anchoPantalla } = useWindowDimensions();
  const [categoriaActiva, setCategoriaActiva] =
    useState<CategoriaFiltro>("todo");
  const [busqueda, setBusqueda] = useState("");

  const anchoCard =
    (anchoPantalla - PADDING_LATERAL * 2 - SEPARACION * (COLUMNAS - 1)) /
    COLUMNAS;

  const textoBusqueda = normalizar(busqueda.trim());

  const prendasFiltradas = PRENDAS.filter((prenda) => {
    const coincideCategoria =
      categoriaActiva === "todo" || prenda.categoria === categoriaActiva;
    const coincideTexto =
      textoBusqueda === "" ||
      normalizar(`${prenda.nombre} ${prenda.tipo} ${prenda.color}`).includes(
        textoBusqueda,
      );
    return coincideCategoria && coincideTexto;
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <LinearGradient
        colors={["#02050b", "#041226", "#02050b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <KeyboardAvoidingView
        style={styles.Fondo}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.Header}>
          <View style={styles.ContenedorIz}>
            <Pressable onPress={onClose} style={styles.BotonAtras}>
              <Ionicons name="chevron-back" size={35} color="#00d2ff" />
            </Pressable>
            <View style={styles.Titulos}>
              <Text style={styles.Titulo}>Mi Clóset</Text>
              <Text style={styles.Subtitulo}>
                Escanea, organiza y viste lo que tienes.
              </Text>
            </View>
          </View>
          <Pressable style={styles.BotonCampana}>
            <Ionicons name="notifications-outline" size={28} color="#fff" />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.ScrollChips}
          contentContainerStyle={styles.ContenedorChips}
        >
          {CATEGORIAS.map((categoria) => {
            const activa = categoria.id === categoriaActiva;
            return (
              <Pressable
                key={categoria.id}
                style={[styles.Chip, activa && styles.ChipActivo]}
                onPress={() => setCategoriaActiva(categoria.id)}
              >
                <MaterialCommunityIcons
                  name={categoria.icono}
                  size={22}
                  color={activa ? "#031018" : "#e1e8f0"}
                />
                <Text
                  style={[styles.TextoChip, activa && styles.TextoChipActivo]}
                >
                  {categoria.etiqueta}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <FlatList
          data={prendasFiltradas}
          keyExtractor={(item) => item.id}
          numColumns={COLUMNAS}
          style={styles.Lista}
          contentContainerStyle={styles.ContenidoLista}
          columnWrapperStyle={styles.FilaLista}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TarjetaPrenda prenda={item} ancho={anchoCard} />
          )}
          ListEmptyComponent={
            <View style={styles.SinResultados}>
              <MaterialCommunityIcons name="hanger" size={48} color="#1d3c5c" />
              <Text style={styles.TextoSinResultados}>
                No encontramos prendas con esa búsqueda
              </Text>
            </View>
          }
        />

        <View style={styles.ContenedorBarra}>
          <View style={styles.BarraBusqueda}>
            <Ionicons name="search" size={26} color="#00d2ff" />
            <TextInput
              style={styles.Input}
              placeholder="Buscar en tu clóset..."
              placeholderTextColor="#6f86a3"
              value={busqueda}
              onChangeText={setBusqueda}
              returnKeyType="search"
            />
            <Pressable style={styles.BotonFiltros} hitSlop={8}>
              <Ionicons name="options-outline" size={26} color="#00d2ff" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({

  Fondo: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#090B0D",
  },
  Header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  ContenedorIz: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    flex: 1,
  },
  BotonAtras: {
    marginTop: 2,
  },
  Titulos: {
    flex: 1,
  },
  Titulo: {
    fontSize: 34,
    fontWeight: "700",
    color: "#ffffff",
  },
  Subtitulo: {
    fontSize: 15,
    color: "#8A9BB5",
    marginTop: 4,
  },
  BotonCampana: {
    marginTop: 8,
    marginRight: 8,
  },
  ScrollChips: {
    flexGrow: 0,
    marginTop: 24,
  },
  ContenedorChips: {
    paddingHorizontal: PADDING_LATERAL,
    gap: 10,
  },
  Chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: "#08182b",
    borderWidth: 1,
    borderColor: "#13395a",
  },
  ChipActivo: {
    backgroundColor: "#00d2ff",
    borderColor: "#00d2ff",
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  TextoChip: {
    fontSize: 16,
    color: "#e1e8f0",
  },
  TextoChipActivo: {
    color: "#031018",
    fontWeight: "600",
  },
  Lista: {
    flex: 1,
    marginTop: 20,
  },
  ContenidoLista: {
    paddingHorizontal: PADDING_LATERAL,
    paddingBottom: 20,
    gap: SEPARACION,
  },
  FilaLista: {
    gap: SEPARACION,
  },
  Card: {
    aspectRatio: 0.76,
    backgroundColor: "#071426",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#12324d",
    padding: 8,
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  ContenedorEscaner: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  ContenedorImagen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 14,
  },
  ImagenPrenda: {
    width: "100%",
    height: "100%",
  },
  InfoPrenda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  TextosPrenda: {
    flex: 1,
  },
  NombrePrenda: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
  DetallePrenda: {
    fontSize: 10,
    color: "#8A9BB5",
    marginTop: 1,
  },
  BotonOpciones: {
    paddingHorizontal: 2,
  },
  SinResultados: {
    alignItems: "center",
    gap: 12,
    marginTop: 60,
  },
  TextoSinResultados: {
    fontSize: 15,
    color: "#8A9BB5",
    textAlign: "center",
  },
  ContenedorBarra: {
    paddingHorizontal: PADDING_LATERAL,
    paddingTop: 10,
    marginBottom: 30,
  },
  BarraBusqueda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 64,
    paddingHorizontal: 20,
    borderRadius: 32,
    backgroundColor: "#08182b",
    borderWidth: 1.2,
    borderColor: "#13507a",
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  Input: {
    flex: 1,
    fontSize: 18,
    color: "#ffffff",
  },
  BotonFiltros: {
    padding: 2,
  },
});