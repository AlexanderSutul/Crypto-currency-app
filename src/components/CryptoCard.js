import React from 'react'
import styled from 'styled-components'


const currencies = ['USD', 'EUR']
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
  const { name, USD, EUR } = crypto

  const [USDRate, setUSDRate] = React.useState(USD)
  const [EURRate, setEURRate] = React.useState(EUR)
  const [USDDiff, setUSDDiff] = React.useState(0)
  const [EURDiff, setEURDiff] = React.useState(0)
  const [tend, setTend] = React.useState(TEND_MAP.DEFAULT)
  const rateRef = React.useRef()

  React.useEffect(() => {
    const interval = setInterval(async () => {
      rateRef.current = { usdRate: USDRate, eurRate: EURRate, usdDiff: USDDiff, eurDiff: EURDiff }
      await updateCrypto()
    }, DELAY)
    return () => clearInterval(interval)
  })

  const updateCrypto = async () => {
    console.log('update crypto', name)
    const baseUrl = 'https://min-api.cryptocompare.com/data/price'
    const apiUrl = `${baseUrl}?fsym=${name}&tsyms=${currencies.join(',')}`
    try {
      const response = await fetch(apiUrl)
      const { USD: newUSDRate, EUR: newEURRate } = await response.json()
      setUSDRate(newUSDRate)
      setEURRate(newEURRate)

      crypto.history = crypto.history.length < 10
          ? [...crypto.history, { usd: newUSDRate, eur: newEURRate }]
          : [...crypto.history, { usd: newUSDRate, eur: newEURRate }].slice(-10)

      if (rateRef.current.USDRate < newUSDRate) {
        setTend(TEND_MAP.INC)
        setUSDDiff(`+ ${(newUSDRate - USDRate).toFixed(4)}`)
        setEURDiff(`+ ${(newEURRate - EURRate).toFixed(4)}`)
      } else if (USDRate < newUSDRate) {
        setTend(TEND_MAP.DEC)
        setUSDDiff(`- ${(USDRate - newUSDRate).toFixed(4)}`)
        setEURDiff(`- ${(EURRate - newEURRate).toFixed(4)}`)
      } else {
        setTend(TEND_MAP.DEFAULT)
        setUSDDiff(0)
        setEURDiff(0)
      }
    } catch (e) {
      alert(JSON.stringify(e))
    }
  }

  const handleCrossClick = e => {
    e.stopPropagation()
  }

  return (
    <StyledCard tend={tend} onClick={onSelect}>
      <StyledCross onclick={{handleCrossClick}} />
      <StyledCryptoTitle>{name}</StyledCryptoTitle>
      <StyledCurrency>USD: {USDRate} ({USDDiff})</StyledCurrency>
      <StyledCurrency>EUR: {EURRate} ({EURDiff})</StyledCurrency>
    </StyledCard>
  )
}

export default React.memo(CryptoCard)