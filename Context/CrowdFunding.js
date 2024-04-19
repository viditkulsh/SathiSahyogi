import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// Internal Import
import { CrowdFundingABI, CrowdFundingAddress } from "./constants";

// Fetching Smart Contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
  const titleData = "Crowd Funding Contract";
  const [currentAccount, setCurrentAccount] = useState("");
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState("");

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        setOpenError(true);
        setError("Install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account Found");
      }
    } catch (error) {
      console.log("Something went wrong while connecting to wallet");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.log("Install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error while connecting to wallet");
    }
  };

  const createCampaign = async (campaign) => {
    const { title, description, amount, deadline } = campaign;

    try {
      const web3Modal = new Web3Modal(); // Fixed spelling
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      console.log(currentAccount);

      const transaction = await contract.createCampaign(
        currentAccount,
        title,
        description,
        ethers.utils.parseUnits(amount, 18),
        new Date(deadline).getTime()
      );

      await transaction.wait();

      console.log("Contract call success", transaction);
    } catch (error) {
      console.log("Contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
  
      const campaigns = await contract.getCampaigns();
  
      const parseCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        pId: i,
      }));
  
      return parseCampaigns;
    } catch (error) {
      console.log("Error while fetching campaigns", error);
      return [];
    }
  };

  const getUserCampaigns = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
  
      const allCampaigns = await contract.getCampaigns();
  
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const currentUser = accounts[0];
  
      const filteredCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner === currentUser
      );
  
      const userData = filteredCampaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        pId: i,
      }));
  
      return userData;
    } catch (error) {
      console.log("Error while fetching user campaigns", error);
      return [];
    }
  };

  const donate = async (pId, amount) => {
    try {
      const web3Modal = new Web3Modal(); // Fixed spelling
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
  
      const campaignData = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount),
      });
  
      await campaignData.wait();
  
      console.log("Donation success", campaignData);
      return campaignData;
    } catch (error) {
      console.log("Error while donating", error);
      return null;
    }
  };

  const getDonations = async (pId) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
  
      const donations = await contract.getDonations(pId);
      const numberOfDonations = donations[0].length;
  
      const parsedDonations = [];
  
      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }
  
      return parsedDonations;
    } catch (error) {
      console.log("Error while fetching donations", error);
      return [];
    }
  };

  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        connectWallet,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};
