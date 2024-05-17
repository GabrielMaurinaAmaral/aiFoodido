import { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, TextInput, Alert } from "react-native"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import * as ImagePicker from 'expo-image-picker'

import Colors from "@/constants/Colors"
import Button from "@/components/Button"
import { defaultPizzaImage } from "@/constants/ImageDefault"
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from "@/api/products"

export default function CreateScreen() {
    const [image, setImage] = useState<string | null>(null)
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0])
    const isUpdate = !!id

    const { mutate: insertProduct } = useInsertProduct()
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();

    const router = useRouter()


    const resetFields = () => {
        setName('')
        setPrice('')
        setImage('')
        console.log('resetFields')
    }

    const validateInput = () => {
        let errorList = []

        if (!name) {
            errorList.push('Name is required')
        }
        if (!price) {
            errorList.push('Price is required')
        }
        if (isNaN(parseFloat(price))) {
            errorList.push('Price must be a number')
        }
        setErrors(errorList)

        return errorList.length === 0
    }

    const onSubmit = () => {
        if (isUpdate) {
            onUpdate()
        } else {
            onCreate()
        }
    }

    const onCreate = () => {
        if (!validateInput()) {
            return
        }

        insertProduct(
            { name, price: parseFloat(price), image },
            {
                onSuccess: () => {
                    console.log('Create dish', image, name, price)
                    resetFields();
                    router.back();
                },
            }
        )
    }

    const onUpdate = async () => {
        if (!validateInput()) {
            return
        }
        updateProduct({ id, name, price: parseFloat(price), image },
            {
                onSuccess: () => {
                    console.log('Update dish', image, name, price)
                    resetFields()
                    router.back()
                }
            }
        )

    }

    const confirmDelete = () => {
        Alert.alert('Delete', 'Are you sure you want to delete this dish?', [
            { text: 'No' },
            { text: 'Yes', style: 'destructive', onPress: onDelete }
        ])
    }

    const onDelete = () => {
        deleteProduct(id, {
            onSuccess: () => {
                console.log('Delete dish', id)
                resetFields()
                router.back()
            },
        });
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        })

        console.log(result)

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{ title: isUpdate ? 'Update Product' : 'Create Product' }}
            />

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
            <Button onPress={onSubmit} text={isUpdate ? 'Update' : 'Create'}></Button>
            {isUpdate && <Text onPress={confirmDelete} style={styles.textButton}>
                DELETE
            </Text>}
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
function deleteProduct(id: number, arg1: { onSuccess: () => void }) {
    throw new Error("Function not implemented.")
}

