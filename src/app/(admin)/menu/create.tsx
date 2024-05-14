import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput } from "react-native";

import { defaultPizzaImage } from "@/constants/ImageDefault";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";


export default function CreateScreen() {
    const [image, setImage] = useState<string | null>(null)
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const router = useRouter()

    const validateInput = () => {
        let errorList = [];

        if (!name) {
            errorList.push('Name is required');
        }
        if (!price) {
            errorList.push('Price is required');
        }
        if (isNaN(parseFloat(price))) {
            errorList.push('Price must be a number');
        }
        setErrors(errorList);

        return errorList.length === 0;
    }

    const onCreate = () => {
        if (!validateInput()) {
            return
        }
    }

    const pickImage = async () => {


    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: image || defaultPizzaImage }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text onPress={pickImage} style={styles.textButton}>
                Select Image
            </Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Pizza.."
                style={styles.input}
            />
            <Text style={styles.label}>Preice ($)</Text>
            <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="99.99"
                style={styles.input}
                keyboardType="numeric"
            />
            {errors.map((error, index) => (
                <Text key={index} style={styles.error}>{error}</Text>
            ))}
            <Button onPress={onCreate} text='Create'></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    image: {
        width: '75%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginTop: 10,
    },
    label: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    }
})
