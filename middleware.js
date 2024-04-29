import { NextResponse } from 'next/server'


export async function middleware(req) {

    const isLogin = req.cookies.get('token');
    const { pathname } = req.nextUrl;

    const response = await fetch(`${process.env.BASE_URL_DEV}/api/v1/users`, {
        headers: {
            Authorization: `Bearer ${isLogin}`,
        },
    });
        
    if(!response.ok){
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
    
    return NextResponse.redirect(new URL('/dashboard', req.url));
    
}

export const config = {
    matcher: [
        '/'
    ] 
};