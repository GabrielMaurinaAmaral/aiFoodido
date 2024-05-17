import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/database.types'

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key)
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value)
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key)
    },
}

const supabaseUrl = 'https://wpncteuhmnzdteuqzddx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwbmN0ZXVobW56ZHRldXF6ZGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5MDE1OTIsImV4cCI6MjAzMTQ3NzU5Mn0.ol-iXWDP_V7EBTg4qPJM42lBie_Yyd0oum4t_3WPpTo'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})