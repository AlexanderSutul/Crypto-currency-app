import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const SearchField = ({ onSubmit, text, onChangeText, isLoading }) => {
  const classes = useStyles()
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <TextField
        variant={'outlined'}
        id="standard-basic"
        label="Start typing here"
        value={text}
        onChange={e => onChangeText(e.target.value)}
      />
      <br />
      <Button color="primary" type={'submit'} disabled={isLoading}>
        Find Crypto
      </Button>
    </form>
  )
}

SearchField.propTypes = {
  onSubmit: PropTypes.func,
  onChangeText: PropTypes.func,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
}

export default SearchField
