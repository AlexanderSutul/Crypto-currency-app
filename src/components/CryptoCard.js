import React from 'react'
import styled from 'styled-components'
import CryptoApi from "../services/http";

const DELAY = 2_000
const TEND_MAP = Object.freeze({
  DEFAULT: Symbol('default'),
  INC: Symbol('increasing tend'),
  DEC: Symbol('decreasing tend')
})

const StyledCard = styled.div(({ tend }) => ({
  width: '45%',
  height: '100px',
  borderRadius: '10px',
  boxShadow: '2px 2px 20px -4px rgb(0 0 0 / 75%)',
  backgroundColor: tend === TEND_MAP.DEFAULT
      ? 'gainsboro' : tend === TEND_MAP.INC
          ? 'forestgreen'
          : tend === TEND_MAP.DEC && 'red',
  marginBottom: '10px',
  cursor: 'pointer',
  padding: '0 15px',
  border: '1px solid black',
  position: 'relative'
}))

const StyledCryptoTitle = styled.div({
  fontSize: 21,
  borderBottom: '2px solid black',
  marginBottom: 10
})

const StyledCurrency = styled.div({
  fontSize: 15,
})

const StyledCross = styled.div({
  width: 25,
  height: 25,
  borderRadius: 25,
  position: 'absolute',
  right: -(25 / 2),
  top: -(25 / 2),
  backgroundColor: 'red',
  '&:before': {
    content: 'x'
  }
})

const CryptoCard = ({ crypto, onSelect }) => {
  const { name, EUR } = crypto

  const [rate, setRate] = React.useState(EUR)
  const [diff, setDiff] = React.useState(0)
  const [tend, setTend] = React.useState(TEND_MAP.DEFAULT)

  React.useEffect(() => {
    const interval = setInterval(async () => await updateCrypto(), DELAY)
    return () => clearInterval(interval)
  })

  const updateCrypto = async () => {
    try {
      const { EUR: newRate } = await CryptoApi.getRateByCryptoName(name)
      crypto.history = crypto.history.length < 10
          ? [...crypto.history, { eur: newRate }]
          : [...crypto.history, { eur: newRate }].slice(-10)

      console.log(`EURRate ${rate}, newEURRate ${newRate}`)

      if (rate < newRate) {
        setTend(TEND_MAP.INC)
        setDiff(`+ ${(newRate - rate).toFixed(4)}`)
      } else if (rate > newRate) {
        setTend(TEND_MAP.DEC)
        setDiff(`- ${(rate - newRate).toFixed(4)}`)
      } else {
        setTend(TEND_MAP.DEFAULT)
        setDiff(0)
      }
      setRate(newRate)
    } catch (e) {
      alert(JSON.stringify(e))
    }
  }

  const handleCrossClick = e => {
    // add removing
    // also remove card from localStorage
    e.stopPropagation()
  }

  return (
    <StyledCard tend={tend} onClick={onSelect}>
      <StyledCross onclick={{handleCrossClick}} />
      <StyledCryptoTitle>{name}</StyledCryptoTitle>
      <StyledCurrency>EUR: {rate} ({diff})</StyledCurrency>
    </StyledCard>
  )
}

export default React.memo(CryptoCard)