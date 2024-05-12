import { Stack } from 'expo-router';

export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Menu em app>(tabs)>menu>_layout' }} />
    </Stack>
  )
};