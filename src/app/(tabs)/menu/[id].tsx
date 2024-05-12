// screens/ProductDetailsScreen.js
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native'

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Product Details for {id}</Text>
        </View>
    )
}