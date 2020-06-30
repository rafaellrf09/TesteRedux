import produce from 'immer';

const INITIAL_STATE = [];

export default function cart(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
        case '@cart/ADD_TO_CART' : {
          const productIndex = draft.findIndex(p => p.id === action.product.id);
          if(productIndex >= 0) {
            draft[productIndex].amount += 1;
          } else {
            draft.push({...action.product, amount: 1 });
          }
          break;
        }
        case '@cart/REMOVE_FROM_CART' : {
          const productIndex = draft.findIndex(p => p.id === action.id);
          if (productIndex >= 0) {
            console.tron.log({id: productIndex});
            draft.splice(productIndex, 1);
          }
          break;
        }
        default:
    } 
  })
}