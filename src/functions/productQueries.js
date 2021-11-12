module.exports = {
  fetchProductListItems: function (allProducts, sportKey, product_category) {
    const items = []

    console.log('CATEGORIES:  ')
    console.log(sportKey)
    console.log(product_category)
    allProducts.forEach((element) => {
      if (
        element.node.frontmatter.sportKey === sportKey &&
        element.node.frontmatter.product_category === product_category
      ) {
        let updatedElement = {
          ...element,
          productListImage: getImage(element.node.frontmatter.product_images[0].product_image),
        }
        console.log('PUSH updatedElement: ')
        console.log(updatedElement)
        items.push(updatedElement)
      }
    })
    console.log(items)
    return items
  },
}
