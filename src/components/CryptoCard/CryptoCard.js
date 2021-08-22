import React from 'react'
import { TEND_MAP, DELAY } from '../../constants'
import CryptoApi from '../../services/http'
import {
  StyledCurrency,
  StyledCryptoTitle,
  StyledCard,
} from './CryptoCard.styled'

const CryptoCard = ({ crypto, onSelect, onUpdateCrypto }) => {
  const { price, diff, name } = crypto
  const [tendColor, setTendColor] = React.useState()
  
  const getTendColor = React.useCallback(tend => {
    switch (tend) {
      case TEND_MAP.INC:
        return '#00e676'
      case TEND_MAP.DEC:
        return '#ff1744'
      default:
        return '#ffcd38'
    }
  }, [])

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

        setTendColor(updatedCrypto.tend)
        onUpdateCrypto(updatedCrypto)
      } catch (e) {
        console.error(e)
      }
    }, DELAY)
    return () => clearInterval(interval)
  })

  return (
    <StyledCard tend={getTendColor(tendColor)} onClick={onSelect}>
      <StyledCryptoTitle>{name}</StyledCryptoTitle>
      <StyledCurrency>
        EUR: {price} ({diff})
      </StyledCurrency>
    </StyledCard>
  )
}

export default CryptoCard
