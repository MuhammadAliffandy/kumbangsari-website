import { NextResponse } from 'next/server';
import { BASE_URL } from './app/utils/constants';

export async function middleware(req) {
    
    const token = req.cookies.get('token') ?  req.cookies.get('token')?.value  : null;
    const refreshToken = req.cookies.get('refreshToken') ?  req.cookies.get('refreshToken')?.value  : null;
    const { pathname } = req.nextUrl;
    
    const response = await fetch(`${BASE_URL}/api/v1/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if ( token != ''  && response.ok && pathname == '/' ) {
        return NextResponse.redirect(new URL('/dashboard', req.url)); 
    }

    if( pathname.includes('/dashboard') && response.status == 400 ){

        const responses = await fetch(`${BASE_URL}/api/v1/users/refresh-token`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken : refreshToken
            }) 
        });

        const data = await responses.json()
        console.log(data)

        if(  data.status == 'Failed'|| responses.status == 400){
            return NextResponse.redirect(new URL('/auth/signin?token=expired', req.url)); 
        }else{
            NextResponse.redirect(new URL(`/dashboard?token=${data.data.token}&refreshToken=${data.data.refreshToken}`, req.url)); 
            return NextResponse.next();
        }
    }
    
    return NextResponse.next();

}


export const config = {
    matcher: [
        '/',
        '/dashboard/:path*'
        
    ] 
};
