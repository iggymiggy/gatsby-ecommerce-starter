const getProducts = (skusList) => {
  return skusList.reduce(
    (accumulator, sku) => {
      if (!sku.product.active) {
        return accumulator
      }

      if (!accumulator.products[sku.product.id]) {
        accumulator.products[sku.product.id] = {
          ...sku.product,
          skuDefault: null,
          skuIds: {},
          skusByColor: {},
          skusBySize: {},
        }
      }

      // priceDefault
      const priceDefault =
        sku.price < accumulator.products[sku.product.id].priceDefault
          ? sku.price
          : accumulator.products[sku.product.id].priceDefault || sku.price

      // skuDefaultId
      let skuDefaultId = accumulator.products[sku.product.id].skuDefaultId || null
      if (
        sku.attributes.color === sku.product.metadata.defaultColor &&
        sku.attributes.size === sku.product.metadata.defaultSize
      ) {
        skuDefaultId = sku.id
      }

      // skuIds
      if (!accumulator.products[sku.product.id].skuIds[sku.attributes.color]) {
        accumulator.products[sku.product.id].skuIds[sku.attributes.color] = {}
      }

      const skuIds = {
        ...accumulator.products[sku.product.id].skuIds,
        [sku.attributes.color]: {
          ...accumulator.products[sku.product.id].skuIds[sku.attributes.color],
          [sku.attributes.size]: sku.id,
        },
      }

      // // skusByColor
      // if (!accumulator.products[sku.product.id].skusByColor[sku.attributes.color]) {
      //   accumulator.products[sku.product.id].skusByColor[sku.attributes.color] = []
      // }
      // const skusByColor = {
      //   ...(accumulator.products[sku.product.id].skusByColor ? accumulator.products[sku.product.id].skusByColor : {}),
      //   [sku.attributes.color]: [...accumulator.products[sku.product.id].skusByColor[sku.attributes.color], sku],
      // }

      // // skusBySize
      // if (!accumulator.products[sku.product.id].skusBySize[sku.attributes.size]) {
      //   accumulator.products[sku.product.id].skusBySize[sku.attributes.size] = []
      // }
      // const skusBySize = {
      //   ...(accumulator.products[sku.product.id].skusBySize ? accumulator.products[sku.product.id].skusBySize : {}),
      //   [sku.attributes.size]: [...accumulator.products[sku.product.id].skusBySize[sku.attributes.size], sku],
      // }

      // productsIdsByCategory
      if (!accumulator.productsIdsByCategory[sku.attributes.category]) {
        accumulator.productsIdsByCategory[sku.attributes.category] = []
      }
      const productsIdsByCategory = {
        ...accumulator.productsIdsByCategory,
        [sku.attributes.category]: [
          ...accumulator.productsIdsByCategory[sku.attributes.category],
          ...(accumulator.productsIdsByCategory[sku.attributes.category].indexOf(sku.product.id) === -1
            ? [sku.product.id]
            : []),
        ],
      }

      // productsIdsAll
      const productsIdsAll = [
        ...accumulator.productsIdsAll,
        ...(accumulator.productsIdsAll.indexOf(sku.product.id) === -1 ? [sku.product.id] : []),
      ]

      return {
        products: {
          ...accumulator.products,
          [sku.product.id]: {
            ...sku.product,
            priceDefault,
            skuDefaultId,
            skuIds,
            // skusByColor,
            // skusBySize,
          },
        },
        skus: {
          ...accumulator.skus,
          [sku.id]: sku,
        },
        productsIdsAll,
        productsIdsByCategory,
      }
    },
    { products: {}, skus: {}, productsIdsAll: [], productsIdsByCategory: {} },
  )
}

export default getProducts
