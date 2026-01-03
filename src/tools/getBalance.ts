import { Address, formatEther } from "viem";
import { createViemPublicClient } from "../viem/createViemPublicClient.js";
import { ToolConfig } from "./allTools.js";

interface GetBalanceArgs {
    wallet: Address;

}
export const getBalanceTool: ToolConfig<GetBalanceArgs> = {
    definition: {
        type: "function",
        function: {
            name: "get_balance",
            description: "Get the balance of a wallet address in Ether.",
            parameters: {
                type: "object",
                properties: {
                    wallet: {
                        type: "string",
                        pattern: "^0x[a-fA-F0-9]{40}$",
                        description: "The wallet address to get the balance for.",

                    },
                },
                required: ["wallet"],
            },
        },
    },
    handler: async ({wallet}) => {
        const publicClient = createViemPublicClient();
        const balance = await publicClient.getBalance({address: wallet});
        return { balance: formatEther(balance) };

    }
};
