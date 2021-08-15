import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

export default function ProductName({ productName }) {
  console.log('PRODUCT NAME:')
  console.log(productName)

  return (
    <Typography variant="caption" component="h3">
      {productName}
    </Typography>
  )
}

ProductName.propTypes = {
  productName: PropTypes.string.isRequired,
}
