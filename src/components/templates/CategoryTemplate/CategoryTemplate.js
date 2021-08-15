import React from 'react'
import PropTypes from 'prop-types'

import SEO from 'components/elements/SEO/SEO'
import ProductList from 'components/modules/ProductList/ProductList'
import { useProductsContext, fetchProductListItems } from 'context/ProductsContext'
// import categories from 'constants/categories'

export default function CategoryPage({ pageContext: { sportKey, product_category } }) {
  // const { categoryIds } = categories[productCategory]
  const products = fetchProductListItems(useProductsContext(), sportKey, product_category)

  return (
    <>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <ProductList products={{ products }} />
    </>
  )
}

CategoryPage.propTypes = {
  pageContext: PropTypes.shape({
    sportKey: PropTypes.string.isRequired,
    product_category: PropTypes.string.isRequired,
  }).isRequired,
}
