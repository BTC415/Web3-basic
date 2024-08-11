require('dotenv').config();
const { Web3 } = require("web3");

async function main() {
  const web3 = new Web3("http://127.0.0.1:8545/");

  const privateKey0 = process.env.PRIVATE_KEY_0;

  const sender = web3.eth.accounts.privateKeyToAccount(privateKey0);
  const reciever = web3.eth.accounts.create();

  const block = await web3.eth.getBlock();

  const transaction = {
    from: sender.address,
    to: reciever.address,
    value: 100,
    maxFeePerGas: block.baseFeePerGas * 2n,
    maxPriorityFeePerGas: 100000,
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(
    transaction,
    sender.privateKey
  )

  const reciept = await web3.eth.sendSignedTransaction(
    signedTransaction.rawTransaction
  )

  console.log("reciept------>", reciept)
}

main()

