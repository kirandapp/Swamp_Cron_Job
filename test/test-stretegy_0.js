const ethers = require('ethers');
require('dotenv').config()
const contractABI = require('../ABI/strategyABI.json'); 
const contractAddress = '0x8c80a074ab647A95cf8FD7ceB02298Bf7a5131F0';
const providerUrl = `${process.env.FANTOM_PROVIDER}`;
const privateKey = `${process.env.COMMON_PRIVATE_KEY}`;

// Create a new ethers provider instance
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Create a new wallet instance using a private key or mnemonic phrase
const wallet = new ethers.Wallet(privateKey, provider); // Replace with your private key or mnemonic

// Create a new contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Function to call the earn function of the smart contract
async function callContractFunction() {
  try {
    const result = await contract.earn();
    console.log('Function called successfully:', result);
  } catch (error) {
    console.error('Error calling function:', error);
  }
}

// //   Function to schedule the contract function call every 24 hours
function scheduleFunctionCall() {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;   //24 * 60 * 60 * 1000  //1 * 60 * 1000
  const now = new Date();
  const nextCallTime = new Date(now.getTime() + millisecondsPerDay);

  const timeUntilNextCall = nextCallTime.getTime() - now.getTime();

  console.log('Next function call scheduled in', timeUntilNextCall, 'milliseconds');

  setTimeout(async () => {
    await callContractFunction();
    scheduleFunctionCall();
  }, timeUntilNextCall);
}

scheduleFunctionCall();

// callContractFunction();
