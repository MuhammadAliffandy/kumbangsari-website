import Box from '@mui/material/Box';
import AppCarousel from '@/app/components/appCarousel';


const Layout = (props) => {

    const items = [
        {
            name: 'Lorem Ipsum 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum neque sed nunc maximus tincidunt.',
            image: 'https://picsum.photos/id/237/200/300',
        },
        {
            name: 'Lorem Ipsum 2 ',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum neque sed nunc maximus tincidunt.',
            image: 'https://picsum.photos/id/227/200/300',
        },
        {
            name: 'Lorem Ipsum 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum neque sed nunc maximus tincidunt.',
            image: 'https://picsum.photos/seed/picsum/203/320',
        },
    ];


    return (
        <>
            <Box className='h-[100vh] relative'>
                <Box  className=' absolute h-[100%] w-[100%] flex items-center bg-transparent z-10'>
                    <Box 
                        className = 'w-[50%] h-[100%] hidden bg-transparent xl:bg-transparent xl:flex md:flex lg:flex sm:hidden flex-col items-center justify-center'>
                            <AppCarousel  items = {items}  />
                    </Box>
                    <Box style={{ width : '2px' , height:'70%' }} className='bg-black bg-opacity-[25%]'></Box>
                    <Box className = 'bg-transparent w-[100%] xl:w-[50%] md:w-[50%] h-[100vh] flex flex-col items-center justify-center'>
                        {props.children}
                    </Box>
                </Box>
                {/* background */}
                <Box className = 'h-[100%] flex flex-col justify-between bg-white'>
                    <Box className='relative'>
                        <img src='/images/shape/ShapeUp2.png' className='absolute w-[100%] h-[70px]' />
                        <img src='/images/shape/ShapeUp.png' className='w-[100%] h-[90px]' />
                    </Box>
                    <Box className='relative'>
                        <img src='/images/shape/ShapeDown2.png' className='absolute w-[100%] h-[70px]' />
                        <img src='/images/shape/ShapeDown.png' className='w-[100%] h-[70px]' />
                    </Box>
                </Box>
            </Box>
        </>

    ) 
}

export default Layout;