'use client'
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import AppCustomButton from "@/app/components/appButton/appCustomButton";
import { convertToIndonesianDate, formatRupiahNumber, formattedDate, getCookie, setCookie } from "@/app/utils/helper";
import Grid from '@mui/material/Grid'
import { motion } from 'framer-motion';
import Link from "next/link";
import { useState , useEffect} from "react";
import AppCarouselTestimoni from '@/app/components/appCaraousel/appCaraouselTestimoni';
import AppDrawer from '@/app/components/appDrawer/appDrawer'
import AppDropDown from "./components/appDropDown/appDropDown";
import AppMap from "@/app/components/appMap/appMap"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from "next/navigation";
import { getAllGallery } from '@/app/api/repository/galleryRepository'
import { getAllNews } from '@/app/api/repository/newsRepository'
import { getAllProduct } from '@/app/api/repository/productRepository'
import AppAnimationButton from "./components/appAnimation/appAnimationButton";
import images from "@/public/images/images";
import { listLanguage } from "./utils/model";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setNewsData } from './redux/slices/newsSlice';
import { setProductData } from './redux/slices/productSlice';


const arr = [1,2,3,4,5]

const items = [
  {
      name: 'Personalized Recommendation',
      description: 'Get AI-based content recommendations that suit your product!',
      nameID : "Profil Desa",
      descriptionID : "Desa Kumbangsari terletak di Kecamatan Jangkar, Kabupaten Situbondo, dengan mayoritas penduduk bekerja di sektor pertanian.",
      image: '/images/vector/vector-02.jpg',
  },
  {
      name: 'Data Optimization',
      description: 'Get all your product content data analyzed in one easy-to-use platform!',
      nameID : "Produk Desa",
      descriptionID : "Desa Kumbangsari memiliki potensi wisata alam yang indah dan lahan pertanian yang subur.",
      image: '/images/vector/vector-03.jpg',
  },
  {
      name: 'Time Efficiency',
      description: 'Automate your content posting with our scheduled content auto-post feature!',
      nameID : "Potensi",
      descriptionID : "Desa Kumbangsari memiliki potensi wisata alam yang indah dan lahan pertanian yang subur.",
      image: '/images/vector/vector-04.jpg',
  },
];

const organizationStructure = [
  {
    name: 'Syamsuyono',
    role :'Kepala Desa',
    image: '/images/icon/landing-page/user/user1.svg'
  },
  {
    name: 'Kusnadi',
    role :'Sekretaris Desa',
    image: '/images/icon/landing-page/user/user2.svg'
  },
  {
    name: 'Sarwan',
    role :'KA. Urusan Tata Usaha dan Umum',
    image: '/images/icon/landing-page/user/user3.svg'
  },
  {
    name: 'Fathorrosi',
    role :'KA. Keuangan',
    image: '/images/icon/landing-page/user/user4.svg'
  },
]

const adminitrasiPenduduk = [
  {
    title : 'Penduduk',
    count: 3057,
  },
  {
    title : 'Kepala Keluarga',
    count: 1162,
  },
  {
    title : 'Laki - Laki',
    count: 1626,
  },
  {
    title : 'Perempuan',
    count: 1424,
  },
]

const newsExample = [
  {
    title : 'Berita terkait sebuah hal yang memengaruhi desa setempat dengan beberapa penaruh ',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' , 
    image: '/images/bg.jpg',
    date : '12 Agustus 2024'
  },
  {
    title : 'Berita terkait sebuah hal yang memengaruhi desa setempat dengan beberapa penaruh ',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' , 
    image: '/images/bg.jpg',
    date : '12 Agustus 2024'
  },
  {
    title : 'Berita terkait sebuah hal yang memengaruhi desa setempat dengan beberapa penaruh ',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' , 
    image: '/images/bg.jpg',
    date : '12 Agustus 2024'
  },
  {
    title : 'Berita terkait sebuah hal yang memengaruhi desa setempat dengan beberapa penaruh ',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' , 
    image: '/images/bg.jpg',
    date : '12 Agustus 2024'
  },
  {
    title : 'Berita terkait sebuah hal yang memengaruhi desa setempat dengan beberapa penaruh ',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' , 
    image: '/images/bg.jpg',
    date : '12 Agustus 2024'
  },
  {
    title : 'Berita terkait sebuah hal yang memengaruhi desa setempat dengan beberapa penaruh ',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged' , 
    image: '/images/bg.jpg',
    date : '12 Agustus 2024'
  },
]

const productExample = [
  {
    title : 'Tas',
    count : 20,
    image: '/images/bg.jpg',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    price : 100000,
    rate : 4,
    createdAt : '12 Agustus 2024'
  },
  {
    title : 'Tas',
    count : 20,
    image: '/images/bg.jpg',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    price : 100000,
    rate : 4,
    createdAt : '12 Agustus 2024'
  },
  {
    title : 'Tas',
    count : 20,
    image: '/images/bg.jpg',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    price : 100000,
    rate : 4,
    createdAt : '12 Agustus 2024'
  },
  {
    title : 'Tas',
    count : 20,
    image: '/images/bg.jpg',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    price : 100000,
    rate : 4,
    createdAt : '12 Agustus 2024'
  },
  {
    title : 'Tas',
    count : 20,
    image: '/images/bg.jpg',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    price : 100000,
    rate : 4,
    createdAt : '12 Agustus 2024'
  },
  {
    title : 'Tas',
    count : 20,
    image: '/images/bg.jpg',
    description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
    price : 100000,
    rate : 4,
    createdAt : '12 Agustus 2024'
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
    "title": "Keajaiban Desa Kumbangsari",
    "subtitle": `"Mengunjungi Desa Kumbangsari adalah pengalaman yang tak terlupakan. Desa ini menawarkan pemandangan alam yang menakjubkan dan budaya yang kaya. Wisatawan bisa menikmati keindahan alam dan keramahan penduduk setempat, membuat kunjungan mereka sangat istimewa."`,
    "username": "John Doe, Wisatawan",
    "image": "/images/icon/landing-page/user/user1.svg"
  },
  {
    "title": "Destinasi Impian di Desa Kumbangsari",
    "subtitle": `"Desa Kumbangsari adalah surga tersembunyi yang menawarkan pengalaman tak tertandingi. Dari pemandangan pegunungan hingga aktivitas budaya yang autentik, desa ini memiliki semuanya. Kami sangat merekomendasikan kunjungan ke desa ini untuk semua pencari petualangan."`,
    "username": "Jane Smith, Petualang",
    "image": "/images/icon/landing-page/user/user2.svg"
  },
  {
    "title": "Pengalaman Unik di Desa Kumbangsari",
    "subtitle": `"Setiap sudut Desa Kumbangsari menawarkan keunikan tersendiri. Kami sangat menikmati setiap momen yang kami habiskan di sini, dari berinteraksi dengan penduduk setempat hingga menjelajahi alam sekitar. Desa Kumbangsari adalah destinasi yang sempurna untuk pelancong yang mencari pengalaman otentik."`,
    "username": "Alice Brown, Pelancong",
    "image": "/images/icon/landing-page/user/user3.svg"
  },
  {
    "title": "Kumbangsari: Permata Tersembunyi",
    "subtitle": `"Desa Kumbangsari adalah permata tersembunyi yang menunggu untuk ditemukan. Desa ini menawarkan keindahan alam yang menakjubkan dan budaya yang kaya, membuat setiap kunjungan menjadi pengalaman yang tak terlupakan. Kami sangat merekomendasikan desa ini sebagai destinasi wisata yang harus dikunjungi."`,
    "username": "David Lee, Penjelajah",
    "image": "/images/icon/landing-page/user/user4.svg"
  }
]




export default function LandingPage() {
  
  const dispatch = useDispatch()
  const [initButton , setInitButton] = useState(1)
  const [ language ,setLanguage ] = useState(getCookie('language') != null ? getCookie('language') : 'EN')
  const [gallery , setGallery] = useState([])
  const [news , setNews] = useState([])
  const [product , setProduct] = useState([])
  const { push } = useRouter()
  
  // state animation

  const checkLanguage = () => {
    if(getCookie('language') == null){
      setCookie('language','EN', 365)
    }
  }
  
  
  const fetchGalleryData = async () => {
    try {
      
      const res = await getAllGallery()

      if(res.status == 'OK'){

        const data = res.data.filter((data ,index ) => {
          return index < 6
        })

        setGallery(data)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Ada Kesalahan Server 500')
    }
  }

  const fetchNewsData = async () => {
    try {
      const res = await getAllNews()

      
      
      if(res.status == 'OK'){
        const data = res.data.filter((data ,index ) => {
          return index < 6
        })
        setNews(data)
      }
    } catch (error) {
      toast.error('Ada Kesalahan Server 500')
    }
  }

  const fetchProductData = async () => {
    try {
      const res = await getAllProduct()

      if(res.status == 'OK'){
        const data = res.data.filter((data ,index ) => {
          return index < 6
        })

        setProduct(data)
      }
    } catch (error) {
      toast.error('Ada Kesalahan Server 500')
    }
  }


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

  useEffect(()=>{
    if(product.length == 0){
      fetchProductData()
    }
  } , [product])

  useEffect(()=>{
    if(news.length == 0){
      fetchNewsData()
    }
  } , [news])

  useEffect(()=>{
    if(gallery.length == 0){
      fetchGalleryData()
    }
  } , [gallery])
  

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
              <Box className='bg-black bg-opacity-[50%] backdrop-blur-sm w-[100%] h-[100%] absolute'></Box>
              <img className="w-[100%] h-[100%]" src={images.image.background}/>

        </Box>
        <Box className='flex flex-col gap-[15px] items-center justify-center w-[70%] xl:w-[70%] absolute'>
            <Box className='flex flex-col gap-[8px] text-[42px] items-center font-poppins font-extrabold'>
              <p className="text-white text-center">{ 'SELAMAT DATANG DI DESA KUMBANGSARI' }</p>
            </Box>
            <p className="text-white text-[18px] w-[100%] md:w-[85%] lg:w-[85%] xl:w-[95%] text-center"
            >{
              'Desa Kumbangsari terletak di Kecamatan Jangkar, Kabupaten Situbondo, Jawa Timur. Sebagian besar penduduknya bekerja di sektor pertanian, peternakan, dan perikanan. Desa ini memiliki fasilitas pendidikan, kesehatan, dan tempat ibadah yang melayani kebutuhan masyarakat lokal.'
            }</p>
        </Box>
      </section>
      {/*  */}
      <section id="feature"  className="pt-[80px] xl:pt-[0px] flex flex-col items-center justify-center h-auto xl:h-[100vh]">
          <Box className='flex flex-col items-center gap-[100px]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">{'Apa Saja di Kumbangsari?'}</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1 text-center px-[20px] ">{ "Potensi, Profil, dan Produk Desa" }</p>
                </Box>
                <Box className='flex flex-col xl:flex-row items-center gap-[40px] justify-center '>
                  {
                    items.map(data => {
                      return(
                        <Box className='flex flex-col gap-[10px] items-center justify-start w-[50%] md:w-[20%]  lg:w-[20%]  xl:w-[20%]'>
                          <img className="xl:w-[auto] w-[200px]  h-auto xl:h-[200px]" src={ data.image } alt="picture-content" />
                          <p className="text-[14px] text-TEXT-1 font-bold text-center">{ data.nameID  }</p>
                          <p className="text-[12px] text-TEXT-1 text-center"> {data.descriptionID }</p>
                        </Box>
                      )
                    })
                  }
                </Box>
          </Box>
      </section>
      {/*  */}
      <section id="sotk" className="pt-[80px] xl:pt-[0px] flex flex-col items-center justify-center h-auto xl:h-[100vh]">
          <Box className='flex flex-col items-center gap-[40px]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">{ language == 'ID' ? 'SOTK'  : 'Struktur Organisasi dan Tata Kerja' }</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">{ language == 'ID' ? 'Struktur Organisasi dan Tata Kerja' : "Our Features"}</p>
                </Box>
                
                <Box className='flex items-center justify-center w-[100%] gap-[20px] '>
                  {
                    organizationStructure.map(data => {
                      return(
                        <Box className='w-[100%] rounded-[10px] bg-PRIMARY-500 p-[10px] flex flex-col gap-[15px]'>
                            <img className='w-full h-[300px] object-cover' src={images.icon.profileDefault}/>
                            <div className='text-center'>
                              <p className='text-white text-[16px] font-bold'>{data.name}</p>
                              <p className='text-white text-[12px]'>{data.role}</p>
                            </div>
                        </Box>
                      )
                    })
                  }
                </Box>

          </Box>
      </section>
      {/*  */}
      <section id="adminitration" className="pt-[80px] xl:pt-[0px] flex flex-col items-center justify-center h-auto xl:h-[100vh]">
          <Box className='flex flex-col items-center gap-[40px] w-[70%]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">{ language == 'ID' ? 'Adminitrasi Penduduk'  : 'Struktur Organisasi dan Tata Kerja' }</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">{ language == 'ID' ? 'Transparasi Data Penduduk' : "Our Features"}</p>
                </Box>
                
                <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" direction="row" className='w-[100%]'>
                    {
                      adminitrasiPenduduk.map(data => {
                        return(
                          <Grid item xs={6}>
                              <Box className='w-full h-[150px] rounded-[10px] flex flex-col text-center bg-PRIMARY-500 '>
                                  <div className='p-[20px] flex flex-col gap-[10px] h-[100%]'>
                                    <p className='text-white text-[14px]'>{data.title}</p>
                                    <Box className='p-[10px] h-full flex items-center justify-center bg-white rounded-[10px]'>
                                        <p className='text-[24px] text-gray-400 font-bold'>{formatRupiahNumber(data.count)}</p>
                                    </Box>
                                  </div>
                              </Box>
                          </Grid>
                        )
                      })
                    }
                </Grid>

          </Box>
      </section>
      {/*  */}
      <section id="map" className="pt-[150px] xl:pt-[0px] flex flex-col items-center justify-center h-[100vh] ">
          <Box className='flex flex-col items-center gap-[40px] w-[90%]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">{ language == 'ID' ? 'Berita Desa'  : 'Struktur Organisasi dan Tata Kerja' }</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">{ language == 'ID' ? 'Informasi Seluruh Berita di Desa Kumbangsari' : "Our Features"}</p>
                </Box>
                
                <Box className='flex bg-red-500 items-center justify-center w-[80%] h-[50%] gap-[20px]'>
                    <div className='h-full w-full'>
                      <AppMap/>
                    </div>
                </Box>

          </Box>
      </section>
      {/*  */}
      <section id="news" className="pt-[150px] xl:pt-[0px] flex flex-col items-center justify-center h-[100vh] ">
          <Box className='flex flex-col items-center gap-[40px] w-[90%]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">{ 'Berita Desa'  }</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">{ 'Informasi Seluruh Berita di Desa Kumbangsari' }</p>
                </Box>
                
                <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" direction="row" className='w-[100%]'>
                    {
                      news.map(data => {
                        return(
                          <Grid item xs={4} onClick={ ()=> {
                              dispatch(setNewsData(data))
                              push('/news/detail')
                          } }>
                              <Box className='w-full rounded-[10px] flex flex-col text-center shadow-xl bg-white h-[280px] border-[1px] border-transparent hover:border-[1px] hover:border-PRIMARY-300 cursor-pointer'>
                                  <img src={data.image} alt='news-photos' className='h-[50%] rounded-t-[10px] object-cover '/>
                                  <div className='h-[40%] flex w-[100%]  relative'>
                                    <div className='bg-PRIMARY-500 py-[8px] px-[12px] bottom-5 rounded-l-[14px] right-0 absolute'>
                                      <p className='text-[10px]'>{convertToIndonesianDate(data.updatedAt)}</p>
                                    </div>
                                    <div className='  overflow-hidden flex flex-col gap-[4px] p-[15px] items-start justify-start'>
                                        <p className='text-[18px] text-start text-black font-bold'>{data.title}</p>
                                        <p className='text-[14px] text-start text-black break-words'>{data.text}</p>
                                    </div>
                                  </div>
                              </Box>
                          </Grid>
                        )
                      })
                    }
                </Grid>

          </Box>
      </section>
      {/*  */}
      <section id="product" className="pt-[80px] flex flex-col items-center justify-center h-[100vh]">
          <Box className='flex flex-col items-center gap-[40px] w-[90%]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">{  'Dari Desa Untuk Desa' }</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">{  'Layanan pembelian produk yang dibuat oleh desa' }</p>
                </Box>
                
                <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" direction="row" className='w-[100%]'>
                    {
                      product.map(data => {
                        
                        return(
                          <Grid item xs={4} onClick={()=>{
                            dispatch(setProductData(data))
                            push('/product/detail')
                          }}>
                              <Box className='w-full rounded-[10px] flex flex-col text-center shadow-xl bg-white h-[250px] border-[1px] border-transparent hover:border-[1px] hover:border-PRIMARY-300 cursor-pointer'>
                                  <img src={data.image} alt='news-photos' className='h-[70%] rounded-t-[10px] object-cover '/>
                                  <div className='h-[30%] flex w-[100%]  relative'>
                                    <div className='bg-STATE-YELLOW-BASE py-[8px] px-[12px] bottom-5 rounded-l-[14px] right-0 shadow-xl absolute'>
                                      <p className='text-[10px]'>Lihat Produk</p>
                                    </div>
                                    <div className='  overflow-hidden flex flex-col gap-[4px] p-[15px] items-start justify-start'>
                                        <p className='text-[18px] text-start text-black font-bold'>{data.title}</p>
                                        <div className='flex gap-[4px] items-center'>
                                          {
                                            arr.map((item , index) => {
                                              return(
                                                <FontAwesomeIcon icon={faStar} color={  index < data.rating ? '#FFC300' :  '#D9D9D9'} />
                                              )
                                            })
                                          }
                                        </div>
                                    </div>
                                   
                                  </div>
                              </Box>
                          </Grid>
                        )
                      })
                    }
                </Grid>

          </Box>
      </section>
      {/*  */}
      <section id="gallery" className="pt-[80px] flex flex-col items-center justify-center h-[100vh]">
          <Box className='flex flex-col items-center gap-[40px] w-[90%]' data-aos="fade-up">
                <Box className='flex flex-col gap-[5px] items-center'>
                  <p className="text-[18px] text-PRIMARY-500">{ 'Galeri Desa'  }</p>
                  <p className="text-[24px] font-extrabold text-TEXT-1">{ 'Menampilkan kegiatan-kegiatan yang berlangsung di Desa' }</p>
                </Box>
                
                <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start" direction="row" className='w-[100%]'>
                    {
                      gallery.map(data => {
                        return(
                          <Grid item xs={4}>
                              <Box className='w-full rounded-[10px] flex flex-col text-center shadow-xl bg-white h-[250px] border-[1px] border-transparent hover:border-[1px] hover:border-PRIMARY-300'>
                                  <img src={data.image} alt='news-photos' className='h-[100%] rounded-[10px] object-cover'/>
                          
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
                  <p className="text-[24px] font-extrabold text-PRIMARY-500">Website Kami</p>
                </span>
              </Box>

              <Box className='w-[100%] h-[100%] flex items-center justify-center text-TEXT-5 bg-black'>
                  <AppCarouselTestimoni
                    items={itemTestimoniID}
                  />
              </Box>
                
          </Box>
      </section>
      <footer className="w-[100%] h-[100%] xl:h-[50%] flex items-center pb-[50px]">
          <Box className='flex flex-col justify-center px-[50px] xl:px-[200px] '>
              <Box className='flex flex-col gap-[40px] xl:gap-[0px]  xl:flex-row justify-between   items-center md:items-start lg:items-start xl:items-start  border-y-[1px] border-TEXT-4 border-opacity-25 py-[15px]  '>
                  <Box className='flex flex-col items-center md:items-start lg:items-start  xl:items-start gap-[10px]  w-[50%] xl:w-[30%]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>{"Desa Kumbangsari"}</p>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] text-center md:xl:text-left lg:text-left  xl:text-left'>{
                       "Desa Kumbangsari terletak di Kecamatan Jangkar, Kabupaten Situbondo, Jawa Timur. Sebagian besar penduduknya bekerja di sektor pertanian, peternakan, dan perikanan. Desa ini memiliki fasilitas pendidikan, kesehatan, dan tempat ibadah yang melayani kebutuhan masyarakat lokal."
                      }</p>
                  </Box>
                  {/*  */}
                  <Box className='flex flex-col items-center md:items-start lg:items-start xl:items-start gap-[10px]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Email</p>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] '>desakumbangsarijangkar@gmail.com</p>
                  </Box>
                  {/*  */}
                  <Box className='flex flex-col items-center md:items-start lg:items-start xl:items-start gap-[10px]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Links</p>
                    <ul className="flex flex-col gap-[6px]">
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>{ "Profil"  }</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>{ 'Potensi'  }</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>{ 'Berita'  }</a></li>
                      <li className="text-TEXT-1 bg-clip-text font-poppins text-[12px]"><a>{ 'Belanja' }</a></li>
                    </ul>
                  </Box>
                  {/*  */}
                  <Box className='flex flex-col items-center md:items-start lg:items-start xl:items-start gap-[10px]'>
                    <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>{ 'Kontak'}</p>
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
                      <img className='w-[20px] h-[20px]' src={images.image.logoSitubondo} />
                      <p className='text-TEXT-1 bg-clip-text font-poppins text-[12px] font-bold'>Desa Kumbangsari</p>
                  </Box>
                  <p className="text-TEXT-1 bg-clip-text font-poppins text-[12px] ">{`© 2024 Planify. ${'Seluruh Hak Dilindungi' }`}</p>
              </Box>
          </Box>
      </footer>
    </main>
  );
}


const SideBar = (props) => {
  
  const { push } = useRouter()


  return(
    <>    
        <Box className={`${props.isDrawer ? 'p-[10px]' : ''} flex items-center gap-[10px]`}>
            <img className='w-[30px] h-[auto]' src={images.image.logoSitubondo} />
            <Box className='flex flex-col gap-[1px]'>
                <p className='text-black font-bold text-[14px] p-0'>Desa Kumbangsari</p>
                <p className='text-black text-[12px]'>Kecamatan Jangkar</p>
            </Box>
        </Box>

        <ul className={`text-[12px] ${props.isDrawer ? 'p-[10px] flex flex-col gap-[10px] ' : 'hidden gap-[30px] sm:hidden md:flex lg:flex xl:flex items-center'}  font-bold font-poppins `}>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="/feature/profile">{ 'Profil' }</a></li>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="/feature/potency">{ 'Potensi' }</a></li>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="/feature/news">{ 'Berita' }</a></li>
          <li className="text-TEXT-1 hover:text-PRIMARY-500"><a href="/feature/shop">{ "Belanja" }</a></li>
        </ul>

        <Box className={`${props.isDrawer ? 'flex flex-col gap-[10px] items-start p-[10px]' : 'hidden items-center sm:hidden md:flex lg:flex xl:flex '}  gap-[10px] `}>
          <AppAnimationButton className='w-auto'>
                <AppButton
                    className={`${props.isDrawer ? 'w-[100%]' : ''} px-[20px] py-[6px]  text-[12px] bg-PRIMARY-100 text-PRIMARY-500 font-poppins rounded-[6px]`}
                    text={'Masuk'} 
                    type = {'button'}
                    onClick={()=>{
                      push('/auth/signin')
                      }}
                />
            </AppAnimationButton>
        </Box>
      </>
  ) 
}

