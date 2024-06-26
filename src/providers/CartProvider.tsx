import { PropsWithChildren, createContext, useContext, useState } from 'react'
import { randomUUID } from 'expo-crypto'

import { CartItem, Tables } from '@/types'
import { useInsertOrder } from '@/api/orders'
import { useInsertOrderItems } from '@/api/order-items'
import { useRouter } from 'expo-router'

type Product = Tables<'products'>

type CartType = {
  items: CartItem[]
  addItem: (product: Product, size: CartItem['size']) => void
  updateQuantity: (itemId: string, amount: 1 | -1) => void
  total: number
  checkout: () => void
}

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => { },
  updateQuantity: () => { },
  total: 0,
  checkout: () => { },
})

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([])
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const { mutate: insertOrder } = useInsertOrder()
  const { mutate: insertOrderItems } = useInsertOrderItems()

  const router = useRouter()

  const addItem = (product: Product, size: CartItem['size']) => {
    const existingItem = items.find(
      (item) => item.product.id === product.id && item.size === size
    )

    if (existingItem) {
      updateQuantity(existingItem.id, 1)
      return
    }

    const newCartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    }

    setItems((existingItems) => [newCartItem, ...existingItems])
  }

  const updateQuantity = (itemId: string, amount: 1 | -1) => {
    setItems((existingItems) =>
      existingItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + amount } : item
      )
        .filter((item) => item.quantity > 0)
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const checkout = async () => {
    insertOrder({ total },
      {
        onSuccess: saveOrderItems,
      }
    )
  }

  const saveOrderItems = (order: Tables<'orders'>) => {

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      size: item.size,
    }))
    
    console.log(orderItems);

    insertOrderItems(orderItems , {
        onSuccess() {
          console.log(orderItems);
          clearCart();
          router.push(`/(user)/orders/${order.id}`);
        },
      }
    )
  }

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)