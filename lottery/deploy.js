const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "poem common proud coast bus maid toe adult arrive cancel pyramid loop",
  "https://rinkeby.infura.io/v3/5388367291d842faa54ddf82d250089f"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account:", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: "0x" + bytecode })
    .send({ from: accounts[0] });

  console.log(interface);
  console.log("Contract deployed to: ", result.options.address);
};
deploy();
