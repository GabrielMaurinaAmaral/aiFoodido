import Colors from "@/constants/Colors";
import { Image, Text, StyleSheet, Pressable } from "react-native";
import { Product } from "@assets/types";
import { Link } from "expo-router";

type ProductListItemProps = {
    product: Product;
};

export default function ProductListItem({ product }: { product: Product }) {
    return (
        
        <Link href={`menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <Image source={{ uri: product.image || 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png' }}
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.title}>
                    {product.name}
                </Text>
                <Text style={styles.price}>
                    {product.price.toFixed(2)}
                </Text>
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
});
