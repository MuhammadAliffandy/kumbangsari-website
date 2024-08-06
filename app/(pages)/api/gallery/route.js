import prisma  from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary';
const { sendSuccessResponse , sendErrorResponse } = require('../../../../lib/response')
import { NextResponse } from 'next/server';

export async function GET(req) {

    const gallery = await prisma.Gallery.findMany({
        where : {
            deletedAt : null
        },
        orderBy: {
            updatedAt: 'desc', 
        },
    })

    return NextResponse.json(sendSuccessResponse(
        gallery,
        'fetch gallery data is successfully'
    ), {status : 200})
}
export async function POST(req) {

    try {
        const form = await req.formData();;
        const title = form.get('title');
        const file = form.get('image');
        const imageUrl = form.get('imageUrl')

        if(imageUrl != null || imageUrl != ''){
            const gallery = await prisma.Gallery.create({
                data: {
                    title : title, 
                    image : imageUrl
                },
            });
    
            return NextResponse.json(sendSuccessResponse(
                gallery,
                'gallery data has been created',
            ), {status : 201})
        }else{
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);
    
            const result = await cloudinary.uploader.upload(
                `data:${file.type};base64,${buffer.toString('base64')}`,
                { folder: 'kumbangsari', resource_type: 'auto' }
            );
    
            const gallery = await prisma.Gallery.create({
                data: {
                    title : title, 
                    image : result.secure_url ,
    
                },
            });
    
            return NextResponse.json(sendSuccessResponse(
                gallery,
                'gallery data has been created',
            ), {status : 201})
        }
            

    } catch (error) {
        return NextResponse.json(sendErrorResponse(error,'Server Error'), {status : 500})
        
    }
}
export async function PUT(req) {

    try {
        const form = await req.formData();;
        const id = form.get('id');
        const title = form.get('title');
        const file = form.get('image')
        const imageUrl = form.get('imageUrl');

        
        if( imageUrl != ''){
        
            const gallery = await prisma.Gallery.update({
                data: {
                    title : title, 
                    image : imageUrl ,

                },
                
                where : {
                    id : id
                }
            });

            return NextResponse.json(sendSuccessResponse(
                gallery,
                'gallery data has been updated',
            ), {status : 201})
        }else{
    
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);
            
            const result = await cloudinary.uploader.upload(
                `data:${file.type};base64,${buffer.toString('base64')}`,
                { folder: 'kumbangsari', resource_type: 'auto' }
            );
            
            
            const gallery = await prisma.Gallery.update({
                data: {
                    title : title, 
                    image : result.secure_url ,

                },
                where : {
                    id : id
                }
            });

            return NextResponse.json(sendSuccessResponse(
                gallery,
                'gallery data has been updated',
            ), {status : 201})
        }
        
    } catch (error) {
        return NextResponse.json(sendErrorResponse(error,'Server Error'), {status : 500})
    }

}
export async function DELETE(req) {

    const { id } = await req.json();

    try {

        const deletedgallery = await prisma.Gallery.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        return NextResponse.json(sendSuccessResponse(
            deletedgallery,
            'gallery data has been deleted'
        ), {status : 201})

    } catch (error) {
        return NextResponse.json(sendErrorResponse(error), {status : 201})

    }

}
