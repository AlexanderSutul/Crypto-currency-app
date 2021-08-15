import styled from 'styled-components'
import { TEND_MAP } from '../../constants'
import { Paper } from '@material-ui/core'

const getTendColor = tend => {
  switch (tend) {
    case TEND_MAP.INC:
      return '#00e676'
    case TEND_MAP.DEC:
      return '#ff1744'
    default:
      return '#ffcd38'
  }
}

export const StyledCard = styled(Paper)(({ tend }) => ({
  width: '45%',
  height: '100px',
  backgroundColor: getTendColor(tend),
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
