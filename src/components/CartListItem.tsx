import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { CartItem } from '@/types'

import { FontAwesome } from '@expo/vector-icons'
import { useCart } from '@/providers/CartProvider'

type CartListItemProps = {
    cartItem: CartItem
}

const IconButton = ({ name, onPress }) => (
    <FontAwesome
        onPress={onPress}
        name={name}
        color="gray"
        style={{ padding: 5 }}
    />
)

export default function CartListItem({ cartItem }: CartListItemProps) {
    const { updateQuantity } = useCart()
    const { product, size, quantity, id } = cartItem
    const { image, name, price } = product

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={{flex: 1, padding: 10}}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.price}>${price.toFixed(2)}</Text>
                    <Text>Size: {size}</Text>
                </View>
            </View>
            <View style={styles.quantitySelector}>
                <IconButton name="minus" onPress={() => updateQuantity(id, -1)} />
                <Text style={styles.quantity}>{quantity}</Text>
                <IconButton name="plus" onPress={() => updateQuantity(id, 1)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 75,
        aspectRatio: 1,
        alignSelf: 'center',
        marginRight: 10,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 5,
    },
    subtitleContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    quantitySelector: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    quantity: {
        fontWeight: '500',
        fontSize: 18,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
})