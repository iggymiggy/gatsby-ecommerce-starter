import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'

export default function ProductName({ productSelected }) {
  return (
    <Typography component="h1" variant="h4" color="secondary">
      {/* {productSelected.name} */}
      {productSelected.product_brand}
    </Typography>
  )
}

ProductName.propTypes = {
  productSelected: PropTypes.shape({
    // name: PropTypes.string.isRequired,
    product_brand: PropTypes.string.isRequired,
  }).isRequired,
}
