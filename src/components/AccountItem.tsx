import { Card, Button } from "react-bootstrap";
import { useAccount } from "../context/AccountContext";

type Account = {
  id: number;
  name: string;
  phone: string;
  address_id: string;
  imageUrl: string;
};

export function AccountItem(account: Account) {
  const { selectedAccount, selectAccount, unselectAccount } = useAccount();
  return (
    <Card className="card h-100 border-0 bg-transparent">
      <Card.Img
        className="card-img-top w-75 h-auto mx-auto wp-post-image"
        variant="top"
        src={
          account!.imageUrl
        }
        height="250px"
        style={{ objectFit: "contain" }}
      />
      
      <Card.Body className="card-body text-center">
        <Card.Title className="">
          <span className="card-title text-secondary font-weight-semi-bold permanent-mark">{account.name}</span>
        </Card.Title>
        <div className="mt-auto">
          <span className="text-muted">{account.phone}</span>
          <div className="w-100 h-20">
            <h1></h1>
          </div>
          {selectedAccount?.id == account.id ? (
            <Button
              onClick={unselectAccount}
              className="w-75"
              variant="danger"
            >
              Log out
            </Button>
          ) : (
            <Button
              onClick={() => {
                selectAccount(account);
              }}
              className="w-75"
            >
              Use account
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
