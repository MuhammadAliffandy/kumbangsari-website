const { sendSuccessResponse , sendErrorResponse } = require('../../../../lib/response')
import { NextResponse } from 'next/server';

export async function GET(request) {
    return NextResponse.json(sendSuccessResponse(), {status : 200})
}
