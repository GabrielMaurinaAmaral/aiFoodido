import { Link, Stack } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import Button from "@/components/Button";
import Colors from "@/constants/Colors";

export default function SignInScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Sign In' }} />

            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="fulano...@gmail.com"
                style={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="password"
                style={styles.input}
            />
            
            <Button text="Sign In" />
            <Link href="/sign-up" style={styles.textButton}>
                Create an account
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    label:{
        color: 'black',
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
    textButton: {
        textAlign: 'center',
        marginVertical: 10,
        color: Colors.light.tint,
        fontWeight: 'bold',
    }
})