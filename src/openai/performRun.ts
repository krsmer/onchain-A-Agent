import OpenAI from "openai";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { Thread } from "openai/resources/beta/threads/threads";
import {handleRunToolCall} from "./handleRunToolCall";

const performRun = async (client: OpenAI, thread: Thread, run: Run) => {
   while (run.status === "requires_action") {
     run = await handleRunToolCall(client, thread, run);
   }

   if (run.status === "failed") {
        const errorMessage = `I encountered an error: ${run.last_error?.message || "Unknown error"}`;
        console.error("Run failed:", errorMessage);
        await client.beta.threads.messages.create(thread.id, {
            role: "assistant",
            content: errorMessage,
        });
        return {
            type: "text",
            text: {
                value: errorMessage,
                annotations: [],
            }
        };
   }

   const messages = await client.beta.threads.messages.list(thread.id);
   const assistantMessage = messages.data.find(message => message.role === "assistant");
   return assistantMessage?.content[0] || {
        type: "text",
        text: {
            value: "No response generated.",
            annotations: [],
        }
   };
};
export default performRun;
