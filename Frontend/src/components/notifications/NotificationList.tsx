import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export const NotificationList = () => {
  return (
    <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>

      {/* ITEM 1 */}
      <View style={styles.item}>
        <View style={[styles.iconCircle, { backgroundColor: '#FF4D6D' }]}>
          <Ionicons name="heart" size={18} color="white" />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.itemTitle}>Nuevo me gusta en tu look</Text>
          <Text style={styles.itemDesc}>
            Chaqueta Oversize — a <Text style={styles.bold}>@sofia_moda</Text> le gustó tu publicación
          </Text>
          <Text style={styles.time}>hace 2 min</Text>
        </View>
      </View>

      <View style={styles.separator} />

      {/* ITEM 2 */}
      <View style={styles.item}>
        <View style={[styles.iconCircle, { backgroundColor: '#3A8DFF' }]}>
          <Text style={{ fontSize: 18 }}>📦</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.itemTitle}>Tu pedido ha sido enviado</Text>
          <Text style={styles.itemDesc}>
            Pedido #FW8821 • En camino, entrega estimada mañana
          </Text>
          <Text style={styles.time}>hace 15 min</Text>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  item: { flexDirection: 'row', gap: 12, paddingVertical: 14 },
  iconCircle: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginTop: 2 },
  textBox: { flex: 1 },
  itemTitle: { color: 'white', fontWeight: '800', fontSize: 14, marginBottom: 4 },
  itemDesc: { color: '#9CA3AF', fontSize: 13, lineHeight: 18 },
  bold: { color: 'white', fontWeight: '700' },
  time: { color: '#9CA3AF', fontSize: 11, textAlign: 'right', marginTop: 6 },
  separator: { height: 1, backgroundColor: '#1F2433', marginLeft: 50 },
});