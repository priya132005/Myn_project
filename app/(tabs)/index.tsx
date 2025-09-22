import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface FeaturedProduct {
  id: number;
  source: any;  // Using source instead of image to match the usage
  name: string;
  price: string;
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 1,
    source: require('../../assets/images/img1.png'),
    name: 'Elegant Summer Collection',
    price: '₹999'
  },
  {
    id: 2,
    source: require('../../assets/images/img2.png'),
    name: 'Casual Spring Style',
    price: '₹1,199'
  },
  {
    id: 3,
    source: require('../../assets/images/img3.png'),
    name: 'Designer Evening Wear',
    price: '₹1,499'
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/splash-icon.png')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>

      {/* Featured Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          {FEATURED_PRODUCTS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.featuredItem}>
              <Image
                source={item.source}
                style={styles.featuredImage}
                contentFit="cover"
              />
              <Text style={styles.featuredName}>{item.name}</Text>
              <Text style={styles.featuredPrice}>Starting {item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop By Category</Text>
        <View style={styles.categoryGrid}>
          {['Dresses', 'Tops', 'Accessories', 'Footwear'].map((category) => (
            <TouchableOpacity key={category} style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="shirt-outline" size={24} color="#ff3f6c" />
              </View>
              <Text style={styles.categoryName}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Reels Promotion */}
      <Link href="/reels" style={styles.reelsPromo}>
        <View style={styles.reelsPromoContent}>
          <Ionicons name="play-circle" size={32} color="#fff" />
          <Text style={styles.reelsPromoText}>Watch Fashion Reels</Text>
          <Text style={styles.reelsPromoSubtext}>Shop directly from videos</Text>
        </View>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    width: 120,
    height: 40,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  featuredScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  featuredItem: {
    width: SCREEN_WIDTH * 0.7,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  featuredName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 12,
    paddingBottom: 4,
  },
  featuredPrice: {
    fontSize: 14,
    color: '#ff3f6c',
    fontWeight: '700',
    padding: 12,
    paddingTop: 0,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  categoryItem: {
    width: (SCREEN_WIDTH - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff5f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reelsPromo: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#ff3f6c',
    borderRadius: 12,
    overflow: 'hidden',
  },
  reelsPromoContent: {
    padding: 20,
    alignItems: 'center',
  },
  reelsPromoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  reelsPromoSubtext: {
    color: '#fff',
    opacity: 0.9,
    fontSize: 14,
    marginTop: 4,
  },
});
