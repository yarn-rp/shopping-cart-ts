import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"

import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
  id: number;
  quantity: number;
  name: string;
  price: number;
  amount_on_stock: number;
  imageUrl: string;
}

export function CartItem(item: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imageUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {item.quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{item.quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * item.quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item)}
      >
        &times;
      </Button>
    </Stack>
  )
}
