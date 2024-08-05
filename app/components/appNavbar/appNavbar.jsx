'use client'
import Box from '@mui/material/Box'
import AppButton from "@/app/components/appButton/appButton";
import { useState , useEffect} from "react";

import AppDrawer from '@/app/components/appDrawer/appDrawer'
import AppDropDown from "@/app/components/appDropDown/appDropDown";
import 'aos/dist/aos.css';
import { useRouter } from "next/navigation";
import AppAnimationButton from "@/app/components/appAnimation/appAnimationButton";
import images from "@/public/images/images";
import { listLanguage } from "@/app/utils/model";

const AppNavbar = ({ children }) => {
    const { push } = useRouter()
    return(
        <main className="flex flex-col w-full">
            <nav className="sticky top-0 z-[100] bg-white bg-opacity-[50%] backdrop-blur-xl flex items-center justify-between px-[15px] xl:px-0 sm:justify-between md:justify-between xl:justify-around py-[15px] border-b-[1px] border-TEXT-4 border-opacity-25">
                <SideBar 
                isDrawer={false}
                />
    
                <Box className=" flex flex-col xl:hidden lg:hidden  md:hidden sm:block">
                    <AppDrawer anchor='right'>
                    <div className="flex flex-col w-[40vw] bg-white h-[100vh] ">
                        <SideBar 
                        isDrawer = {true}
                        />
                    </div>
                    </AppDrawer>
                </Box>
    
            </nav>
            {
                children
            }
            <footer className="w-[100%] h-[100%] xl:h-[50%] flex items-center pb-[50px] border-t-[1px] border-t-gray-300">
            <Box className='flex flex-col justify-center px-[50px] xl:px-[200px] '>
                <Box className='flex flex-col gap-[40px] xl:gap-[0px]  xl:flex-row justify-between   items-center md:items-start lg:items-start xl:items-start  border-y-[1px] border-TEXT-4 border-opacity-25 py-[15px]  '>
                    <Box className='flex flex-col items-center md:items-start lg:items-start  xl:items-start gap-[10px]  w-[50%] xl:w-[30%] ' 
                    >
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
    )
}

export default AppNavbar;

const SideBar = (props) => {

    const { push } = useRouter()
    const [arrowIcon , setArrowIcon ] = useState('/images/icon/ArrowUpRight.svg')

    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentPath(window.location.pathname.split('/feature/')[1]);
        }
    }, []);

    return(
        <>    
            <Box className={`${props.isDrawer ? 'p-[10px]' : ''} flex items-center gap-[10px] cursor-pointer`} onClick={()=>{push('/')}}>
                <img className='w-[30px] h-[auto]' src={images.image.logoSitubondo} />
                <Box className='flex flex-col gap-[1px]'>
                    <p className='text-black font-bold text-[14px] p-0'>Desa Kumbangsari</p>
                    <p className='text-black text-[12px]'>Kecamatan Jangkar</p>
                </Box>
            </Box>

            <ul className={`text-[12px] ${props.isDrawer ? 'p-[10px] flex flex-col gap-[10px] ' : 'hidden gap-[30px] sm:hidden md:flex lg:flex xl:flex items-center'}  font-bold font-poppins `}>
            <li className={`${currentPath == 'profile' ? 'text-PRIMARY-500' : "text-TEXT-1" } hover:text-PRIMARY-500`}><a href="/feature/profile">{ 'Profil' }</a></li>
            <li className={`${currentPath == 'potency' ? 'text-PRIMARY-500' : "text-TEXT-1" } hover:text-PRIMARY-500`}><a href="/feature/potency">{ 'Potensi'}</a></li>
            <li className={`${currentPath == 'news' ? 'text-PRIMARY-500' : "text-TEXT-1" } hover:text-PRIMARY-500`}><a href="/feature/news">{ 'Berita'}</a></li>
            <li className={`${currentPath == 'shop' ? 'text-PRIMARY-500' : "text-TEXT-1" } hover:text-PRIMARY-500`}><a href="/feature/shop">{ "Belanja"}</a></li>
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
