
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


const ForgotPasswordPage = ()  => {
    
    const [countdown, setCountdown] = useState(70); 
    const [isSending, setIsSending] = useState(false);
    const { push } = useRouter()

    type numberOTP = {
        otpNumber1 : number;
        otpNumber2 : number;
        otpNumber3 : number;
        otpNumber4 : number;
        otpNumber5 : number;
        otpNumber6 : number;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<numberOTP>();
    
    const onSubmit : SubmitHandler<numberOTP> = (data ) => {
        console.log(data);
        return data; 
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
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
        <Container className='bg-red-500'>
            <Box className = 'bg-white flex flex-col items-center shadow-xl rounded-sm p-[10px]'>
                <Typography className='text-[20px] text-black'>
                    OTP Verification
                </Typography>
                <CustomSpacing height = {10} />
                    <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-[20px] w-[100%] items-center'>
                        <Box className = 'flex gap-[20px] justify-center '>
                            <TextField
                                className='inputotp w-[3.5%] text-center placeholder-center '
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
                                className=' w-[3.5%]'
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
                                className=' w-[3.5%]'
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
                                className=' w-[3.5%]'
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
                                className=' w-[3.5%]'
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
                                className=' w-[3.5%]'
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
                        <Button type='submit' variant="contained" className='w-[100%]'>
                            kirim 
                        </Button>
                    </form>
                    <Box className = 'flex justify-evenly items-center gap-[20px]'>
                        {isSending && <Typography className='text-[14px] text-black' >Sisa waktu: {countdown} detik</Typography>}
                        <Button type='button' variant="contained" onClick={handleSendOTP} disabled={isSending}  className='text-black '>kirim ulang code</Button>
                    </Box>
            </Box>
        </Container>
    )
}

export default ForgotPasswordPage;