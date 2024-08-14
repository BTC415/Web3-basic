const { Web3 } = require("web3");
const path = require("path");
const fs = require("fs");

const web3 = new Web3("http://127.0.0.1:8545/");
const deployedAddressPath = path.join(`${__dirname}/contracts`, "MyContractAddress.txt");
const deployedAddress = fs.readFileSync(deployedAddressPath, 'utf8');

const abi = require("./contracts/MyContractAbi.json")
const myContract = new web3.eth.Contract(abi, deployedAddress);
myContract.handleRevert = true;

async function interact() {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];

  try {
    const myNumber = await myContract.methods.myNumber().call();
    console.log("myNumber value: ", myNumber)

    const tx = await myContract.methods
      .setMyNumber(BigInt(myNumber) + 1n)
      .send({
        from: defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      })

    console.log("Transaction Hash: ", tx.transactionHash);

    const myNumberUpdated = await myContract.methods.myNumber().call();
    console.log("myNumber updated value: ", myNumberUpdated)

  } catch (error) {
    console.error(error)
  }
}

interact();


