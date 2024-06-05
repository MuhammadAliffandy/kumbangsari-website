import { Popover } from 'react-tiny-popover';
import { motion } from 'framer-motion';
import AppButton from "@/app/components/appButton/appButton";
import Box from '@mui/material/Box'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton';
import AppNotificationButton from "../appNotificationButton"
import { useState } from 'react';

export const NotificationChildComponent = (props) =>{ 
    return (
        <>
            <Box className='flex w-[100%]'>
                <p className="text-[14px] text-TEXT-1">{props.date}</p>
            </Box>
            <Box className='flex flex-col'>
                {
                    props.listDataNotification.map((data , index) => {
                        return(
                            <Box key={index} className='flex gap-[15px] py-[10px] h-auto items-center w-[100%]'>
                                <img src={`/images/icon/notification/${data.notificationType == 'Pembayaran' ? 'dollar' : 
                                data.notificationType == 'Akun' ? 'profile' : data.notificationType == 'Konektivitas' ? 'setting' : 'setting' }.svg`} className="w-[40px] h-[40px]" />
                                <Box className = 'flex flex-col justify-start gap-[4px] w-[100%]'>
                                    <Box className='flex justify-between items-center'>
                                        <p className="text-[14px] font-bold text-TEXT-1" >{data.title}</p>
                                        <p className="text-[14px] text-TEXT-4" >{data.time}</p>
                                    </Box>
                                    <p className="text-[14px] text-TEXT-1" >{data.subtitle}</p>
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>
        </>
    )
}


const AppPopupNotification = (props) => {
    const [open, setOpen] = useState(false);
    const [selected , setSelected] = useState(0);

    return (
        <Popover
            isOpen={open}
            positions={[  'bottom']}
            containerStyle={{ zIndex: 1300 , display:"flex" , justifyContent:"end", paddingRight:"15%" }}
            onClickOutside={()=> setOpen(false)}
            align="center"
            content={
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={` w-[75vw] md:w-[70vw] lg:w-[60vw] xl:w-[45vw] max-h-[50vh] rounded-[20px] bg-white p-[15px] flex flex-col gap-[15px] overflow-y-auto shadow-xl scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full`}
                >
                    <Box className = 'flex justify-between '>
                        <p className = 'text-[18px] font-bold text-black' >Notifikasi</p>
                        <AppCloseButton
                            onClick = {()=>{
                                setOpen(false)
                                
                            }}
                        />
                    </Box>
                    <Box className='flex gap-[10px] items-center justify-start w-[100%] overflow-y-hidden overflow-x-scroll xl:overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        <AppButton
                            text='Semua'
                            className={`${selected == 0 ? 'bg-PRIMARY-500' : 'bg-white border-[1px] border-TEXT-4 text-TEXT-1'} py-[8px] px-[20px] rounded-[30px] text-[14px]`}
                            onClick={()=>{
                                setSelected(0)
                                props.onSelected('Semua')
                            }}
                        />
                        <AppButton
                            text='Konektivitas'
                            className={`${selected == 1 ? 'bg-PRIMARY-500' : 'bg-white border-[1px] border-TEXT-4 text-TEXT-1'} py-[8px] px-[20px] rounded-[30px] text-[14px] `}
                            onClick={()=>{
                                setSelected(1)
                                props.onSelected('Konektivitas')
                            }}
                        />
                        <AppButton
                            text='Pembayaran'
                            className={`${selected == 2 ? 'bg-PRIMARY-500' : 'bg-white border-[1px] border-TEXT-4 text-TEXT-1'} py-[8px] px-[20px] rounded-[30px] text-[14px] `}
                            onClick={()=>{
                                setSelected(2)
                                props.onSelected('Pembayaran')
                            }}
                        />
                        <AppButton
                            text='Akun'
                            className={`${selected == 3 ? 'bg-PRIMARY-500' : 'bg-white border-[1px] border-TEXT-4 text-TEXT-1'} py-[8px] px-[20px] rounded-[30px] text-[14px] `}
                            onClick={()=>{
                                setSelected(3)
                                props.onSelected('Akun')
                            }}
                        />
                        <AppButton
                            text='Konten'
                            className={`${selected == 4 ? 'bg-PRIMARY-500' : 'bg-white border-[1px] border-TEXT-4 text-TEXT-1'} py-[8px] px-[20px] rounded-[30px] text-[14px] `}
                            onClick={()=>{
                                setSelected(3)
                                props.onSelected('Konten')
                            }}
                        />
                    </Box>
                    <Box className='flex flex-col'>
                        {
                            props.listNotification.map((data,index)=> {
                                return(
                                    <NotificationChildComponent
                                        key={index}
                                        date = {data.dateDay}
                                        listDataNotification = {
                                            data.listDataNotificationChild
                                        }
                                />
                                )
                            })
                        }
                    </Box>
            </motion.div>
            }>
            <div className='relative' >
                <AppNotificationButton
                        available={props.available}
                        onClick={()=>{
                            setOpen(true)
                            props.onClick(true)
                        }}
                />
            </div>
    </Popover>
    )
    
}



export default AppPopupNotification;
