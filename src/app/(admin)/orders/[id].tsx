import { Stack, useLocalSearchParams } from 'expo-router'
import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native'

import OrderItemListItem from '@/components/OrderItemListItem'
import OrderListItem from '@/components/OrderListItem'
import { OrderStatusList } from '@/types'
import orders from '@assets/data/orders'
import Colors from '@/constants/Colors'

export default function OrdersDetailsScreen() {
    const { id } = useLocalSearchParams()

    const order = orders.find((o) => o.id.toString() === id)

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />
            <OrderListItem order={order} />

            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
            />
            <>
                <Text style={{ fontWeight: 'bold' }}>Status</Text>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                    {OrderStatusList.map((status) => (
                        <Pressable
                            key={status}
                            onPress={() => console.warn('Update status')}
                            style={{
                                borderColor: Colors.light.tint,
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                                marginVertical: 10,
                                backgroundColor:
                                    order.status === status
                                        ? Colors.light.tint
                                        : 'transparent',
                            }}
                        >
                            <Text
                                style={{
                                    color:
                                        order.status === status ? 'white' : Colors.light.tint,
                                }}
                            >
                                {status}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </>
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
