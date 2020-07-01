import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import { addToCart } from '../../store/modules/cart/actions';

import { ProductList } from './styles';

function Home() {
  const dispach = useDispatch();
  const amount = useSelector(state => state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      
      return amount;
    }, {}),
  );

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [])

  async function loadProducts() {
    const response = await api.get('/products');
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }))

    setProducts(data);
  }

  async function handleAddProduct(product) {
    dispach(addToCart(product));
  }

  return(
    <ProductList>
      {
        products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button" onClick={() => handleAddProduct(product)}>
              <div>
                <MdAddShoppingCart size={36} color="#fff" /> {amount[product.id] || 0}
              </div>
              <span>Adicionar ao carrinho</span>
            </button>
          </li>
        ))
      }
    </ProductList>
  );
}

export default Home;