import React, { useState, useEffect } from 'react'
import { Container, Grid, TextField, Button } from '@material-ui/core'
import CryptoCardList from '../CryptoCardList/CryptoCardList'
import CryptoChart from '../CryptoChart/CryptoChart'
import CryptoApi from '../../services/http'
import { TEND_MAP } from '../../constants'
import LocalStorageManager from '../../services/localStorage'
import Header from '../Header/Header'
import SearchField from '../SearchField/SearchField'

const HISTORY_KEY = 'history'

const Main = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [cryptos, setCryptos] = useState([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCryptos(LocalStorageManager.get(HISTORY_KEY))
  }, [])

  const getNewCrypto = async cryptoName => {
    setIsLoading(true)
    if (
      !cryptoName ||
      !cryptoName.length ||
      cryptos?.find(
        crypto => crypto.name.toUpperCase() === cryptoName.toUpperCase()
      )
    )
      return setIsLoading(false)

    const crypto = await CryptoApi.getRate([cryptoName], ['EUR'])

    if (crypto.Response === 'Error') return setIsLoading(false)

    const newCrypto = {
      name: cryptoName,
      price: crypto.EUR,
      history: [],
      tend: TEND_MAP.DEFAULT,
      diff: 0,
    }

    setCryptos(prevState => [...(prevState || []), newCrypto])
    LocalStorageManager.set(HISTORY_KEY, cryptos)
    setIsLoading(false)
    setInputText('')
  }

  const addUpdatedCryptoToState = updatedCrypto => {
    const cryptoToUpdateIdx = cryptos.findIndex(
      cr => cr.name === updatedCrypto.name
    )
    cryptos[cryptoToUpdateIdx] = updatedCrypto
    const updatedCryptos = [...cryptos]
    LocalStorageManager.set(HISTORY_KEY, updatedCryptos)
    setCryptos(updatedCryptos)
  }

  const handleSubmit = e => {
    e.preventDefault()
    getNewCrypto(inputText)
  }

  return (
    <Container>
      <Header title="Crypto-app" />
      <Container 
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: 50
        }}
      >
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <SearchField
            onSubmit={handleSubmit}
            onChangeText={setInputText}
            isLoading={isLoading}
            text={inputText}
          />
        </Container>
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CryptoCardList
            cryptos={cryptos}
            selectCrypto={selectedCrypto => setSelectedCrypto(selectedCrypto)}
            updateCrypto={addUpdatedCryptoToState}
          />
          {selectedCrypto && (
            <CryptoChart
              selectedCrypto={
                cryptos[
                  cryptos.findIndex(it => it.name === selectedCrypto.name)
                ]
              }
            />
          )}
        </Container>
      </Container>
    </Container>
  )
}

export default Main
