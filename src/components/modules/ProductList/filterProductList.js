const filterProductList = ({ productsIdsAll, productsIdsByCategory, filters }) => {
  if (Object.keys(filters).length === 0) {
    return productsIdsAll
  }

  let productsListFiltered

  if (filters.categoryIds) {
    productsListFiltered = filters.categoryIds.reduce(
      (accumulator, categoryId) =>
        productsIdsByCategory[categoryId] ? [...accumulator, ...productsIdsByCategory[categoryId]] : accumulator,
      [],
    )
  }

  return productsListFiltered
}

export default filterProductList
