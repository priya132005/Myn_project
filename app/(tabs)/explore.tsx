import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

// Sample data for trends
const TRENDING_STYLES = [
  { id: 1, name: 'Summer Dresses', image: require('../../assets/images/img1.png') },
  { id: 2, name: 'Casual Chic', image: require('../../assets/images/img2.png') },
  { id: 3, name: 'Evening Wear', image: require('../../assets/images/img3.png') },
];

// Sample data for collections
const COLLECTIONS = [
  { id: 1, name: 'Party Wear', count: '2.5k+ Products' },
  { id: 2, name: 'Office Fashion', count: '1.8k+ Products' },
  { id: 3, name: 'Casual Wear', count: '3k+ Products' },
  { id: 4, name: 'Designer Picks', count: '500+ Products' },
];

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={styles.searchText}>Search for brands & products</Text>
        </View>
      </View>

      {/* Trending Styles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Styles</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TRENDING_STYLES.map((item) => (
            <TouchableOpacity key={item.id} style={styles.trendingItem}>
              <Image source={item.image} style={styles.trendingImage} contentFit="cover" />
              <View style={styles.trendingOverlay}>
                <Text style={styles.trendingText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Collections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Collections</Text>
        <View style={styles.collectionsGrid}>
          {COLLECTIONS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.collectionItem}>
              <View>
                <Text style={styles.collectionName}>{item.name}</Text>
                <Text style={styles.collectionCount}>{item.count}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* New Arrivals */}
      <View style={[styles.section, styles.newArrivalsSection]}>
        <View style={styles.newArrivalsHeader}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.newArrivalsCard}>
          <Image
            source={require('../../assets/images/img2.png')}
            style={styles.newArrivalsImage}
            contentFit="cover"
          />
          <View style={styles.newArrivalsInfo}>
            <Text style={styles.newArrivalsTitle}>Latest Collection 2023</Text>
            <Text style={styles.newArrivalsDesc}>
              Discover the newest trends and styles fresh off the runway
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  searchText: {
    color: '#666',
    fontSize: 14,
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
  trendingItem: {
    width: SCREEN_WIDTH * 0.7,
    height: 200,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  trendingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  collectionsGrid: {
    gap: 12,
  },
  collectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  collectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  collectionCount: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  newArrivalsSection: {
    backgroundColor: '#f8f8f8',
  },
  newArrivalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    color: '#ff3f6c',
    fontSize: 14,
    fontWeight: '600',
  },
  newArrivalsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  newArrivalsImage: {
    width: '100%',
    height: 200,
  },
  newArrivalsInfo: {
    padding: 16,
  },
  newArrivalsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  newArrivalsDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
