import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
  name: string;
  price: number;
  amount_on_stock: number;
  imageUrl: string;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  increaseCartQuantity: (item: CartItem) => void;
  getItemQuantity: (id: number) => number;
  decreaseCartQuantity: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function clearCart() {
    return setCartItems([])
  }

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(element: CartItem) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === element.id) == null) {
        return [...currItems, { ...element, quantity: element.quantity + 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === element.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(element: CartItem) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === element.id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== element.id);
      } else {
        return currItems.map((item) => {
          if (item.id === element.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(element: CartItem) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== element.id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        clearCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
