import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Job from './Components/Job'
import Careers from './Components/Careers'
import { FaAnchor, FaBars, FaX } from 'react-icons/fa6'
import { FaArrowCircleUp } from 'react-icons/fa'

function App() {
  const [close,setClose]=useState(false)
  return (
    <>
      <Routes>

        <Route
          path="/"
          element={
            <div className="w-full ">

              {/* NAVBAR */}
              <div className="fixed z-50 text-white px-3 py-5 top-0 left-0 w-full flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full text-yellow-500 flex items-center p-1 bg-white">
                    <FaAnchor />
                  </div>
                  <p>
                    Maritime<span className="font-bold">Solutions</span>
                  </p>
                </div>

                <div className="hidden gap-5 md:flex items-center justify-between">
                  <Link to={'/'}>Home</Link>
                  {/* <Link>About</Link> */}
                  <Link to={'/careers'}>Careers</Link>
                </div>
                <div onClick={()=>setClose(true)} className="md:hidden flex">
                  <FaBars/>
                  
                </div>
               {close && <div className="md:hidden flex  flex-col bg-white text-black   fixed items-center justify-center text-3xl gap-5 top-0 h-full right-0 w-full">
                 <FaX onClick={()=>setClose(false)}/> 
                 <Link to={'/'}>Home</Link>
                  {/* <Link>About</Link> */}
                  <Link to={'/careers'}>Careers</Link>
                </div>}
              </div>

              <div className="sticky top-0 h-screen bg-[url(/image.png)] bg-cover bg-no-repeat z-0 flex flex-col">
                <div className="text-white flex flex-col h-full w-full bg-black/50 px-5 justify-center">
                  <p className="md:text-6xl text-4xl text-left">
                    Accomplishing Profitable <br /> Voyages Together
                  </p>

                  <Link
                    to="/careers"
                    className="mt-8 p-5 w-fit bg-white hover:underline text-black rounded-full  md:text-xl text-lg font-medium flex items-center"
                  >
                    Explore Careers
                    <div className="h-5 w-5 mx-2 rounded-full bg-white">
                      {/* <FaArrowCircleUp/> */}
                      <FaArrowCircleUp className="rotate-45 text-yellow-500" />
                    </div>
                  </Link>
                </div>
              </div>
{/* 
              <div className="min-h-screen relative z-20 bg-white text-black rounded-t-3xl w-full p-10">
                <h1 className=" text-3xl">Navora</h1>
                <p className=" mt-2">
                 Navigating your career path.
                </p>
              </div> */}
            </div>
          }
        />

        <Route path="/careers" element={<Careers />} />
        <Route path="/job/:slug" element={<Job />} />
      </Routes>
    </>
  )
}

export default App
