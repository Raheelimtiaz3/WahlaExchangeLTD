import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { destination, days, budgetUsd, travelerType, phoneModel, question } = await req.json();

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

    const prompt = `You are a professional Currency Exchange Expert, Mobile Telecom Specialist, and Travel Advisor for "Wahla Exchange LTD" located at 22 Maxwell Road, Glasgow, G41 1QE, UK (Phone: +44 1412660379).
Provide a clear, highly actionable, concise response for a customer planning a trip.

Customer Details:
- Destination Country: ${destination || 'General International Travel'}
- Trip Duration: ${days || 7} days
- Total Budget: $${budgetUsd || 1000} USD
- Travel Style: ${travelerType || 'Leisure / Sightseeing'}
- Phone Model: ${phoneModel || 'Smartphone'}
- Specific Question / Request: ${question || 'Give me a recommended cash vs card breakdown and mobile connectivity tips.'}

Instructions:
1. Provide a breakdown of Cash vs Card split in % and exact amount for ${destination}.
2. Mention 2 key local payment customs or tipping habits for cash vs card in ${destination}.
3. Recommend whether they should use a physical SIM, global eSIM, or roaming, and accessory tips (e.g. plug adapter, power bank size).
4. Give a brief summary recommendation on how our store counter in Glasgow or online voucher reservation can help before departure.

Keep the response structured with bullet points, clean headings, bold text, and a friendly professional tone. Do not use markdown headers larger than ###.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    return NextResponse.json({
      advice: response.text || 'Unable to generate advice at this moment. Please try again.',
    });
  } catch (error: any) {
    console.error('Error in Gemini travel advisor route:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while generating travel advice.' },
      { status: 500 }
    );
  }
}
