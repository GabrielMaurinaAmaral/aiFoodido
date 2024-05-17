import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types'

export const useProductList = () => {
    return useQuery<Product[]>({
        queryKey: ['products'],

        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')

            if (error) {
                throw new Error(error.message)
            }

            return data
        },
    })
}

export const useProduct = (id: number) => {
    return useQuery<Product>({
        queryKey: ['product', id],

        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                throw new Error(error.message)
            }

            return data
        },
    })
}

export const useInsertProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(data: Omit<Product, 'id'>) {
            const { error, data: newProduct } = await supabase
                .from('products')
                .insert({
                    name: data.name,
                    price: data.price,
                    image: data.image,
                })
                .single()

            if (error) {
                throw new Error(error.message)
            }
            return newProduct
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn({ id, ...update }: Product) {
            const { error, data: updatedProduct } = await supabase
                .from('products')
                .update({
                    name: update.name,
                    image: update.image,
                    price: update.price,
                })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return updatedProduct;
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries({ queryKey: ['products'] });
            await queryClient.invalidateQueries({ queryKey: ['products', id] });
        },
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(id: number) {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id)

            if (error) {
                throw new Error(error.message)
            }
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })
}