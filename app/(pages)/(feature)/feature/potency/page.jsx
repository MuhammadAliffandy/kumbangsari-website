'use client'
import Box from '@mui/material/Box'
import images from '@/public/images/images';

const PotencyPage = () => {
    return(
        <>
             <section className='w-[100%] flex flex-col items-center justify-center h-auto relative'>
                <Box className='flex flex-col items-center gap-[40px] w-[90%] py-[20px]' >
                    <Box className='flex flex-col gap-[5px] items-center'>
                        <p className="text-[18px] text-PRIMARY-500">{ 'Potensi Desa'}</p>
                        <p className="text-[24px] font-extrabold text-TEXT-1">{'Menampilkan potensi yang ada di Desa'}</p>
                    </Box>
                    <Box className='flex justify-center items-center w-[100%]'>
                        <img src={images.image.potensi} className='w-[80%] h-auto object-cover' />
                    </Box>
                    
                </Box>
            </section>
        </>
    )
}

export default PotencyPage;