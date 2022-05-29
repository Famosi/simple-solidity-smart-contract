require('dotenv').config()

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    process.env.INFURA_URL,
)

// web3 isntance
const web3 = new Web3(provider);

// deploy
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: ['Hi There!']
        })
        .send({from: accounts[0], gas: '1000000'})

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
}
deploy();
