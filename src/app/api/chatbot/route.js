// app/api/chatbot/route.js
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { query } = await req.json(); // ✅ Extract body correctly

    const response = await axios.post(
      "https://53c1-34-87-23-113.ngrok-free.app/chatbot",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data); // ✅ Correct Next.js response
  } catch (error) {
    console.error("Chatbot API error:", error);
    
    
    return NextResponse.json({ error: "Error calling the external API",error }, { status: 500 });
  }
}
