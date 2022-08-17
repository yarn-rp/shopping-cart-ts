import { Container, Navbar } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Address } from "./pages/address";
import { Home } from "./pages/home";
import { Products } from "./pages/products";

function App() {
  return (
    <Navbar>
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/address" element={<Address />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Container>
    </Navbar>
  );
}

export default App;
