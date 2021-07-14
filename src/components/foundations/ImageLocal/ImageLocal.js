import React from 'react'
import PropTypes from 'prop-types'

import Image from 'components/foundations/Image/Image'

import { Background } from './ImageLocal.styles'

export default function ImageLocal({ localFiles, alt }) {
  console.log('localfiles')
  console.log(localFiles)
  if (
    !localFiles ||
    !localFiles[0] ||
    !localFiles[0].product_image ||
    !localFiles[0].product_image.childImageSharp ||
    !localFiles[0].product_image.childImageSharp.gatsbyImageData
  ) {
    // eslint-disable-next-line no-console
    console.error(`Undefined "localFiles" ${JSON.stringify(localFiles)}`)
    return null
  }

  return (
    <Background>
      <Image fluid={localFiles[0].product_image.childImageSharp.gatsbyImageData} alt={alt} />
    </Background>
  )
}

ImageLocal.propTypes = {
  localFiles: PropTypes.arrayOf(
    PropTypes.shape({
      product_image: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape({}).isRequired,
        }).isRequired,
      }).isRequired,
    }),
  ).isRequired,
  alt: PropTypes.string.isRequired,
}
// ImageLocal.propTypes = {
//   localFiles: PropTypes.arrayOf(
//     PropTypes.shape({
//       childImageSharp: PropTypes.shape({
//         fluid: PropTypes.shape({}).isRequired,
//       }).isRequired,
//     }),
//   ).isRequired,
//   alt: PropTypes.string.isRequired,
// }
