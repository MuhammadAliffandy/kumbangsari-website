'use client'
import Image from "next/image";
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import { formatRupiahNumber } from "@/app/utils/helper";
import Grid from '@mui/material/Grid'
import { motion } from 'framer-motion';
import Link from "next/link";
import { useState , useEffect} from "react";
import AppCarouselTestimoni from '@/app/components/appCaraousel/appCaraouselTestimoni';
import AppDrawer from '@/app/components/appDrawer/appDrawer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from '@fortawesome/free-solid-svg-icons'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from "next/navigation";

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

const itemsFeatures = [
  {
    title:'AI Generate',
    description:"Personalize product data and generate content with AI according to your needs! Stop wasting time creating generic content. Boost engagement with AI-powered personalization",
    icon: '/images/icon/landing-page/Sparkle.svg',
    image : "/images/icon/landing-page/description/slide1.svg"
  },
  {
    title:'Content Analysis',
    description:"See uploaded recaps of all your content and products on just one page! Get started now and see how our services can help you reach more customers and increase sales.",
    icon: '/images/icon/landing-page/MagnifyingGlass.svg',
    image : "/images/icon/landing-page/description/slide2.svg"
  },
  {
    title:'Auto-Post Content',
    description:"Tired of spending hours posting content on social media? Increase content management efficiency through scheduling and auto-posting across accounts!",
    icon: '/images/icon/landing-page/ClockCountdown.svg',
    image : "/images/icon/landing-page/description/slide3.svg"
  },
]

const itemsTestimoni = [
  {
      title: 'Best AI Content Generator!',
      subtitle: `"This AI content generator has been a game-changer for my team! We used to spend hours brainstorming and writing blog posts, but now the AI helps us generate high-quality content in a fraction of the time. It's also great for creating social media captions, product descriptions, and even website copy. I can't recommend it enough!"`,
      image: '/images/icon/landing-page/user/user1.svg',
      username: 'Sarah, Marketing Manager',
  },
  {
      title: 'Top Tier AI Generator',
      subtitle: `"This AI content generator is a lifesaver for busy freelancers like me. It helps me meet deadlines and deliver high-quality content to my clients. I love that it can adapt to different writing styles and tones, so I can always get the perfect voice for each project."`,
      image: '/images/icon/landing-page/user/user2.svg',
      username: 'Lisa, Content Creator',
  },
  {
      title: 'Top Tier AI Generator',
      subtitle: `"This AI content generator is a lifesaver for busy freelancers like me. It helps me meet deadlines and deliver high-quality content to my clients. I love that it can adapt to different writing styles and tones, so I can always get the perfect voice for each project."`,
      image: '/images/icon/landing-page/user/user3.svg',
      username: 'Lisa, Content Creator',
  },
  {
      title: 'Effortless Social Media Management',
      subtitle: `"Since using this social media scheduling tool, managing my brand's online presence has become a breeze!  I can schedule posts for the entire week in minutes and even auto-publish them across different platforms. It's saved me tons of time and helped me stay consistent, which has led to a significant boost in engagement."`,
      image: '/images/icon/landing-page/user/user4.svg',
      username: 'David Lee, Marketing Manager',
  },
 
];

const subscriptionList = [
  {
      title: 'Basic Package',
      subtitle: 'Suistable for -- ',
      image : '/images/icon/paket/basic.svg',
      price : 100000,
      benefit : [
          'Content Recommendation',
          'Schedule and Calendar',
          'Performance Analysis',
          '1 Product',
          'All Platform',
          '50x AI Generate',
          '15x Autopost',
      ]
  },
  {
      title: 'Premium Package',
      subtitle: 'Suistable for -- ',
      image : '/images/icon/paket/premium.svg',
      price : 200000,
      benefit : [
        'Content Recommendation',
        'Schedule and Calendar',
        'Performance Analysis',
        '1 Product',
        'All Platform',
        'Unlimited AI Generate',
        'Unlimited Autopost'
      ]
  },
  {
      title: 'Professional Package',
      subtitle: 'Suistable for -- ',
      image : '/images/icon/paket/pro.svg',
      price : 350000,
      benefit : [
        'Content Recommendation',
        'Schedule and Calendar',
        'Performance Analysis',
        '3 Product',
        'All Platform',
        'Unlimited AI Generate',
        'Unlimited Autopost'
      ]
  },
]


export default function LandingPage() {

  
  // state animation
  
  const [initButton , setInitButton] = useState(1)

  useEffect(() => {
    AOS.init({
      duration: 900, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);

  

  return (
    <main className="flex flex-col w-full">
      <nav className="sticky top-0 z-50 bg-white bg-opacity-[50%] backdrop-blur-xl flex items-center justify-between px-[15px] xl:px-0 sm:justify-between md:justify-between xl:justify-around py-[15px] border-b-[1px] border-TEXT-4 border-opacity-25">
          <SideBar isDrawer={false} />

          <Box className=" flex flex-col xl:hidden lg:hidden  md:hidden sm:block">
              <AppDrawer anchor='right'>
                <div className="flex flex-col w-[40vw] bg-white h-[100vh] ">
                  <SideBar isDrawer = {true}/>
                </div>
              </AppDrawer>
          </Box>


      </nav>
      {/*  */}
      <section className=" flex flex-col items-center justify-center h-[100vh] relative">
        <Box className='w-[100%] h-[100%] relative' data-aos="fade-up">
            <img className="w-[100%] h-[100%]" src="/images/icon/landing-page/background/bg-intro.svg"/>
        </Box>
        <Box className='flex flex-col gap-[15px] items-center justify-center w-[50%] absolute'>
            <p className="text-PRIMARY-500 text-[18px]">WELCOME TO PLANIFY</p>
            <Box className='flex flex-col gap-[8px] text-[32px] items-center font-poppins font-extrabold'>
              <p className="text-TEXT-1 text-center">One platform for all your</p>
              <p className="text-PRIMARY-500">Social Media!</p>
            </Box>
            <p className="text-NEUTRAL-700 text-[18px] w-[85%] text-center"
            >Planify is a content management platform that brings all your content together. With the help of Generate AI and Auto-Post, experience the ease of content management with us!</p>
            <Box className='flex flex-col xl:flex-row items-center gap-[10px] '>
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
      <section className="pt-[80px] xl:pt-[0px] flex flex-col items-center justify-center h-auto xl:h-[100vh]">
          <Box className='flex flex-col items-center gap-[100px]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">Why Planify?</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">Optimal, Efficient and Scheduled</p>
                </Box>
                <Box className='flex flex-col xl:flex-row items-center gap-[40px] justify-center '>
                  {
                    items.map(data => {
                      return(
                        <Box className='flex flex-col gap-[10px] items-center w-[20%]'>
                          <img className="xl:w-[auto] w-[200px]  h-auto xl:h-[200px]" src={data.image} alt="picture-content" />
                          <p className="text-[14px] text-TEXT-1 font-bold text-center">{data.name}</p>
                          <p className="text-[12px] text-TEXT-1 text-center">{data.description}</p>
                        </Box>
                      )
                    })
                  }
                </Box>
          </Box>
      </section>
      {/*  */}
      <section id="feature" className="pt-[80px] xl:pt-[0px]flex flex-col items-center justify-center h-auto xl:h-[100vh]">
          <Box className='flex flex-col items-center gap-[40px]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">How Do We Work?</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">Our Features</p>
                </Box>
                
                <Box className='flex flex-col items-center justify-center w-[100%] gap-[30px] '>
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
                  <motion.div
                      className='flex flex-col xl:flex-row items-center bg-PRIMARY-100 p-[40px] w-[80%] xl:w-[60%] gap-[24px] rounded-[10px]'
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      >
                      <Box className='flex items-center w-[100%]  xl:w-[50%] h-[50vh] flex-none  '>
                        <img className="w-[100%] h-[100%] object-cover rounded-[10px]"  src={itemsFeatures[initButton - 1].image}  alt="picture-description"/>
                      </Box>        
                        {/*  */}
                        <Box className='grow flex flex-col gap-[30px]'>
                          <Box className='flex flex-col gap-[10px] ]'>
                            <Box className='flex gap-[10px] items-center'>
                                <img className="w-[25px] h-[25px]" src={itemsFeatures[initButton - 1].icon} alt='icon-title' />
                                <p className="text-TEXT-2 text-[20px] font-medium">{itemsFeatures[initButton - 1].title}</p>
                              </Box>
                              <p className="text-TEXT-2 text-[18px]">{itemsFeatures[initButton - 1].description}</p>
                          </Box>
                            <AppCustomButton className='w-[40%] flex gap-[10px] items-center bg-PRIMARY-500 rounded-[6px] px-[24px] py-[10px] '
                                  onClick={()=>{
                                  }}
                              >
                                <p className="text-TEXT-5 text-[14px]">Get Started</p>
                                <img src="/images/icon/sparkling-white.svg" />
                          </AppCustomButton>
                        </Box>           
                  </motion.div>

                </Box>

          </Box>
      </section>
      {/*  */}
      <section id="subscription" className="pt-[80px] xl:pt-[0px] flex flex-col items-center justify-center h-auto xl:h-[100vh]">
          <Box  className='flex flex-col items-center gap-[50px] w-[70%]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">Subscription</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">Affordable price for your business!</p>
                </Box>
                <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={4} className="p-[20px] w-[100%] flex flex-col xl:flex-row items-center" >
                    {
                        subscriptionList.map((data,index)=>{
                            return(
                                <Grid item xs={12} xl={4}>
                                    <Box className={`hover:shadow-xl text-TEXT-5 flex flex-col items-center gap-[10px] px-[40px] py-[30px]  rounded-[10px] ${ index == 1 ? 'bg-PRIMARY-700 h-[100%] xl:h-[75vh]' : 'bg-PRIMARY-900' }`} >
                                        <p className="text-[22px] font-bold text-center">{data.title}</p>
                                        <Box className='flex flex-col items-center gap-[20px] w-[100%]'>
                                            <p>{data.subtitle}</p>
                                            <span className="flex items-center gap-[8px] text-TEXT-5">
                                                <p className="">Rp</p>
                                                <p className="text-[30px] font-bold">{formatRupiahNumber(data.price)}</p>
                                                <p className="">/bulan</p>
                                            </span>
                                            <AppButton
                                                className={`flex ${index == 1 ? 'text-PRIMARY-700' : 'text-PRIMARY-900'} gap-[10px] w-[100%] justify-center items-center text-[14px] bg-white SECONDARY-500 rounded-[10px] px-[25px] py-[8px] shadow-xl`}
                                                text={`Upgrade to ${data.title.split('Package')[0]}`} 
                                                type = {'Submit'}
                                                onClick = {()=>{

                                                }}
                                            />
                                            <Box className='flex flex-col gap-[10px]'>
                                                {
                                                    data.benefit.map((data,index)=>{
                                                        return(
                                                            <Box className="flex gap-[10px] items-center justify-start">
                                                                <img src={'/images/icon/success-white.svg'} alt="icon-check" />    
                                                                <p className="text-[14px]">{data}</p>
                                                            </Box>
                                                        )
                                                    })
                                                }
                                            </Box>
                                    
                                        </Box>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid> 
          </Box>
      </section>
      {/*  */}
      <section id="faq" className="py-[80px] xl:py-[0px] flex flex-col items-center justify-center h-[100vh]">
          <Box className='flex flex-col items-center gap-[50px] w-[100%] h-[70%]' data-aos="fade-up">
              <Box className='flex flex-col gap-[5px] items-center'>
                <p className="text-[18px] text-PRIMARY-500">Testimonials</p>
                <span className="flex items-center gap-[10px]">
                  <p className="text-[24px] font-extrabold text-TEXT-1">What they say about</p>
                  <p className="text-[24px] font-extrabold text-PRIMARY-500">Planify</p>
                </span>
              </Box>

              <Box className='w-[100%] h-[100%] flex items-center justify-center text-TEXT-5 bg-black'>
                  <AppCarouselTestimoni
                    items={itemsTestimoni}
                  />
              </Box>
                
          </Box>
      </section>
      <footer className="w-[100%] h-[100%] xl:h-[50%] flex items-center pb-[50px]">
          <Box className='flex flex-col justify-center px-[100px] xl:px-[200px] '>
              <Box className='flex flex-col gap-[40px] xl:gap-[0px]  xl:flex-row justify-between  xl:items-start  border-y-[1px] border-TEXT-4 border-opacity-25 py-[15px]  '>
                  <Box className='flex flex-col items-start gap-[10px]  w-[50%] xl:w-[30%]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Who are we?</p>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px]'>Planify is a content management platform that brings all your content together. With the help of Generate AI and Auto-Post, experience the ease of content management with us!</p>
                  </Box>
                  {/*  */}
                  <Box className='flex flex-col items-start gap-[10px]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Who are we?</p>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] '>planify@mail.io</p>
                  </Box>
                  {/*  */}
                  <Box className='flex flex-col items-start gap-[10px]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Links</p>
                    <ul className="flex flex-col gap-[6px]">
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Why Planify?</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Our Features</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Subscriptions</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Testimonials</a></li>
                    </ul>
                  </Box>
                  {/*  */}
                  <Box className='flex flex-col items-start gap-[10px]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Contact</p>
                    <ul className="flex flex-col gap-[6px]">
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Email</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Instagram</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Twitter</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Whatsapp</a></li>
                    </ul>
                  </Box>
              </Box>
              {/*  */}
              <Box className='flex items-center justify-between py-[15px]'>
                  <Box className='flex items-center gap-[10px]'>
                      <img className='w-[20px] h-[20px]' src='/images/icon/logo/planify-black.svg' />
                      <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Planify</p>
                  </Box>
                  <p className="text-TEXT-1 bg-clip-text font-poppins text-[12px] ">© 2024 Planify. All rights reserved</p>
              </Box>
          </Box>
      </footer>
    </main>
  );
}


const SideBar = (props) => {
  const { push } = useRouter()
  const [arrowIcon , setArrowIcon ] = useState('/images/icon/arrowUpRight.svg')
  return(
    <>

    
        <Box className={`${props.isDrawer ? 'p-[10px]' : ''} flex items-center gap-[10px]`}>
            <img className='w-[30px] h-[30px]' src='/images/icon/logo/planify.png' />
            <p className='bg-gradient-to-b from-[#44B8F8] to-[#4E5FE5] text-transparent bg-clip-text ont-poppins text-[24px] font-extrabold'>Planify</p>
        </Box>

        <ul className={`text-[12px] ${props.isDrawer ? 'p-[10px] flex flex-col gap-[10px] ' : 'hidden gap-[30px] sm:hidden md:flex lg:flex xl:flex'}  font-bold font-poppins `}>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="#feature">Feature</a></li>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="#subscription">Subscribe</a></li>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="#faq">FAQ</a></li>
        </ul>

        <Box className={`${props.isDrawer ? 'flex flex-col gap-[10px] items-start p-[10px]' : 'hidden items-center sm:hidden md:flex lg:flex xl:flex '}  gap-[10px] `}>
            <AppButton
                className={`${props.isDrawer ? 'w-[100%]' : ''} px-[20px] py-[6px]  text-[12px] bg-PRIMARY-100 text-PRIMARY-500 font-poppins rounded-[6px]`}
                text={'Login'} 
                type = {'button'}
                onClick={()=>{
                  push('/auth/signin')
                }}
            />
            <AppCustomButton 
                    onMouseEnter={()=>{setArrowIcon('/images/icon/arrowRight.svg')}} 
                    onMouseLeave={()=>{setArrowIcon('/images/icon/arrowUpRight.svg')}} 
                    className={` ${props.isDrawer ? 'w-[100%] justify-center' : ''} flex gap-[10px] items-center bg-PRIMARY-500 rounded-[6px] px-[20px] py-[6px] `}
                    onClick={()=>{
                        push('/auth/signup')
                    }}
                >
                  <p className="text-TEXT-5 text-[12px]">Register</p>
                  <img src={arrowIcon} alt="alt-icon" />
            </AppCustomButton>
        </Box>
      </>
  ) 
}

