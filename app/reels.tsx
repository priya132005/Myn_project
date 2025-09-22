// app/reels.tsx
import { AVPlaybackStatus, AVPlaybackStatusError, Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  price: string;
  image: any;  // This will accept the result of require()
  url: string;
  startSec: number;
  endSec: number;
}

/*
  PRODUCTS array simulates the mapping "time-range in the reel -> products shown".
  Adjust times to match your demo reel.
*/
const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Black square neck Dress',
    price: '₹1,679',
    image:require('../assets/images/img1.png'),
    url: 'https://www.myntra.com/dresses/athena/athena-black-square-neck-flutter-sleeves-ruffled-detailed-maxi-dress/27234078/buy',
    startSec: 0,
    endSec: 5,
  },
  {
    id: 'p2',
    name: 'Chiffon Pink dress',
    price: '₹1154',
    image:require('../assets/images/img2.png'),
    url: 'https://www.myntra.com/dresses/antheaa/antheaa-chiffon-maxi-embellished-dress/32121575/buy',
    startSec: 5,
    endSec: 9,
  },
  {
    id: 'p3',
    name: 'Floral Embroidery white',
    price: '₹1199',
    image:require('../assets/images/img3.png'),
    url: 'https://www.myntra.com/dresses/kalini/kalini-floral-embroidered-a-line-dress/36964527/buy',
    startSec: 11,
    endSec: 15,
  },
];

type PlaybackRef = {
  pauseAsync?: () => Promise<void>;
  playAsync?: () => Promise<void>;
};

export default function ReelsScreen() {
  // We'll capture the video instance methods into a lightweight typed ref
  const videoRef = useRef<PlaybackRef | null>(null);

  // Accept both normal status and possible error variants
  const [status, setStatus] = useState<AVPlaybackStatus | AVPlaybackStatusError | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // typed states for wishlist & cart
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [cart, setCart] = useState<Record<string, number>>({});

  // Helper: find products visible at current video time (in seconds)
  const getProductsForCurrentTime = () => {
    let posSec = 0;
    if (status && 'positionMillis' in status && typeof status.positionMillis === 'number') {
      posSec = Math.floor(status.positionMillis / 1000);
    }

    const exact = PRODUCTS.filter((p) => posSec >= p.startSec && posSec <= p.endSec);
    if (exact.length > 0) return { mode: 'exact' as const, items: exact, posSec };
    return { mode: 'similar' as const, items: PRODUCTS, posSec };
  };

  const onPressShop = async () => {
    try {
      await videoRef.current?.pauseAsync?.();
    } catch {
      // ignore
    }
    setModalVisible(true);
  };

  const toggleWishlist = (p: Product) => {
    setWishlist((prev) => {
      const copy = { ...prev };
      if (copy[p.id]) {
        delete copy[p.id];
      } else {
        copy[p.id] = true;
      }
      return copy;
    });
  };

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const copy = { ...prev };
      copy[p.id] = (copy[p.id] || 0) + 1;
      return copy;
    });
    Alert.alert('Added to cart', `${p.name} added to cart`);
  };

  const openOnMyntra = async (p: Product) => {
    const url = p.url;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert('Cannot open', url);
    }
  };

  const { items: visibleProducts, mode, posSec } = getProductsForCurrentTime();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          // We assign the instance to our local ref via callback ref so TypeScript stays happy
          ref={(ref) => {
            // 'ref' here is the component instance; we only use pause/play methods
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            videoRef.current = ref;
          }}
          source={require('../assets/images/myntra-demo.mp4')}
          style={styles.video}
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={(s) => {
            // s can be AVPlaybackStatus or AVPlaybackStatusError; store it
            setStatus(s as AVPlaybackStatus | AVPlaybackStatusError);
          }}
          useNativeControls={false}
        />

        {/* Overlay: reel title (demo), time */}
        <View style={styles.topOverlay}>
          <Text style={styles.reelTitle}>Demo: Shop the Reel</Text>
          <Text style={styles.time}>
            {status && 'positionMillis' in status && typeof status.positionMillis === 'number'
              ? `Time: ${(status.positionMillis / 1000).toFixed(1)}s`
              : 'Time: 0.0s'}
          </Text>
        </View>

        {/* Floating Shop Button */}
        <View style={styles.bottomOverlay}>
          <TouchableOpacity style={styles.shopButton} onPress={onPressShop}>
            <Text style={styles.shopButtonText}>Shop this look</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom-sheet modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
          videoRef.current?.playAsync?.();
        }}
        style={styles.modal}
        swipeDirection={['down']}
        onSwipeComplete={() => {
          setModalVisible(false);
          videoRef.current?.playAsync?.();
        }}
      >
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>
              {mode === 'exact' ? 'Matches in this moment' : 'Similar picks'}
            </Text>
            <Text style={styles.sheetSubtitle}>Video time: {posSec}s</Text>
          </View>

          <FlatList
            data={visibleProducts}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            renderItem={({ item }: { item: Product }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.cardImage} />
                <Text style={styles.cardName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.cardPrice}>{item.price}</Text>

                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => toggleWishlist(item)}
                  >
                    <Text style={styles.actionText}>
                      {wishlist[item.id] ? '♥ Wishlist' : '♡ Wishlist'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionBtn, { marginLeft: 8 }]}
                    onPress={() => addToCart(item)}
                  >
                    <Text style={styles.actionText}>🛒 Add</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.openBtn}
                  onPress={() => openOnMyntra(item)}
                >
                  <Text style={styles.openBtnText}>Open on Myntra →</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.sheetFooter}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => {
                setModalVisible(false);
                videoRef.current?.playAsync?.();
              }}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000',
  },
  videoContainer: { 
    width: SCREEN_W,
    height: SCREEN_H,
    position: 'relative', 
    backgroundColor: '#000',
  },
  video: { 
    width: '100%', 
    height: '100%',
  },
  topOverlay: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reelTitle: { color: '#fff', fontWeight: '700' },
  time: { color: '#fff', marginTop: 4, fontSize: 12 },
  bottomOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 34,
    alignItems: 'center',
    zIndex: 20,
  },
  shopButton: {
    backgroundColor: 'rgba(255, 35, 86, 0.9)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopButtonText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 18,
    letterSpacing: 0.5
  },

  /* Modal / bottom sheet styles */
  modal: { 
    justifyContent: 'center',
    margin: 20,
  },
  sheet: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 12,
    maxHeight: SCREEN_H * 0.8,
  },
  sheetHeader: { 
    paddingHorizontal: 16, 
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 12
  },
  sheetTitle: { 
    fontSize: 20, 
    fontWeight: '700',
    color: '#333',
    textAlign: 'center'
  },
  sheetSubtitle: { 
    color: '#666', 
    marginTop: 4,
    textAlign: 'center',
    fontSize: 14
  },

  card: {
    width: Math.round(SCREEN_W * 0.7),
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  cardImage: { 
    height: 220, 
    borderRadius: 12, 
    marginBottom: 12, 
    width: '100%',
    backgroundColor: '#f5f5f5'
  },
  cardName: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 6,
    color: '#333'
  },
  cardPrice: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#111', 
    marginBottom: 12 
  },

  cardActions: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12,
    justifyContent: 'space-between'
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#f6f6f6',
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center'
  },
  actionText: { 
    fontSize: 14,
    fontWeight: '600',
    color: '#444'
  },

  openBtn: {
    marginTop: 4,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#ff2356',
  },
  openBtnText: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 16 
  },

  sheetFooter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  closeBtn: {
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeBtnText: { color: '#fff', fontWeight: '700' },
});