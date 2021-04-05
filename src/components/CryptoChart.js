import React from 'react'
import Chart from "./Chart";

const CryptoChart = ({selectedCrypto: {name, history}}) => {
    React.useEffect(() => {
        console.log(history)
    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>Name: {name}</div>
            <div>
                <div>Chart:</div>
                <Chart history={history} />
            </div>
        </div>
    )
}

export default CryptoChart
