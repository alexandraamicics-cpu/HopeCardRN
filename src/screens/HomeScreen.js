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
} from 'react-native';

const donationCards = [
  {
    id: '1',
    title: 'Support Families in Need',
    description:
      'Help provide essential supplies and support to families facing hardships in our community.',
    image:
      'https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Feed Children Today',
    description:
      'Your donation helps provide nutritious meals for children who need them most.',
    image:
      'https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'School Supplies Drive',
    description:
      'Support students by donating school kits, notebooks, and learning materials.',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Medical Aid Support',
    description:
      'Contribute to medicine, treatment, and healthcare assistance for those in need.',
    image:
      'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Community Relief Program',
    description:
      'Help local communities recover through relief goods and essential assistance.',
    image:
      'https://images.unsplash.com/photo-1469571486292-b53601020f52?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Emergency Shelter Help',
    description:
      'Provide safe shelter and temporary support for displaced individuals and families.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  const filteredCards = donationCards.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logo}>H</Text>
          <Text style={styles.headerTitle}>Hopecard</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  header: {
    backgroundColor: '#D88C8C',
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  menu: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0C1B33',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#394B63',
    marginBottom: 24,
    lineHeight: 20,
  },
  searchBox: {
    height: 56,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 14,
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 24,
    color: '#97A0B0',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  countText: {
    fontSize: 14,
    color: '#394B63',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginBottom: 18,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },
  cardImage: {
    width: '100%',
    height: 220,
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0C1B33',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#394B63',
    lineHeight: 21,
  },
});