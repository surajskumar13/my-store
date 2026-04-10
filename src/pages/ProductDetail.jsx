import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiShoppingCart, FiCheckCircle } from 'react-icons/fi'
import { AiOutlineHeart } from 'react-icons/ai'
import { useCart } from '../context/CartContext'
import products from '../data/products'
import styles from '../styles/ProductDetail.module.css'

// Extra info per product (description + features)
const productInfo = {
  1: {
    description: 'Premium wireless headphones with industry-leading noise cancellation and up to 30 hours of battery life. Perfect for music lovers and professionals alike.',
    features: ['30-hour battery life', 'Active noise cancellation', 'Bluetooth 5.0', 'Foldable design', 'Built-in microphone']
  },
  2: {
    description: 'Lightweight and breathable running shoes designed for maximum comfort and performance. Engineered for both casual wear and intense training sessions.',
    features: ['Breathable mesh upper', 'Cushioned sole', 'Anti-slip grip', 'Lightweight design', 'Available in multiple sizes']
  },
  3: {
    description: 'Elegant ceramic coffee mug perfect for your morning brew. Microwave and dishwasher safe with a comfortable ergonomic handle.',
    features: ['350ml capacity', 'Microwave safe', 'Dishwasher safe', 'Ceramic material', 'Ergonomic handle']
  },
  4: {
    description: 'Durable and spacious backpack with multiple compartments. Ideal for daily commute, travel, or college with a padded laptop sleeve.',
    features: ['30L capacity', 'Padded laptop sleeve (15")', 'Water-resistant material', 'Multiple compartments', 'Ergonomic straps']
  },
  5: {
    description: 'Feature-packed smart watch with health monitoring, GPS, and a stunning always-on display. Stay connected and track your fitness goals.',
    features: ['Heart rate monitor', 'Built-in GPS', 'Sleep tracking', 'Water resistant (50m)', '7-day battery life']
  },
  6: {
    description: 'Stylish UV-protection sunglasses with polarized lenses. Lightweight frame for all-day comfort, perfect for outdoor activities.',
    features: ['UV400 protection', 'Polarized lenses', 'Lightweight frame', 'Scratch-resistant coating', 'Unisex design']
  }
}

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  // Find the product by id from URL
  const product = products.find(p => p.id === parseInt(id))
  const info = productInfo[parseInt(id)]

  // If product not found
  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Product not found.</p>
        <button
          className={styles.backButton}
          onClick={() => navigate('/')}
          style={{ margin: '20px auto' }}
        >
          <FiArrowLeft size={18} /> Go back home
        </button>
      </div>
    )
  }

  function handleAddToCart() {
    addToCart(product)
    setAdded(true)
    // Reset the "Added!" message after 2 seconds
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={styles.container}>

      {/* Back button */}
      <button
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft size={18} />
        Back to products
      </button>

      <div className={styles.card}>

        {/* Left — image */}
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </div>

        {/* Right — details */}
        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.name}>{product.name}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>₹{product.price}</span>
            <span className={styles.badge}>In Stock</span>
          </div>

          <hr className={styles.divider} />

          <p className={styles.descTitle}>Description</p>
          <p className={styles.desc}>{info?.description}</p>

          <p className={styles.featuresTitle}>Key Features</p>
          <ul className={styles.features}>
            {info?.features.map((f, i) => (
              <li key={i} className={styles.featureItem}>
                <span className={styles.featureDot} />
                {f}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button
              className={styles.addButton}
              onClick={handleAddToCart}
            >
              <FiShoppingCart size={18} />
              Add to Cart
            </button>
            <button className={styles.wishButton}>
              <AiOutlineHeart size={20} />
            </button>
          </div>

          {/* Success message after adding */}
          {added && (
            <div className={styles.addedMessage}>
              <FiCheckCircle size={18} />
              Added to cart!
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ProductDetail