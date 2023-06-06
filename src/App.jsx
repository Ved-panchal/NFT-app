import { useEffect } from "react"

import Header from "./components/Header"
import Hero from "./components/Hero"
import Artworks from "./components/Artworks"
import Footer from "./components/Footer"
import Alert from "./components/Alert"
import Loading from "./components/Loading"
import { isWalletonnected, loadNfts } from "./Ved"
import { useGlobalState } from "./store"

const App = () => {
  const [nfts] =  useGlobalState('nfts')
  useEffect(() => {
    async function fetchdata() {
    await isWalletonnected().then(()=> console.log("Blockchain Loaded"))
    await loadNfts()
}
  fetchdata();
},[])
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
      <Header />
      <Hero/>
      </div>
      <Artworks artworks={nfts}/>
      <Footer/>
      <Alert />
      <Loading/>
    </div>
  )
}

export default App
