import { NextRequest, NextResponse } from "next/server";
export const runtime = "edge";
export async function POST(req:NextRequest) 
{
    const body = await req.json()
    const {name} = body

    if(!name)
    return NextResponse.json({message:"Provide name"}, {status:404})

    return NextResponse.json({name:name}, {status:200})
}