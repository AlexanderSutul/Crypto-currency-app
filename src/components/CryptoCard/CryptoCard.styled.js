import styled from 'styled-components'
import { TEND_MAP } from '../../constants'
import { Paper } from '@material-ui/core'

export const StyledCard = styled(Paper)(({ tend }) => ({
  width: '45%',
  height: '100px',
  backgroundColor:
    tend && tend === TEND_MAP.DEFAULT
      ? '#ffcd38'
      : tend === TEND_MAP.INC
      ? '#00e676'
      : '#ff1744',
  marginBottom: '10px',
  cursor: 'pointer',
  padding: '0 15px',
  position: 'relative',
}))

export const StyledCryptoTitle = styled.div({
  fontSize: 21,
  borderBottom: '2px solid black',
  marginBottom: 10,
  textTransform: 'uppercase',
})

export const StyledCurrency = styled.div({
  fontSize: 15,
})
