import { NextResponse } from "next/server";
import { EnhancedGenerateContentResponse, GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env?.GEMINI_API_SECRET || '');

const model = genAI.getGenerativeModel({ model: "gemini-pro" });
interface ReqBody {
    prompt: string
}

function iteratorToStream(iterator: AsyncIterator<string>): ReadableStream<Uint8Array> {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next()
            if (done) {
                controller.close()
            } else {
                const textEncoder = new TextEncoder();
                const encodedValue = textEncoder.encode(value);
                controller.enqueue(encodedValue);
            }
        },
    })
}

async function* makeIterator(chunks: AsyncGenerator<EnhancedGenerateContentResponse>) {
    for await (const chunk of chunks) {
        yield chunk.text();
    }
}

export async function POST(req: Request) {
    try {
        const body: ReqBody = await req.json();
        if (!body?.prompt) {
            return NextResponse.json({ message: "Please provide a prompt" }, { status: 500 });
        }
        const result = await model.generateContentStream(body.prompt);
        const iterator = makeIterator(result.stream)
        const stream = iteratorToStream(iterator)
        return new Response(stream)
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
