import OpenAI from "openai";
import { createAssistant } from "./openai/CreateAssistant";
import { createThread as clientThread } from "./openai/CreateThread";
import { createRun } from "./openai/createRun";
// Onchain AI Agent - Ana giriş noktası

async function main() {
  const client = new OpenAI();
  const assistant = await createAssistant(client);
  const thread = await clientThread(client, "Hello, how can ı help you today?");
  const run = await createRun(client, thread, assistant.id);

}
main();

