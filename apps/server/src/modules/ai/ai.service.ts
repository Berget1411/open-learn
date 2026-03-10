import { devToolsMiddleware } from "@ai-sdk/devtools";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "@open-learn/env/server";
import { convertToModelMessages, streamText, wrapLanguageModel } from "ai";

import type { AIRequest } from "./ai.schema";

export const aiService = {
  async streamChat(messages: AIRequest["messages"]) {
    const uiMessages = messages as Parameters<typeof convertToModelMessages>[0];

    const google = createGoogleGenerativeAI({
      apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
    const model = wrapLanguageModel({
      model: google("gemini-2.5-flash"),
      middleware: devToolsMiddleware(),
    });
    const result = streamText({
      model,
      messages: await convertToModelMessages(uiMessages),
    });

    return result.toUIMessageStreamResponse();
  },
};
