import { getUserCredits } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const { userEmail } = await req.json();
    try {
        const credits = await getUserCredits(userEmail);
        if (credits <= 0) {
            return NextResponse.json({ error: "Free trial has expired. Please upgrade to pro." }, {
                status: 403,
                headers: { 'Content-Type': 'text/plain' }
            });
        }
        return NextResponse.json({ proceed: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, {
            status: 500,
        });
    }
}