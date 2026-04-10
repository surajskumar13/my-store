import { FiArrowRight } from 'react-icons/fi'
import styles from '../styles/Hero.module.css'

function Hero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>
        Shop the <span>Best</span> Products
      </h1>
      <p className={styles.subtitle}>
        Discover amazing deals on Electronics, Fashion, Kitchen & more
      </p>
      <button className={styles.shopButton}>
        Shop Now <FiArrowRight size={18} />
      </button>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statNumber}>500+</div>
          <div className={styles.statLabel}>Products</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>10k+</div>
          <div className={styles.statLabel}>Customers</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNumber}>4.9★</div>
          <div className={styles.statLabel}>Rating</div>
        </div>
      </div>
    </div>
  )
}

export default Hero