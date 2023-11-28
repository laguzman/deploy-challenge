import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server"
const prisma = new PrismaClient()
export async function GET() {
    const notes = await prisma.notes.findMany()
    return NextResponse.json(notes)
}
export async function POST(request) {
    const json = await request.json();
    //   const data = await request.formData()
    const note = await prisma.notes.create({
        data: json
    })
//return NextResponse.redirect('http://localhost:3000/posts', {status: 302});
    return NextResponse.json({ note })
}