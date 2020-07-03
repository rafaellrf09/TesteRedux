import api from '../../../services/api';
import { call, select, put , all, takeLatest} from 'redux-saga/effects';

import { addToCartSuccess, updateUmount } from './actions';
import { formatPrice } from '../../../util/format';
import { toast } from 'react-toastify'; 

function* addToCart({ id }) {
  const productExists = yield select( state => state.cart.find(p => p.id === id));

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque.');
    return;
  }

  if(productExists){
    yield put(updateUmount(id, amount))
  } else {
    const response = yield call(api.get, `/products/${id}`);
  
    const data = {
      ...response.data,
      amount : 1,
      priceFormatted: formatPrice(response.data.price)
    }
  
    yield put(addToCartSuccess(data));
  }

}

export default all([
  takeLatest('@cart/ADD_TO_CART_REQUEST', addToCart),
]);