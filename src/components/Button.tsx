import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Colors from '@/constants/Colors'
interface ButtonProps {
    onPress?: () => void
    text: string
}

export default function Button({ onPress, text }: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.tint,
        padding: 15,
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: 10,
      },
      text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
      },
})