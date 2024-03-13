
'use client'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CustomSpacing from '@/app/components/customSpacing';
import { useForm , SubmitHandler} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState  , useEffect} from 'react';
import AppButton from '@/app/components/appButton';
import AppHeadline from '@/app/components/appHeadline';
import AppCloseButton from '@/app/components/appCloseButton';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import { sendOTPAuth, verificationOTPAuth } from '@/app/api/repository/authRepository';
import OtpInput from 'react-otp-input';

const ForgotPasswordPage = ()  => {
    
    const [countdown, setCountdown] = useState(70); 
    const [isSending, setIsSending] = useState(false);
    const [loadingProgress,setLoadingProgress] = useState(0);
    const [otp, setOtp] = useState('');
    const { push } = useRouter()


    useEffect(()=>{
        handleSendOTP()
    },[])


    const notify = () => {
        toast.success('Verifikasi Email Berhasil' , 
        {
            onClose: () => {
                push('/auth/signin');
                setLoadingProgress(100)
            }
        }
        )
    }
    
    const onSubmit = async () => {

        try {
            setLoadingProgress(50)
            const data = {
                email : sessionStorage.getItem('email'),
                otp: otp
            }
            
            const res = await verificationOTPAuth(data)
    
            if(res.status == 'OK'){
                notify()
            }
        } catch (error) {
            toast.error('Ada Kesalahan Server');
        }
    };

    const handleTimerSendOTP = () => {
        let timer;
        if (isSending && countdown > 0) {
            timer = setTimeout(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        }

        if(countdown == 0 ){
            setIsSending(false)
        }

        return () => clearTimeout(timer);
    }

    useEffect(() => {

        handleTimerSendOTP()

    }, [countdown, isSending]);


    const handleSendOTP = async () => {
            setIsSending(true); 
            const email = sessionStorage.getItem('email')
            const res = await sendOTPAuth({email : email})
            
            if(res.status == 'OK'){
                console.log(res)
            }
    };

    return(
        <Box className = 'flex flex-col items-center justify-center rounded-sm p-[10px] h-[100vh] relative'>
            <Box className='  flex justify-end  top-0 mt-[40px]  w-[100%] absolute z-[12]'> 
                <AppCloseButton
                    onClick = {()=>{
                        push('/')
                    }}
                />
            </Box>
            <LoadingBar 
                color={'blue'} 
                progress={loadingProgress} 
                onLoaderFinished={() => setLoadingProgress(0)
            } />
            <AppHeadline 
                title = {'Verifikasi Email'}
                subtitle = {'Masukkan kode OTP yang dikirimkan ke emailmu!' }
            />
            <CustomSpacing height = {30} />
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                    border : '1px solid',
                    borderColor : '#00000040 ',
                    backgroundColor: '#F7F9F9',
                    width : '40px',
                    height: '50px',
                    borderRadius: '10px',
                    color : 'black'
                }}
            />
            <CustomSpacing height = {30} />
            <Box className='w-[100%]'>
                <AppButton
                    text={'Verifikasi'} 
                    type = {'Submit'}
                    fontSize = {'12px'}
                    onClick = {onSubmit}
                />
            </Box>
            <CustomSpacing height={10}/>
            <Box className = 'flex justify-center items-center gap-[5px]'>
                <button type='button' onClick={handleSendOTP} disabled={isSending}  className='text-black text-opacity-[50%] bg-transparent text-[14px] '>{isSending ? 'Kirim ulang code' : 'Kirim code'}</button>
                {isSending && <p className='text-[14px] text-black  text-opacity-[70%] font-poppins ' >dalam : {countdown} detik</p>}
            </Box>
            <ToastContainer autoClose={800} />
        </Box>
    )
}

export default ForgotPasswordPage;