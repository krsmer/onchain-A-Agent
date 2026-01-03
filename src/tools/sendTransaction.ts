import { Address, parseEther } from "viem";
import { createViemWalletClient } from "../viem/createViemWalletClient.js";
import { ToolConfig } from "./allTools.js";

interface SendTransactionArgs {
    to: Address;
    amount: string;
}

export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
    definition: {
        type: "function",
        function: {
            name: "send_transaction",
            description: "Send ETH to another wallet address.",
            parameters: {
                type: "object",
                properties: {
                    to: {
                        type: "string",
                        pattern: "^0x[a-fA-F0-9]{40}$",
                        description: "The recipient wallet address.",
                    },
                    amount: {
                        type: "string",
                        description: "The amount of ETH to send (e.g., '0.1' for 0.1 ETH).",
                    },
                },
                required: ["to", "amount"],
            },
        },
    },
    handler: async ({ to, amount }) => {
        const walletClient = createViemWalletClient();

        const hash = await walletClient.sendTransaction({
            to,
            value: parseEther(amount),
        });

        return {
            transactionHash: hash,
            to,
            amount,
        };
    }
};
