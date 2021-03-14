import React from 'react'
import styled from 'styled-components'


const currencies = ['USD', 'EUR']
const DELAY = 5000
const TEND_MAP = Object.freeze({
  DEFAULT: Symbol('default'),
  INC: Symbol('incrising tend'),
  DEC: Symbol('decreasing tend')
})

const StyledCard = styled.div(({ tend }) => console.log(tend) || ({
  width: '45%',
  height: '100px',
  borderRadius: '10px',
  boxShadow: '2px 2px 20px -4px rgb(0 0 0 / 75%)',
  backgroundColor: tend === TEND_MAP.DEFAULT ? 'gainsboro' : tend === TEND_MAP.INC ? 'forestgreen' : tend === TEND_MAP.DEC && 'red',
  marginBottom: '10px',
  cursor: 'pointer',
  padding: '0 15px',
  border: '1px solid black',
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
  height: 25
})

const CryptoCard = ({ crypto: { name, USD, EUR }, onSelect }) => {

  const [USDRate, setUSDRate] = React.useState(USD)
  const [EURRate, setEURRate] = React.useState(EUR)
  const [USDDiff, setUSDDiff] = React.useState(0)
  const [EURDiff, setEURDiff] = React.useState(0)
  const [tend, setTend] = React.useState(TEND_MAP.DEFAULT)

  React.useEffect(() => {
    const interval = setInterval(() => {
      updateCrypto()
    }, DELAY)

    return () => clearInterval(interval)
  })

  const updateCrypto = async () => {
    const baseUrl = 'https://min-api.cryptocompare.com/data/price'
    const apiUrl = `${baseUrl}?fsym=${name}&tsyms=${currencies.join(',')}`
    try {
      const response = await fetch(apiUrl)
      const { USD: usd, EUR: eur } = await response.json()
      setUSDRate(usd)
      setEURRate(eur)

      if (USDRate < usd) {
        setTend(TEND_MAP.INC)
        setUSDDiff(`+ ${(usd - USDRate).toFixed(4)}`)
        setEURDiff(`+ ${(eur - EURRate).toFixed(4)}`)
      } else if (USDRate < usd) {
        setTend(TEND_MAP.DEC)
        setUSDDiff(`- ${(USDRate - usd).toFixed(4)}`)
        setEURDiff(`- ${(EURRate - eur).toFixed(4)}`)
      } else {
        setTend(TEND_MAP.DEFAULT)
        setUSDDiff(0)
        setEURDiff(0)
      }

    } catch (e) {
      alert(e)
    }
  }

  return (
    <StyledCard tend={tend} onClick={onSelect}>
      <StyledCryptoTitle>{name}</StyledCryptoTitle>
      <StyledCurrency>USD: {USDRate} ({USDDiff})</StyledCurrency>
      <StyledCurrency>EUR: {EURRate} ({EURDiff})</StyledCurrency>
    </StyledCard>
  )
}

export default React.memo(CryptoCard)