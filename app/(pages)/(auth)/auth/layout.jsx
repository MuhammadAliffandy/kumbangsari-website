import Box from '@mui/material/Box';

const Layout = (props) => {
    return (
        <Box  className=' h-[100vh] flex'>
            <Box className = 'w-[50%] h-[100vh] bg-black'>
                {/*  */}
            </Box>
            <Box className = 'w-[50%] h-[100vh] flex flex-col items-center justify-center'>
                {props.children}
            </Box>
        </Box>
    ) 
}

export default Layout;