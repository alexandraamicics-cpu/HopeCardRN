import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const donationCards = [
  {
    id: '1',
    title: 'Feed the Hungry',
    manager: 'Maria Santos',
    description: 'Provide nutritious meals to those experiencing food insecurity in local communities.',
    image: require('../assets/pic1.png'),
  },
  {
    id: '2',
    title: 'Education for all',
    manager: 'Maria Santos',
    description: 'Support educational programs and provide learning materials for children around the world.',
    image: require('../assets/pic2.png'),
  },
  {
    id: '3',
    title: 'Medical Assistance Fund',
    manager: 'Maria Santos',
    description: 'Help provide medical care and treatment for those who cannot afford healthcare services.',
    image: require('../assets/pic3.png'),
  },
  {
    id: '4',
    title: 'Disaster Relief Support',
    manager: 'Maria Santos',
    description: 'Provide emergency assistance to communities affected by natural disasters and crisis.',
    image: require('../assets/pic4.png'),
  },
  {
    id: '5',
    title: 'Environmental Conservation',
    manager: 'Maria Santos',
    description: 'Support environmental projects and preserve our natural environment for future generations.',
    image: require('../assets/pic5.png'),
  },
  {
    id: '6',
    title: 'Community Empowerment',
    manager: 'Maria Santos',
    description: 'Help local communities grow and thrive through sustainable development projects.',
    image: require('../assets/pic6.png'),
  },
];

const amounts = [50, 100, 200, 400, 550, 600, 900, 1000];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  // Modal State
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  const filteredCards = donationCards.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenDetails = (item) => {
    setSelectedCard(item);
    setSelectedAmount(50);
    setQuantity(1);
  };

  const handlePayment = () => {
    setIsConfirmationVisible(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationVisible(false);
    setSelectedCard(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleOpenDetails(item)}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: '#8C4B4B' }} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>H</Text>
          <Text style={styles.headerTitle}>Hopecard</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.cartBtn}>
            <Text style={styles.cartText}>Cart</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.content}>
            <Text style={styles.title}>Browse Donation Cards</Text>
            <Text style={styles.subtitle}>
              Support meaningful causes and make an impact in different communities
            </Text>
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                placeholder="Search for donation cards"
                placeholderTextColor="#8A8A8A"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>
            <Text style={styles.countText}>{filteredCards.length} Cards found</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Campaign Details Modal */}
      <Modal
        visible={!!selectedCard && !isConfirmationVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedCard(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailsModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Campaign Details</Text>
              <TouchableOpacity onPress={() => setSelectedCard(null)} style={styles.closeBtn}>
                <Text style={{ fontSize: 20 }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={selectedCard?.image} style={styles.modalImage} />
              <View style={styles.modalPadding}>
                <Text style={styles.modalTitle}>{selectedCard?.title}</Text>
                <Text style={styles.managerText}>Campaign Manager: {selectedCard?.manager}</Text>
                <Text style={styles.modalDesc}>{selectedCard?.description}</Text>

                <Text style={styles.sectionTitle}>Select Donation Card:</Text>
                <View style={styles.amountGrid}>
                  {amounts.map((amt) => (
                    <TouchableOpacity
                      key={amt}
                      style={[styles.amountBtn, selectedAmount === amt && styles.selectedAmountBtn]}
                      onPress={() => setSelectedAmount(amt)}
                    >
                      <Text style={[styles.amountBtnText, selectedAmount === amt && styles.selectedAmountBtnText]}>
                        ₱{amt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.sectionTitle}>Quantity</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <TouchableOpacity style={styles.addToCartBtn} onPress={() => setCartCount(c => c + 1)}>
                    <Text style={styles.addToCartText}>🛒 Add to cart</Text>
                  </TouchableOpacity>

                  <View style={styles.qtySelector}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity(quantity + 1)}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.totalBox}>
                   <Text style={styles.totalLabel}>Total Donation</Text>
                   <Text style={styles.totalValue}>₱{selectedAmount * quantity}</Text>
                </View>

                <TouchableOpacity style={styles.paymentBtn} onPress={handlePayment}>
                  <Text style={styles.paymentBtnText}>Payment</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Side Menu Modal */}
      <Modal
        visible={isMenuOpen}
        animationType="fade"
        transparent
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuOpen(false)}
        >
          <View style={styles.sideMenu}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuHeaderText}>Menu</Text>
              <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                <Text style={{ fontSize: 24, color: '#666' }}>✕</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemIcon}>👤</Text>
              <Text style={styles.menuItemText}>User Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemIcon}>💳</Text>
              <Text style={styles.menuItemText}>Transactions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemIcon}>⚙️</Text>
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        visible={isConfirmationVisible}
        animationType="fade"
        transparent
        onRequestClose={closeConfirmation}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationModal}>
             <Text style={styles.confirmHeader}>Donation Confirmation</Text>

             <View style={styles.successIconBox}>
                <View style={styles.successCircle}>
                  <Text style={styles.successCheck}>✓</Text>
                </View>
             </View>

             <Text style={styles.thankYou}>Thank You!</Text>
             <Text style={styles.confirmSubtitle}>We have received your payment for {selectedCard?.title}.</Text>
             <Text style={styles.confirmAmount}>₱{selectedAmount * quantity}</Text>

             <Text style={styles.shareLabel}>Your Sharable Donation Link:</Text>
             <View style={styles.linkBox}>
                <Text style={styles.linkText} numberOfLines={1}>api.digitaldonor.example.com/donations/DON-987654</Text>
                <TouchableOpacity><Text style={styles.copyIcon}>📋</Text></TouchableOpacity>
             </View>

             <TouchableOpacity
              style={styles.backHomeBtn}
              onPress={closeConfirmation}
             >
               <Text style={styles.backHomeText}>BACK TO HOMEPAGE</Text>
             </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F3F3' },
  header: {
    backgroundColor: '#8C4B4B',
    height: 70,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logo: { color: '#fff', fontSize: 22, fontWeight: '800', marginRight: 10 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  cartBtn: {
    backgroundColor: '#1A2E44',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartText: { color: '#3E76BB', fontWeight: '700', fontSize: 16 },
  cartBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  menuIcon: { color: '#fff', fontSize: 30 },

  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#0C1B33', marginTop: 10, marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#394B63', marginBottom: 20, lineHeight: 20 },
  searchBox: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  searchIcon: { fontSize: 22, color: '#97A0B0', marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#222' },
  countText: { fontSize: 14, color: '#394B63', marginBottom: 16 },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: { width: '100%', height: 200 },
  cardBody: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#0C1B33', marginBottom: 8 },
  cardDescription: { fontSize: 14, color: '#394B63', lineHeight: 20 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  detailsModal: { backgroundColor: '#fff', width: width * 0.9, maxHeight: height * 0.9, borderRadius: 20, overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  modalHeaderText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  closeBtn: { padding: 4 },
  modalImage: { width: '100%', height: 200 },
  modalPadding: { padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#0C1B33', marginBottom: 4 },
  managerText: { fontSize: 13, color: '#666', marginBottom: 12 },
  modalDesc: { fontSize: 14, color: '#444', lineHeight: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  amountGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  amountBtn: { width: '23%', height: 44, borderWidth: 1, borderColor: '#eee', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  selectedAmountBtn: { backgroundColor: '#801A1A', borderColor: '#801A1A' },
  amountBtnText: { color: '#333', fontWeight: '600' },
  selectedAmountBtnText: { color: '#fff' },

  addToCartBtn: { flex: 1, height: 50, backgroundColor: '#F7E6E6', borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  addToCartText: { color: '#8C4B4B', fontWeight: 'bold' },
  qtySelector: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#eee', borderRadius: 12, height: 50, paddingHorizontal: 8 },
  qtyBtn: { width: 34, height: 34, backgroundColor: '#f0f0f0', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { fontSize: 20, fontWeight: 'bold', color: '#666' },
  qtyText: { marginHorizontal: 15, fontSize: 18, fontWeight: 'bold' },

  totalBox: { backgroundColor: '#F9F4F4', padding: 16, borderRadius: 12, marginBottom: 20 },
  totalLabel: { fontSize: 12, color: '#999', marginBottom: 4 },
  totalValue: { fontSize: 24, fontWeight: 'bold', color: '#801A1A' },
  paymentBtn: { backgroundColor: '#D88C8C', height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  paymentBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  menuOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'flex-end' },
  sideMenu: { backgroundColor: '#fff', width: 280, height: 350, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, padding: 24, marginRight: 10, elevation: 5 },
  menuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  menuHeaderText: { fontSize: 22, fontWeight: 'bold' },
  menuItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  menuItemIcon: { fontSize: 24, marginRight: 16 },
  menuItemText: { fontSize: 18, color: '#333', fontWeight: '500' },

  confirmationModal: { backgroundColor: '#fff', width: width * 0.9, borderRadius: 20, padding: 24, alignItems: 'center' },
  confirmHeader: { fontSize: 20, fontWeight: 'bold', color: '#801A1A', marginBottom: 30 },
  successIconBox: { marginBottom: 20 },
  successCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center' },
  successCheck: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  thankYou: { fontSize: 24, fontWeight: 'bold', color: '#801A1A', marginBottom: 10 },
  confirmSubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 10 },
  confirmAmount: { fontSize: 18, fontWeight: 'bold', color: '#801A1A', marginBottom: 30 },
  shareLabel: { fontSize: 14, color: '#801A1A', alignSelf: 'flex-start', marginBottom: 10 },
  linkBox: { flexDirection: 'row', backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 30 },
  linkText: { flex: 1, color: '#666', fontSize: 13 },
  copyIcon: { fontSize: 18, marginLeft: 10 },
  backHomeBtn: { backgroundColor: '#f0f0f0', width: '100%', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  backHomeText: { color: '#666', fontWeight: 'bold' },
});
