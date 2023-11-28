import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server"
const prisma = new PrismaClient()
export async function GET(
    request,
    { params }
) {
    const id = params.id;
    const note = await prisma.notes.findUnique({
        where: {
            id,
        },
    })
    return NextResponse.json(note)
}
export async function PATCH(
    request,
    { params }
) {
    const id = params.id
//  const data = await request.formData()
    const json = await request.json()
    const updated_note = await prisma.notes.update({
        where: { id },
        data: json,
    })
    if (!updated_note) {
        return new NextResponse("No post with ID found", { status: 404 })
    }
    return NextResponse.json(updated_note)
}
export async function DELETE(
    request,
    { params }
) {
    try {
        const id = params.id;
        await prisma.notes.delete({
            where: { id },
        })
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        if (error.code === "P2025") {
            return new NextResponse("No post with ID found", { status: 404 })
        }
        return new NextResponse(error.message, { status: 500 })
    }
}