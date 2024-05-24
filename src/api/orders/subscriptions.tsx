import { supabase } from "@/lib/supabase"
import { useEffect } from "react"

export const useInsertOrderSubscription = () => {
    useEffect(() => {
        const order = supabase
            .channel('custom-insert-channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'orders'
                },
                (payload) => {
                    console.log('Change received!', payload)
                    fetch('https://example.com')
                }
            )
            .subscribe()

        return () => {
            order.unsubscribe()
        }
    }, [])
}

export const useUpdateOrderSubscription = (id: number) => {
    useEffect(() => {
        const orders = supabase
            .channel('custom-filter-channel')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `id=eq.${id}`,
                },
                (payload) => {
                    console.log('Change received!', payload)
                    fetch('https://example.com')
                }
            )
            .subscribe();

        return () => {
            orders.unsubscribe();
        };
    }, []);
}