import styled from 'styled-components'
import { TEND_MAP } from '../../constants'
import { Paper } from '@material-ui/core'

export const StyledCard = styled(Paper)(({ tend }) => ({
  width: '45%',
  maxWidth: 250,
  height: 100,
  backgroundColor: tend,
  marginBottom: 10,
  cursor: 'pointer',
  padding: '0 15px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly'
}))

export const StyledCryptoTitle = styled.div({
  fontSize: 21,
  borderBottom: '2px solid black',
  marginBottom: 10,
  textTransform: 'uppercase',
  textAlign: 'center'
})

export const StyledCurrency = styled.div({
  fontSize: 15,
  textAlign: 'center'
})
