import { Menu } from "@web3uikit/icons";
import styled from "styled-components";
import Flex from "../Flex";
import PhantomButton from "../PhantomButton";
import { useSlidingMenuContext } from "./SlidingMenu";
import { Button, CryptoLogos } from "@web3uikit/core";
import { WidthGeqOnly } from "../Width";
import { useCallback } from "react";
import { useState } from "react";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import { useNavigate } from "react-router-dom";

import { Player } from '@livepeer/react';
import * as React from 'react';


const Navigation = () => {
  const navigate = useNavigate();
  const { openMenu } = useSlidingMenuContext();
  const [account, setAccount] = useState(null);
  const getAccount = useCallback(async () => {
    console.log("getAccounts clicked");
    const accounts = await window.web3.eth.getAccounts();
    console.log("account:", accounts[0]);
  }, []);

  const login = useCallback(async () => {
    console.log("Login");
    window.web3.eth
      .getAccounts()
      .then((accounts: any) => {
        setAccount(accounts?.[0]);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const showWallet = () => {
    magic.connect.showWallet().catch((e: any) => {
      console.log(e);
    });
  };

  const disconnect = async () => {
    await magic.connect.disconnect().catch((e: any) => {
      console.log(e);
    });
    setAccount(null);
  };

  const sendTransaction = async () => {
    const publicAddress = (await web3.eth.getAccounts())[0];
    const txnParams = {
      from: publicAddress,
      to: publicAddress,
      value: web3.utils.toWei("0.01", "ether"),
      gasPrice: web3.utils.toWei("30", "gwei"),
    };
    web3.eth
      .sendTransaction(txnParams as any)
      .on("transactionHash", (hash: any) => {
        console.log("the txn hash that was returned to the sdk:", hash);
      })
      .then((receipt: any) => {
        console.log("the txn receipt that was returned to the sdk:", receipt);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <Nav>
      <Flex alignItems="center" justifyContent="center" className="gap-3">
        <PhantomButton onClick={() => openMenu()}>
          <Menu fill="#000" width={18} height={18} />
        </PhantomButton>
        <img
          className="pointer"
          onClick={() => navigate("/")}
          height={25}
          width="auto"
          src="/assets/banner.png"
        />
      </Flex>
      <WidthGeqOnly $minWidth={750}>
        {!account && (
          <Button
            size="large"
            type="button"
            theme="colored"
            color="blue"
            text="Sign In"
            onClick={() => {
              login();
            }}
          />
        )}

        {account && (
          <>         
           <Button
            size="small"
            type="button"
            theme="colored"
            color="blue"
            text="Show Wallets"
            onClick={() => {
              showWallet();
            }}
            />

            <Button
              size="small"
              type="button"
              theme="colored"
              color="blue"
              text="Sign Out"
              onClick={() => {
                disconnect();
            }}
             />
            <Button
              size="small"
              type="button"
              theme="colored"
              color="blue"
              text="Send Transactions"
              onClick={() => {
              sendTransaction();
            }}
            />

          </>
        )}
      </WidthGeqOnly>
    </Nav>
  );
};

const Nav = styled.nav`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  // center content
  margin: 0 auto;
  height: 100%;

  background: white;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);

  & > #nav-title {
    user-select: none;
  }
`;

export default Navigation;
