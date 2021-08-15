import React from 'react'
import PropTypes from 'prop-types'

// import Image from 'components/foundations/Image/Image'
import { GatsbyImage } from 'gatsby-plugin-image'

import { Background } from './ImageLocal.styles'

export default function ImageLocal({ productListImage, alt }) {
  console.log('productListImage:')
  console.log(productListImage)
  console.log(alt)
  // if (
  //   !localFiles ||
  //   !localFiles[0] ||
  //   !localFiles[0].product_image ||
  //   !localFiles[0].product_image.childImageSharp ||
  //   !localFiles[0].product_image.childImageSharp.gatsbyImageData
  // ) {
  //   // eslint-disable-next-line no-console
  //   console.error(`Undefined "localFiles" ${JSON.stringify(localFiles)}`)
  //   return null
  // }

  return (
    <Background>
      {/* <Image fluid={localFiles[0].product_image.childImageSharp.gatsbyImageData} alt={alt} /> */}
      <GatsbyImage image={productListImage} alt={alt} />
    </Background>
  )
}

ImageLocal.propTypes = {
  productListImage: PropTypes.element.isRequired,
  // localFiles: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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

// PropTypes.shape({
//       product_image: PropTypes.shape({
//         childImageSharp: PropTypes.shape({
//           gatsbyImageData: PropTypes.shape({}).isRequired,
//         }).isRequired,
//       }).isRequired,
// }),

//  localFile: PropTypes.shape({
//             childImageSharp: PropTypes.shape({
//               gatsbyImageData: PropTypes.element.isRequired,
//             }),
//           }),
