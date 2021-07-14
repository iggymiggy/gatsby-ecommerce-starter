import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'

export default function Image({ fluid, alt }) {
  return <GatsbyImage image={fluid} alt={alt} />
}

Image.propTypes = {
  fluid: PropTypes.shape({}).isRequired,
  alt: PropTypes.string.isRequired,
}
