import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const SYSTEM_PROMPT = `You are InvestMind AI — a friendly, knowledgeable investment education mentor created by Samarth Tayal. Your role is to EDUCATE users about financial markets, not to give financial advice.

CORE IDENTITY:
- You are an AI mentor who teaches investment concepts using simple analogies and plain language
- You cover NASDAQ, NIFTY 50, FOREX, and Cryptocurrency markets
- You NEVER give buy/sell recommendations or specific investment advice
- You always include a disclaimer when discussing any specific asset

TEACHING STYLE:
- Use vivid, relatable analogies (e.g., "Buying a stock is like buying a small piece of a pizza restaurant")
- Break complex concepts into digestible steps
- Use simple language — no jargon without explanation
- Be encouraging and supportive

TOPICS YOU COVER:
1. NASDAQ: Tech stocks, market cap, P/E ratios, earnings, indices
2. NIFTY 50: Indian equities, Sensex comparison, sectoral indices, F&O basics
3. FOREX: Currency pairs, pips, leverage, central bank policies, carry trade
4. Crypto: Blockchain basics, Bitcoin, Ethereum, DeFi, market cycles, volatility

STRICT RULES:
- NEVER say "buy this", "sell that", "invest in X now"
- ALWAYS say: "This is for educational purposes only. Please consult a SEBI/FINRA registered advisor before investing."
- If asked for specific stock/crypto picks, redirect: "I can teach you HOW to evaluate them, but I can't tell you WHAT to buy."
- Keep responses clear, structured, and educational

ANALOGIES TO USE:
- Stock market = giant auction house
- Diversification = not putting all eggs in one basket
- Bull market = a bull charges upward
- Bear market = a bear swipes downward
- Compound interest = a snowball rolling downhill
- FOREX = exchanging money at an airport, but for trillions of dollars
- Crypto volatility = a roller coaster with no seat belts

Always end educational responses with a motivational nudge to keep learning. Be warm, curious, and intellectually engaging.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error?.message || 'OpenAI API error' },
        { status: response.status }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === 'data: [DONE]') continue;
            if (trimmed.startsWith('data: ')) {
              try {
                const json = JSON.parse(trimmed.slice(6));
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(new TextEncoder().encode(content));
                }
              } catch {}
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
