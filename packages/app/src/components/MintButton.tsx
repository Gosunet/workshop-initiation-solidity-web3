import React, { FC, useCallback, useEffect } from "react";
import styles from "../App.module.css";
import { ReactComponent as MintIcon } from "../icons/nft.svg";
import svgExport from "save-svg-as-png";
import { Contract, ethers } from "ethers";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import myEpicNft from "contract/artifacts/contracts/MyEpicContract.sol/MyEpicSmartContract.json";

const CONTRACT_ADDRESS = "0x74Cc66B3D35BB5c1e5080d94C6D98776A6d1d2bf";

type MintProps = {
  svgRef: React.RefObject<SVGSVGElement>;
  setIsLoading: (loading: boolean) => void;
};

export const MintButton: FC<MintProps> = ({ svgRef, setIsLoading }) => {
  const { isActive, provider } = useWeb3React();
  const setupEventListener = useCallback(() => {
    if (!provider) {
      return;
    }
    const signer = provider.getSigner();
    const connectedContract = new Contract(
      CONTRACT_ADDRESS,
      myEpicNft.abi,
      // @ts-ignore the typing of Signer is out of date.
      signer
    );
    connectedContract.on("*", (data) => {
      console.log("data", data);
    });
    connectedContract.on("NewNFTMinted", (from, tokenId) => {
      console.log("new nft");

      console.log(from, tokenId);
      alert(
        `Hey there! We've minted your NFT and sent it to your wallet. You can see it in metasmask, just import it ! Contract is ${CONTRACT_ADDRESS} and tokenId is ${tokenId}`
      );
      setIsLoading(false);
    });
    return () => {
      connectedContract.off("NewNFTMinted");
    };
  }, [provider, setIsLoading]);

  const askContractToMintNft = async () => {
    if (!provider) {
      return;
    }
    setIsLoading(true);
    if (!svgRef.current) {
      throw new Error("No SVG");
    }
    const svg = await getSvgImageFromSvgElement(svgRef.current);
    const cid = await uploadSvgToIPFS({
      svg,
      name: `nft ${new Date().toISOString()}`,
    });
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      myEpicNft.abi,
      // @ts-ignore the typing of Signer is out of date.
      signer
    );
    await connectedContract.makeAnEpicNFT(`ipfs://${cid}`);
  };

  useEffect(() => {
    const cleanup = setupEventListener();
    return cleanup;
  }, [setupEventListener]);

  if (!isActive) return null;
  return (
    <button
      className={styles.circle}
      onClick={askContractToMintNft}
      title="Mint"
      aria-label="Mint"
    >
      <MintIcon height="31px" width="31px" />
    </button>
  );
};
async function uploadSvgToIPFS({
  svg,
  name,
}: {
  svg: { src: string };
  name: string;
}) {
  const res = await axios.post(
    "https://biirzzx75m.execute-api.eu-west-3.amazonaws.com/Prod/pinIpfs/",
    JSON.stringify({ name, rawSvg: svg.src }),
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `Ezc7yLacAz1V4OgIo9p191q76sS8fUqf0aVRQSl6`,
      },
    }
  );

  return res.data.cid;
}

async function getSvgImageFromSvgElement(svg: SVGSVGElement) {
  return svgExport.prepareSvg(svg, {
    excludeCss: true,
  });
}

export default MintButton;
