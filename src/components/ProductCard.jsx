import { FiShoppingCart } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from '../styles/ProductCard.module.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const navigate = useNavigate()

  return (
    <div className={styles.card}>

      {/* Clicking image or name → goes to detail page */}
      <img
        src={product.image}
        alt={product.name}
        className={styles.image}
        onClick={() => navigate(`/product/${product.id}`)}
      />

      <div className={styles.info}>
        <p className={styles.category}>{product.category}</p>

        <h3
          className={styles.name}
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </h3>

        <p className={styles.price}>₹{product.price}</p>

        <div className={styles.actions}>
          <button
            className={styles.addButton}
            onClick={() => addToCart(product)}
          >
            <FiShoppingCart size={16} />
            Add to Cart
          </button>
          <button className={styles.wishlistButton}>
            <AiOutlineHeart size={18} />
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProductCard