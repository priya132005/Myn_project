import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Myntra Reels Prototype</Text>
      <Text style={styles.subtitle}>Go to the Reels tab to try shopping from videos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#666", paddingHorizontal: 20, textAlign: "center" },
});

