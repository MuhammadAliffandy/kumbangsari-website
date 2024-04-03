import { Popover } from 'react-tiny-popover';
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
                    props.listDataNotification.map(data => {
                        return(
                            <Box className='flex gap-[15px] py-[15px] h-auto items-center'>
                                <img src={`/images/icon/notification/${data.notificationType == 'pay' ? 'dollar' : 
                                data.notificationType == 'account' ? 'profile' : data.notificationType == 'connect' ? 'setting' : 'setting' }.svg`} className="w-[40px] h-[40px]" />
                                <Box className = 'flex flex-col justify-start gap-[4px]'>
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
                <Box   className = {`w-[50%] h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[15px]  shadow-md`}>
                    <Box className = 'flex justify-between'>
                        <p className = 'text-[18px] font-bold text-black' >Notifikasi</p>
                        <AppCloseButton
                            onClick = {()=>{
                                setOpen(false)
                            }}
                        />
                    </Box>
                    <Box className='flex gap-[10px] items-center justify-start w-[100%]'>
                        <AppButton
                            text='Semua'
                            className={`${selected == 0 ? 'bg-PRIMARY-500' : 'bg-white border-[1px] border-TEXT-4 text-TEXT-1'} py-[8px] px-[20px] rounded-[30px] text-[14px]`}
                            onClick={()=>{
                                setSelected(0)
                            }}
                        />
                        <AppButton
                            text='Konektivitas'
                            className={`${selected == 1 ? 'bg-PRIMARY-500' : 'bg-white border-[1px] border-TEXT-4 text-TEXT-1'} py-[8px] px-[20px] rounded-[30px] text-[14px] `}
                            onClick={()=>{
                                setSelected(1)
                            }}
                        />
                        <AppButton
                            text='Pembayaran'
                            className={`${selected == 2 ? 'bg-PRIMARY-500' : 'bg-white border-[1px] border-TEXT-4 text-TEXT-1'} py-[8px] px-[20px] rounded-[30px] text-[14px] `}
                            onClick={()=>{
                                setSelected(2)
                            }}
                        />
                        <AppButton
                            text='Akun'
                            className={`${selected == 3 ? 'bg-PRIMARY-500' : 'bg-white border-[1px] border-TEXT-4 text-TEXT-1'} py-[8px] px-[20px] rounded-[30px] text-[14px] `}
                            onClick={()=>{
                                setSelected(3)
                            }}
                        />
                    </Box>
                    <Box className='flex flex-col'>
                        {
                            props.listNotification.map(data => {
                                return(
                                    <NotificationChildComponent
                                        date = {data.dateDay}
                                        listDataNotification = {
                                            data.listDataNotificationChild
                                        }
                                />
                                )
                            })
                        }
                    </Box>
            </Box>
            }>
            <div className='relative' >
                <AppNotificationButton
                        available={props.available}
                        onClick={()=>{
                            setOpen(true)
                            console.log('click')
                        }}
                />
            </div>
    </Popover>
    )
    
}



export default AppPopupNotification;
