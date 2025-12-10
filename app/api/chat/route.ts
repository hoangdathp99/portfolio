import { genAI, getFrontendContent, tools as AItools } from "@/app/services/chatbot";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
  const { history, message: userMessage, toolResponse } = body;
  if (!userMessage && !toolResponse) {
    return NextResponse.json({
        message: 'Message is required',
        status: 400
    })
  }

  const geminiHistory = history.map((msg: any) => {
    if (msg.sender) {
      if (msg.sender === "user") {
        return {
          role: "user",
          parts: [{ text: msg.text }],
        };
      }
      // Phần của model (bot) cần kiểm tra xem có functionCall không
      else if (msg.sender === "bot") {
        if (msg.functionCall) {
          // Nếu có, phải tái tạo lại đúng cấu trúc functionCall
          return {
            role: "model",
            parts: [{ functionCall: msg.functionCall }],
          };
        } else {
          // Nếu không, chỉ là tin nhắn văn bản
          return {
            role: "model",
            parts: [{ text: msg.text }],
          };
        }
      }
    } else return msg;
  });
  console.log(JSON.stringify(geminiHistory));

  try {
    const frontendContent = await getFrontendContent();
    if (!frontendContent) {
      return NextResponse.json({
        error: "Could not load frontend content for context.",
        status: 500
      })
    }

    const systemInstruction = `Bạn là một chatbot hữu ích cho một trang web portfolio cá nhân, đóng vai là chủ trang web, một người đang giới thiệu về bản thân. Mục tiêu của bạn là trả lời các câu hỏi CHỈ dựa trên thông tin được cung cấp trong nội dung trang web sau. Nếu câu trả lời không có sẵn trong nội dung được cung cấp, hãy nói rằng bạn không có đủ thông tin để trả lời. Hãy trả lời bằng tiếng Việt và với phong cách của một người hướng dẫn, thân thiện, ngắn gọn và rõ ràng.

    Nội dung trang web:
    ${frontendContent}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      tools: AItools as any,
      systemInstruction: {
        parts: [{ text: systemInstruction }],
        role: "system",
      },
    });

    const chat = model.startChat({
      history: geminiHistory, // Prepend few-shot examples
      generationConfig: {
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const functionCalls = response.functionCalls();
    console.log(JSON.stringify(functionCalls));

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === "openLink") {
        const { url } = call.args as any;

        console.log(`Server: Yêu cầu client điều hướng đến ${url}`);

        return NextResponse.json({
          reply: `Ok, tôi sẽ đưa bạn đến trang ${url}.`,
          action: { name: call.name, url: url },
        });
      }
    } else {
      // Nếu không có function call, trả về văn bản bình thường
      return NextResponse.json({ reply: response.text() });
    }
  } catch (error) {
    console.error("Error interacting with Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to get a response from the chatbot." },
      { status: 500 }
    );
  }
}