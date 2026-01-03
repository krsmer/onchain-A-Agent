import { parseEther } from "viem";
import { createViemPublicClient } from "../viem/createViemPublicClient.js";
import { createViemWalletClient } from "../viem/createViemWalletClient.js";
import { ToolConfig } from "./allTools.js";

// Placeholder - replace with actual ERC20 contract ABI
const ERC20_ABI = [] as const;

// Placeholder - replace with actual ERC20 contract bytecode
const ERC20_BYTECODE = "0x" as `0x${string}`;

interface DeployErc20Args {
    name: string;
    symbol: string;
    initialSupply?: string;
}

export const deployErc20Tool: ToolConfig<DeployErc20Args> = {
    definition: {
        type: "function",
        function: {
            name: "deploy_erc20",
            description: "Deploy a new ERC20 token contract with specified name, symbol, and initial supply.",
            parameters: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "The name of the token (e.g., 'My Token').",
                    },
                    symbol: {
                        type: "string",
                        description: "The symbol of the token (e.g., 'MTK').",
                    },
                    initialSupply: {
                        type: "string",
                        description: "The initial supply of tokens (optional, defaults to 1 billion).",
                    },
                },
                required: ["name", "symbol"],
            },
        },
    },
    handler: async ({ name, symbol, initialSupply }) => {
        const walletClient = createViemWalletClient();

        // Use 1 billion as default initial supply
        const supply = initialSupply || "1000000000";

        // Deploy the contract
        const hash = await walletClient.deployContract({
            abi: ERC20_ABI,
            bytecode: ERC20_BYTECODE,
            args: [name, symbol, parseEther(supply)],
        });

        // Wait for transaction to be mined
        const publicClient = createViemPublicClient();
        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        return {
            contractAddress: receipt.contractAddress,
            transactionHash: hash,
            name,
            symbol,
            initialSupply: supply,
        };
    }
};
