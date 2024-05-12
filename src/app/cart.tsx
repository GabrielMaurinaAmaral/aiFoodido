import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, FlatList } from 'react-native';

import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';

export default function CartScreen() {
  const { items } = useCart();

  return (
    <View >
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10}}
/>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

