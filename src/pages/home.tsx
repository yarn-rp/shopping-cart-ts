import { Col, Form, Row } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import axios from "axios";

import { useEffect, useState } from "react";
import { AccountItem } from "../components/AccountItem";

type Account = {
  id: number;
  name: string;
  phone: string;
  address_id: string;
  imageUrl: string;
};

export function Home() {
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [errorMSG, setError] = useState<string | undefined>("");
  const [accounts, setProducts] = useState<Account[]>([]);
  const [query, setQuery] = useState<string>("");
  const searchAccounts = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/account?q=${query}`
      );
      setError(undefined);
      setLoading(false);
      setProducts(response.data);
    } catch (error) {
      // setError(String(error));
      setLoading(false);
    }
  };
  useEffect(() => {
    searchAccounts(query);
  }, []);

  return (
    <>
      <Row>
        <div className="text-center ">
          <h1 className="display-4 text-secondary font-weight-semi-bold mb-4">
            Select an account
          </h1>
          <h5 className="font-weight-semi-bold">
            Please select an account to use
          </h5>
        </div>
      </Row>
      <Form>
        <Form.Group className="mb-6 text-center" >
          <Form.Control
            type="search"
            placeholder="Search..."
            className="text-center"
            onChange={(q) => {
              searchAccounts(q.target.value);
            }}
          />
        </Form.Group>
      </Form>
      

      <Row md={3} xs={2} lg={4} className="g-3">
        {accounts.map((item) => (
          <Col key={item.id}>{AccountItem(item)}</Col>
        ))}
      </Row>
    </>
  );
}
