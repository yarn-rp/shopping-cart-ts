import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type Product = {
  id: number;
  name: string;
  price: number;
  amount_on_stock: number;
  imageUrl: string;
};

export function StoreItem(product: Product) {
  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    getItemQuantity,
    removeFromCart,
  } = useShoppingCart();
  // TODO: convert id to string
  
  const quantity = getItemQuantity(product.id);
  
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={product.imageUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="card-title text-secondary font-weight-semi-bold permanent-mark">{product.name}</span>
          <span className="ms-2 text-muted">{formatCurrency(product.price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              onClick={() => increaseCartQuantity({...product,quantity:quantity})}
            >
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity({...product,quantity:quantity})}>
                  -
                </Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity({...product,quantity:quantity})}>
                  +
                </Button>
              </div>
              <Button
                onClick={() => removeFromCart({...product,quantity:quantity})}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
