import produce from 'immer';

const INITIAL_STATE = [];

export default function cart(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
        case '@cart/ADD_TO_CART' : {
          const productIndex = draft.findIndex(p => p.id === action.product.id);
          if(productIndex >= 0) draft[productIndex].amount += 1; 
          else draft.push({...action.product, amount: 1 });

          break;
        }
        
        case '@cart/REMOVE_FROM_CART' : {
          const productIndex = draft.findIndex(p => p.id === action.id);
          if (productIndex >= 0) draft.splice(productIndex, 1);

          break;
        }

        case '@cart/UPDATE_AMOUNT' : {
          if(action.amount <= 0) return state;

          const productIndex = draft.findIndex(p => p.id === action.id);
          if (productIndex >= 0) draft[productIndex].amount = Number(action.amount);
          
          break;
        }

        default:
    } 
  })
}