import React from 'react'
import Chart from '../Chart/Chart'

const CryptoChart = ({ selectedCrypto: { name, history } }) => {
  console.log(history)
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>Name: {name}</div>
      <div>
        <div>Chart:</div>
        <Chart history={history} />
      </div>
    </div>
  )
}

export default CryptoChart
