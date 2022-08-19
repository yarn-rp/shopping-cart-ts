import { Col, Form, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import axios from "axios";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  amount_on_stock: number;
  imageUrl: string;
};

export function Store() {
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [errorMSG, setError] = useState<String | undefined>("");
  const [products, setProducts] = useState<Product[]>([]);
  const searchProducts = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/product?q=${query}`
      );
      setError(undefined);
      setLoading(false);
      setProducts(response.data);
    } catch (error) {
      setError(String(error));
      setLoading(false);
    }
  };
  useEffect(() => {
    searchProducts("");
  }, []);

  return (
    <>
      <Row>
        <div className="text-center ">
          <h1 className="display-4 text-secondary font-weight-semi-bold mb-4">
            Find your favorite products
          </h1>
          <h5 className="font-weight-semi-bold">Search products</h5>
        </div>
      </Row>
      <Form>
        <Form.Group className="mb-6 text-center">
          <Form.Control
            type="search"
            placeholder="Search..."
            className="text-center"
            onChange={(q) => {
              searchProducts(q.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <div className="height:100">
        <h1></h1>
      </div>
      <Row md={3} xs={2} lg={4} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
