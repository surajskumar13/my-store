import { Link } from 'react-router-dom'
import {
  FiTrash2, FiArrowLeft, FiShoppingBag,
  FiMinus, FiPlus, FiShoppingCart
} from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import styles from '../styles/Cart.module.css'

function Cart() {
  const {
    cartItems,
    addToCart,
    decreaseQty,
    removeFromCart,
    totalItems,
    totalPrice
  } = useCart()

  // Delivery is free over ₹999
  const delivery = totalPrice > 999 ? 0 : 99
  const grandTotal = totalPrice + delivery

  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
          <FiShoppingCart size={72} />
        </div>
        <p className={styles.emptyText}>Your cart is empty!</p>
        <p className={styles.emptySubtext}>
          Looks like you haven't added anything yet.
        </p>
        <Link to="/" className={styles.backLink}>
          <FiArrowLeft size={16} />
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>
        <FiShoppingBag size={26} />
        Your Cart
        <span style={{ fontSize: '16px', color: '#999', fontWeight: 500 }}>
          ({totalItems} items)
        </span>
      </h2>

      <div className={styles.layout}>

        {/* Left — cart items */}
        <div>
          {cartItems.map(item => (
            <div key={item.id} className={styles.item}>

              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
              />

              <div className={styles.itemBody}>
                <div className={styles.itemTop}>
                  <div>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemCategory}>{item.category}</p>
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    <FiTrash2 size={17} />
                  </button>
                </div>

                <div className={styles.itemBottom}>

                  {/* Quantity +/- controls */}
                  <div className={styles.qtyControl}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => decreaseQty(item.id)}
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className={styles.qtyNumber}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => addToCart(item)}
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  <div>
                    <p className={styles.itemPrice}>
                      ₹{item.price * item.quantity}
                    </p>
                    <p className={styles.itemUnitPrice}>
                      ₹{item.price} each
                    </p>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Right — order summary */}
        <div className={styles.summary}>
          <p className={styles.summaryTitle}>Order Summary</p>

          <div className={styles.summaryRow}>
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Delivery</span>
            <span style={{ color: delivery === 0 ? '#2e7d32' : '#1a1a2e' }}>
              {delivery === 0 ? 'FREE' : `₹${delivery}`}
            </span>
          </div>

          {delivery === 0 && (
            <div style={{
              background: '#e8f5e9', color: '#2e7d32',
              borderRadius: '8px', padding: '8px 12px',
              fontSize: '13px', marginBottom: '8px'
            }}>
              🎉 You qualify for free delivery!
            </div>
          )}

          {delivery > 0 && (
            <div style={{
              background: '#fff8e1', color: '#f57f17',
              borderRadius: '8px', padding: '8px 12px',
              fontSize: '13px', marginBottom: '8px'
            }}>
              Add ₹{999 - totalPrice} more for free delivery
            </div>
          )}

          <hr className={styles.summaryDivider} />

          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <Link to="/checkout" className={styles.checkoutButton}>
            <FiShoppingBag size={18} />
            Proceed to Checkout
          </Link>

          <Link to="/" className={styles.continueLink}>
            <FiArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Cart