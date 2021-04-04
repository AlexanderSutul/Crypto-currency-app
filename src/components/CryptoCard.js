import React from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import {TEND_MAP} from '../constants'
import CryptoApi from "../services/http";

const DELAY = 10_000

const StyledCard = styled(Paper)(({tend}) => ({
    width: '45%',
    height: '100px',
    backgroundColor: tend && tend === TEND_MAP.DEFAULT
        ? '#ffcd38' : tend === TEND_MAP.INC
            ? '#00e676'
            : tend === TEND_MAP.DEC && '#ff1744',
    marginBottom: '10px',
    cursor: 'pointer',
    padding: '0 15px',
    position: 'relative'
}))
const StyledCryptoTitle = styled.div({
    fontSize: 21,
    borderBottom: '2px solid black',
    marginBottom: 10,
    textTransform: 'uppercase'
})
const StyledCurrency = styled.div({
    fontSize: 15,
})

const CryptoCard = ({crypto, onSelect, updateCrypto}) => {
    const {price, diff, tend, name} = crypto

    React.useEffect(() => {
        const interval = setInterval(async () => {
            const updatedCrypto = {...crypto}
            try {
                const {EUR: newPrice} = await CryptoApi.getRateByCryptoName(name)
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
                updatedCrypto.history = [...updatedCrypto.history, {eur: newPrice}]
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
            <StyledCurrency>EUR: {price} ({diff})</StyledCurrency>
        </StyledCard>
    )
}

export default CryptoCard