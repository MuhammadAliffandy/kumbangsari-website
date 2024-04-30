import { Popover } from 'react-tiny-popover';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppCustomButton from '@/app/components/appButton/appCustomButton';
import AppButton from '@/app/components/appButton/appButton';
import { useState } from 'react';

const AppPopupImage = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover
            isOpen={open}
            positions={[ 'left', 'bottom']}
            containerStyle={{ zIndex: 1300 , paddingLeft: props.isDashboard ? '6%' : '6%' , paddingRight : props.isDashboard ? '15%' : '0%'}}
            align="center"
            content={
                <Box  onMouseLeave={() => {setOpen(false)}} className = {`${props.isDashboard ? 'w-[auto]' : 'w-[50%]'} h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] border-[2px] border-TEXT-1 shadow-xl`}>
                    {/* headline */}
                    <Box className = 'flex justify-between'>
                        <p className = 'text-[18px] font-bold text-black' >Rekomendasi Gambar</p>
                    </Box>
                    {/* content  */}
                    <Box className={`flex flex-col gap-[15px] w-[100%] h-auto`}>
                    {
                        <Grid container spacing={2} >
                            {
                                props.images != null ?

                                props.images.map((data,index)=>{
                                    return(
                                        <Grid onClick={()=>{props.onClick(data)}} item xs={4} key={index}>
                                            <img className='w-[200px] h-[200px] object-cover rounded-[15px]' src={data} />
                                        </Grid>
                                    )
                                })   

                                : null
                            }
                        </Grid>
                    }
                    {
                        props.images.length != 0  ? null : 
                        
                        props.isDashboard ? 

                        <AppButton
                            className='w-[30vw] py-[15px] bg-CUSTOM-RED shadow-xl text-white my-[10px] font-poppins rounded-[15px]'
                            text = 'Generate'
                            onClick={()=>{
                                props.onGenerate()
                            }}
                        /> : null
                    }
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
