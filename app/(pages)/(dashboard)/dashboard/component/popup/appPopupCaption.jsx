import { Popover } from 'react-tiny-popover';
import Box from '@mui/material/Box';
import AppCustomButton from '@/app/components/appButton/appCustomButton';
import AppButton from '@/app/components/appButton/appButton';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AppPopupCaption = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover
            isOpen={open}
            positions={[ 'left', 'bottom']}
            containerStyle={{ zIndex: 1300 , paddingLeft: props.isDashboard ? '0%' : '6%' , paddingRight : props.isDashboard ? '15%' : '0%'}}
            onClickOutside={()=> setOpen(false)}
            align="center"
            content={
                <Box onMouseLeave={() => setOpen(false)} className={`${props.isDashboard ? 'w-[auto]' : 'w-[50%]'} h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px] border-[2px] border-TEXT-1 shadow-xl `}>
                    {/* headline */}
                    <Box className='flex justify-between'>
                        <p className='text-[18px] font-bold text-black'>Rekomendasi Caption</p>
                    </Box>
                    {/* content  */}

                    <Box className={`flex flex-col gap-[15px] w-[100%] h-[100%]`}>
                        {
                            props.isDashboard ? 

                            <AppButton
                                className='w-[30vw] py-[15px] bg-CUSTOM-RED shadow-xl text-white my-[10px] font-poppins rounded-[15px]'
                                text = 'Generate'
                                onClick={()=>{
                                    props.onGenerate()
                                }}
                            /> :
                            
                            props.captions != null ?

                            props.captions.map((data,index)=>{
                                return(
                                    <Box key = { index } onClick={()=>{props.onClick(data)}} className='bg-NEUTRAL-100 text-[14px]  border-[1px] border-TEXT-1 rounded-[20px] px-[15px] py-[10px] text-TEXT-1'>
                                        <p>{data}</p>
                                    </Box>
                                ) 
                            }) : <div className='w-[40vw] flex flex-col'>
                                        <Skeleton style={{ width: '40%' }} height={10} count={3} />
                                </div>
                        } 
                    </Box>
                </Box>
                
            }>
            <div className='relative'>
                <AppCustomButton
                    className='flex items-center gap-[5px]'s
                    onMouseEnter={() => setOpen(true)}
                >
                        <img className='w-[14px] h-[14px]' src='/images/icon/sparkling.png' alt="Sparkling icon" />
                        <p className='text-[12px] text-PRIMARY-500 font-poppins font-semibold'>Tampilkan Rekomendasi AI</p>
                </AppCustomButton>
            </div>
    </Popover>
    )
}

export default AppPopupCaption;
