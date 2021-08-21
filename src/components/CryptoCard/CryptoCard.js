import React from 'react'
import { TEND_MAP, DELAY } from '../../constants'
import CryptoApi from '../../services/http'
import {
  StyledCurrency,
  StyledCryptoTitle,
  StyledCard,
} from './CryptoCard.styled'

const CryptoCard = ({ crypto, onSelect, updateCrypto }) => {
  const { price, diff, tend, name } = crypto

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const updatedCrypto = { ...crypto }
      try {
        const { EUR: newPrice } = await CryptoApi.getRate(
          [crypto?.name],
          ['EUR']
        )
        updatedCrypto.price = newPrice
        if (price < newPrice) {
          updatedCrypto.tend = TEND_MAP.INC
          updatedCrypto.diff = `+ ${(newPrice - price).toFixed(4)}`
        } else if (price > newPrice) {
          updatedCrypto.tend = TEND_MAP.DEC
          updatedCrypto.diff = `- ${(price - newPrice).toFixed(4)}`
        } else {
          updatedCrypto.tend = TEND_MAP.DEFAULT
          updatedCrypto.diff = 0
        }
        if (updatedCrypto.history.length < 10) {
          updatedCrypto.history.push({ eur: newPrice })
        } else {
          updatedCrypto.history.shift()
          updatedCrypto.history.push({ eur: newPrice })
        }
        updateCrypto(updatedCrypto)
      } catch (e) {
        console.error(e)
      }
    }, DELAY)
    return () => clearInterval(interval)
  })

  return (
    <StyledCard tend={tend} onClick={onSelect}>
      <StyledCryptoTitle>{name}</StyledCryptoTitle>
      <StyledCurrency>
        EUR: {price} ({diff})
      </StyledCurrency>
    </StyledCard>
  )
}

export default CryptoCard
