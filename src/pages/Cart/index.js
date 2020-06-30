import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';

import { removeFromCart } from '../../store/modules/cart/actions'

import { Container, ProductTable, Total } from './styles';

function Cart() {
  const dispach = useDispatch();

  const cart = useSelector(state => state.cart);

  async function handleDeleteProduct(id) {
    dispach(removeFromCart(id))
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
                <button type="button">
                  <MdRemoveCircleOutline size={20}  color="#7159c1" />
                </button>
                <input type="number" readOnly value={product.amount}/>
                <button type="button">
                  <MdAddCircleOutline size={20}  color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>21348</strong>
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
          <strong>192,02</strong>
        </Total>
      </footer>
    </Container>
  );
}

export default Cart;