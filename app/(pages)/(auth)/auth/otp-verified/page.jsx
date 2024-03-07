
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
import { sendOTPAuth, verificationOTPAuth } from '@/app/api/repository/authRepository';

const ForgotPasswordPage = ()  => {
    
    const [countdown, setCountdown] = useState(70); 
    const [isSending, setIsSending] = useState(false);
    const { push } = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit= async (data) => {
        const allValues = Object.values(data);
        const otpValue = allValues.join('').split(',')

        const jsonData = {
            email : sessionStorage.getItem('email'),
            otp: otpValue[0]
        }
        
        const res = await verificationOTPAuth(jsonData)

        if(res.status == 'OK'){
            console.log(res)
        }
    };

    useEffect(() => {
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

    }, [countdown, isSending]);

    const handleSendOTP = async () => {
            setIsSending(true); 
            const email = sessionStorage.getItem('email')
            const res = await sendOTPAuth({email : email})
            console.log(res)
    };

    return(
        <Box className = 'bg-white flex flex-col items-center rounded-sm px-[70px]'>
            <AppHeadline 
                title = {'Verifikasi Email'}
                subtitle = {'Masukkan kode OTP yang dikirimkan ke emailmu!' }
            />
            <CustomSpacing height = {30} />
            <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%] items-center'>
                <Box className = 'flex gap-[10px] justify-center w-[100%] '>
                    <TextField
                        className='inputotp w-[40px] text-center placeholder-center  '
                        InputProps={{
                            placeholder: '0',
                            maxLength: 1,
                            inputMode : 'numeric',
                            style : {     
                                borderRadius: '10px',
                                backgroundColor: '#F7F9F9'
                            }
                        }}
                        
                        {...register('otpNumber1',  )}
                        error={Boolean(errors.otpNumber1)}
                        helperText={errors.otpNumber1 && errors.otpNumber1.message}
                    /> 
                    <TextField
                        className=' w-[40px]  '
                        InputProps={{
                            placeholder: '0',
                            style : {     
                                maxLength: 1,
                                inputMode : 'numeric',
                                borderRadius: '10px',
                                backgroundColor: '#F7F9F9'
                            }
                        }}
                        {...register('otpNumber2',  )}
                        error={Boolean(errors.otpNumber2)}
                        helperText={errors.otpNumber2 && errors.otpNumber2.message}
                    /> 
                    <TextField
                        className=' w-[40px]  '
                        InputProps={{
                            placeholder: '0',
                            style : {     
                                maxLength: 1,
                                inputMode : 'numeric',
                                borderRadius: '10px',
                                backgroundColor: '#F7F9F9'
                            }
                        }}
                        {...register('otpNumber3',  )}
                        error={Boolean(errors.otpNumber3)}
                        helperText={errors.otpNumber3 && errors.otpNumber3.message}
                    /> 
                    <TextField
                        className=' w-[40px]  '
                        InputProps={{
                            placeholder: '0',
                            style : {     
                                maxLength: 1,
                                inputMode : 'numeric',
                                borderRadius: '10px',
                                backgroundColor: '#F7F9F9'
                            }
                        }}
                        {...register('otpNumber4',  )}
                        error={Boolean(errors.otpNumber4)}
                        helperText={errors.otpNumber4 && errors.otpNumber4.message}
                    /> 
                    <TextField
                        className=' w-[40px]  '
                        InputProps={{
                            placeholder: '0',
                            style : {     
                                maxLength: 1,
                                inputMode : 'numeric',
                                borderRadius: '10px',
                                backgroundColor: '#F7F9F9'
                            }
                        }}
                        {...register('otpNumber5',  )}
                        error={Boolean(errors.otpNumber5)}
                        helperText={errors.otpNumber5 && errors.otpNumber5.message}
                    /> 
                    <TextField
                        className=' w-[40px]  '
                        InputProps={{
                            placeholder: '0',
                            style : {     
                                maxLength: 1,
                                inputMode : 'numeric',
                                borderRadius: '10px',
                                backgroundColor: '#F7F9F9'
                            }
                        }}
                        {...register('otpNumber6',  )}
                        error={Boolean(errors.otpNumber6)}
                        helperText={errors.otpNumber6 && errors.otpNumber6.message}
                    /> 
                </Box>
                <Box className='w-[100%]'>
                    <AppButton
                        text={'Verifikasi'} 
                        type = {'Submit'}
                        fontSize = {'12px'}
                        onClick = {()=>{}}
                    />
                </Box>
            </form>
            <CustomSpacing height={10}/>
            <Box className = 'flex justify-center items-center gap-[5px]'>
                <button type='button' onClick={handleSendOTP} disabled={isSending}  className='text-black text-opacity-[50%] bg-transparent text-[14px] '>Kirim ulang code</button>
                {isSending && <p className='text-[14px] text-black  text-opacity-[70%] font-poppins ' >dalam: {countdown}</p>}
            </Box>
        </Box>
    )
}

export default ForgotPasswordPage;