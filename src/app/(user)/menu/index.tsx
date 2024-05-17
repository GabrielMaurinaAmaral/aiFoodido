import { FlatList } from 'react-native'

import products from '@assets/data/products'
import ProductListItem from '@components/ProductListItem'
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';

export default function MenuScreen() {

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
    }
    fetchProducts()
  }, [])

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 20, padding: 20 }}
      columnWrapperStyle={{ gap: 10 }} />
  )
}