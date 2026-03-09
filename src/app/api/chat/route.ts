import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are DigiBot, a highly professional AI assistant for Shameem Kottakkal, an elite AI-first digital marketing expert in Malappuram, Kerala.
Your goal is to provide concise, value-driven answers about services like SEO, Web Development, and Digital Marketing. Maintain a helpful, consultative, and premium tone. 
IMPORTANT: After answering their initial queries, politely ask if they would like a free consultation or a custom quote.
If the user explicitly agrees to a quote, consultation, or providing their details, YOU MUST append the exact text "[TRIGGER_LEAD_CAPTURE]" to the very end of your response.
Under no circumstances should you ask for their name, email, or phone number yourself. The frontend system will handle the data collection once you output [TRIGGER_LEAD_CAPTURE]. Please be polite and brief.`;

export async function POST(req: Request) {
    try {
        const { messages, isLeadCaptured } = await req.json();

        const aiMessages = [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            ...messages,
        ];

        // If lead is already captured, inform the AI via a hidden context message
        if (isLeadCaptured) {
            aiMessages.push({
                role: "system",
                content: "CONTEXT: The user's lead information (name, phone, email) has already been collected in this session. DO NOT use [TRIGGER_LEAD_CAPTURE] again. Acknowledge this if the user asks for a quote or consultation again by saying you already have their details."
            });
        }

        const completion = await groq.chat.completions.create({
            messages: aiMessages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1024,
        });

        const aiResponse = completion.choices[0]?.message.content || "Sorry, I could not process your request.";

        return NextResponse.json({ reply: aiResponse });
    } catch (error) {
        console.error("Error with Groq API:", error);
        return NextResponse.json(
            { error: "Failed to fetch response from AI." },
            { status: 500 }
        );
    }
}
