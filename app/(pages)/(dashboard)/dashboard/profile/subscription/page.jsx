'use client'
import AppTablePayment from "@/app/components/appTable/appTablePayment";
import AppLayout from "../../component/appLayout";
import AppButton from "@/app/components/appButton/appButton";
import AppModalSubscriptionList from '@/app/(pages)/(dashboard)/dashboard/profile/subscription/component/subscriptionListModal'
import AppModalPaymentDetail from '@/app/(pages)/(dashboard)/dashboard/profile/subscription/component/appModalPaymentDetail'
import { convertToIndonesianDate, formatRupiahNumber, formattedDate } from "@/app/utils/helper";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress';
import AppCustomModal from "../../../../../components/appModal/AppCustomModal";
import AppModalSuccessPay from './component/appModalSuccessPay'
import AppModalFailedPay from './component/appModalFailedPay'
import AppModalPendingPay from './component/appModalPendingPay'
import { useEffect, useState } from "react";
import { getUserSubscription } from "@/app/api/repository/subscriptionRepository";
import { getPaymentTransaction } from "@/app/api/repository/paymentRepository";
import { subscriptionList } from "./component/subscriptionList";
import { toast } from "react-toastify";


const createDataPayment = (date, packet, price, status, ) => {
    return { date, packet, price, status,  };
}

const dataPaymentTable = [
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'success'),
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'waiting'),
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'waiting'),
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'waiting'),
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'waiting'),
    createDataPayment('15 Desember 2023', 'Paket Dasar', 'Rp 100.000,00', 'waiting'),
];

const SubscriptionPage = () => {

    // state modal 
    const [modalSuccessPay , setModalSuccessPay ] = useState(false)
    const [modalPendingPay , setModalPendingPay ] = useState(false)
    const [modalFailedPay , setModalFailedPay ] = useState(false)
    const [ stopSubscription ,  setStopSubscription ] = useState(false)
    const [ paymentDetailModal ,  setPaymentDetailModal ] = useState(false)
    const [ subscriptionListModal ,  setSubscriptionListModal ] = useState(false)
    // state hover
    const [infoPacket , setInfoPacket ] = useState(false)
    // state data
    const [ userSubscription ,  setUserSubscription ] = useState([])
    const [ paymentTransactions ,  setPaymentTransactions ] = useState([])


    const fetchPaymentTransaction = async () => {
        try {
            const res = await getPaymentTransaction()
            if(res.status == 'OK'){

                const data = res.data.map(data => {
                    return  createDataPayment(convertToIndonesianDate(data.updatedAt), data.items[0].name, data.items[0].price, data.status == 'PENDING' ? 'waiting' : 'gagal' )
                })

                setPaymentTransactions(data)
            }else{
                toast.error('List Pembayaran gagal dimuat')
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server (500)')
        }
    }

    const fetchUserSubscription = async () => {
        try {
            const res = await getUserSubscription()

            if(res.status == 'OK'){
                setUserSubscription(res.data)
            }else{
                toast.error('Silahkan Berlangganan dulu!!')
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server (500)')
            
        }
    }

    useEffect(()=>{
        fetchPaymentTransaction()
        fetchUserSubscription()
    },[])


    return(
        <AppLayout title={'Profil > Berlangganan'} >
            <AppModalSuccessPay
                open ={modalSuccessPay}
                onCloseButton={ value => {setModalSuccessPay(value)}}
            />
            <AppModalPendingPay
                open ={modalPendingPay}
                onCloseButton={ value => {setModalPendingPay(value)}}
            />
            <AppModalSuccessPay
                open ={modalFailedPay}
                onCloseButton={ value => {setModalFailedPay(value)}}
            />
            <AppModalSubscriptionList 
                open = {subscriptionListModal}
                onClose = { () =>  setSubscriptionListModal(false) }
                onCloseButton = { () => setSubscriptionListModal(false)  }

            />
            <AppModalPaymentDetail
                open={paymentDetailModal}
                onCloseButton = { () => setPaymentDetailModal(false)  }
            />
            <AppCustomModal
                open={stopSubscription}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-common'
                title={'Berhenti Berlangganan'}
                subtitle={`Paket berlangganan akan berakhir pada: 14 Januari 2023\nApakah Anda yakin ingin berhenti berlangganan sekarang?`}
                onCloseButton={(value)=> setStopSubscription(value) }
                children={
                <>
                    <Box className='flex flex-col justify-start w-[100%]'>
                        <p className="text-TEXT-1 text-[14px] font-medium">Paket berlangganan akan berakhir pada: <b>14 Januari 2023</b></p>
                        <p className="text-TEXT-1 text-[14px] font-medium">Apakah Anda yakin ingin berhenti berlangganan sekarang?</p>
                    </Box>
                    <Box className=' flex gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-NEUTRAL-500 shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Tidak'} 
                            type = {'button'}
                            onClick={()=>{
                            }}
                        />
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Ya'} 
                            type = {'button'}
                            onClick={()=>{
                            }}
                        />
                    </Box>
                </>
            }
            />
            <Box className='grow h-[86%] bg-NEUTRAL-100 p-[20px] flex flex-col gap-[20px]'>
                {/* <Box className='h-[100%] w-[100%] flex flex-col border-[1px] border-TEXT-4 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
    
                </Box> */}
                <Box className='flex-none h-auto w-[100%] flex flex-col border-[1px] border-TEXT-4 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                    <Box className='p-[20px] flex flex-col gap-[15px] '>
                        <Box className='flex gap-[5px] relative'>
                            <p className="text-PRIMARY-500 font-bold text-[18px]">Paket Dasar</p>
                            <Box 
                            onMouseEnter={()=>{
                                setInfoPacket(true)
                            }} 
                            onMouseLeave={()=>{
                                setInfoPacket(false)
                            }}
                            className = 'flex flex-col relative'> 
                                <img className="w-[28px] h-[28px] relative " src="/images/icon/info-packet.svg" />
                                {
                                    infoPacket ? 

                                    <Box className=' w-[15vw] flex flex-col gap-[6px] bg-white rounded-[15px] p-[15px] shadow-xl absolute'>
                                        {
                                            subscriptionList[0].benefit.map(data => {
                                                return(
                                                    <span className="flex text-TEXT-1">
                                                        <img src={'/images/icon/success-check.svg'} alt="icon-check" />    
                                                        <p className="text-[14px]">{data}</p>
                                                    </span>
                                                )
                                            })
                                        }
                                    </Box>

                                    : null
                                }
                            </Box>
                        </Box>
                        {/*  */}
                        {

                            userSubscription.length != 0 ? 

                            <Box className='flex gap-[10px] w-[100%] text-[14px]'>
                                <Box className='w-[50%] flex flex-col gap-[8px] p-[10px] rounded-[15px] bg-PRIMARY-100 bg-opacity-[30%]  text-black'>
                                    <span className="flex gap-[20px]"><p className="w-[30%]">Jumlah Produk</p><p>: {userSubscription.SubscriptionDetails.maxProductCount || 0}</p></span>
                                    <span className="flex gap-[20px]"><p className="w-[30%]">Tanggal Pembelian</p><p>: {convertToIndonesianDate(userSubscription.startDate)}</p></span>
                                    <span className="flex gap-[20px]"><p className="w-[30%]">Tanggal Berakhir</p><p>: {convertToIndonesianDate(userSubscription.expiresIn)}</p></span>
                                </Box>
                                <Box className='grow flex flex-col gap-[8px] p-[10px] rounded-[15px] bg-PRIMARY-100 bg-opacity-[30%] text-black font-bold'>
                                    <span className="flex gap-[20px]"><p className="w-[30%]">Generate AI</p><p>: {`${userSubscription.remainingGenerate}/${userSubscription.SubscriptionDetails.maxGenerateCount}`}</p></span>
                                    <LinearProgress
                                        sx={{
                                            height: 6,
                                            borderRadius: 5,
                                        }}
                                        variant="determinate"
                                        value={ userSubscription.remainingGenerate * 2} 
                                    />
                                    <span className="flex gap-[20px]"><p className="w-[30%]">Auto Post</p><p>: {`${userSubscription.remainingPost}/${userSubscription.SubscriptionDetails.maxPostCount}`}</p></span>
                                    <LinearProgress
                                        sx={{
                                            height: 6,
                                            borderRadius: 5,
                                        }}
                                        variant="determinate"
                                        value={ userSubscription.remainingPost * 6.7} 
                                    />
                                </Box>
                            </Box> : 

                            null

                        }
                        {/*  */}
                        <Box className='flex gap-[10px] justify-end'> 
                                <AppButton
                                    className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-NEUTRAL-500 rounded-[12px] px-[25px] py-[8px] shadow-xl'}
                                    text={'Berhenti Langganan'} 
                                    type = {'Submit'}
                                    onClick = {()=>{
                                        setStopSubscription(!stopSubscription)
                                    }}
                                />
                                <AppButton
                                    className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-SECONDARY-500 rounded-[12px] px-[40px] py-[8px] shadow-xl'}
                                    text={'Ubah Paket'} 
                                    type = {'Submit'}
                                    onClick = {()=>{
                                        setSubscriptionListModal(!subscriptionListModal)
                                    }}
                                />
                        </Box>
                    </Box>
                </Box>
                <Box className='grow w-[100%] flex flex-col border-[1px] border-TEXT-4 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                    <Box className='p-[20px] flex flex-col gap-[15px]'>
                        <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Pembayaran</p> 
                        <AppTablePayment
                            data={paymentTransactions}
                            onClick={()=>{
                                // setModalSuccessPay(true)
                                setModalPendingPay(true)
                                // setModalFailedPay(true)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            
        </AppLayout>
    )
}

export default SubscriptionPage;