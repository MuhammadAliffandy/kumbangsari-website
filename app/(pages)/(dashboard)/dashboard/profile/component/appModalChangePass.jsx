import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AppTextField from '@/app/components/appTextField/appTextField'
import AppButton from '@/app/components/appButton/appButton'
import AppCloseButton from '@/app/components/appCloseButton/appCloseButton'
import {  validatePassword, } from '@/app/(pages)/(auth)/auth/component/validation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AppModalChangePass = (props) => {
    
    const { register, watch ,handleSubmit, formState: { errors } } = useForm();

    const password = watch('password', '');


    const fetchChangePassword = async () => {


        const res = await changePasswordUser()
        if(res.status == 'OK'){
            toast.success('Ubah Password Success')
        }else{
            toast.error('Ubah Password Gagal')
        }
    }

    return(
        <Modal 
            open={props.open}
            className='flex flex-col justify-center items-center'
        >
            <Box className = 'w-[60%] h-auto rounded-[20px] bg-white p-[20px] flex flex-col gap-[25px]'>
                <Box className = 'flex justify-between'>
                    <p className = 'text-[24px] font-bold text-black' >Ubah Kata Sandi</p>
                    <AppCloseButton
                        onClick = {()=>{
                            props.onCloseButton(false)
                        }}
                    />
                </Box>
                
                {/*  */}
                <Box className='w-[100%] flex flex-col gap-[10px]'>
                    <label className='text-black font-semibold'>Kata Sandi</label>
                    <AppTextField
                            id="password"
                            placeholder='Masukkan kata sandi di sini'
                            type={"password"} 
                            validationConfig = {register('password', {
                                validate : validatePassword
                            })}
                            error={Boolean(errors.password)}
                            helperText={errors.password && errors.password.message}
                        
                        />
                </Box>
                {/*  */}
                <Box>
                    <Stack direction="row" spacing={2}>   
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold'>Kata Sandi Baru</label>
                            <AppTextField
                                id="password"
                                placeholder='Masukkan kata sandi di sini'
                                type={"password"} 
                                validationConfig = {register('password', {
                                    validate : validatePassword
                                })}
                                error={Boolean(errors.password)}
                                helperText={errors.password && errors.password.message}
                                    
                            />
                        </Box>
                        <Box className='w-[100%] flex flex-col gap-[10px]'>
                            <label className='text-black font-semibold'>Konfirmasi Kata Sandi</label>
                            <AppTextField
                    
                                    id="confirmPassword"
                                    placeholder='Masukkan konfirmasi kata sandi di sini'
                                    type={"password"  } 
                                    validationConfig = {register('confirmPassword', {
                                    required: 'Password harus sama',
                                        validate: value => value === password || 'Password tidak cocok'
                                    })}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={errors.confirmPassword && errors.confirmPassword.message}
                                />
                        </Box>
                    </Stack>
                </Box>

                <Box className='w-[100%] flex justify-end'>
                        <Box className='w-[30%]'>
                            <AppButton
                                text={'Simpan'} 
                                type = {'button'}
                                fontSize = {'12px'}
                                onClick = {()=>{}}
                            />
                        </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default AppModalChangePass;