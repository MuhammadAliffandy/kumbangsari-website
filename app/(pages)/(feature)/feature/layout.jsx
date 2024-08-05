import AppNavbar from '@/app/components/appNavbar/appNavbar';

const Layout = (props) => {
    return(
        <>
            <AppNavbar>
                {props.children}
            </AppNavbar>
        </>
    )
}

export default Layout;