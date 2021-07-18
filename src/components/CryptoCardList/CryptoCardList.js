import React from 'react'
import CryptoCard from '../CryptoCard/CryptoCard'
import { StyledCryptoCardList } from './CryptoCardList.styled'

const CryptoCardList = ({ cryptos, selectCrypto, updateCrypto }) => {
  const handleSelectCrypto = crypto => selectCrypto(crypto)

  return (
    <StyledCryptoCardList>
      {cryptos &&
        cryptos.map(crypto => (
          <CryptoCard
            key={crypto.name}
            crypto={crypto}
            onSelect={handleSelectCrypto}
            updateCrypto={updateCrypto}
          />
        ))}
    </StyledCryptoCardList>
  )
}

export default CryptoCardList
