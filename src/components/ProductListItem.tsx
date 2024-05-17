import { Image, Text, StyleSheet, Pressable } from "react-native"
import { Link, useSegments } from "expo-router"

import { defaultPizzaImage } from '@/constants/ImageDefault'
import Colors from "@/constants/Colors"
import { Tables } from "@/database.types"

type ProductListItemProps = {
    product: Tables<'products'>
}

export default function ProductListItem({ product }: ProductListItemProps) {
    const segments = useSegments()

    return (
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <Image
                    source={{ uri: product.image || defaultPizzaImage }}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>
            </Pressable>
        </Link >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginTop: 'auto',
    },
})
