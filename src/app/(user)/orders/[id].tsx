
import { Stack, useLocalSearchParams } from 'expo-router'
import { View,  StyleSheet, FlatList } from 'react-native'

import OrderListItem from '@/components/OrderListItem'
import orders from '@assets/data/orders'
import OrderItemListItem from '@/components/OrderItemListItem'

export default function OrdersDetailsScreen() {
    const { id } = useLocalSearchParams()

    const order = orders.find((o) => o.id.toString() === id)
    /*let order
    for (let i = 0 i < orders.length i++) {
      if (orders[i].id.toString() === id) {
        order = orders[i]
        break
      }
    } */
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />
            <OrderListItem order={order} />
            
            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
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
