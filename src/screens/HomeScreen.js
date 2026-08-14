import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { api } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('mens');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const mensCategories = ['mens-shirts', 'mens-shoes', 'mens-watches'];
  const womensCategories = ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const categories = activeTab === 'mens' ? mensCategories : womensCategories;
      let allProducts = [];

      for (const cat of categories) {
        const response = await api.get(`/products/category/${cat}`);
        allProducts = [...allProducts, ...response.data.products];
      }

      setProducts(allProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catálogo</Text>
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mens' && styles.activeTab]}
          onPress={() => setActiveTab('mens')}
        >
          <Text style={[styles.tabText, activeTab === 'mens' && styles.activeTabText]}>Masculino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'womens' && styles.activeTab]}
          onPress={() => setActiveTab('womens')}
        >
          <Text style={[styles.tabText, activeTab === 'womens' && styles.activeTabText]}>Feminino</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Detail', { productId: item.id })}
            >
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.price}>R$ {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 15 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  logoutText: { color: 'red', fontSize: 16, fontWeight: 'bold' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 15 },
  tab: { flex: 1, padding: 12, alignItems: 'center', backgroundColor: '#e0e0e0', borderRadius: 8, marginHorizontal: 4 },
  activeTab: { backgroundColor: '#007AFF' },
  tabText: { fontWeight: 'bold', color: '#555' },
  activeTabText: { color: '#fff' },
  card: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 10, borderRadius: 8, padding: 10, elevation: 2 },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { marginLeft: 15, justifyContent: 'center', flex: 1 },
  productTitle: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#2e7d32', marginTop: 5, fontWeight: 'bold' },
});