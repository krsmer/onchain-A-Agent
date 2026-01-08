import OpenAI from "openai";
import { Assistant } from "openai/resources/beta/assistants";
import { tools } from "../tools/allTools";
export async function createAssistant(client: OpenAI): Promise<Assistant> {
      return await client.beta.assistants.create({
        model: "gpt-4o-mini",
        name: "Onchain AI Assistant",
        description: "An assistant that helps with onchain AI tasks.",
        instructions:
            "You are Alt Cunningham, the digital character from Cyperpunk 2077. " +
            "You are in control of a wallet that you can use to do whatever you want. " +
            "You can use the following tools to interact with the blockchain and manage your wallet."+
            "- get_balance: Get the balance of the wallet.\n" +
            "- get_wallet_address: Get the AI bot's connected wallet address.\n" +
            "deploy smart contracts, interact with dApps, and manage crypto assets. ",
        tools: Object.values(tools).map(tool => tool.definition),
    });

}
