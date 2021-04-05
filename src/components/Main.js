import React from 'react'
import {Container, Grid, TextField, Button, Divider} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import CryptoCardList from './CryptoCardList'
import CryptoChart from './CryptoChart'
import CryptoApi from "../services/http";
import {TEND_MAP} from "../constants";
import LocalStorageManager from "../services/localStorage";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: '0 0 50%'
    }
}))

const Main = () => {
    const classes = useStyles()
    const [selectedCrypto, setSelectedCrypto] = React.useState(null)
    const [cryptos, setCryptos] = React.useState([])
    const [inputText, setInputText] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        setCryptos(LocalStorageManager.get('history'))
    }, [])

    const getNewCrypto = async cryptoName => {
        setIsLoading(true)
        if (
            !cryptoName ||
            !cryptoName.length ||
            cryptos?.find(crypto => crypto.name.toUpperCase() === cryptoName.toUpperCase())
        ) return setIsLoading(false)

        const crypto = await CryptoApi.getRateByCryptoName(cryptoName)

        if (crypto.Response === 'Error') return setIsLoading(false)

        const newCrypto = {
            name: cryptoName,
            price: crypto.EUR,
            history: [],
            tend: TEND_MAP.DEFAULT,
            diff: 0
        }

        setCryptos(prevState => [...prevState || [], newCrypto])
        LocalStorageManager.set('history', cryptos)
        setIsLoading(false)
        setInputText('')
    }

    const addUpdatedCryptoToState = (updatedCrypto) => {
        console.log('cryptos', cryptos)
        const cryptoToUpdateIdx = cryptos.findIndex(it => it.name === updatedCrypto.name)
        console.log('cryptoToUpdateIdx', cryptoToUpdateIdx)
        cryptos[cryptoToUpdateIdx] = updatedCrypto
        const updatedCryptos = [...cryptos]
        LocalStorageManager.set('history', updatedCryptos)
        setCryptos(updatedCryptos)
    }

    const handleSubmit = e => {
        e.preventDefault()
        getNewCrypto(inputText)
    }

    return (
        <Container>
            <h1>
                Crypto-app
            </h1>
            <Grid>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField variant={'outlined'} id="standard-basic" label="Start typing here" value={inputText}
                               onChange={(e) => setInputText(e.target.value)}/>
                    <br/>
                    <Button color="primary" type={'submit'} disabled={isLoading}>Find Crypto</Button>
                </form>
            </Grid>
            <Container className={classes.contentContainer}>
                <CryptoCardList
                    cryptos={cryptos}
                    selectCrypto={(selectedCrypto) => setSelectedCrypto(selectedCrypto)}
                    updateCrypto={addUpdatedCryptoToState}
                />
                {selectedCrypto
                && <CryptoChart selectedCrypto={cryptos[cryptos.findIndex(it => it.name === selectedCrypto.name)]}/>}
            </Container>
        </Container>
    )
}

export default Main
