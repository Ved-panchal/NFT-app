const { ethers } = require('hardhat')
const fs = require('fs')

// deployed address 0x5FbDB2315678afecb367f032d93F642f64180aa3

async function main() {

  const base_uri = 'https://ipfs.io/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/'
  const contract_name = 'Ved'
  const Contract = await ethers.getContractFactory(contract_name)
  const contract = await Contract.deploy('Ved NFT', 'VED', base_uri);

  await contract.deployed();

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', contract.address)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
