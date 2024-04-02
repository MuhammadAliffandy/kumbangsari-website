import Box from '@mui/material/Box'

const AppDefaultText = (props) => {
    return (
        <Box className='h-[100%] w-[100%] flex flex-col justify-center items-center'>
            <p className='text-[18px] font-bold text-TEXT-4 text-center'>
                {props.text || 'Masukkan data terlebih dahulu untuk memunculkan preview!'}
            </p>
        </Box> 
    )
}

export default AppDefaultText;