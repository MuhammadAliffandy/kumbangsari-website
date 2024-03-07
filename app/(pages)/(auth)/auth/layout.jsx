import Box from '@mui/material/Box';
import AppCarousel from '@/app/components/appCarousel'


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
        <Box  className=' h-[100vh] flex'>
            <Box 
                className = 'w-[50%] h-[100vh]  bg-black  xl:flex md:flex lg:flex sm:hidden flex-col items-center justify-center'>
                <Box className = 'w-[100%] h-[100%]  flex flex-col items-center justify-center'>
                    <AppCarousel  items = {items}  />
                </Box>
            </Box>
            <Box className = 'w-[100%] xl:w-[50%] md:w-[50%] h-[100vh] flex flex-col items-center justify-center'>
                {props.children}
            </Box>
        </Box>
    ) 
}

export default Layout;