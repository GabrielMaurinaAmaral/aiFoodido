import { useState } from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'


import Button from '@/components/Button'
import products from '@assets/data/products'
import { PizzaSize } from '@/types'
import { useCart } from '@/providers/CartProvider'
import Colors from '@/constants/Colors'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams()
    const [selectedSize, setSelectedSize] = useState<PizzaSize>(sizes[2])

    const product = products.find((p) => p.id.toString() === id)
    const { addItem } = useCart()

    const addToCart = () => {
        if (!product)
            return
        addItem(product, selectedSize)
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Menu',
                    headerRight: () => (
                        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />

            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image }}
                style={styles.image}
                resizeMode='contain'
            />
            <Text style={styles.price}> Price: ${product.price.toFixed(2)}</Text>
            <Button onPress={addToCart} text="Add to cart" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        flex: 1,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    subtitle: {
        marginVertical: 10,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    size: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
})