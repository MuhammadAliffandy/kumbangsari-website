import prisma  from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary';
const { sendSuccessResponse , sendErrorResponse } = require('../../../../lib/response')
import { NextResponse } from 'next/server';

export async function GET(req) {

    const news = await prisma.News.findMany({
        where : {
            deletedAt : null
        },
        orderBy: {
            updatedAt: 'desc', 
        },
    })

    return NextResponse.json(sendSuccessResponse(
        news,
        'fetch news data is successfully'
    ), {status : 200})
}


export async function POST(req) {
    const form = await req.formData();
    const file = form.get('image');
    const title = form.get('title');
    const text = form.get('text');
    const author = form.get('author');
    const imageUrl = form.get('imageUrl');

    if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    try {

        if(imageUrl != null || imageUrl != ''){
            const news = await prisma.News.create({
                data: {
                    title : title, 
                    text : text , 
                    image : imageUrl, 
                    author : author 
                },
            });
    
            
            return NextResponse.json(sendSuccessResponse(
                news,
                'news data has been created',
            ), {status : 201})
        }else{
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);
    
            const result = await cloudinary.uploader.upload(
                `data:${file.type};base64,${buffer.toString('base64')}`,
                { folder: 'kumbangsari', resource_type: 'auto' }
            );
    
            const news = await prisma.News.create({
                data: {
                    title : title, 
                    text : text , 
                    image : result.secure_url, 
                    author : author 
                },
            });
    
            
            return NextResponse.json(sendSuccessResponse(
                news,
                'news data has been created',
            ), {status : 201})
        }

   
      

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req) {

    try {
        const form = await req.formData();
        const id = form.get('id');
        const file = form.get('image');
        const title = form.get('title');
        const text = form.get('text');
        const author = form.get('author');
        const imageUrl = form.get('imageUrl');

        if(imageUrl != ''){
            
            const news = await prisma.News.update({
                data: {
                    title : title, 
                    text : text , 
                    image : imageUrl, 
                    author : author 
                },
                where : {
                    id : id
                }
            });

            return NextResponse.json(sendSuccessResponse(
                news,
                'news data has been updated',
            ), {status : 201})
        }else{
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);

            const result = await cloudinary.uploader.upload(
                `data:${file.type};base64,${buffer.toString('base64')}`,
                { folder: 'kumbangsari', resource_type: 'auto' }
            );

            const news = await prisma.News.update({
                data: {
                    title : title, 
                    text : text , 
                    image : result.secure_url, 
                    author : author 
                },
                where : {
                    id : id
                }
            });

            return NextResponse.json(sendSuccessResponse(
                news,
                'news data has been updated',
            ), {status : 201})
        }

    } catch (error) {
        return NextResponse.json(sendErrorResponse(error,'Server Error'), {status : 500})
    }

}
export async function DELETE(req) {

    const { id } = await req.json();

    try {

        const deletedNews = await prisma.News.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        return NextResponse.json(sendSuccessResponse(
            deletedNews,
            'news data has been deleted'
        ), {status : 201})

    } catch (error) {
        return NextResponse.json(sendErrorResponse(error, 'Server Error'), {status : 201})

    }

}

