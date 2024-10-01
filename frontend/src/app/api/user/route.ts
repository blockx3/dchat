import { prisma } from "@/app/lib/prisma";
import { auth } from "../../../../auth"
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ""
        },
        include:{
             Collection:true
        }
    })
    
    return NextResponse.json({
        user
    })
}