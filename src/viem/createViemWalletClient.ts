import { Address,createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { abstractTestnet } from 'viem/chains'
import { eip712WalletActions } from 'viem/zksync';

export function createViemWalletClient() {
    if (!process.env.BASE_SEPOLIA_PRIVATE_KEY) {
        throw new Error("BASE_SEPOLIA_PRIVATE_KEY is not defined in environment variables");
    }
    const account = privateKeyToAccount(process.env.BASE_SEPOLIA_PRIVATE_KEY! as `0x${string}`);

    return createWalletClient({
        account: account,
        chain: abstractTestnet,
        transport: http(),
    }).extend(eip712WalletActions())
}













