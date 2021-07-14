const getCartSkuQuantity = (cartSkuList) => cartSkuList.reduce((accumulator, item) => accumulator + item.quantity, 0)

export default getCartSkuQuantity
