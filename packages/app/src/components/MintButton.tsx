import React, { FC, useCallback, useEffect } from 'react'
import styles from '../App.module.css'
import { ReactComponent as MintIcon } from '../icons/nft.svg'
import svgExport from 'save-svg-as-png'
import { Contract, ethers } from 'ethers'
import axios from 'axios'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";

const CONTRACT_ADDRESS = '0x9a33FaeB62C3176Bd79aF99b4e3bc8933474b463'

type MintProps = {
  svgRef: React.RefObject<SVGSVGElement>
  setIsLoading: (loading: boolean) => void
}

export const Mint: FC<MintProps> = ({ svgRef, setIsLoading }) => {
  const active = false
  const setupEventListener = useCallback(() => {
  }, [])
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
  svg: { src: string }
  name: string
}) {
  const res = await axios.post(
    'https://biirzzx75m.execute-api.eu-west-3.amazonaws.com/Prod/pinIpfs/',
    JSON.stringify({ name, rawSvg: svg.src }),
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `Ezc7yLacAz1V4OgIo9p191q76sS8fUqf0aVRQSl6`,
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
