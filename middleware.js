import { NextResponse } from 'next/server'

export function middleware(req) {

    const isLogin = req.cookies.get('token');
    const { pathname } = req.nextUrl;

    
    if(isLogin && pathname == '/auth/signin'){
        return NextResponse.redirect(new URL('/', req.url));
    }
    
    if (!isLogin && pathname !== '/auth/signin') {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
}

export const config = {
    matcher: [
        '/example',
    ]
};