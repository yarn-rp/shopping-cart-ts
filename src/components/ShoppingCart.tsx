import { Offcanvas, Stack, Col, Button } from "react-bootstrap";

import { useAccount } from "../context/AccountContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { SubmitOrderButton } from "../components/SubmitOrderButton";
import axios from "axios";
import { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, clearCart } = useShoppingCart();
  const { selectedAccount } = useAccount();
  const [successState, setSuccessState] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(false);
  const {} = useShoppingCart();

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
        setSuccessState(true);
        clearCart();
        closeCart();
      } else {
        setErrorState(true);
        closeCart();
      }
    } catch (error) {
      setErrorState(true);
      closeCart();
    }
  };
  const subtotal = cartItems.reduce((total, cartItem) => {
    return total + (cartItem?.price || 0) * cartItem.quantity;
  }, 0);
  const taxes = (subtotal * 7) / 100;
  const total = subtotal + taxes;

  return (
    <>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          {selectedAccount ? (
            <Offcanvas.Title>Hello {selectedAccount.name}</Offcanvas.Title>
          ) : (
            <Offcanvas.Title>Cart</Offcanvas.Title>
          )}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5 justify-content-end">
              <Col>
                <div>Subtotal {formatCurrency(subtotal)}</div>
                <div>Taxes {formatCurrency(taxes)}</div>
                <div>----------------------------------------</div>
                <div>Total {formatCurrency(total)}</div>
                {selectedAccount ? (
                  <Button
                    onClick={() => {
                      submitOrder();
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
                )}
              </Col>
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
      <SweetAlert
      success
        title={"Thanks for ordering!\nWe really appreciate it"}
        onConfirm={() => setSuccessState(false)}
        onCancel={() => setSuccessState(false)}
        show={successState}
      />
      <SweetAlert
      error
        title={"Ups. Seems like something went wrong"}
        onConfirm={() => setErrorState(false)}
        onCancel={() => setErrorState(false)}
        show={errorState}
      />
    </>
  );
}
