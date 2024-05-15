import Button from "@/components/Button";
import { Link } from "expo-router";
import { View } from "react-native";

export default function index() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
            <Link href={'/(auth)/sign-in'} asChild>
                <Button text="Auth" />
            </Link>
            <Link href={'/(user)/menu'} asChild>
                <Button text='User' />
            </Link>
            <Link href={'/(admin)/menu'} asChild>
                <Button text='Admin' />
            </Link>
        </View>
    )
}