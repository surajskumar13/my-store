import { FiShoppingCart } from 'react-icons/fi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import styles from '../styles/ProductCard.module.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()
  const navigate = useNavigate()

  const wishlisted = isWishlisted(product.id)

  function handleWishlist() {
    if (wishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className={styles.card}>
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

          <button
            className={styles.wishlistButton}
            onClick={handleWishlist}
            style={{
              borderColor: wishlisted ? '#e94560' : '#eee',
              color: wishlisted ? '#e94560' : '#ccc'
            }}
          >
            {wishlisted
              ? <AiFillHeart size={18} />
              : <AiOutlineHeart size={18} />
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard