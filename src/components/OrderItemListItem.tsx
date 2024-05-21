import { View, Text, Image, StyleSheet } from "react-native"

import { Tables } from "@/types"
import { defaultPizzaImage } from "@/constants/ImageDefault"
import Colors from "@/constants/Colors"

type OrderItemListItemProps = {
    item: { products: Tables<'products'> } & Tables<'order_items'>;
};

export default function OrderItemListItem({ item }: OrderItemListItemProps) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: item.products.image || defaultPizzaImage }}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={{ flex: 1, padding: 20 }}>
                <Text style={styles.title}>{item.products.name}</Text>
                <View style={styles.subTitleContainer}>
                    <Text style={styles.price}>$ {item.products.price.toFixed(2)}</Text>
                    <Text>Size: {item.size}</Text>
                </View>
            </View>
            <View style={styles.quantidySelector}>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                <Text>Total: ${(item.products.price * item.quantity).toFixed(2)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 75,
        marginLeft: 10,
        aspectRatio: 1,
        alignSelf: 'center',
        borderRadius: 10,

    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    subTitleContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    price: {
        fontWeight: 'bold',
        color: Colors.light.tint,
    },
    quantidySelector: {
        alignItems: 'flex-start',
        marginVertical: 10,
        gap: 10,
    },
    quantity: {
        fontWeight: '500',
        fontSize: 16,
        marginRight: 10,
    },

})

export { styles };