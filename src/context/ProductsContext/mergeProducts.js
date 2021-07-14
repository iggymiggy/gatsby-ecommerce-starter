const mergeProducts = ({ dataGatsby, dataStripe }) => {
  if (!dataStripe) {
    return {
      products: dataGatsby.products,
      productsIdsAll: dataGatsby.productsIdsAll,
      productsIdsByCategory: dataGatsby.productsIdsByCategory,
      skus: Object.keys(dataGatsby.skus).reduce(
        (accumulator, skuId) => ({
          ...accumulator,
          [skuId]: {
            ...dataGatsby.skus[skuId],
            product: undefined,
            productId: dataGatsby.skus[skuId].product.id,
          },
        }),
        {},
      ),
    }
  }

  const products = Object.values(dataGatsby.products).reduce(
    (accumulator, product) => ({
      ...accumulator,
      [product.id]: { ...product, ...dataStripe.products[product.id] },
    }),
    {},
  )

  const skus = Object.values(dataGatsby.skus).reduce(
    (accumulator, sku) => ({
      ...accumulator,
      [sku.id]: { ...sku, ...dataStripe.skus[sku.id], product: undefined, productId: sku.product.id },
    }),
    {},
  )

  return {
    products,
    productsIdsAll: dataStripe.productsIdsAll,
    productsIdsByCategory: dataStripe.productsIdsByCategory,
    skus,
  }
}

export default mergeProducts
