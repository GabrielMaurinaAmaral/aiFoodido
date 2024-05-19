import { Text, FlatList, ActivityIndicator } from "react-native";

// import orders from '@assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
import { useMyOrders } from "@/api/orders";

export default function OrdersScreen() {
    const { data: orders, isLoading, error } = useMyOrders()

    if (isLoading) {
        return <ActivityIndicator />;
      }
      if (error) {
        return <Text>Failed to fetch</Text>;
      }

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    )
}
