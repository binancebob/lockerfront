import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/1.png";

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  color: #000000;
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  @media (min-width: 767px) {
    width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Ready to mint some $uSTD?");
  const [claimingNft, setClaimingNft] = useState(false);

  const claimNFTs = (_amount) => {

    setFeedback("Minting...");
    setClaimingNft(true);
    blockchain.smartContract2.methods
      .setApprovalForAll(blockchain.account,true)
      .send({
        gasLimit: "28500000",
        to: "0xA9cB55D05D3351dcD02dd5DC4614e764ce3E1D6e",
        from: blockchain.account,
        value: 0,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "You now own a Washington Mint! go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  const rndInt = randomIntFromInterval(1, 10000)

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen style={{ backgroundColor: "var(--black)" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <s.TextTitle
          style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
        >
          Welcome To The Meta Reserve
        </s.TextTitle>
        <s.SpacerMedium />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
          
            <s.SpacerMedium />
            <s.TextTitle
              style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}
            >
              {blockchain.account === "" ||
                blockchain.smartContract === null ? (
              <>
              <StyledImg alt={"example"} src={`https://ipfs.io/ipfs/Qmdibwx2MmendzExWgsGsyiGodMJ8hvAkLHcAVbMbpK2rG/${rndInt}.png`} />
              </>
              ) : (
              <>
               
                <s.TextDescription style={{ textAlign: "center" }}>
                Your Locked Presidents Token ID's: 
                </s.TextDescription>
                {data.getTokensStaked}
                <s.SpacerMedium />
                <s.TextDescription style={{ textAlign: "center" }}>
                Your Pending Rewards:
                </s.TextDescription>
                {data.getAllRewards} $uSTD 
                <br />
                <StyledButton
                      
                    >
                      CLAIM
                    </StyledButton>
                <s.SpacerMedium />
                <s.TextDescription style={{ textAlign: "center" }}>
                Your $uSDT In Your Wallet:
                </s.TextDescription>
                {data.balanceOf} $uSTD 
              </>
              )}
            </s.TextTitle>
          </s.Container>
          <s.SpacerMedium />
          <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "#383838", padding: 24 }}
          >
            
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The Meta Reserve Locker V.1
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerMedium />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      Connect to the Ethereum network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                 <>
                 <s.TextTitle style={{ textAlign: "center" }}>
                  Current $uSTD Supply: {data.totalSupply / 1000000000000000000} $uSTD
                </s.TextTitle>
                <s.SpacerSmall />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "APPROVE"}
                    </StyledButton>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "LOCK ALL"}
                    </StyledButton>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "RELEASE ALL"}
                    </StyledButton>
                  </s.Container>
                  <s.SpacerMedium />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      ADVANCED USERS CAN STAKE BY ID ON ETHERSCAN DIRECTLY: 
                      <a style={{color: "antiquewhite", paddingLeft: "5px"}}
                        target={"_blank"}
                        href={"https://etherscan.io/token/0xA9cB55D05D3351dcD02dd5DC4614e764ce3E1D6e"}
                      >
                          0xA9cB55D05D3351dcD02dd5DC4614e764ce3E1D6e
                      </a>
                    </s.TextDescription>
                  </s.Container>
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      Follow us on Twitter to find out what comes next: 
                      <a style={{color: "antiquewhite", paddingLeft: "5px"}}
                        target={"_blank"}
                        href={"https://twitter.com/wemintcash"}
                      >
                          @WEMINTCASH
                      </a>
                    </s.TextDescription>
                  </s.Container>
                </>
                )}
              </>
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription style={{ textAlign: "center", fontSize: 9 }}>
            Please make sure you are connected to the right network (Ethereum
            Mainnet) and the correct address. Please note: Once you make the
            purchase, you cannot undo this action.
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription style={{ textAlign: "center", fontSize: 9 }}>
            We have set the gas limit to 285000 for the contract to successfully
            mint your NFT. We recommend that you don't change the gas limit.
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
