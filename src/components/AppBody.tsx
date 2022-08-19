import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Store } from "../pages/Store";
import { Home } from "../pages/Home";
import { useAccount } from "../context/AccountContext";

export function AppBody() {
  
  return (
    <Container className="mb-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Home />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </Container>
  );
}
