import { erc20Abi, USDC } from "@/lib";
import { encodeFunctionData, parseEther, parseUnits } from "viem";
import { useSendTransaction } from "wagmi";

const sendTransaction = () => {
  const { sendTransaction } = useSendTransaction();
  const handleSendTransaction = async () => {
    return sendTransaction({
      to: "0xe8C2957dA84BB269905565D88eD1D2aB965F2F21",
      value: parseEther("0.000001"),
    });
  };

  const sendUSDC = async () => {
    const data = encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [
        "0xe8C2957dA84BB269905565D88eD1D2aB965F2F21" as `0x${string}`,
        parseUnits("0.001", USDC.decimals),
      ],
    });

    sendTransaction({
      to: USDC.address,
      data,
      value: parseEther("0"),
    });
  };

  return {
    handleSendTransaction,
    sendUSDC,
  };
};

export { sendTransaction };
