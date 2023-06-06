import avatar from "../assets/Owner.png"
import github from "../assets/github.png"
import facebook from "../assets/facebook1.png"
import twitter from "../assets/twitter1.png"
import linkedin from "../assets/linkedin1.png"
import medium from "../assets/medium.png"
import React from 'react'
import { setAlert, setGlobalState, useGlobalState } from "../store"
import { payToMint } from "../Ved"

const Hero = () => {

    const [nfts] = useGlobalState('nfts')

    const onMintNFT = async () => {
        setGlobalState('loading', {
          show: true,
          msg: 'Minting new NFT to your account',
        })
    
        await payToMint()
          .then(() => setAlert('Minting Successful...', 'green')).then(()=>window.location.reload())
          .catch(() => setGlobalState('loading', { show: false, msg: '' }))
      }
    

  return (
    <div className=" bg-[url('https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png')]
        bg-no-repeat bg-cover"
    >
    <div className=' flex flex-col justify-center items-center mt-1 mx-auto py-10'>
        <div className="flex flex-col justify-center items-center">   
        <h1 className='text-white text-5xl font-bold text-center'>
            A.I Arts <br/>
            <span className='text-gradient'>NFTs</span> Collection
        </h1>

        <p className='text-white font-semibold text-sm mt-3'>
            Mint and collect the hottest NFTs around.
        </p>

        <button className='shadow-xl shadow-black text-white
                bg-[#e32970] hover:bg-[#bd255f] p-2 rounded-full cursor-pointer my-4'
            onClick={onMintNFT}
        >
            Mint Now
        </button>

        <a className="flex justify-center items-center space-x-2
                bg-[#000000ad] rounded-full my-4 pr-4"
            href="">
            <img className="w-11 object-contain rounded-full" src={avatar} alt='Owner'/>
            <div className="text-white flex flex-col font-semibold text-sm">
            <span>0x5f...146a</span>
            <span className="text-[#e32970]">Ved Panchal</span>
            </div>
        </a>

        <p className="text-white text-sm font-medium text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Eum magnam vel quis officia delectus reprehenderit deserunt harum,<br/> dolorum esse quod exercitationem in sint quam architecto veniam! Cum officia qui velit?</p>

        <ul className="flex flex-row justify-center space-x-2 items-center my-4">
            <a className=" bg-black hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2" href="#">
                <img className="w-9 h-9 " src={github} alt="Github" />
            </a>
            <a className=" bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2" href="#">
                <img className="w-7 h-7 " src={facebook} alt="Github" />
            </a>
            <a className=" bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2" href="#">
                <img className="w-7 h-7" src={linkedin} alt="Github" />
            </a>
             <a className=" bg-white hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2" href="#">
                <img className="w-8 h-8 " src={twitter} alt="Github" />
            </a>
            <a className=" bg-black hover:scale-50 transition-all duration-75 delay-75 rounded-full mx-2" href="#">
                <img className="w-7 h-7 " src={medium} alt="Github" />
            </a>
        </ul>

        <div className=" shadow-black shadow-xl flex justify-center items-center w-10 h-10
                rounded-full bg-white cursor-pointer
                p-3 ml-4 text-black hover:bg-[#bd255f] hover:text-white
                transition-all duration-75 delay-100"
        >
            <span className="text-sm font-bold">{nfts.length}/99</span>

        </div>
        </div>
    </div>
    </div>
  )
}

export default Hero