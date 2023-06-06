import abi from "./abis/src/contracts/Ved.sol/Ved.json";
import address from "./abis/contractAddress.json"
import { getGlobalState, setGlobalState } from "./store";
import * as ethers  from "ethers";

// 0x94355a3b8Efc26fA4F2DfF2F9d62a3D74ec5eb84

const { ethereum } = window
const contractAddress = address.address
const contractABI = abi.abi
const opensea_uri = `https://testnets.opensea.io/assets/goerli/${contractAddress}/`

const getEthereumContract = () => {
    const connectedAccount = getGlobalState('connectedAccount')

    if(connectedAccount) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        return contract
    } else {
        return getGlobalState('contract')
    }
}

const isWalletonnected = async() => {
    try {
        if(!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({method: 'eth_accounts'})

        window.ethereum.on('chainChanged', (chainID) => {
            window.location.reload()
        })

        window.ethereum.on('accountChanged', async() => {
            setGlobalState('connectedAccount', accounts[0])
            await isWalletonnected()
        })

        if(accounts.length) {
            setGlobalState('connectedAccount', accounts[0])
        } else {
            alert('Please Connect wallet.')
            console.log('No account found')
        }

    } catch (err) {
        reportError(err)
    }
}

const connectWallet = async() => {
    try {
        if(!ethereum) return alert('Please install metamask')
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        setGlobalState('connectedAccount', accounts[0])
    } catch (err) {
        reportError(err)
    }
}

const payToMint = async() => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const connectedAccount = getGlobalState('connectedAccount')
        const contract = getEthereumContract()
        const amount = ethers.utils.parseEther('0.001')
    
        await contract.payToMint({
          from: connectedAccount,
          value: amount._hex,
        }).then(()=> window.location.reload())

      } catch (error) {
        reportError(error)
      }
}

const loadNfts = async() => {
    try {
        if(!ethereum) return alert('Please install metamask')
        
        const contract = getEthereumContract()
        const nfts = await contract.getAllNFTs()
        console.log('nfts',structuredNfts(nfts))
        setGlobalState('nfts', structuredNfts(nfts))

    } catch (error) {
        reportError(error)
    }
}

const structuredNfts = (nfts) => 
nfts.map((nft) => ({
    id: Number(nft.id),
    url: opensea_uri + nft.id,
    buyer: nft.buyer,
    imageURL: nft.imageURL,
    cost: parseInt(nft.cost._hex) / 10 ** 18,
    timestamp: new Date(nft.timestamp.toNumber()).getTime(),

}))
.reverse()

const reportError = (error) => {
    console.log(error.message)
    throw new Error('No ethereum object.')
}

export {
    isWalletonnected,
    connectWallet,
    payToMint,
    loadNfts
}