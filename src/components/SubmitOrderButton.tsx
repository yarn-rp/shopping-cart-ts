import { useAccount } from "../context/AccountContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { Button, Stack } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
// import { setModalShow } from "../App";

export function SubmitOrderButton() {
  const { closeCart, cartItems, clearCart } = useShoppingCart();
  const { selectedAccount } = useAccount();

  const submitOrder = async () => {
    const order = {
      customerId: selectedAccount!.id,
      shippingAddressId: selectedAccount!.address_id,
      products: cartItems.map((e) => {
        return {
          productId: e.id,
          quantity: e.quantity,
        };
      }),
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/orders",
        order
      );
      if (response.status == 200) {
        clearCart();
        closeCart();
      } else {
        closeCart();
      }
    } catch (error) {
      closeCart();
    }
  };
  return selectedAccount ? (
    <Button
      onClick={() => {
        // setModalShow(true)
        // submitOrder();
      }}
      variant="danger"
      size="sm"
    >
      Submit order
    </Button>
  ) : (
    <Button
      onClick={() => {
        closeCart();
        window.open("/");
      }}
      size="sm"
    >
      Login
    </Button>
  );
}
