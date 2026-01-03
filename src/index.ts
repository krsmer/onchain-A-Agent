import "dotenv/config";
import OpenAI from "openai";
import { createAssistant } from "./openai/createAssistant";
import { createRun } from "./openai/createRun";
import { createThread as clientThread } from "./openai/createThread";
import performRun from "./openai/performRun";


// Onchain AI Agent - Ana giriş noktası

async function main() {
  const client = new OpenAI();
  const assistant = await createAssistant(client);
  const thread = await clientThread(client, "Hello, how can ı help you today?");
  const run = await createRun(client, thread, assistant.id);
  const result = await performRun(client, thread, run);
  console.log(result)

}
main();
