'use client'
import Image from "next/image";
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import { motion } from 'framer-motion';
import Link from "next/link";
import { useState } from "react";

const items = [
  {
      name: 'Content Optimization',
      description: 'Get content recommendations that best suit your product!',
      image: '/images/vector/AI.png',
  },
  {
      name: 'Time Efficiency',
      description: 'Organize and upload all your product content from just one platform!',
      image: '/images/vector/statistic.png',
  },
  {
      name: 'Structured Scheduling',
      description: 'Schedule the content you will upload with the auto-post feature!',
      image: '/images/vector/content.png',
  },
];

export default function LandingPage() {

  // state animation
  const [arrowIcon , setArrowIcon ] = useState('/images/icon/arrowUpRight.svg')
  const [initButton , setInitButton] = useState(1)


  return (
    <main className="flex flex-col w-full">
      <nav className="flex items-center justify-around py-[15px] border-b-[1px] border-TEXT-4 border-opacity-25">

          <Box className='flex items-center gap-[10px]'>
              <img className='w-[30px] h-[30px]' src='/images/icon/logo/planify.png' />
              <p className='bg-gradient-to-b from-[#44B8F8] to-[#4E5FE5] text-transparent bg-clip-text ont-poppins text-[24px] font-extrabold'>Planify</p>
          </Box>

          <ul className=" text-[12px] flex gap-[30px] font-bold font-poppins">
            <li className="text-TEXT-1 hover:text-PRIMARY-500"><a>Feature</a></li>
            <li className="text-TEXT-1 hover:text-PRIMARY-500"><a>Subscribe</a></li>
            <li className="text-TEXT-1 hover:text-PRIMARY-500"><a>FAQ</a></li>
          </ul>

          <Box className='flex items-center gap-[10px]'>
              <AppButton
                  className='px-[20px] py-[6px] text-[12px] bg-PRIMARY-100 text-PRIMARY-500 font-poppins rounded-[6px]'
                  text={'Login'} 
                  type = {'button'}
                  onClick={()=>{
                  }}
              />
              <AppCustomButton 
                      onMouseEnter={()=>{setArrowIcon('/images/icon/arrowRight.svg')}} 
                      onMouseLeave={()=>{setArrowIcon('/images/icon/arrowUpRight.svg')}} 
                      className=' flex gap-[10px] items-center bg-PRIMARY-500 rounded-[6px] px-[20px] py-[6px] '
                      onClick={()=>{
                      }}
                  >
                    <p className="text-TEXT-5 text-[12px]">Register</p>
                    <img src={arrowIcon} alt="alt-icon" />
              </AppCustomButton>
          </Box>
      </nav>
      {/*  */}
      <section className="flex flex-col items-center justify-center h-[100vh]">
        <Box className='flex flex-col gap-[15px] items-center justify-center w-[50%]'>
            <p className="text-PRIMARY-500 text-[18px]">WELCOME TO PLANIFY</p>
            <Box className='flex flex-col gap-[8px] text-[32px] items-center font-poppins font-extrabold'>
              <p className="text-TEXT-1">One platform for all your</p>
              <p className="text-PRIMARY-500">Social Media!</p>
            </Box>
            <p className="text-NEUTRAL-700 text-[18px] text-center"
            >Planify is a content management platform that brings all your content together. With the help of Generate AI and Auto-Post, experience the ease of content management with us!</p>
            <Box className='flex items-center gap-[10px]'>
              <AppCustomButton className=' flex gap-[10px] items-center bg-PRIMARY-500 rounded-[6px] px-[24px] py-[10px] '
                      onClick={()=>{
                      }}
                  >
                    <p className="text-TEXT-5 text-[14px]">Get Started</p>
                    <img src="/images/icon/sparkling-white.svg" />
              </AppCustomButton>
              <AppButton
                  className='px-[24px] py-[10px] text-[14px] bg-PRIMARY-100 text-PRIMARY-500 font-poppins rounded-[6px]'
                  text={'Our Feature'} 
                  type = {'button'}
                  onClick={()=>{
                  }}
              />
          </Box>
        </Box>
      </section>
      {/*  */}
      <section className="flex flex-col items-center justify-center h-[100vh]">
          <Box className='flex flex-col items-center gap-[100px]'>
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">Why Planify?</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">Optimal, Efficient and Scheduled</p>
                </Box>
                <Box className='flex items-center gap-[40px] justify-center '>
                  {
                    items.map(data => {
                      return(
                        <Box className='flex flex-col gap-[10px] items-center w-[20%]'>
                          <img className="w-[auto] h-[200px]" src={data.image} alt="picture-content" />
                          <p className="text-[14px] text-TEXT-1 font-bold">{data.name}</p>
                          <p className="text-[12px] text-TEXT-1 text-center">{data.description}</p>
                        </Box>
                      )
                    })
                  }
                </Box>
          </Box>
      </section>
      {/*  */}
      <section className="flex flex-col items-center justify-center h-[100vh]">
          <Box className='flex flex-col items-center gap-[100px]'>
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">How Do We Work?</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">Our Features</p>
                </Box>
                
                <Box className='flex items-center justify-center'>
                  <motion.div 
                      className='flex items-center bg-PRIMARY-100 text-[12px] gap-[18px] px-[10px] py-[10px] rounded-[8px]'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div 
                        onClick={() => { setInitButton(1) }} 
                        className={`flex items-center justify-start gap-[10px] cursor-pointer py-[10px] px-[20px] rounded-[6px] ${initButton != 1 ? '' : 'bg-PRIMARY-500'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0, opacity: 0.6 }}
                      >
                        <img className="w-[20px] h-[20px]" src={`/images/icon/landing-page/${initButton != 1 ? 'Sparkle.svg' : 'Sparkle-soft.svg'}`} alt="icon-button" />
                        {initButton != 1 ? null : <p>Generate AI</p>}
                      </motion.div>
                      <motion.div 
                        onClick={() => { setInitButton(2) }} 
                        className={`flex items-center justify-start gap-[10px] cursor-pointer p-[10px] rounded-[6px] ${initButton != 2 ? '' : 'bg-PRIMARY-500'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0, opacity: 0.6 }}
                      >
                        <img className="w-[20px] h-[20px]" src={`/images/icon/landing-page/${initButton != 2 ? 'MagnifyingGlass.svg' : 'MagnifyingGlass-soft.svg'}`} alt="icon-button" />
                        {initButton != 2 ? null : <p>Content Analysis</p>}
                      </motion.div>
                      <motion.div 
                        onClick={() => { setInitButton(3) }} 
                        className={`flex items-center justify-start gap-[10px] cursor-pointer p-[10px] rounded-[6px] ${initButton != 3 ? '' : 'bg-PRIMARY-500'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0, opacity: 0.6 }}
                      >
                        <img className="w-[20px] h-[20px]" src={`/images/icon/landing-page/${initButton != 3 ? 'ClockCountdown.svg' : 'ClockCountdown-soft.svg'}`} alt="icon-button" />
                        {initButton != 3 ? null : <p>Auto-Post Content</p>}
                      </motion.div>
                  </motion.div>
                  {/*  */}
                  <Box className='flex items-center bg-PRIMARY-500 p-[14px]'>
                      <Box className='flex items-center bg-PRIMARY-500'>
                      </Box>        
                        {/*  */}
                        <Box>
                            <Box>
                              <img/>
                              <p></p>
                            </Box>
                            <p></p>
                            <AppCustomButton className=' flex gap-[10px] items-center bg-PRIMARY-500 rounded-[6px] px-[24px] py-[10px] '
                                  onClick={()=>{
                                  }}
                              >
                                <p className="text-TEXT-5 text-[14px]">Get Started</p>
                                <img src="/images/icon/sparkling-white.svg" />
                          </AppCustomButton>
                        </Box>           
                  </Box>

                </Box>

          </Box>
      </section>
      {/*  */}
    </main>
  );
}
