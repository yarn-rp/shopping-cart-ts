import { createContext, ReactNode, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import React from 'react'
type AccountProviderProps = {
  children: ReactNode;
};

type SelectedAccount = {
  id: number;
  name: string;
  phone: string;
  address_id: string;
  imageUrl:string;
};
type AccountOrNull = SelectedAccount | null;

type AccountContext = {
  selectAccount: (account: SelectedAccount) => void;
  unselectAccount: () => void;
  selectedAccount: AccountOrNull;

};

const AccountContext = createContext({} as AccountContext);

export function useAccount() {
  return useContext(AccountContext);
}
export function AccountProvider({ children }: AccountProviderProps) {
  const [selectedAccount, setAccount] = useLocalStorage<AccountOrNull>(
    "selected-account",
    null
  );

  function selectAccount(account: SelectedAccount) {
    setAccount(account);
  }
  function unselectAccount() {
    setAccount(null);
  }

  return (
    <AccountContext.Provider
      value={{
        selectedAccount,
        unselectAccount,
        selectAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
