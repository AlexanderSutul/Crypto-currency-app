import React from 'react'
import CryptoCard from './CryptoCard'
import styled from 'styled-components'

const StyledCryptoCardList = styled.div({
    width: '100%',
    height: '70vh',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flex: '0 0 50%',
    justifyContent: 'space-around',
    alignContent: 'baseline',
    flexDirection: 'row',
    padding: '10px 0',
})

const CryptoCardList = ({cryptos, selectCrypto, updateCrypto}) => {
    return (
        <StyledCryptoCardList>
            {cryptos && cryptos.map(
                crypto =>
                    <CryptoCard
                        key={crypto.name}
                        crypto={crypto}
                        onSelect={() => selectCrypto(crypto)}
                        updateCrypto={updateCrypto}
                    />
            )}
        </StyledCryptoCardList>
    )
}

export default CryptoCardList
