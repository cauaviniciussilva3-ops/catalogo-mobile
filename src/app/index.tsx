import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from '../store';
import { login, logout } from '../store/authSlice';
import { api } from '../services/api';

// --- TELA DE LOGIN ---
function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }
    dispatch(login({ email }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catálogo Mobile</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- TELA DE CATALOGO E DETALHES ---
function MainView() {
  const [activeTab, setActiveTab] = useState('mens');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const dispatch = useDispatch();

  const mensCategories = ['mens-shirts', 'mens-shoes', 'mens-watches'];
  const womensCategories = ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const categories = activeTab === 'mens' ? mensCategories : womensCategories;
      let allProducts: any[] = [];

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

  if (selectedProduct) {
    return (
      <ScrollView style={styles.detailContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => setSelectedProduct(null)}>
          <Text style={styles.backButtonText}>← Voltar para lista</Text>
        </TouchableOpacity>
        <Image source={{ uri: selectedProduct.thumbnail }} style={styles.detailImage} />
        <View style={styles.detailContent}>
          <Text style={styles.detailTitle}>{selectedProduct.title}</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
          <Text style={styles.price}>Preço: R$ {selectedProduct.price}</Text>
          <Text style={styles.discount}>Desconto: {selectedProduct.discountPercentage}% OFF</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.containerList}>
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
            <TouchableOpacity style={styles.card} onPress={() => setSelectedProduct(item)}>
              <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
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

function MainNavigation() {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  return isAuthenticated ? <MainView /> : <LoginView />;
}

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  containerList: { flex: 1, backgroundColor: '#f8f8f8', paddingTop: 50 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 15 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  logoutText: { color: 'red', fontSize: 16, fontWeight: 'bold' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 15 },
  tab: { flex: 1, padding: 12, alignItems: 'center', backgroundColor: '#e0e0e0', borderRadius: 8, marginHorizontal: 4 },
  activeTab: { backgroundColor: '#007AFF' },
  tabText: { fontWeight: 'bold', color: '#555' },
  activeTabText: { color: '#fff' },
  card: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 10, borderRadius: 8, padding: 10, elevation: 2 },
  cardImage: { width: 80, height: 80, borderRadius: 8 },
  info: { marginLeft: 15, justifyContent: 'center', flex: 1 },
  productTitle: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#2e7d32', marginTop: 5, fontWeight: 'bold' },
  detailContainer: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  detailImage: { width: '100%', height: 300, resizeMode: 'cover' },
  detailContent: { padding: 20 },
  detailTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#666', marginBottom: 15, lineHeight: 22 },
  discount: { fontSize: 16, color: '#d32f2f', fontWeight: 'bold' },
  backButton: { paddingHorizontal: 20, paddingBottom: 15 },
  backButtonText: { color: '#007AFF', fontSize: 16, fontWeight: 'bold' },
});