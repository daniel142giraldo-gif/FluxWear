import { ScrollView, StyleSheet, Text, View } from 'react-native';

export const NotificationList = () => {
  return (
    <ScrollView style={styles.Fondo} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>

      <View style={styles.Header}>
        <Text style={styles.TextoComentarios}>Comentarios</Text>
        <View style={styles.Separacion} />
        <Text style={styles.ContadorComentarios}>0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Fondo: { 
    backgroundColor: "#080808"
  },
  Header: { 
    flexDirection: 'row', 
    gap: 12, 
    alignItems: "center",
  },
  TextoComentarios: { 
    fontSize: 20,
    color: "#fff",
  },
  ContadorComentarios: { 
    fontSize: 18,
     color: "#aeadad",
  },
  Separacion: { 
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#03b4dc",
  },
});