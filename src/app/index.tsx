import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { Link, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function index() {
  const { session, loading, isAdmin } = useAuth();


  if (!session) {
    return <Redirect href={'/(auth)/sign-in'} />;
  }

  if (isAdmin) {
    return <Redirect href={'/(admin)/menu'} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(auth)/sign-in'} asChild>
        <Button text="Auth" />
      </Link>
      <Link href={'/(user)/menu'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)/menu'} asChild>
        <Button text="Admin" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
}