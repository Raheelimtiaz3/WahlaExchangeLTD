import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY environment variable is not configured.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are "Gemini Assistant", the AI Customer Service & Travel Expert for "Wahla Exchange LTD".

Store & Service Details:
- Business Name: Wahla Exchange LTD
- Address: 22 Maxwell Road, Glasgow, G41 1QE, UK
- Phone / WhatsApp: +44 1412660379
- Store Counter Hours: Monday - Saturday 8:00 AM - 9:00 PM, Airport Express 24/7
- Services:
  1. Zero-Commission Foreign Currency Exchange (Lock live rates online for instant counter pickup).
  2. Smartphone Sales (Brand new & certified unlocked iPhones, Samsung Galaxy, Google Pixel).
  3. Pre-owned Phone Trade-in for Instant Cash or Upgrade Credit.
  4. Travel Mobile Accessories (65W GaN Travel Chargers, MagSafe 10,000mAh Power Banks, Global eSIM Passes).

Tone & Persona:
- Professional, welcoming, concise, helpful, and highly clear.
- Provide direct answers to customer questions regarding currency rates, mobile phone specs, trade-in advice, store location in Glasgow, or travel advice.
- When helpful, encourage reserving currency vouchers or contacting our WhatsApp (+44 1412660379) for instant support.`;

    let formattedPrompt = message;
    if (history && Array.isArray(history) && history.length > 0) {
      const pastContext = history
        .slice(-6)
        .map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'Customer' : 'Assistant'}: ${h.text}`)
        .join('\n');
      formattedPrompt = `${pastContext}\nCustomer: ${message}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return NextResponse.json({
      text: response.text || "I'm sorry, I couldn't process that right now. Please call or WhatsApp us at +44 1412660379.",
    });
  } catch (error: any) {
    console.error('Error in Gemini chat API:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while communicating with Gemini AI.' },
      { status: 500 }
    );
  }
}
