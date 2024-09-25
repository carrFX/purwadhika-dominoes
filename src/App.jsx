import { useEffect, useState } from "react"
import ButtonComp from "./components/ButtonComp"
import { GiDominoTiles } from "react-icons/gi";
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";
import { SiDuplicati } from "react-icons/si";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { TbZoomReset } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import AOS from 'aos';
import 'aos/dist/aos.css';
import welcomeBg from '/welcomebg.jpeg'
function App() {
  const welcomeStyle = {
    height: '100vh',
    backgroundImage: `url(${welcomeBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const [isStart, setIsStart] = useState(false)
  const [source, setSource] = useState([[6,1],[4,3],[5,1],[3,4],[1,1],[3,4],[1,2]])
  const doubleNumbers = [...source].filter(item => item[0] === item[1]).length
  const [sourceModified, setSourceModified] = useState([...source])
  const [sumInput, setSumInput] = useState(0)
   
    useEffect(() => {
      AOS.init({
        easing : 'ease-in-out',
        duration : 750,
        delay : 0
      })
    },[])
    useEffect(() => {
      setSourceModified([...source])
    },[source])

    const handleStart = () => {
      setIsStart(true)
    }

   // Fungsi untuk menghasilkan semua kombinasi kartu domino asli
   const generateRealDominoCards = () => {
    const cards = [];
    for (let i = 0; i <= 6; i++) {
      for (let j = i; j <= 6; j++) {
        cards.push([i, j]);
      }
    }
    pickRandomCards(cards)
  };

  // Fungsi untuk mengambil 8 kartu acak
  const pickRandomCards = (cards) => {
    const random = cards.sort(() => Math.random() - 0.5); // Mengacak kartu
    const selected = random.slice(0, 7); // Mengambil 7 kartu
    setSource(selected);
  };

  const ascDominoVal = () => {
    const sorted = [...sourceModified].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];
      return sumA - sumB || a[0] - b[0] || a[1] - b[1];
    });
    setSourceModified(sorted)
  }
  const descDomino = () => {
    const sorted = [...sourceModified].sort((a, b) => {
      const sumA = a[0] + a[1];
      const sumB = b[0] + b[1];
      return sumB - sumA || b[0] - a[0] || b[1] - a[1];
    });
    setSourceModified(sorted)
  }
  const removeDuplicatesCard = () => {
    const countMap = {};
    sourceModified.forEach(item => {
      const key = item.slice().sort().join(',');
      countMap[key] = (countMap[key] || 0) + 1;
    })
    const unique = sourceModified.filter(item => countMap[item.slice().sort().join(',')] === 1)
    setSourceModified([...unique])
  }
  const switchVal = () => {
    // membalikan index 0 dengan index 1 pada setiap item yang di map
    const switchValue = sourceModified.map(item => [item[1], item[0]])
    setSourceModified([...switchValue])
  }
  const resetDomino = () => {
    // mengembalikan ke nilai utama atau awal
    setSourceModified([...source])
  }

  const removeSumVal = () => {
    // memfilter item dari map yang jika dia di jumlahkan index 0 dan index 1 nya tidak sama dengan nilai suminput
    const filtered = sourceModified.filter(item => item[0] + item[1] != sumInput)
    setSourceModified([...filtered])
  }

  return (
    <>
    {!isStart ? (
      <div style={welcomeStyle}>
        <div className={`w-full h-[100vh] flex flex-col justify-center items-center bg-[#00000051]`}>
          <div className="my-5">
            <h1 className='text-2xl md:text-4xl font-bold md:font-extrabold text-center uppercase tracking-wide'>Welcome to Purwadhika <span className="text-[#c6b21a]">Dominoes</span></h1>
          </div>
          <div>
            <ButtonComp onClick={handleStart} className="border py-2 border-[#c6b21a] rounded-full bg-gradient-to-r from-[#c6b21a] to-[#d8d8d8] hover:text-[brown] text-black duration-200 hover:scale-95 text-xl flex justify-center items-center gap-1">Start</ButtonComp>
          </div>
        </div>
      </div>
    ) : (
      <main className='px-3 lg:px-16 w-full bg-gradient-to-t from-[#c0b5b563] to-[#0e0e0e]  min-h-[100vh]'>
      {/* header */}
      <div data-aos="fade-down" className="mb-12 mt-5">
      <h1 className='text-2xl md:text-4xl font-bold md:font-extrabold text-center uppercase tracking-wide'>Purwadhika <span className="text-[#c6b21a]">Dominoes</span></h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start">
        {/* source */}
        <div data-aos="fade-left" className="w-full flex flex-col justify-center items-center my-2">
          <h1 className="text-xl md:text-3xl font-bold my-2">Source</h1>
          <div>
            <div className="flex w-fit justify-center px-3 py-1 pb-2 items-center border border-[#c6b21a] rounded-full">
              {source.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-center items-center`}
                >
                  <div>
                    <p className="text-xl md:text-xl font-bold mx-1">[{item[0]},{item[1]}]</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* double numbers */}
        <div data-aos="fade-right"  className="w-full flex flex-col justify-center items-center my-2">
          <h1 className="text-xl md:text-3xl font-bold my-2">Double Number</h1>
          <div>
            <div className="flex justify-center items-center">
                  <p className="text-2xl md:text-4xl font-extrabold text-[brown]">{doubleNumbers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dominoes Card */}
      <div className="flex flex-wrap justify-center items-center my-11 gap-5">
        {
          sourceModified.map((item, index) => (
            <div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
            <div key={index} className={`
            w-[75px] md:w-[120px] border-2 text-black ${item[0] === item[1] ? 'bg-[brown] border-[#c6b21a]' : 'bg-[#c6b21a] border-[brown]'} text-center h-32 flex flex-col justify-center items-center border border-black rounded-lg hover:scale-125 duration-300`}>
              <div className="h-1/2 w-full flex justify-center items-center">
                <h1 className="text-xl font-semibold md:text-2xl md:font-bold">{item[0]}</h1>
              </div>
              <div className={`w-full border-b-2 ${item[0] === item[1] ? 'border-[#c6b21a]' : ' border-[brown]'}`}></div>
              <div className=" h-1/2 w-full flex justify-center items-center">
                <h1 className="text-xl font-semibold md:text-2xl md:font-bold">{item[1]}</h1>
              </div>
            </div>
            </div>
          ))
        }
      </div>
      {/* suffle card button */}
      <div data-aos="zoom-in" className="flex justify-center items-center mb-14">
        <ButtonComp onClick={generateRealDominoCards} className="border py-2 border-[#c6b21a] rounded-full bg-gradient-to-r from-[#c6b21a] to-[#d8d8d8] hover:text-[brown] text-black duration-200 hover:scale-95 text-xl flex justify-center items-center gap-1">
          <GiDominoTiles/>
          <p className="text-sm p-1 uppercase tracking-wide font-semibold">shuffle cards</p>
        </ButtonComp>
      </div>

      {/* Other Button */}
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <ButtonComp onClick={ascDominoVal} className="border py-1 border-[#c6b21a] rounded-full bg-[#a8a8a896] hover:text-black duration-200 hover:scale-95 text-xl flex justify-center items-center">
          <FaAngleDoubleUp/>
          <p className="uppercase tracking-wide font-semibold px-2 text-sm">asc</p>
        </ButtonComp>
        <ButtonComp onClick={descDomino} className="border py-1 border-[#c6b21a] rounded-full bg-[#a8a8a896] hover:text-black duration-200 hover:scale-95 text-xl flex justify-center items-center">
          <FaAngleDoubleDown/>
          <p className="uppercase tracking-wide font-semibold px-2 text-sm">desc</p>
        </ButtonComp>
        <ButtonComp onClick={removeDuplicatesCard} className="border py-1 border-[#c6b21a] rounded-full bg-[#a8a8a896] hover:text-black duration-200 hover:scale-95 text-xl flex justify-center items-center">
          <SiDuplicati/>
          <p className="uppercase tracking-wide font-semibold px-2 text-sm">remove duplicates</p>
        </ButtonComp>
        <ButtonComp onClick={switchVal} className="border py-1 border-[#c6b21a] rounded-full bg-[#a8a8a896] hover:text-black duration-200 hover:scale-95 text-xl flex justify-center items-center">
          <HiOutlineSwitchVertical/>
          <p className="uppercase tracking-wide font-semibold px-2 text-sm">flip card</p>
        </ButtonComp>
        <ButtonComp onClick={resetDomino} className="border py-1 border-[#c6b21a] rounded-full bg-gradient-to-r from-[#c6b21a] to-[brown] hover:text-black duration-200 hover:scale-95 text-xl flex justify-center items-center">
          <TbZoomReset/>
          <p className="uppercase tracking-wide font-semibold px-2 text-sm">reset</p>
        </ButtonComp>
      </div>

      {/* input and button for remove sum val of card */}
      <div className="flex justify-center items-center">
        <div className="flex justify-center text-neutral-200 items-center border border-[#c6b21a] px-4 py-2 rounded-full my-5 gap-2">
        <input
          type="number"
          placeholder="sum value of card"
          value={sumInput}
          onChange={(e) => setSumInput(e.target.value)}
          className="text-center py-[2px] rounded-full bg-[#a8a8a896] duration-200 hover:scale-95 text-xl flex justify-center items-center truncate"  
        />
        <ButtonComp onClick={removeSumVal} className="py-1 rounded-full bg-[#b4212196] hover:text-[#c6b21a] duration-200 hover:scale-95 text-xl flex justify-center items-center">
          <RiDeleteBin5Line/>
        </ButtonComp>
        </div>
      </div>
    </main>
    )}
    </>
  )
}

export default App
