
import { Stack, useLocalSearchParams } from 'expo-router'
import { Text, View,  StyleSheet, FlatList, ActivityIndicator } from 'react-native'

import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/components/OrderItemListItem'
import { useOrderDetails } from '@/api/orders'
import { useUpdateOrderSubscription } from '@/api/orders/subscriptions'

export default function OrdersDetailsScreen() {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  
    const { data: order, isLoading, error } = useOrderDetails(id);
  
    useUpdateOrderSubscription(id);

    if (isLoading) {
      return <ActivityIndicator />;
    }
    
    if (error) {
      return <Text>Failed to fetch</Text>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${id}` }} />
            
            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        gap: 10,
    },
})
