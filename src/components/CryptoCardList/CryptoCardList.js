import React from 'react'
import CryptoCard from '../CryptoCard/CryptoCard'
import { StyledCryptoCardList } from './CryptoCardList.styled'

const CryptoCardList = ({ cryptos, selectCrypto, onUpdateCrypto }) => {
  const handleSelectCrypto = crypto => selectCrypto(crypto)

  return (
    <StyledCryptoCardList>
      {cryptos &&
        cryptos.map(crypto => (
          <CryptoCard
            key={crypto.name}
            crypto={crypto}
            onSelect={() => handleSelectCrypto(crypto)}
            onUpdateCrypto={onUpdateCrypto}
          />
        ))}
    </StyledCryptoCardList>
  )
}

export default CryptoCardList
