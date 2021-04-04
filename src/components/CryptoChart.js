import React from 'react'

const CryptoChart = ({selectedCrypto: {name, history}}) => {

    React.useEffect(() => {
        console.log(history)
    }, [history])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>Name: {name}</div>
            <div>History: {JSON.stringify(history)}</div>
        </div>
    )
}

export default CryptoChart
