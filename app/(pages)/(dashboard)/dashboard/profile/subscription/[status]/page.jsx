'use client'
import AppTablePayment from "@/app/components/appTable/appTablePayment";
import AppLayout from "../../../component/AppLayout";
import AppButton from "@/app/components/appButton/appButton";
import AppModalSubscriptionList from '@/app/(pages)/(dashboard)/dashboard/profile/subscription/component/subscriptionListModal'
import AppModalPaymentDetail from '@/app/(pages)/(dashboard)/dashboard/profile/subscription/component/appModalPaymentDetail'
import { convertToIndonesianDate, formatRupiahNumber, formattedDate } from "@/app/utils/helper";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import AppModal  from '@/app/components/appModal/appModal'
import LinearProgress from '@mui/material/LinearProgress';
import AppCustomModal from "@/app/components/appModal/AppCustomModal";
import AppModalSuccessPay from '../component/appModalSuccessPay'
import AppModalFailedPay from '../component/appModalFailedPay'
import AppModalPendingPay from '../component/appModalPendingPay'
import { useEffect, useState } from "react";
import { getUserSubscription , stopUserSubscription} from "@/app/api/repository/subscriptionRepository";
import { createPayment, getPaymentTransaction, validatePaymentStatus } from "@/app/api/repository/paymentRepository";
import SubscriptionList, { subscriptionList } from "../component/subscriptionList";
import { toast } from "react-toastify";
import { getCurrentUser } from "@/app/api/repository/authRepository";
import { useParams , useRouter} from "next/navigation";
import { useDispatch , useSelector } from "react-redux";
import { setUserSubscriptionData } from "@/app/redux/slices/userSubscriptionSlice";
import AppToastPending from "@/app/components/AppToastPending/appToastPending";


const createDataPayment = (date, packet, price, status, expiryDate , updatedAt , callbackUrl , subscriptionExpiryDate ) => {
    return { date, packet, price, status, expiryDate , updatedAt , callbackUrl , subscriptionExpiryDate};
}


const SubscriptionPage = () => {

    const dispatch = useDispatch()
    const userSubs = JSON.parse(useSelector(state => state.userSubscription.value) || '[]')
    const params = useParams()
    const { push } = useRouter()
    const statusPaymentParams = params.status 

    
    // state modal 
    const [modalSuccessPay , setModalSuccessPay ] = useState(false)
    const [modalPendingPay , setModalPendingPay ] = useState(false)
    const [modalFailedPay , setModalFailedPay ] = useState(false)
    const [ stopSubscription ,  setStopSubscription ] = useState(false)
    const [ paymentDetailModal ,  setPaymentDetailModal ] = useState(false)
    const [ subscriptionListModalAdded ,  setSubscriptionListModalAdded ] = useState(false)
    const [ subscriptionListModal ,  setSubscriptionListModal ] = useState(false)
    // state load
    const [ payTransactionLoading , setPayTransactionLoading  ] = useState(false)
    // state hover
    const [infoPacket , setInfoPacket ] = useState(false)
    // state data
    const [user , setUser] = useState([])
    const [statusPayment ,setStatusPayment ] = useState('')
    const [packetPayment , setPacketPayment] = useState([])
    const [ subscriptionDetail ,  setSubscriptionDetail ] = useState([])
    const [ userSubscription ,  setUserSubscription ] = useState([])
    const [ paymentTransactions ,  setPaymentTransactions ] = useState([])



    const fetchCurrentUser = async () => {
        try {
            const res = await getCurrentUser()

            if(res.status == 'OK'){
                setUser(res.data)
            }else{
                toast.error('Authentication Gagal')
            }

        } catch (error) {
            toast.error('Ada Kesalahan Server (500)')
        }        
    }

    const fetchPaymentTransaction = async () => {
        try {

            setPayTransactionLoading(true)

            const res = await getPaymentTransaction()
            if(res.status == 'OK'){

                const data = res.data.map(data => {
                    return  createDataPayment(
                        convertToIndonesianDate(data.updatedAt), 
                        data.items[0].name, 
                        `Rp${formatRupiahNumber(data.items[0].price)}`, 
                        data.status == 'PENDING' ? 'waiting' : data.status == 'PAID' || data.status == 'SETTLED' ? 'success' : 'failed' , 
                        data.expiryDate ,
                        data.updatedAt,
                        data.invoiceUrl,
                        data.subscriptionExpiryDate
                    )
                })
                setPaymentTransactions(data)
                setPayTransactionLoading(false)
            }else{
                toast.error('List Pembayaran gagal dimuat')
                setPayTransactionLoading(false)
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server (500)')
            setPayTransactionLoading(false)
        }
    }

    const fetchUserSubscription = async () => {
        try {
            const res = await getUserSubscription()

            if(res.status == 'OK'){
                setUserSubscription(res.data)
            }
        } catch (error) {
            if(error.status == 404){
                toast.error('Silahkan Berlangganan dulu!!') 
            }else{
                toast.error('Ada Kesalahan Server (500)')
            }
            
        }
    }

    const fetchStopSubscription = async () => {
        try {
            const res = await stopUserSubscription();

            if(res.status == 'OK'){
                setStopSubscription(false)
                fetchUserSubscription()
                fetchPaymentTransaction()
                dispatch(setUserSubscriptionData(null))
                toast.success('Berhenti Berlangganan Berhasil')
            }
            
        } catch (error) {
            setStopSubscription(false)
            if(error.status == 404){
                toast.error('Berhenti Berlangganan Gagal') 
            }else{
                toast.error('Ada Kesalahan Server (500)')
            }
        }        
    }

    const fetchCreatePayment = async (value) => {
        try {

            const data = {
                paket : value.codeNumber,
                price : value.price,
                type: 'NEW'
            }
            const res = await createPayment(data)
            
            if(res.status == 'OK'){
                toast.success('Transaksi Berhasil')
                setSubscriptionListModal(false)
                setPaymentDetailModal(false)
                fetchPaymentTransaction()
            }

        } catch (error) {
            if(error.status == 404){
                toast.error('Transaksi Gagal')
            }else{
                toast.error('Ada Kesalahan Server (500)')
            }
        }
    }

    const fetchUpdatePayment = async (value) => {
        try {

            const data = {
                paket : value.codeNumber,
                price : value.price,
                type: 'RENEW'
            }
            const res = await createPayment(data)
            
            if(res.status == 'OK'){
                toast.success('Transaksi Berhasil')
                setSubscriptionListModal(false)
                setPaymentDetailModal(false)
                fetchPaymentTransaction()
                dispatch(setUserSubscriptionData(null))
            }

        } catch (error) {
            if(error.status == 404){
                toast.error('Transaksi Gagal')
            }else{
                toast.error('Ada Kesalahan Server (500)')
            }
        }
    }
    
    const notifyFetchStopSubscription  = () => { AppToastPending(fetchStopSubscription) }
    const notifyFetchCreatePayment = (value) => { AppToastPending(fetchCreatePayment(value)) }
    const notifyFetchUpdatePayment = (value) => { AppToastPending(fetchUpdatePayment(value)) }

    useEffect(()=>{
        fetchCurrentUser()
        fetchPaymentTransaction()
        fetchUserSubscription()
    },[])


    useEffect( ()=> {
        if(statusPaymentParams == 'success' || statusPaymentParams == 'failed'){
            dispatch(setUserSubscriptionData(user.subscription))
            push('/dashboard/profile/subscription/pay')
        }
    },[statusPaymentParams , user])


    return(
        <AppLayout title={'Profil > Berlangganan'} >
            <AppModal
                withClose = {false}
                open = {payTransactionLoading}
                width={'w-[35%]'}
            >
                <Box className ='flex flex-col items-center gap-[40px]'>
                    <CircularProgress style={{color : '#F45B69'}}  />
                    <Box className='flex flex-col items-center text-center '>
                        <p className="text-SECONDARY-500 text-[20px] font-bold font-poppins">Memuat...</p>
                        <p className="text-TEXT-1 text-[14px] font-poppins">Mohon tunggu sebentar yaa !!</p>
                    </Box>
                </Box>
            </AppModal>
            <AppModalSuccessPay
                open ={modalSuccessPay}
                onCloseButton={ value => {setModalSuccessPay(value)}}
                packet={packetPayment.packet || ''}
                price={formatRupiahNumber(packetPayment.price || 0)}
                updatedAt={convertToIndonesianDate(packetPayment.updatedAt)}
                dateSubscription={`${packetPayment.date} - ${ packetPayment.subscriptionExpiryDate ? convertToIndonesianDate(packetPayment.subscriptionExpiryDate): ''}`}
            />
            <AppModalPendingPay
                open ={modalPendingPay}
                onCloseButton={ value => {setModalPendingPay(value)}}
                packet={packetPayment.packet || ''}
                status={packetPayment.status}
                price={formatRupiahNumber(packetPayment.price || 0)}
                updatedAt={convertToIndonesianDate(packetPayment.updatedAt)}
                dateSubscription={`${packetPayment.date} - ${ packetPayment.subscriptionExpiryDate ? convertToIndonesianDate(packetPayment.subscriptionExpiryDate): ''}`}
                expiryDate={packetPayment.expiryDate}
                callbackUrl={packetPayment.callbackUrl}
            />
            <AppModalFailedPay
                open ={modalFailedPay}
                onCloseButton={ value => {setModalFailedPay(value)}}
                packet={packetPayment.packet || ''}
                price={formatRupiahNumber(packetPayment.price || 0)}
                updatedAt={convertToIndonesianDate(packetPayment.updatedAt)}
                dateSubscription={`${packetPayment.date} - ${ packetPayment.subscriptionExpiryDate ? convertToIndonesianDate(packetPayment.subscriptionExpiryDate): ''}`}
            />
            <AppModalSubscriptionList 
                open = {subscriptionListModal}
                onClose = { () =>  setSubscriptionListModal(false) }
                onCloseButton = { () => setSubscriptionListModal(false)  }
                onClick={(value)=> {
                    
                    setPaymentDetailModal(true)
                    setSubscriptionListModal(false)
                    setSubscriptionDetail(value)
                }}
                
                />
            <AppModalSubscriptionList 
                open = {subscriptionListModalAdded}
                onClose = { () =>  setSubscriptionListModalAdded(false) }
                onCloseButton = { () => setSubscriptionListModalAdded(false)  }
                onClick={(value)=> {}}
                
            />
            <AppModalPaymentDetail
                data={subscriptionDetail}
                open={paymentDetailModal}
                onCloseButton = { () => setPaymentDetailModal(false)  }
                onClick={()=>{
                    if(userSubs != null){
                        notifyFetchUpdatePayment(subscriptionDetail)
                    }else{
                        notifyFetchCreatePayment(subscriptionDetail)
                    }
                }}
            />
            <AppCustomModal
                open={stopSubscription}
                withClose={true}
                width={'w-[30vw]'}
                modalType='modal-common'
                title={'Berhenti Berlangganan'}
                onCloseButton={(value)=> setStopSubscription(value) }
                children={
                <>
                    <Box className='flex flex-col justify-start w-[100%]'>
                        <p className="text-TEXT-1 text-[14px] font-medium">Paket berlangganan akan berakhir pada: <b>{convertToIndonesianDate(userSubscription?.expiresIn)}</b></p>
                        <p className="text-TEXT-1 text-[14px] font-medium">Apakah Anda yakin ingin berhenti berlangganan sekarang?</p>
                    </Box>
                    <Box className=' flex gap-[10px] w-[100%]'>
                        <AppButton
                            className='w-[100%] py-[10px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Tidak'} 
                            type = {'button'}
                            onClick={()=>{
                                setStopSubscription(false)
                            }}
                        />
                        <AppButton
                            className='w-[100%] py-[10px] bg-CUSTOM-RED hover:bg-SECONDARY-600 shadow-xl text-white font-poppins rounded-[18px]'
                            text={'Ya'} 
                            type = {'button'}
                            onClick={()=>{
                                notifyFetchStopSubscription()

                            }}
                        />
                    </Box>
                </>
            }
            />
            <Box className='grow h-[86%] bg-white p-[20px] flex flex-col gap-[20px]'>
            
                {

                paymentTransactions.length != 0  ?               
                    <>
                        <Box className='flex-none h-auto w-[100%] flex flex-col bg-NEUTRAL-100 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                            <Box className='p-[20px] flex flex-col gap-[15px] '>
                                <Box className='flex gap-[5px] relative'>
                                    <p className="text-PRIMARY-500 font-bold text-[18px]">{user.subscription  ? subscriptionList[user.subscription - 1].title : 'Paket'}</p>
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

                                            <Box className=' w-[50vw] xl:w-[15vw] flex flex-col gap-[6px] bg-white rounded-[15px] p-[15px] shadow-xl absolute'>
                                                {
                                                    user.subscription ? 
                                                    subscriptionList[user.subscription - 1 ||  0].benefit.map((data , index) => {
                                                        return(
                                                            <span key={index} className="flex text-TEXT-1">
                                                                <img src={'/images/icon/success-check.svg'} alt="icon-check" />    
                                                                <p className="text-[14px]">{data}</p>
                                                            </span>
                                                        )
                                                    }) : null
                                                }
                                            </Box>

                                            : null
                                        }
                                    </Box>
                                </Box>
                                {/*  */}
                                {

                                    userSubscription?.length != 0 ? 

                                    <Box className='flex gap-[10px] w-[100%] text-[14px] flex-col xl:flex-row lg:flex-row'>
                                        <Box className='w-[100%] lg:w-[50%] xl:w-[50%] flex flex-col gap-[8px] p-[10px] rounded-[15px] bg-TEXT-5  text-black'>
                                            <span className="flex gap-[20px]"><p className="w-[30%]">Jumlah Produk</p><p>: {userSubscription?.SubscriptionDetails?.maxProductCount || 0}</p></span>
                                            <span className="flex gap-[20px]"><p className="w-[30%]">Tanggal Pembelian</p><p>: {
                                                userSubscription?.startDate ? convertToIndonesianDate(userSubscription?.startDate) : 'Belum Berlangganan'
                                            }</p></span>
                                            <span className="flex gap-[20px]"><p className="w-[30%]">Tanggal Berakhir</p><p>: {
                                                userSubscription?.expiresIn ? convertToIndonesianDate(userSubscription?.expiresIn) : 'Belum Berlangganan'
                                            }</p></span>
                                        </Box>
                                        <Box className='grow flex flex-col gap-[8px] p-[10px] rounded-[15px] bg-TEXT-5 text-black font-bold'>
                                            <span className="flex gap-[20px]"><p className="w-[30%]">Generate AI</p><p>: 
                                                { 
                                                user?.subscription > 1 ?
                                                ' Unlimited'
                                                :
                                                userSubscription?.remainingGenerate != null && userSubscription?.SubscriptionDetails?.maxGenerateCount != null?  
                                                ` ${userSubscription?.remainingGenerate}/${userSubscription?.SubscriptionDetails?.maxGenerateCount}` :
                                                ' Belum Berlangganan'
                                                
                                                }
                                                </p></span>
                                            <LinearProgress
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 5,
                                                }}
                                                variant="determinate"
                                                value={
                                                    user?.subscription > 1 ?
                                                    100
                                                    :userSubscription?.remainingGenerate * 2
                                                } 
                                            />
                                            <span className="flex gap-[20px]"><p className="w-[30%]">Auto Post</p><p>: {
                                                user?.subscription > 1 ?
                                                ' Unlimited'
                                                :
                                                userSubscription?.remainingPost != null && userSubscription?.SubscriptionDetails?.maxPostCount != null ?
                                                ` ${userSubscription?.remainingPost}/${userSubscription?.SubscriptionDetails?.maxPostCount}`:
                                                ' Belum Berlangganan'
                                            }</p></span>
                                            <LinearProgress
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 5,
                                                }}
                                                variant="determinate"
                                                value={user?.subscription > 1 ?
                                                    100
                                                    :userSubscription?.remainingGenerate * 2} 
                                            />
                                        </Box>
                                    </Box> : 

                                    null

                                }
                                {/*  */}
                                <Box className='flex gap-[10px] justify-end'> 
                                    {
                                        
                                        userSubs != null ?
                                        
                                        <>  
                                            <AppButton
                                                className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-NEUTRAL-500 hover:bg-NEUTRAL-600 rounded-[12px] px-[25px] py-[8px] shadow-xl'}
                                                text={'Berhenti Langganan'} 
                                                type = {'Submit'}
                                                onClick = {()=>{
                                                    setStopSubscription(!stopSubscription)
                                                }}
                                            />
                                            <AppButton
                                                className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-SECONDARY-500 hover:bg-SECONDARY-600 rounded-[12px] px-[40px] py-[8px] shadow-xl'}
                                                text={'Ubah Paket'} 
                                                type = {'Submit'}
                                                onClick = {()=>{
                                                    setSubscriptionListModal(!subscriptionListModal)
                                                }}
                                            />
                                        </>

                                            :
                                        
                                        <AppButton
                                            className={' flex text-white gap-[10px] w-auto justify-center items-center text-[12px] bg-SECONDARY-500  hover:bg-SECONDARY-600 rounded-[12px] px-[40px] py-[8px] shadow-xl'}
                                            text={'Beli Paket'} 
                                            type = {'Submit'}
                                            onClick = {()=>{
                                                setSubscriptionListModal(!subscriptionListModal)
                                            }}
                                        />
                                    }
                                </Box>
                            </Box>
                        </Box>
                        <Box className='grow w-[100%] flex flex-col bg-NEUTRAL-100 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full '>
                            <Box className='p-[20px] flex flex-col gap-[15px]'>
                                <p className="text-TEXT-1 font-bold text-[16px]">Riwayat Pembayaran</p> 
                                <AppTablePayment
                                    data={paymentTransactions}
                                    onClick={(data)=>{
                    
                                        if(data.status == 'waiting'){
                                            setModalPendingPay(true)
                                        }
                                        
                                        if(data.status == 'success'){
                                            setModalSuccessPay(true)
                                        }

                                        if(data.status == 'failed'){
                                            setModalFailedPay(true)
                                        }
                                        setPacketPayment(data)
                                    }}
                                />
                            </Box>
                        </Box>
                    </>
                    
                    :
                    
                    <Box className='h-[100%] w-[100%] flex flex-col bg-NEUTRAL-100 rounded-[20px] overflow-x-hidden scrollbar scrollbar-w-[8px] scrollbar-h-[10px] scrollbar-track-transparent scrollbar-thumb-gray-100 scrollbar-thumb-rounded-full'>
                        <SubscriptionList
                            onClick={(value)=>{
                                setPaymentDetailModal(true)
                                setSubscriptionDetail(value)
                            }}
                        />
                    </Box>

                }
            </Box>
            
        </AppLayout>
    )
}

export default SubscriptionPage;