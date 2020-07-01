import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';

import { removeFromCart, updateUmount } from '../../store/modules/cart/actions'

import { Container, ProductTable, Total } from './styles';

import { formatPrice } from '../../util/format';

function Cart() {
  const dispach = useDispatch();

  const cart = useSelector(state => state.cart.map(product =>({
    ...product,
    subtotal: formatPrice(product.price * product.amount)
  })));
  const total = useSelector(state => state.cart.reduce((total, product) => {
    return total + product.price * product.amount;
  }, 0));

  async function handleDeleteProduct(id) {
    dispach(removeFromCart(id))
  }

  async function handleUpdateAmount(product, type) {
    let newAmount;
    if (type === "more") newAmount = product.amount + 1;
    else newAmount = product.amount - 1;

    dispach(updateUmount(product.id, newAmount));
  }

  return(
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th></th>
            <th>Produto</th>
            <th>qtd</th>
            <th>subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map(product => (
          <tr key={product.id}>
            <td>
              <img src={product.image} alt={product.title}/>
            </td>
            <td>
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>
            </td>
            <td>
              <div>
                <button type="button" onClick={() => handleUpdateAmount(product, 'less')}>
                  <MdRemoveCircleOutline size={20}  color="#7159c1" />
                </button>
                <input type="number" readOnly value={product.amount}/>
                <button type="button" onClick={() => handleUpdateAmount(product, 'more')}>
                  <MdAddCircleOutline size={20}  color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>{product.subtotal}</strong>
            </td>
            <td>
              <button type="button" onClick={() => handleDeleteProduct(product.id)}>
                <MdDelete size={20} color="#7159c1" />
              </button>
            </td>
          </tr>
            ))
          }
        </tbody>

      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{formatPrice(total)}</strong>
        </Total>
      </footer>
    </Container>
  );
}

export default Cart;