'use client'
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import { formatRupiahNumber, getCookie, setCookie } from "@/app/utils/helper";
import Grid from '@mui/material/Grid'
import { motion } from 'framer-motion';
import Link from "next/link";
import { useState , useEffect} from "react";
import AppCarouselTestimoni from '@/app/components/appCaraousel/appCaraouselTestimoni';
import AppDrawer from '@/app/components/appDrawer/appDrawer'
import AppDropDown from "./components/appDropDown/appDropDown";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from "next/navigation";
import AppAnimationButton from "./components/appAnimation/appAnimationButton";
import images from "@/public/images/images";
import { listLanguage } from "./utils/model";


const items = [
  {
      name: 'Personalized Recommendation',
      description: 'Get AI-based content recommendations that suit your product!',
      nameID : "Rekomendasi yang Dipersonalisasi",
      descriptionID : "Dapatkan rekomendasi konten berbasis kecerdasan buatan yang sesuai dengan produk Anda!",
      image: '/images/vector/AI.png',
  },
  {
      name: 'Data Optimization',
      description: 'Get all your product content data analyzed in one easy-to-use platform!',
      nameID : "Optimisasi Data",
      descriptionID : "Dapatkan semua data konten produk Anda dianalisis dalam satu platform yang mudah digunakan!",
      image: '/images/vector/statistic.png',
  },
  {
      name: 'Time Efficiency',
      description: 'Automate your content posting with our scheduled content auto-post feature!',
      nameID : "Efisiensi Waktu",
      descriptionID : "Otomatisasikan pengunggahan konten Anda dengan fitur unggah konten otomatis!",
      image: '/images/vector/content.png',
  },
];

const itemsFeatures = [
  {
    title:'AI Generate',
    description:"Personalize product data and generate content with AI according to your needs! Stop wasting time creating generic content. Boost engagement with AI-powered personalization",
    titleID: 'Generate AI',
    descriptionID : 'Personalisasi data produk dan hasilkan konten dengan AI sesuai kebutuhan Anda! Berhenti membuang waktu membuat konten generik. Tingkatkan keterlibatan pengguna dengan personalisasi yang didukung oleh kecerdasan buatan.',
    icon: '/images/icon/landing-page/Sparkle.svg',
    image : "/images/icon/landing-page/description/slide1.svg"
  },
  {
    title:'Content Analysis',
    description:"See uploaded recaps of all your content and products on just one page! Get started now and see how our services can help you reach more customers and increase sales.",
    titleID: 'Analisis Konten',
    descriptionID : 'Lihat ringkasan unggahan semua konten dan produk Anda hanya dalam satu halaman! Mulailah sekarang dan lihat bagaimana layanan kami dapat membantu Anda menjangkau lebih banyak pelanggan dan meningkatkan penjualan.',
    icon: '/images/icon/landing-page/MagnifyingGlass.svg',
    image : "/images/icon/landing-page/description/slide2.svg"
  },
  {
    title:'Auto-Post Content',
    description:"Tired of spending hours posting content on social media? Increase content management efficiency through scheduling and auto-posting across accounts!",
    titleID: 'Unggah Konten Otomatis',
    descriptionID : 'Lelah menghabiskan waktu berjam-jam untuk memposting konten di media sosial? Tingkatkan efisiensi manajemen konten melalui penjadwalan dan otomatisasi unggahan di berbagai akun!',
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

const itemTestimoniID = [
  {
    title:'Keputusan Konten Berbasis Data',
    subtitle:`"Pembuat konten AI ini telah mengubah cara saya mendekati pembuatan konten. Ini menganalisis audiens target saya dan memberikan wawasan berbasis data untuk membantu saya menyusun konten yang beresonansi. Tak ada lagi permainan tebak-tebakan! Sekarang, saya bisa fokus pada pembuatan konten yang benar-benar ingin dilihat oleh audiens saya, yang telah menghasilkan peningkatan dramatis dalam lalu lintas situs web dan menghasilkan prospek."`,
    username: `Mark Robinson, Strategi Pemasaran Konten`,
    image: '/images/icon/landing-page/user/user1.svg',
  },
  {
    title:'Pembuat Konten AI Terbaik',
    subtitle:`"Pembuat konten AI ini sangat membantu bagi freelancer sibuk seperti saya. Ini membantu saya memenuhi tenggat waktu dan memberikan konten berkualitas tinggi kepada klien saya. Saya suka bahwa ini dapat beradaptasi dengan berbagai gaya dan nada penulisan, jadi saya selalu mendapatkan suara yang sempurna untuk setiap proyek."`,
    username:`Lisa, Pembuat Konten`,
    image: '/images/icon/landing-page/user/user2.svg',
  },
  {
    title:'Pembuat Konten AI Terbaik',
    subtitle:`"Pembuat konten AI ini sangat membantu bagi freelancer sibuk seperti saya. Ini membantu saya memenuhi tenggat waktu dan memberikan konten berkualitas tinggi kepada klien saya. Saya suka bahwa ini dapat beradaptasi dengan berbagai gaya dan nada penulisan, jadi saya selalu mendapatkan suara yang sempurna untuk setiap proyek."`,
    username:`Lisa, Pembuat Konten`,
    image: '/images/icon/landing-page/user/user3.svg',
  },
  {
    title:'Manajemen Media Sosial yang Mudah',
    subtitle:`"Sejak menggunakan alat penjadwalan media sosial ini, mengelola kehadiran online merek saya menjadi sangat mudah! Saya bisa menjadwalkan posting untuk seluruh minggu dalam beberapa menit dan bahkan mempublikasikannya secara otomatis di berbagai platform. Ini telah menghemat banyak waktu dan membantu saya tetap konsisten, yang telah menghasilkan peningkatan signifikan dalam keterlibatan."`,
    username:`David Lee, Manajer Pemasaran`,
    image: '/images/icon/landing-page/user/user4.svg',
  }
]

const subscriptionList = [
  {
      title: 'Basic Package',
      subtitle: 'Suistable for Beginner ',
      image : images.icon.packet.basic,
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
      subtitle: 'Suistable for Intermediate ',
      image :  images.icon.packet.premium,
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
      subtitle: 'Suistable for Professional ',
      image :  images.icon.packet.pro,
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

const subscriptionListID = [
  {
      title: 'Paket Dasar',
      subtitle: 'Cocok Untuk Pemula',
      image : images.icon.packet.basic,
      price : 100000,
      benefit : [
          'Rekomendasi Konten',
          'Jadwal dan Kalender',
          'Analisis Performa',
          '1 Produk',
          'Semua Platform',
          '50 Generate AI / Hari',
          '15 Autopost'
      ]
  },
  {
      title: 'Paket Premium',
      subtitle: 'Cocok Untuk Menengah',
      image :  images.icon.packet.premium,
      price : 200000,
      benefit : [
          'Rekomendasi Konten',
          'Jadwal dan Kalender',
          'Analisis Performa',
          '1 Produk',
          'Semua Platform',
          'Unlimited Generate AI / Hari',
          'Unlimited Autopost'
      ]
  },
  {
      title: 'Paket Profesional',
      subtitle: 'Cocok Untuk Profesional',
      image :  images.icon.packet.pro,
      price : 350000,
      benefit : [
          'Rekomendasi Konten',
          'Jadwal dan Kalender',
          'Analisis Performa',
          '3 Produk',
          'Semua Platform',
          'Unlimited Generate AI / Hari',
          'Unlimited Autopost'
      ]
  },
]


export default function LandingPage() {
  
  const [ language ,setLanguage ] = useState(getCookie('language') != null ? getCookie('language') : 'EN')

  const { push } = useRouter()
  
  // state animation

  const checkLanguage = () => {
    if(getCookie('language') == null){
      setCookie('language','EN', 365)
    }
  }
  
  
  const [initButton , setInitButton] = useState(1)
  
  const subscriptionData = language == 'ID' ? subscriptionListID : subscriptionList 

  useEffect(() => {
    AOS.init({
      duration: 900, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);

  useEffect(()=>{
    checkLanguage()
  },[])
  

  return (
    <main className="flex flex-col w-full">
      <nav className="sticky top-0 z-50 bg-white bg-opacity-[50%] backdrop-blur-xl flex items-center justify-between px-[15px] xl:px-0 sm:justify-between md:justify-between xl:justify-around py-[15px] border-b-[1px] border-TEXT-4 border-opacity-25">
          <SideBar 
            isDrawer={false}
            onChangeLanguage={(value) => {
              setLanguage(value)
            }} />

          <Box className=" flex flex-col xl:hidden lg:hidden  md:hidden sm:block">
              <AppDrawer anchor='right'>
                <div className="flex flex-col w-[40vw] bg-white h-[100vh] ">
                  <SideBar 
                    isDrawer = {true}
                    onChangeLanguage={(value) => {
                      setLanguage(value)
                    }}
                  />
                </div>
              </AppDrawer>
          </Box>


      </nav>
      {/*  */}
      <section className=" flex flex-col items-center justify-center h-[100vh] relative">
        <Box className='w-[100%] h-[100%] relative' data-aos="fade-up">
            <img className="w-[100%] h-[100%]" src="/images/icon/landing-page/background/bg-intro.svg"/>
        </Box>
        <Box className='flex flex-col gap-[15px] items-center justify-center w-[60%] xl:w-[50%] absolute'>
            <p className="text-PRIMARY-500 text-[18px] text-center">{language == 'ID' ? 'SELAMAT DATANG DI PLANIFY' : 'WELCOME TO PLANIFY'}</p>
            <Box className='flex flex-col gap-[8px] text-[32px] items-center font-poppins font-extrabold'>
              <p className="text-TEXT-1 text-center">{language == 'ID' ? 'Satu platform untuk seluruh' : 'One platform for all your' }</p>
              <p className="text-PRIMARY-500 text-center">{language == 'ID' ? 'Media Sosialmu!' : 'Social Media!'}</p>
            </Box>
            <p className="text-NEUTRAL-700 text-[18px] w-[100%] md:w-[85%] lg:w-[85%] xl:w-[85%] text-center"
            >{
              language == 'ID' ? 'Planify adalah platform manajemen konten yang mengumpulkan semua konten Anda di satu tempat. Dengan bantuan Generate AI dan Auto-Post, rasakan kemudahan dalam mengelola konten bersama kami!' : 
              'Planify is a content management platform that brings all your content together. With the help of Generate AI and Auto-Post, experience the ease of content management with us!'
            }</p>
            <Box className='flex flex-col xl:flex-row items-center gap-[10px] '>
              <AppCustomButton className=' flex gap-[10px] items-center bg-PRIMARY-500 hover:bg-PRIMARY-600 rounded-[6px] px-[24px] py-[10px] '
                      onClick={()=>{
                      }}
                  >
                    <p onClick={()=> {push('/auth/signup')}} className="text-TEXT-5 text-[14px]">{ language  == 'ID' ? 'Mulai' : 'Get Started' }</p>
                    <img src="/images/icon/sparkling-white.svg" />
              </AppCustomButton>
              <Link href={'#feature'}>
                <AppButton
                    className='px-[24px] py-[10px] text-[14px] bg-PRIMARY-100 text-PRIMARY-500 font-poppins rounded-[6px]'
                    text={language == 'ID' ? 'Fitur Kami' : "Our Feature"} 
                    type = {'button'}
                />
              </Link>
          </Box>
        </Box>
      </section>
      {/*  */}
      <section id="benefits"  className="pt-[80px] xl:pt-[0px] flex flex-col items-center justify-center h-auto xl:h-[100vh]">
          <Box className='flex flex-col items-center gap-[100px]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">{language == 'ID' ? 'Mengapa Planify?' : 'Why Planify?'}</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1 text-center px-[20px] ">{language == 'ID' ? "Personalisasi, Optimal, dan Efisien" : "Optimal, Efficient and Scheduled"}</p>
                </Box>
                <Box className='flex flex-col xl:flex-row items-center gap-[40px] justify-center '>
                  {
                    items.map(data => {
                      return(
                        <Box className='flex flex-col gap-[10px] items-center justify-start w-[50%] md:w-[20%]  lg:w-[20%]  xl:w-[20%]'>
                          <img className="xl:w-[auto] w-[200px]  h-auto xl:h-[200px]" src={ data.image } alt="picture-content" />
                          <p className="text-[14px] text-TEXT-1 font-bold text-center">{ language == 'ID' ? data.nameID  :  data.name }</p>
                          <p className="text-[12px] text-TEXT-1 text-center">{language == 'ID' ? data.descriptionID : data.description }</p>
                        </Box>
                      )
                    })
                  }
                </Box>
          </Box>
      </section>
      {/*  */}
      <section id="feature" className="pt-[80px] xl:pt-[0px] flex flex-col items-center justify-center h-auto xl:h-[100vh]">
          <Box className='flex flex-col items-center gap-[40px]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">{ language == 'ID' ? 'Bagaimana Kami bekerja'  : 'How Do We Work?' }</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">{ language == 'ID' ? 'Fitur Kami' : "Our Features"}</p>
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
                        {initButton != 1 ? null : <p>{ language == 'ID' ? 'AI Generate' : 'Generate AI' }</p>}
                      </motion.div>
                      <motion.div 
                        onClick={() => { setInitButton(2) }} 
                        className={`flex items-center justify-start gap-[10px] cursor-pointer p-[10px] rounded-[6px] ${initButton != 2 ? '' : 'bg-PRIMARY-500'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0, opacity: 0.6 }}
                      >
                        <img className="w-[20px] h-[20px]" src={`/images/icon/landing-page/${initButton != 2 ? 'MagnifyingGlass.svg' : 'MagnifyingGlass-soft.svg'}`} alt="icon-button" />
                        {initButton != 2 ? null : <p>{language == 'ID' ? 'Analisis Konten' : "Content Analysis"}</p>}
                      </motion.div>
                      <motion.div 
                        onClick={() => { setInitButton(3) }} 
                        className={`flex items-center justify-start gap-[10px] cursor-pointer p-[10px] rounded-[6px] ${initButton != 3 ? '' : 'bg-PRIMARY-500'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0, opacity: 0.6 }}
                      >
                        <img className="w-[20px] h-[20px]" src={`/images/icon/landing-page/${initButton != 3 ? 'ClockCountdown.svg' : 'ClockCountdown-soft.svg'}`} alt="icon-button" />
                        {initButton != 3 ? null : <p>{ language == 'ID' ? "Unggah Kontent Otomatis" : "Auto-Post Content" }</p>}
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
                                <p className="text-TEXT-2 text-[20px] font-medium">{language == 'ID' ? itemsFeatures[initButton - 1].titleID : itemsFeatures[initButton - 1].title}</p>
                              </Box>
                              <p className="text-TEXT-2 text-[18px]">{language == 'ID' ? itemsFeatures[initButton - 1].descriptionID : itemsFeatures[initButton - 1].description}</p>
                          </Box>
                            <AppCustomButton className={`${language == 'ID' ? 'w-[50%]' : "w-[60%]"} xl:${language == 'ID' ? 'w-[30%]' : "w-[40%]"} flex gap-[10px] items-center bg-PRIMARY-500 hover:bg-PRIMARY-600 rounded-[6px] px-[24px] py-[10px] `}
                                  onClick={()=>{
                                  }}
                              >
                                <p onClick={()=>{push('/auth/signup')}} className="text-TEXT-5 text-[14px]">{ language == 'ID' ? 'Mulai' : 'Get Started' }</p>
                                <img src="/images/icon/sparkling-white.svg" />
                          </AppCustomButton>
                        </Box>           
                  </motion.div>

                </Box>

          </Box>
      </section>
      {/*  */}
      <section id="subscription" className="pt-[80px] xl:pt-[0px] flex flex-col items-center justify-center h-auto xl:h-[100vh]">
          <Box  className='flex flex-col items-center gap-[50px] w-[85%] md:w-[70%] lg:w-[70%] xl:w-[70%]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">{ language  == 'ID' ? 'Berlangganan' : 'Subscription' }</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1 text-center">{ language == 'ID' ? 'Harga terjangkau untuk bisnis Anda!' : 'Affordable price for your business!' }</p>
                </Box>
                <Grid container  justifyContent="flex-center" alignItems="flex-center" spacing={4} className=" lg:xl:p-[20px]  xl:p-[20px] w-[100%] flex flex-col xl:flex-row items-center" >
                    {
                        subscriptionData.map((data,index)=>{
                            return(
                                <Grid item xs={12} xl={4}>
                                    <Box className={`hover:shadow-md text-TEXT-5 flex flex-col items-center gap-[10px] px-[40px] py-[30px]  rounded-[10px] ${ index == 1 ? 'bg-PRIMARY-700 h-[100%] xl:h-[75vh]' : 'bg-PRIMARY-900' }`} >
                                        <p className="text-[22px] font-bold text-center">{data.title}</p>
                                        <Box className='flex flex-col items-center gap-[20px] w-[100%]'>
                                            <p className="text-center">{data.subtitle}</p>
                                            <span className="flex items-center gap-[8px] text-TEXT-5">
                                                <p className="">Rp</p>
                                                <p className="text-[30px] font-bold">{formatRupiahNumber(data.price)}</p>
                                                <p className="">/bulan</p>
                                            </span>
                                            <AppButton
                                                className={`flex ${index == 1 ? 'text-PRIMARY-700' : 'text-PRIMARY-900'} gap-[10px] w-[100%] justify-center items-center text-[14px] bg-white SECONDARY-500 rounded-[10px] px-[25px] py-[8px] shadow-xl`}
                                                text={language == 'ID' ? `Beli ${data.title.split('Package')[0]}` : `Upgrade to ${data.title.split('Package')[0]}`} 
                                                type = {'Submit'}
                                                onClick = {()=>{
                                                  push('/auth/signin')
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
                <p className="text-[18px] text-PRIMARY-500">{language == 'ID' ? "Testimoni" : "Testimonials"}</p>
                <span className="flex flex-col md:flex-row lg:flex-row xl:flex-row items-center gap-[10px] text-center">
                  <p className="text-[24px] font-extrabold text-TEXT-1">{language == 'ID' ? "Kata mereka tentang" : "What they say about"}</p>
                  <p className="text-[24px] font-extrabold text-PRIMARY-500">Planify</p>
                </span>
              </Box>

              <Box className='w-[100%] h-[100%] flex items-center justify-center text-TEXT-5 bg-black'>
                  <AppCarouselTestimoni
                    items={ language == 'ID' ? itemTestimoniID :  itemsTestimoni}
                  />
              </Box>
                
          </Box>
      </section>
      <footer className="w-[100%] h-[100%] xl:h-[50%] flex items-center pb-[50px]">
          <Box className='flex flex-col justify-center px-[50px] xl:px-[200px] '>
              <Box className='flex flex-col gap-[40px] xl:gap-[0px]  xl:flex-row justify-between   items-center md:items-start lg:items-start xl:items-start  border-y-[1px] border-TEXT-4 border-opacity-25 py-[15px]  '>
                  <Box className='flex flex-col items-center md:items-start lg:items-start  xl:items-start gap-[10px]  w-[50%] xl:w-[30%]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>{language == 'ID' ? "Siapa Kita" : "Who are we?"}</p>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] text-center md:xl:text-left lg:text-left  xl:text-left'>{
                        language == 'ID' ? "Planify adalah platform manajemen konten yang mengumpulkan semua konten Anda menjadi satu. Dengan bantuan Generate AI dan Auto-Post, rasakan kemudahan dalam mengelola konten bersama kami!" :
                        "Planify is a content management platform that brings all your content together. With the help of Generate AI and Auto-Post, experience the ease of content management with us!"
                      }</p>
                  </Box>
                  {/*  */}
                  <Box className='flex flex-col items-center md:items-start lg:items-start xl:items-start gap-[10px]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Email</p>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] '>planify@mail.io</p>
                  </Box>
                  {/*  */}
                  <Box className='flex flex-col items-center md:items-start lg:items-start xl:items-start gap-[10px]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Links</p>
                    <ul className="flex flex-col gap-[6px]">
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>{ language == 'ID' ? "Mengapa Planify" : 'Why Planify?' }</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>{ language == 'ID' ? 'Fitur Kami' : 'Our Features' }</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>{ language == 'ID' ? 'Berlangganan' : 'Subscriptions' }</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>{ language == 'ID' ? 'Testimoni' : 'Testimonials' }</a></li>
                    </ul>
                  </Box>
                  {/*  */}
                  <Box className='flex flex-col items-center md:items-start lg:items-start xl:items-start gap-[10px]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>{language == 'ID' ? 'Kontak' : 'Contact'}</p>
                    <ul className="flex flex-col gap-[6px] items-center md:items-start lg:items-start xl:items-start">
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Email</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Instagram</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Twitter</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>Whatsapp</a></li>
                    </ul>
                  </Box>
              </Box>
              {/*  */}
              <Box className='flex flex-col xl:flex-row  items-center gap-[10px] xl:gap-0 xl:items-center justify-between py-[15px]'>
                  <Box className='flex items-center gap-[10px]'>
                      <img className='w-[20px] h-[20px]' src={images.icon.logo.planifyBlack} />
                      <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Planify</p>
                  </Box>
                  <p className="text-TEXT-1 bg-clip-text font-poppins text-[12px] ">{`© 2024 Planify. ${language == 'ID'? 'Seluruh Hak Dilindungi' : 'All rights reserved'}`}</p>
              </Box>
          </Box>
      </footer>
    </main>
  );
}


const SideBar = (props) => {
  
  const { push } = useRouter()
  const [arrowIcon , setArrowIcon ] = useState('/images/icon/ArrowUpRight.svg')
  const [ language ,setLanguage ] = useState(getCookie('language') != null ? getCookie('language') : 'EN')
  

  const handleChangeLanguage = (event) => {
    setCookie('language',event.target.value , 365)
    setLanguage(event.target.value)
    props.onChangeLanguage(event.target.value)
  }

  return(
    <>    
        <Box className={`${props.isDrawer ? 'p-[10px]' : ''} flex items-center gap-[10px]`}>
            <img className='w-[30px] h-[30px]' src={images.icon.logo.planify} />
            <p className='bg-gradient-to-b from-[#44B8F8] to-[#4E5FE5] text-transparent bg-clip-text ont-poppins text-[24px] font-extrabold'>Planify</p>
        </Box>

        <ul className={`text-[12px] ${props.isDrawer ? 'p-[10px] flex flex-col gap-[10px] ' : 'hidden gap-[30px] sm:hidden md:flex lg:flex xl:flex items-center'}  font-bold font-poppins `}>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="#benefits">{language == 'ID' ? 'Keunggulan' : 'Benefits'}</a></li>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="#feature">{language == 'ID' ? 'Fitur' : "Feature"}</a></li>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="#subscription">{language == 'ID' ? 'Berlangganan' : 'Subscribe'}</a></li>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="#faq">{language == 'ID'? "Testimoni" : "FAQ"}</a></li>
          <AppDropDown
              sx={{
                backgroundColor : 'transparent',
                padding: 0,
                fontSize: '12px',
                height: '12px',
                width:'auto',
                boxShadow: "none",
                fontWeight : 700,
                '& .MuiSelect-select' : {
                  padding: 0
                },
                ".MuiOutlinedInput-notchedOutline": { border: 0,     },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                    
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                    
                  },
              }}
              value={language}
              placeholder={'Bahasa'}
              listItem = {listLanguage}
              onChange={handleChangeLanguage}
          />
        </ul>

        <Box className={`${props.isDrawer ? 'flex flex-col gap-[10px] items-start p-[10px]' : 'hidden items-center sm:hidden md:flex lg:flex xl:flex '}  gap-[10px] `}>
          <AppAnimationButton className='w-auto'>
                <AppButton
                    className={`${props.isDrawer ? 'w-[100%]' : ''} px-[20px] py-[6px]  text-[12px] bg-PRIMARY-100 text-PRIMARY-500 font-poppins rounded-[6px]`}
                    text={language  == 'ID' ? 'Masuk' : 'Login'} 
                    type = {'button'}
                    onClick={()=>{
                      push('/auth/signin')
                      }}
                />
            </AppAnimationButton>
            <AppAnimationButton className='w-auto'>
              <AppCustomButton 
                      onMouseEnter={()=>{setArrowIcon('/images/icon/ArrowRight.svg')}} 
                      onMouseLeave={()=>{setArrowIcon('/images/icon/ArrowUpRight.svg')}} 
                      className={` ${props.isDrawer ? 'w-[100%] justify-center' : ''} flex gap-[10px] items-center bg-PRIMARY-500 hover:bg-PRIMARY-600 rounded-[6px] px-[20px] py-[6px] `}
                      onClick={()=>{
                          push('/auth/signup')
                      }}
                  >
                    <p className="text-TEXT-5 text-[12px]">{language  == 'ID' ? 'Daftar' :'Register'}</p>
                    <img src={arrowIcon} className="h-[16px] w-[auto]" alt="alt-icon" />
              </AppCustomButton>
            </AppAnimationButton>
        </Box>
      </>
  ) 
}

