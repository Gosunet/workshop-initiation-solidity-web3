import React, { FC, useCallback, useEffect } from 'react'
import styles from '../App.module.css'
import { ReactComponent as MintIcon } from '../icons/nft.svg'
import svgExport from 'save-svg-as-png'
import { Contract, ethers } from 'ethers'
import axios from 'axios'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";

const CONTRACT_ADDRESS = '0xeF6FFDA727B7b8e3440e14f480bF35777788F56a'

type MintProps = {
  svgRef: React.RefObject<SVGSVGElement>
  setIsLoading: (loading: boolean) => void
}

export const Mint: FC<MintProps> = ({ svgRef, setIsLoading }) => {
  const active = false
  const setupEventListener = useCallback(() => {
  }, [provider])
  const askContractToMintNft = async () => {
  }

  useEffect(() => {
    setupEventListener()
  }, [setupEventListener])

  if (!active) return null
  return (
    <button
      className={styles.circle}
      onClick={askContractToMintNft}
      title="Mint"
      aria-label="Mint"
    >
      <MintIcon height="31px" width="31px" />
    </button>
  )
}
async function uploadSvgToIPFS({
  svg,
  name,
}: {
  svg: string
  name: string
}) {
  const res = await axios.post(
    'https://biirzzx75m.execute-api.eu-west-3.amazonaws.com/Prod/pinIpfs/',
    JSON.stringify({ name, rawSvg: svg }),
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.AWS_APIKEY}`,
      },
    }
  )

  return res.data.cid
}

async function getSvgImageFromSvgElement(svg: SVGSVGElement) {
  return svgExport.prepareSvg(svg, {
    excludeCss: true,
  })
}

export default Mint
