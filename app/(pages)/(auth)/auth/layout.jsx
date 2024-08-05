import Box from '@mui/material/Box';
import { ToastContainer, toast } from "react-toastify";
import AppCarousel from '@/app/components/appCaraousel/appCaraousel';
import images from '../../../../public/images/images';

const Layout = (props) => {

    const items = [
        {
            name: 'Optimalisasi konten dengan bantuan AI',
            description: 'Personalisasi data produk dan generate konten dengan AI sesuai kebutuhanmu!',
            image: images.vector.AIVector,
        },
        {
            name: 'Dashboard analitik unggahan konten',
            description: 'Lihat rekap unggahan seluruh konten dan produkmu hanya dalam satu halaman!',
            image: images.vector.statisticVector,
        },
        {
            name: 'Efisiensi waktu dan penjadwalan yang terstruktur',
            description: 'Tingkatkan efisiensi pengelolaan konten melalui penjadwalan dan auto-posting ke dalam seluruh akun!',
            image: images.vector.contentVector,
        },
    ];


    return (
        <>
            <Box className='h-[100vh] relative flex items-center justify-center'>
                {/* <Box  className=' absolute h-[100%] w-[100%] flex items-center bg-transparent z-10'>
                    <Box 
                        className = 'w-[50%] h-[100%] hidden bg-transparent xl:bg-transparent xl:flex md:flex lg:flex sm:hidden flex-col items-center justify-center'>
                            <AppCarousel  items = {items}  />
                    </Box>
                    <Box style={{ width : '2px' , height:'70%' }} className='bg-black bg-opacity-[15%]'></Box>
                    <Box className = 'bg-transparent w-[100%] xl:w-[50%] md:w-[50%] h-[100vh] flex flex-col items-center justify-center'>
                    </Box>
                    </Box> */}
                {/* background */}
                <Box className='w-[50%]'>
                    {props.children}
                </Box>
               
            </Box>

        </>

    ) 
}

export default Layout;