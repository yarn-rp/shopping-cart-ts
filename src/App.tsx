import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AppBody } from "./components/AppBody";
import { Navbar } from "./components/Navbar";
import { AccountProvider } from "./context/AccountContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

// export const [modalShow, setModalShow] = useState(false);

function App() {
  return (
    <AccountProvider>
      <ShoppingCartProvider>
        <Navbar />
        <AppBody />
        {/* <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        /> */}
      </ShoppingCartProvider>
    </AccountProvider>
  );
}

export default App;

// function MyVerticallyCenteredModal(props: any) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Modal heading
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
