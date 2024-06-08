import { NextResponse } from 'next/server';
import { BASE_URL } from './app/utils/constants';

export async function middleware(req) {
    const isLogin = req.cookies.get('token') ?  req.cookies.get('token')?.value  : '';
    const { pathname } = req.nextUrl;
    
    const response = await fetch(`${BASE_URL}/api/v1/users`, {
        headers: {
            Authorization: `Bearer ${isLogin}`,
        },
    });

    if ( isLogin != ''  && response.ok) {
        return NextResponse.redirect(new URL('/dashboard', req.url)); 
    }
    
    console.log()

    if( pathname.includes('/dashboard') && response.status == 400 || isLogin == '' ){
        return NextResponse.redirect(new URL('/auth/signin', req.url)); 
    }
    
    return NextResponse.next();

}


export const config = {
    matcher: [
        '/' 
    ] 
};
