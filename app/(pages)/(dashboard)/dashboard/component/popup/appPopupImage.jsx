import { Popover } from 'react-tiny-popover';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppCustomButton from '@/app/components/appButton/appCustomButton';
import { useState } from 'react';

const AppPopupImage = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover
            isOpen={open}
            positions={[ 'left', 'bottom']}
            containerStyle={{ zIndex: 1300 , paddingLeft: '6%'}}
            onClickOutside={()=> setOpen(false)}
            align="center"
            content={
                <Box  onMouseLeave={() => setOpen(false)} className = {`w-[50%] h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] border-[2px] border-TEXT-1 shadow-xl`}>
                    {/* headline */}
                    <Box className = 'flex justify-between'>
                        <p className = 'text-[18px] font-bold text-black' >Rekomendasi Gambar</p>
                    </Box>
                    {/* content  */}
                    <Box className={`flex flex-col gap-[15px] w-[100%] h-[100%]`}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <img className='w-[100%] h-auto rounded-[15px]' src='https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg' />
                            </Grid>
                            <Grid item xs={4}>
                                <img className='w-[100%] h-auto rounded-[15px]' src='https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg' />
                            </Grid>
                            <Grid item xs={4}>
                                <img className='w-[100%] h-auto rounded-[15px]' src='https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141353.jpg' />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                
            }>
            <div className='relative'>
                <AppCustomButton
                    className='flex items-center gap-[5px]'
                    onMouseEnter={() => setOpen(true)}
                >
                        <img className='w-[14px] h-[14px]' src='/images/icon/sparkling.png' alt="Sparkling icon" />
                        <p className='text-[12px] text-PRIMARY-500 font-poppins font-semibold'>Tampilkan Rekomendasi AI</p>
                </AppCustomButton>
            </div>
    </Popover>
    )
}

export default AppPopupImage;
