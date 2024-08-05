import prisma  from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary';
const { sendSuccessResponse , sendErrorResponse } = require('../../../../lib/response')
import { NextResponse } from 'next/server';

export async function GET(req) {

    const product = await prisma.Product.findMany({
        where : {
            deletedAt : null
        }
    })

    return NextResponse.json(sendSuccessResponse(
        product,
        'fetch product data is successfully'
    ), {status : 200})
}
export async function POST(req) {

    try {
        const form = await req.formData();;
        const title = form.get('title');
        const file = form.get('image');
        const description = form.get('description')
        const price = form.get('price')
        const rating = form.get('rating')
        const phoneNumber = form.get('phoneNumber')
        const category = form.get('category')
        const imageUrl = form.get('imageUrl');

        if(imageUrl != null || imageUrl != ''){

            const product = await prisma.Product.create({
                data: {
                    title : title, 
                    image : imageUrlrl ,
                    description : description,
                    price :  parseInt(price) ,
                    rating : parseInt(rating) ,
                    phoneNumber : phoneNumber,
                    category : category
                },
            });
    
            return NextResponse.json(sendSuccessResponse(
                product,
                'product data has been created',
            ), {status : 201})
        }else{
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);
    
            const result = await cloudinary.uploader.upload(
                `data:${file.type};base64,${buffer.toString('base64')}`,
                { folder: 'kumbangsari', resource_type: 'auto' }
            );
    
            const product = await prisma.Product.create({
                data: {
                    title : title, 
                    image : result.secure_url ,
                    description : description,
                    price :  parseInt(price) ,
                    rating : parseInt(rating) ,
                    phoneNumber : phoneNumber,
                    category : category
                },
            });
    
            return NextResponse.json(sendSuccessResponse(
                product,
                'product data has been created',
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
        const file = form.get('image');
        const description = form.get('description')
        const price = form.get('price')
        const rating = form.get('rating')
        const phoneNumber = form.get('phoneNumber')
        const category = form.get('category')
        const imageUrl = form.get('imageUrl');

        if( imageUrl != '' ||  imageUrl != null ){

            const product = await prisma.Product.update({
                data: {
                    id: id ,
                    title : title, 
                    image : result.secure_url ,
                    description : description,
                    price :  parseInt(price) ,
                    rating : parseInt(rating) ,
                    phoneNumber : phoneNumber,
                    category : category
                },
                where : {
                    id : id
                }
            });

            return NextResponse.json(sendSuccessResponse(
                product,
                'product data has been updated',
            ), {status : 201})
            
        }else{
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);

            const result = await cloudinary.uploader.upload(
                `data:${file.type};base64,${buffer.toString('base64')}`,
                { folder: 'kumbangsari', resource_type: 'auto' }
            );


            const product = await prisma.Product.update({
                data: {
                    id: id ,
                    title : title, 
                    image : result.secure_url ,
                    description : description,
                    price :  parseInt(price) ,
                    rating : parseInt(rating) ,
                    phoneNumber : phoneNumber,
                    category : category
                },
                where : {
                    id : id
                }
            });

            return NextResponse.json(sendSuccessResponse(
                product,
                'product data has been updated',
            ), {status : 201})
        }
        
    } catch (error) {
        return NextResponse.json(sendErrorResponse(error,'Server Error'), {status : 500})
    }

}
export async function DELETE(req) {

    const { id } = await req.json();

    try {

        const deletedProduct = await prisma.Product.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        return NextResponse.json(sendSuccessResponse(
            deletedProduct,
            'product data has been deleted'
        ), {status : 201})

    } catch (error) {
        return NextResponse.json(sendErrorResponse(error), {status : 201})

    }

}
