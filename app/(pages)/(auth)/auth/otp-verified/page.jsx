
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

const ForgotPasswordPage = ()  => {
    
    const [countdown, setCountdown] = useState(70); 
    const [isSending, setIsSending] = useState(false);
    const { push } = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit= (data ) => {
        console.log(data);
        return data; 
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

    const handleSendOTP = () => {
            setIsSending(true); 
    };

    return(
    <div  className=' h-[100vh] flex'>
            <Box className = 'w-[50%] h-[100vh] bg-black'>
            {/*  */}
            </Box>
            <Box className = 'w-[50%] h-[100vh] flex flex-col items-center justify-center'>
                <Box className = 'bg-white flex flex-col items-center rounded-sm p-[70px]'>
                    <h1 className='text-[32px] text-black font-bold'>
                        Verifikasi Email
                    </h1>
                    <p className='text-[15px] text-black font-medium'>
                        Masukkan kode OTP yang dikirimkan ke emailmu!
                    </p>
                    <CustomSpacing height = {20} />
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%] items-center'>
                        <Box className = 'flex gap-[20px] justify-center w-[100%] '>
                            <TextField
                                className='inputotp w-[6%] text-center placeholder-center '
                                inputProps={{
                                        maxLength: 1,
                                        placeholder: '0',
                                        inputMode : 'numeric'
                                }}
                                {...register('otpNumber1',  )}
                                error={Boolean(errors.otpNumber1)}
                                helperText={errors.otpNumber1 && errors.otpNumber1.message}
                            /> 
                            <TextField
                                className=' w-[6%]'
                                inputProps={{
                                    maxLength: 1,
                                    placeholder: '0',
                                    inputMode : 'numeric'
                                }}
                                {...register('otpNumber2',  )}
                                error={Boolean(errors.otpNumber2)}
                                helperText={errors.otpNumber2 && errors.otpNumber2.message}
                            /> 
                            <TextField
                                className=' w-[6%]'
                                inputProps={{
                                    maxLength: 1,
                                    placeholder: '0',
                                    inputMode : 'numeric'
                                }}
                                {...register('otpNumber3',  )}
                                error={Boolean(errors.otpNumber3)}
                                helperText={errors.otpNumber3 && errors.otpNumber3.message}
                            /> 
                            <TextField
                                className=' w-[6%]'
                                inputProps={{
                                    maxLength: 1,
                                    placeholder: '0',
                                    inputMode : 'numeric'
                                }}
                                {...register('otpNumber4',  )}
                                error={Boolean(errors.otpNumber4)}
                                helperText={errors.otpNumber4 && errors.otpNumber4.message}
                            /> 
                            <TextField
                                className=' w-[6%]'
                                inputProps={{
                                    maxLength: 1,
                                    placeholder: '0',
                                    inputMode : 'numeric'
                                }}
                                {...register('otpNumber5',  )}
                                error={Boolean(errors.otpNumber5)}
                                helperText={errors.otpNumber5 && errors.otpNumber5.message}
                            /> 
                            <TextField
                                className=' w-[6%]'
                                inputProps={{
                                    maxLength: 1,
                                    placeholder: '0',
                                    inputMode : 'numeric'
                                }}
                                {...register('otpNumber6',  )}
                                error={Boolean(errors.otpNumber6)}
                                helperText={errors.otpNumber6 && errors.otpNumber6.message}
                            /> 
                        </Box>
                    </form>
                    <CustomSpacing height={20}/>
                    <AppButton
                        text={'Verifikasi'} 
                        type = {'Submit'}
                        fontSize = {'12px'}
                        onClick = {()=>{}}
                    />
                    <CustomSpacing height={10}/>
                    <Box className = 'flex justify-center items-center gap-[5px]'>
                        <button type='button' onClick={handleSendOTP} disabled={isSending}  className='text-black text-opacity-[50%] bg-transparent text-[14px] '>Kirim ulang code</button>
                        {isSending && <p className='text-[14px] text-black  text-opacity-[70%] font-poppins ' >dalam: {countdown}</p>}
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default ForgotPasswordPage;