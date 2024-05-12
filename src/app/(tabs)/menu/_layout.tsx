import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';

export default function MenuLayout() {
  return (
    <Stack screenOptions={{
      headerRight: () => (
        <Link href='/cart' asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="shopping-cart"
                size={28}
                color={Colors.light.tint}
                style={{ marginRight: 10, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    }}>
      <Stack.Screen name="index" options={{ title: 'Menu em app>(tabs)>menu>_layout' }} />
    </Stack>
  )
};