import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View, FlatList } from 'react-native';

import { useCart } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';

export default function CartScreen() {
  const { items, total } = useCart();

  return (
    <View >
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />

      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>
        Total: ${total}
      </Text>
      <Button text="Checkout" />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

