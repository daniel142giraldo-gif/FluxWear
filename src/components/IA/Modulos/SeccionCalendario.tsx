import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ComponentProps, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

type CalendarioProps = {
  visible: boolean;
  onClose: () => void;
};

type IconoPrenda = ComponentProps<typeof MaterialCommunityIcons>["name"];

type Vista = "semana" | "mes";

type Clima = "soleado" | "nublado";

type Outfit = {
  descripcion: string;
  clima: Clima;
  max: number;
  min: number;
  prendas: IconoPrenda[];
  // Cuando tengas la foto del outfit: imagen: require("@/assets/images/Outfit1.png")
  imagen?: ImageSourcePropType;
};

const DIAS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const DIAS_CORTOS = ["L", "M", "M", "J", "V", "S", "D"];

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Un outfit de ejemplo por día de la semana (0 = lunes ... 6 = domingo)
const OUTFITS: Outfit[] = [
  {
    descripcion: "Comodidad y estilo para empezar la semana.",
    clima: "soleado",
    max: 18,
    min: 11,
    prendas: ["coat-rack", "wardrobe-outline", "shoe-sneaker", "hat-fedora"],
  },
  {
    descripcion: "Simple pero siempre funciona.",
    clima: "nublado",
    max: 17,
    min: 10,
    prendas: ["coat-rack", "tshirt-crew-outline", "shoe-sneaker", "wardrobe-outline"],
  },
  {
    descripcion: "Un look relajado para seguir con todo.",
    clima: "nublado",
    max: 16,
    min: 10,
    prendas: ["coat-rack", "wardrobe-outline", "shoe-sneaker", "hat-fedora"],
  },
  {
    descripcion: "Cómodo, limpio, siempre en tendencia.",
    clima: "soleado",
    max: 19,
    min: 11,
    prendas: ["tshirt-crew-outline", "wardrobe-outline", "shoe-sneaker"],
  },
  {
    descripcion: "Listo para lo que venga.",
    clima: "soleado",
    max: 20,
    min: 12,
    prendas: ["coat-rack", "tshirt-crew-outline", "wardrobe-outline", "shoe-sneaker"],
  },
  {
    descripcion: "Disfruta el día.",
    clima: "nublado",
    max: 18,
    min: 12,
    prendas: ["coat-rack", "wardrobe-outline", "shoe-sneaker", "hat-fedora"],
  },
  {
    descripcion: "Un buen outfit para cerrar la semana.",
    clima: "soleado",
    max: 19,
    min: 11,
    prendas: ["coat-rack", "wardrobe-outline", "shoe-sneaker", "hat-fedora"],
  },
];

const PADDING_LATERAL = 20;
const SEPARACION = 10;
const PROPORCION_CARD = 0.78;

// Devuelve el lunes de la semana de la fecha dada
const inicioDeSemana = (fecha: Date) => {
  const d = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  const diaSemana = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - diaSemana);
  return d;
};

const sumarDias = (fecha: Date, dias: number) => {
  const d = new Date(fecha);
  d.setDate(d.getDate() + dias);
  return d;
};

const esMismoDia = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const VistaOutfit = ({ outfit }: { outfit: Outfit }) => {
  if (outfit.imagen) {
    return (
      <Image
        source={outfit.imagen}
        style={styles.ImagenOutfit}
        resizeMode="contain"
      />
    );
  }

  return (
    <View style={styles.IconosOutfit}>
      {outfit.prendas.map((icono, i) => (
        <MaterialCommunityIcons
          key={`${icono}-${i}`}
          name={icono}
          size={32}
          color="#2a5a85"
        />
      ))}
    </View>
  );
};

const TarjetaDia = ({
  fecha,
  indice,
  esHoy,
  estilo,
}: {
  fecha: Date;
  indice: number;
  esHoy: boolean;
  estilo: StyleProp<ViewStyle>;
}) => {
  const outfit = OUTFITS[indice];

  return (
    <Pressable style={[styles.Card, esHoy && styles.CardHoy, estilo]}>
      <Text style={styles.TextoDia} numberOfLines={1}>
        {DIAS[indice]} {fecha.getDate()}
      </Text>

      <View style={styles.Clima}>
        <Ionicons
          name={outfit.clima === "soleado" ? "sunny-outline" : "cloud-outline"}
          size={15}
          color="#cfd8e3"
        />
        <Text style={styles.TextoClima}>
          {outfit.max}° / {outfit.min}°
        </Text>
      </View>

      <View style={styles.ContenedorOutfit}>
        <VistaOutfit outfit={outfit} />
      </View>

      <View style={styles.FilaInferior}>
        <Text style={styles.DescripcionOutfit} numberOfLines={2}>
          {outfit.descripcion}
        </Text>
        <Pressable style={styles.BotonMas} hitSlop={8}>
          <Ionicons name="ellipsis-horizontal" size={18} color="#cfd8e3" />
        </Pressable>
      </View>
    </Pressable>
  );
};

export const Calendario = ({ visible, onClose }: CalendarioProps) => {
  const { width: anchoPantalla } = useWindowDimensions();
  const [vista, setVista] = useState<Vista>("semana");
  const [fechaRef, setFechaRef] = useState(() => new Date());

  const hoy = new Date();

  const anchoCard = (anchoPantalla - PADDING_LATERAL * 2 - SEPARACION * 2) / 3;
  const alturaCard = anchoCard / PROPORCION_CARD;

  const inicioSemana = inicioDeSemana(fechaRef);
  const diasSemana = Array.from({ length: 7 }, (_, i) =>
    sumarDias(inicioSemana, i),
  );

  // En vista semana el mes se toma del jueves, para que una semana partida
  // entre dos meses muestre el mes donde cae la mayoría de sus días
  const fechaTitulo = vista === "semana" ? sumarDias(inicioSemana, 3) : fechaRef;
  const etiquetaMes = `${MESES[fechaTitulo.getMonth()]} ${fechaTitulo.getFullYear()}`;

  const moverPeriodo = (direccion: 1 | -1) => {
    if (vista === "semana") {
      setFechaRef(sumarDias(fechaRef, 7 * direccion));
    } else {
      setFechaRef(
        new Date(fechaRef.getFullYear(), fechaRef.getMonth() + direccion, 1),
      );
    }
  };

  const irAHoy = () => setFechaRef(new Date());

  const renderDia = (fecha: Date, indice: number, estilo: StyleProp<ViewStyle>) => (
    <TarjetaDia
      key={indice}
      fecha={fecha}
      indice={indice}
      esHoy={esMismoDia(fecha, hoy)}
      estilo={estilo}
    />
  );

  const estiloCardTres = { width: anchoCard, height: alturaCard };

  const renderMes = () => {
    const anio = fechaRef.getFullYear();
    const mes = fechaRef.getMonth();
    const desfase = (new Date(anio, mes, 1).getDay() + 6) % 7;
    const diasEnMes = new Date(anio, mes + 1, 0).getDate();

    const celdas: (number | null)[] = [
      ...Array.from({ length: desfase }, () => null),
      ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
    ];
    while (celdas.length % 7 !== 0) celdas.push(null);

    const filas: (number | null)[][] = [];
    for (let i = 0; i < celdas.length; i += 7) {
      filas.push(celdas.slice(i, i + 7));
    }

    return (
      <View style={styles.ContenedorMes}>
        <View style={styles.FilaMes}>
          {DIAS_CORTOS.map((letra, i) => (
            <Text key={i} style={styles.EncabezadoDiaMes}>
              {letra}
            </Text>
          ))}
        </View>

        {filas.map((fila, f) => (
          <View key={f} style={styles.FilaMes}>
            {fila.map((dia, c) => {
              if (dia === null) {
                return <View key={c} style={styles.DiaMes} />;
              }
              const fechaDia = new Date(anio, mes, dia);
              const esHoy = esMismoDia(fechaDia, hoy);
              return (
                <Pressable
                  key={c}
                  style={[styles.DiaMes, esHoy && styles.DiaMesHoy]}
                  onPress={() => {
                    setFechaRef(fechaDia);
                    setVista("semana");
                  }}
                >
                  <Text
                    style={[
                      styles.TextoDiaMes,
                      esHoy && styles.TextoDiaMesHoy,
                    ]}
                  >
                    {dia}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}

        <Text style={styles.AyudaMes}>
          Toca un día para ver su outfit de la semana.
        </Text>
      </View>
    );
  };

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

      <ScrollView
        style={styles.Fondo}
        contentContainerStyle={styles.Contenido}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.Header}>
          <View style={styles.ContenedorIz}>
            <Pressable onPress={onClose} style={styles.BotonAtras}>
              <Ionicons name="chevron-back" size={35} color="#00d2ff" />
            </Pressable>
            <View style={styles.Titulos}>
              <Text style={styles.Titulo} numberOfLines={1} adjustsFontSizeToFit>
                Calendario de <Text style={styles.TituloAcento}>Outfits</Text>
              </Text>
              <Text style={styles.Subtitulo}>Tu semana, tus looks, tu estilo.</Text>
            </View>
          </View>
          <Pressable style={styles.BotonHoy} onPress={irAHoy} hitSlop={8}>
            <Ionicons name="calendar-outline" size={30} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.Seccion1}>
          <View style={styles.Calendario}>
            <Pressable onPress={() => moverPeriodo(-1)} hitSlop={8}>
              <Ionicons name="chevron-back" size={22} color="#ffffff" />
            </Pressable>
            <Text
              style={styles.TextoCalendario}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {etiquetaMes}
            </Text>
            <Pressable onPress={() => moverPeriodo(1)} hitSlop={8}>
              <Ionicons name="chevron-forward" size={22} color="#ffffff" />
            </Pressable>
          </View>

          <View style={styles.Segmentado}>
            {(["semana", "mes"] as Vista[]).map((opcion) => {
              const activa = vista === opcion;
              return (
                <Pressable
                  key={opcion}
                  style={[styles.Segmento, activa && styles.SegmentoActivo]}
                  onPress={() => setVista(opcion)}
                >
                  <Text
                    style={[
                      styles.TextoSegmento,
                      activa && styles.TextoSegmentoActivo,
                    ]}
                  >
                    {opcion === "semana" ? "Semana" : "Mes"}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {vista === "semana" ? (
          <View style={styles.Semana}>
            <View style={styles.FilaDias}>
              {diasSemana.slice(0, 3).map((fecha, i) =>
                renderDia(fecha, i, estiloCardTres),
              )}
            </View>
            <View style={styles.FilaDias}>
              {diasSemana.slice(3, 6).map((fecha, i) =>
                renderDia(fecha, i + 3, estiloCardTres),
              )}
            </View>
            <View style={styles.FilaDias}>
              {renderDia(diasSemana[6], 6, { flex: 1, height: alturaCard })}
              <Pressable style={[styles.CardAgregar, { height: alturaCard }]}>
                <View style={styles.CirculoAgregar}>
                  <Ionicons name="add" size={34} color="#cfd8e3" />
                </View>
                <Text style={styles.TituloAgregar}>Agregar outfit</Text>
                <Text style={styles.SubtituloAgregar}>Planea tu próximo look</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          renderMes()
        )}
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({

  Fondo: {
    flex: 1,
    backgroundColor: "#090B0D",
  },
  Contenido: {
    paddingTop: 60,
    paddingBottom: 40,
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
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
  },
  TituloAcento: {
    color: "#3db6ff",
  },
  Subtitulo: {
    fontSize: 15,
    color: "#8A9BB5",
    marginTop: 4,
  },
  BotonHoy: {
    marginTop: 6,
    marginRight: 8,
    marginLeft: 8,
  },
  Seccion1: {
    flexDirection: "row",
    alignItems: "center",
    gap: SEPARACION,
    paddingHorizontal: PADDING_LATERAL,
    marginTop: 24,
  },
  Calendario: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 27,
    backgroundColor: "#08182b",
    borderWidth: 1,
    borderColor: "#13395a",
  },
  TextoCalendario: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "#ffffff",
    marginHorizontal: 6,
  },
  Segmentado: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    padding: 5,
    borderRadius: 27,
    backgroundColor: "#08182b",
    borderWidth: 1,
    borderColor: "#13395a",
  },
  Segmento: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 14,
    borderRadius: 22,
  },
  SegmentoActivo: {
    backgroundColor: "#00d2ff",
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  TextoSegmento: {
    fontSize: 14,
    color: "#cfd8e3",
  },
  TextoSegmentoActivo: {
    color: "#031018",
    fontWeight: "600",
  },
  Semana: {
    paddingHorizontal: PADDING_LATERAL,
    marginTop: 20,
    gap: SEPARACION,
  },
  FilaDias: {
    flexDirection: "row",
    gap: SEPARACION,
  },
  Card: {
    backgroundColor: "#071426",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#12324d",
    padding: 10,
    shadowColor: "#00d2ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  CardHoy: {
    borderColor: "#00d2ff",
  },
  TextoDia: {
    fontSize: 13,
    fontWeight: "600",
    color: "#ffffff",
  },
  Clima: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
  },
  TextoClima: {
    fontSize: 11,
    color: "#cfd8e3",
  },
  ContenedorOutfit: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ImagenOutfit: {
    width: "100%",
    height: "100%",
  },
  IconosOutfit: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    maxWidth: 90,
  },
  FilaInferior: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  DescripcionOutfit: {
    flex: 1,
    fontSize: 10,
    lineHeight: 13,
    color: "#9fb1c8",
  },
  BotonMas: {
    paddingBottom: 2,
  },
  CardAgregar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 20,
    borderWidth: 1.2,
    borderStyle: "dashed",
    borderColor: "#1d4a73",
    backgroundColor: "#050e1c",
  },
  CirculoAgregar: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    borderWidth: 1.2,
    borderColor: "#3a5a7a",
    marginBottom: 6,
  },
  TituloAgregar: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
  },
  SubtituloAgregar: {
    fontSize: 11,
    color: "#8A9BB5",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  ContenedorMes: {
    marginHorizontal: PADDING_LATERAL,
    marginTop: 20,
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#071426",
    borderWidth: 1,
    borderColor: "#12324d",
    gap: 6,
  },
  FilaMes: {
    flexDirection: "row",
  },
  EncabezadoDiaMes: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    color: "#8A9BB5",
    paddingBottom: 6,
  },
  DiaMes: {
    flex: 1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },
  DiaMesHoy: {
    backgroundColor: "#00d2ff",
  },
  TextoDiaMes: {
    fontSize: 15,
    color: "#e1e8f0",
  },
  TextoDiaMesHoy: {
    color: "#031018",
    fontWeight: "700",
  },
  AyudaMes: {
    marginTop: 8,
    fontSize: 12,
    color: "#8A9BB5",
    textAlign: "center",
  },
});