import Box from '@mui/material/Box';
import { ToastContainer, toast } from "react-toastify";
import AppCarousel from '@/app/components/appCaraousel/appCaraousel';


const Layout = (props) => {

    const items = [
        {
            name: 'Optimalisasi konten dengan bantuan AI',
            description: 'Personalisasi data produk dan generate konten dengan AI sesuai kebutuhanmu!',
            image: '/images/vector/AI.png',
        },
        {
            name: 'Dashboard analitik unggahan konten',
            description: 'Lihat rekap unggahan seluruh konten dan produkmu hanya dalam satu halaman!',
            image: '/images/vector/statistic.png',
        },
        {
            name: 'Efisiensi waktu dan penjadwalan yang terstruktur',
            description: 'Tingkatkan efisiensi pengelolaan konten melalui penjadwalan dan auto-posting ke dalam seluruh akun!',
            image: '/images/vector/content.png',
        },
    ];


    return (
        <>
            <Box className='h-[100vh] relative'>
                <Box  className=' absolute h-[100%] w-[100%] flex items-center bg-transparent z-10'>
                    <Box 
                        className = 'w-[50%] h-[100%] hidden bg-transparent xl:bg-transparent xl:flex md:flex lg:flex sm:hidden flex-col items-center justify-center'>
                            <AppCarousel  items = {items}  />
                    </Box>
                    <Box style={{ width : '2px' , height:'70%' }} className='bg-black bg-opacity-[15%]'></Box>
                    <Box className = 'bg-transparent w-[100%] xl:w-[50%] md:w-[50%] h-[100vh] flex flex-col items-center justify-center'>
                        {props.children}
                    </Box>
                </Box>
                {/* background */}
                <Box className = 'h-[100%] flex flex-col justify-between bg-white'>
                    <Box className='relative'>
                        <img src='/images/shape/ShapeUp2.png' className='absolute w-[100%] h-[60px]' />
                        <img src='/images/shape/ShapeUp.png' className='w-[100%] h-[70px]' />
                    </Box>
                    <Box className='relative'>
                        <img src='/images/shape/ShapeDown2.png' className='absolute w-[100%] h-[50px]' />
                        <img src='/images/shape/ShapeDown.png' className='w-[100%] h-[50px]' />
                    </Box>
                </Box>
            </Box>

        </>

    ) 
}

export default Layout;