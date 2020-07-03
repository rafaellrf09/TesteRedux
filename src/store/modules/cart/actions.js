export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_TO_CART_REQUEST',
    id,
  }
}
export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_TO_CART_SUCCESS',
    product,
  }
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE_FROM_CART',
    id,
  }
}

export function updateUmount(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT',
    id,
    amount,
  }
}