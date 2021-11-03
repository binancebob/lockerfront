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
  const [feedback, setFeedback] = useState("Ready for stake? 🥩");
  const [claimingNft, setClaimingNft] = useState(false);
  const [approvingWMC, setApprovingWMC] = useState(true);
  const [approvingUSTD, setApprovingUSTD] = useState(true);



  const approveNFTUSTD = (_amount) => {
    setFeedback("Approving...Please wait while your tx is being processed");
    setClaimingNft(true);
    blockchain.smartContract2.methods
      .setApprovalForAll("0xf6cf31c74d05A5879Df2ec7AB2ACcE687E6B09C6",true)
      .send({from: blockchain.account})
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Approved, please stake your NFT by ID below"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const approveNFTWMC = (_amount) => {
    setFeedback("Approving...Please wait while your tx is being processed");
    setClaimingNft(true);
    blockchain.smartContract2.methods
      .setApprovalForAll("0x1920B60969Bc3087E2bDA3A4ca60BcAAD747b1a2",true) 
      .send({from: blockchain.account})
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Approved, please stake your NFT by ID below"
        );
        setClaimingNft(false);
        setApprovingUSTD(true);
        dispatch(fetchData(blockchain.account));
      });
  };

  const claimRewards = () => {
    setFeedback("Claiming Tendies...Please wait while your tx is being processed");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .claimAll()
      .send({from: blockchain.account})
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Claimed... Check your metamask wallet (make you you have added the custom token address)"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
    
  };

  const claimWMCRewards = () => {
    setFeedback("Claiming Tendies...Please wait while your tx is being processed");
    setClaimingNft(true);
    blockchain.smartContract3.methods
      .claimAll()
      .send({from: blockchain.account})
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Claimed... Check your metamask wallet (make you you have added the custom token address"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
    
  };

  const unstake = () => {
    setFeedback("Unstaking...Please wait while your tx is being processed");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .unstakeAll()
      .send({from: blockchain.account})
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Unstaked Success"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const unstakeWMC = () => {
    setFeedback("Unstaking...Please wait while your tx is being processed");
    setClaimingNft(true);
    blockchain.smartContract3.methods
      .unstakeAll()
      .send({from: blockchain.account})
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Unstaked Success"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const stake = (idArray) => {
    setFeedback("Staking...Please wait while your tx is being processed");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .stakeByIds(idArray)
      .send({from: blockchain.account})
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Staked succesfully... Wait a few minutes then refresh the page to see your rewards"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const stakeWMC = (idArray) => {
    setFeedback("Staking...Please wait while your tx is being processed");
    setClaimingNft(true);
    blockchain.smartContract3.methods
      .stakeByIds(idArray)
      .send({from: blockchain.account})
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Staked succesfully... Wait a few minutes then refresh the page to see your rewards"
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

  function getTextAndStake() {
    let idslist = document.getElementById('textbox_id').value;
    let idArray = [idslist];
    stake(idArray);
  }

  function getTextAndStakeWMC() {
    let idslist = document.getElementById('textbox_id').value;
    let idArray = [idslist];
    stakeWMC(idArray);
  }



  return (
    <s.Screen style={{ backgroundColor: "var(--black)" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <s.TextTitle
          style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
        >
          🏦 Welcome To The Meta Reserve 🏦 
        </s.TextTitle>
        <s.SpacerMedium />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }}>
          
          
          <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "#383838", padding: 24 }}
          >
            
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The Meta Reserve Locker V.2 
                  <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        window.open('https://medium.com/@wemintcash/wmc-minted-by-the-presidents-a-guide-eee7db9546d','_blank');
                      }}
                    >
                      GUIDE 🧐
                    </StyledButton>
                  
                  
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  <div style={{color:"red", fontSize: "20px"}}>{feedback}</div>
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
                 
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                You must approve the staking contracts to get started.
                </s.TextDescription>
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={data.isApprovedUSTD ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        approveNFTUSTD(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "PLEASE WAIT" : "APPROVE uSTD CONTRACT"}
                    </StyledButton>
                    <StyledButton
                      disabled={data.isApprovedWMC ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        approveNFTWMC(1);
                        getData(); 
                      }}
                    >
                      {claimingNft ? "PLEASE WAIT" : "APPROVE WMC CONTRACT"}
                    </StyledButton>
                    </s.Container>
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>

                    <s.SpacerMedium />
                

                </s.Container>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                Type in your Presidents Token ID and stake into either uSTD or WMC.
                </s.TextDescription>
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <input type="text" id="textbox_id" name="name" required
                    minlength="1" size="10" placeholder="2053"></input>
                    </s.Container>
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={data.isApprovedUSTD ? 0 : 1}
                      onClick={(e) => {
                        e.preventDefault();
                        getTextAndStake()
                        
                        getData();
                      }}
                    >
                      {claimingNft ? "PLEASE WAIT" : "STAKE INTO uSTD"}
                    </StyledButton>
                    
                    <StyledButton
                      disabled={data.isApprovedWMC ? 0 : 1}
                      onClick={(e) => {
                        e.preventDefault();
                        getTextAndStakeWMC()
                        
                        getData();
                      }}
                    >
                      {claimingNft ? "PLEASE WAIT" : "STAKE INTO WMC"}
                    </StyledButton>
                    
                  </s.Container>
                  <s.TextDescription style={{ textAlign: "center" }}>
                You will earn either 1 uSTD or 1 WMC per day.
                </s.TextDescription>
                  <s.SpacerMedium />
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      YOUR TOKEN ID's CAN BE FOUND ON OPENSEA: 
                      <a style={{color: "antiquewhite", paddingLeft: "5px"}}
                        target={"_blank"}
                        href={"https://opensea.io/collection/wemint-washington"}
                      >
                          https://opensea.io/collection/wemint-washington
                      </a>
                    </s.TextDescription>
                  </s.Container>
                 
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      Advanced Users can interact directly with the contract on etherscan: 
                      <br />
                      <a style={{color: "antiquewhite", paddingLeft: "5px"}}
                        target={"_blank"}
                        href={"https://etherscan.io/address/0xA9cB55D05D3351dcD02dd5DC4614e764ce3E1D6e"}
                      >
                          WASHINGTON CONTRACT
                      </a>
                      <br />
                      <a style={{color: "antiquewhite", paddingLeft: "5px"}}
                        target={"_blank"}
                        href={"https://etherscan.io/address/0xf6cf31c74d05A5879Df2ec7AB2ACcE687E6B09C6"}
                      >
                          uSTD CONTRACT
                      </a>
                      <br />
                      <a style={{color: "antiquewhite", paddingLeft: "5px"}}
                        target={"_blank"}
                        href={"https://etherscan.io/address/0x1920B60969Bc3087E2bDA3A4ca60BcAAD747b1a2"}
                      >
                          WMC CONTRACT
                      </a>
                    </s.TextDescription>
                  </s.Container>
                </>
                )}
              </>
          </s.Container>
          <s.SpacerMedium />
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
                <div style={{background: "slategrey", padding: "16px",margin: "10px" , borderRadius: "5px"}}>
                <s.TextDescription style={{ textAlign: "center" }}>
                Your Pending Rewards $uSTD:
                </s.TextDescription>
                {data.getAllRewards / 1000000000000000000} $uSTD 
                <br />
                <s.TextDescription style={{ textAlign: "center" }}>
                Washington ID: {data.getTokensStaked.toString()} Locked in uSTD Staker
                <br /><br />
                <StyledButton 
                      disabled={data.isApprovedUSTD && data.getAllRewards > 0 ? 0 : 1}
                      onClick={(e) => {
                        e.preventDefault();
                        claimRewards();
                        getData();
                      }}
                    >
                      {claimingNft ? "PLEASE WAIT" : "CLAIM uSTD REWARDS"}
                  </StyledButton>
                 
                  <StyledButton
                      disabled={data.isApprovedUSTD && data.getTokensStaked.length > 0 ? 0 : 1}
                      onClick={(e) => {
                        e.preventDefault();
                        unstake();
                        getData();
                      }}
                    >
                      {claimingNft ? "PLEASE WAIT" : "UNSTAKE uSTD CONTRACT"}
                  </StyledButton>
                </s.TextDescription>
                <s.SpacerMedium />
                </div>
                <div style={{background: "slategrey", padding: "16px",margin: "10px", borderRadius: "5px"}}>
                <s.TextDescription style={{ textAlign: "center" }}>
                Your Pending Rewards $WMC:
                </s.TextDescription>
                {(data.getAllRewardsWMC) / 1000000000000000000} $WMC 
                <br />

                <s.TextDescription style={{ textAlign: "center" }}>

                Washington ID: {data.getTokensStakedWMC.toString()} Locked in WMC Staker
            
                </s.TextDescription>

                
                  <>
                 
                  
                  <StyledButton 
                      disabled={data.isApprovedWMC && data.getAllRewardsWMC > 0 ? 0 : 1}
                      onClick={(e) => {
                        e.preventDefault();
                        claimWMCRewards();
                        getData();
                      }}
                    >
                      {claimingNft ? "PLEASE WAIT" : "CLAIM WMC REWARDS"}
                  </StyledButton>
                  <StyledButton
                      disabled={data.isApprovedWMC && data.getTokensStakedWMC.length > 0 ? 0 : 1}
                      onClick={(e) => {
                        e.preventDefault();
                        unstakeWMC();
                        getData();
                      }}
                    >
                      {claimingNft ? "PLEASE WAIT" : "UNSTAKE WMC CONTRACT"}
                  </StyledButton>
                  
                  </>
                  </div>
              </>
              )}
            </s.TextTitle>
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
            Use this software at your own risk. 
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
