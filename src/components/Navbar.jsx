import { Link } from 'react-router-dom'
import { FiHome, FiShoppingCart } from 'react-icons/fi'
import { MdStorefront } from 'react-icons/md'
import { useCart } from '../context/CartContext'
import styles from '../styles/Navbar.module.css'

function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <MdStorefront size={26} color="#e94560" />
        MyStore
      </div>

      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          <FiHome size={18} />
          Home
        </Link>

        <Link to="/cart" className={styles.cartWrapper}>
          <FiShoppingCart size={24} />
          {totalItems > 0 && (
            <span className={styles.badge}>{totalItems}</span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar