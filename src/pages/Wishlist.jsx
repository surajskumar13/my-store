import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import styles from '../styles/Wishlist.module.css'

function Wishlist() {
  const { wishlistItems, removeFromWishlist, totalWishlist } = useWishlist()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  if (wishlistItems.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <AiOutlineHeart size={72} />
        </div>
        <p className={styles.emptyText}>Your wishlist is empty!</p>
        <p className={styles.emptySubtext}>
          Click the heart on any product to save it here.
        </p>
        <Link to="/" className={styles.backLink}>
          <FiArrowLeft size={16} />
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <AiFillHeart size={26} color="#e94560" />
        My Wishlist
        <span style={{ fontSize: '16px', color: '#999', fontWeight: 500 }}>
          ({totalWishlist} items)
        </span>
      </h2>

      <div className={styles.grid}>
        {wishlistItems.map(item => (
          <div key={item.id} className={styles.card}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.image}
              onClick={() => navigate(`/product/${item.id}`)}
            />
            <div className={styles.info}>
              <p className={styles.category}>{item.category}</p>
              <h3
                className={styles.name}
                onClick={() => navigate(`/product/${item.id}`)}
              >
                {item.name}
              </h3>
              <p className={styles.price}>₹{item.price}</p>

              <div className={styles.actions}>
                <button
                  className={styles.addButton}
                  onClick={() => {
                    addToCart(item)
                    removeFromWishlist(item.id)
                  }}
                >
                  <FiShoppingCart size={14} />
                  Move to Cart
                </button>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <AiFillHeart size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist