import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiUser, FiMapPin, FiAlertCircle,
  FiCheckCircle, FiShoppingBag
} from 'react-icons/fi'
import { MdPayment } from 'react-icons/md'
import { useCart } from '../context/CartContext'
import styles from '../styles/Checkout.module.css'

// ── Field component — outside to prevent focus loss ──
function Field({ label, name, type = 'text', placeholder, value, onChange, error }) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>{label}</label>
      <input
        className={error ? styles.inputError : styles.input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={
          (name === 'phone' || name === 'pincode')
            ? (e) => { if (isNaN(e.key)) e.preventDefault() }
            : undefined
        }
      />
      {error && (
        <p className={styles.errorText}>
          <FiAlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
function Checkout() {
  const { cartItems, totalPrice, totalItems } = useCart()

  const delivery = totalPrice > 999 ? 0 : 99
  const grandTotal = totalPrice + delivery

  const [placed, setPlaced] = useState(false)
  const [orderId] = useState(
    '#ORD' + Math.floor(100000 + Math.random() * 900000)
  )

  // Form values
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  })

  // Error messages
  const [errors, setErrors] = useState({})

  // Update field + clear its error instantly
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Simple validation — no regex
  function validate() {
    const e = {}

    if (!form.name.trim())
      e.name = 'Full name is required'
    else if (form.name.trim().length < 3)
      e.name = 'Name must be at least 3 characters'

    if (!form.email.trim())
      e.email = 'Email is required'
    else if (!form.email.includes('@') || !form.email.includes('.'))
      e.email = 'Enter a valid email address'

    if (!form.phone.trim())
      e.phone = 'Phone number is required'
    else if (form.phone.trim().length !== 10)
      e.phone = 'Phone must be exactly 10 digits'

    if (!form.address.trim())
      e.address = 'Address is required'
    else if (form.address.trim().length < 5)
      e.address = 'Enter your full address'

    if (!form.city.trim())
      e.city = 'City is required'

    if (!form.pincode.trim())
      e.pincode = 'Pincode is required'
    else if (form.pincode.trim().length !== 6)
      e.pincode = 'Pincode must be exactly 6 digits'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (validate()) {
      setPlaced(true)
    }
  }

  // ── Empty cart ──
  if (cartItems.length === 0 && !placed) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 32px' }}>
        <FiShoppingBag size={60} color="#ddd" />
        <p style={{ fontSize: '20px', color: '#999', margin: '16px 0 8px' }}>
          Your cart is empty!
        </p>
        <p style={{ color: '#bbb', marginBottom: '24px' }}>
          Add some products before checking out.
        </p>
        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 28px', background: '#1a1a2e', color: 'white',
          borderRadius: '30px', fontWeight: '600', fontSize: '15px'
        }}>
          Go Shopping
        </Link>
      </div>
    )
  }

  // ── Success Screen ──
  if (placed) {
    return (
      <div className={styles.success}>
        <div className={styles.successCard}>
          <div className={styles.successIconWrapper}>
            <FiCheckCircle size={40} color="#2e7d32" />
          </div>
          <h2 className={styles.successTitle}>Order Placed! 🎉</h2>
          <p className={styles.successSubtext}>Thank you,</p>
          <p className={styles.successName}>{form.name}</p>
          <p className={styles.successSubtext} style={{ marginBottom: '4px' }}>
            Confirmation sent to
          </p>
          <p className={styles.successName}>{form.email}</p>
          <div className={styles.orderId}>
            Order ID: <span>{orderId}</span>
          </div>
          <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>
            Delivery to: {form.address}, {form.city} — {form.pincode}
          </p>
          <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '28px' }}>
            Estimated delivery: 3–5 business days
          </p>
          <Link to="/" className={styles.homeButton}>
            <FiShoppingBag size={16} />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  // ── Checkout Form ──
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <MdPayment size={26} />
        Checkout
      </h2>

      <div className={styles.layout}>

        {/* Left — Form */}
        <form onSubmit={handleSubmit} noValidate>

          {/* Personal Info */}
          <div className={styles.formCard}>
            <p className={styles.sectionTitle}>
              <FiUser size={16} />
              Personal Information
            </p>

            <Field
              label="Full Name"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />

            <div className={styles.row}>
              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className={styles.formCard} style={{ marginTop: '16px' }}>
            <p className={styles.sectionTitle}>
              <FiMapPin size={16} />
              Delivery Address
            </p>

            <Field
              label="Street Address"
              name="address"
              placeholder="House no., Street, Area"
              value={form.address}
              onChange={handleChange}
              error={errors.address}
            />

            <div className={styles.row}>
              <Field
                label="City"
                name="city"
                placeholder="Mumbai"
                value={form.city}
                onChange={handleChange}
                error={errors.city}
              />
              <Field
                label="Pincode"
                name="pincode"
                placeholder="400001"
                value={form.pincode}
                onChange={handleChange}
                error={errors.pincode}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            <FiCheckCircle size={18} />
            Place Order — ₹{grandTotal}
          </button>

        </form>

        {/* Right — Order Summary */}
        <div className={styles.summary}>
          <p className={styles.summaryTitle}>
            Order Summary ({totalItems} items)
          </p>

          {cartItems.map(item => (
            <div key={item.id} className={styles.summaryItem}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.summaryItemImg}
              />
              <div style={{ flex: 1 }}>
                <p className={styles.summaryItemName}>{item.name}</p>
                <p className={styles.summaryItemQty}>Qty: {item.quantity}</p>
              </div>
              <span className={styles.summaryItemPrice}>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr className={styles.summaryDivider} />

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Delivery</span>
            <span style={{ color: delivery === 0 ? '#2e7d32' : '#1a1a2e' }}>
              {delivery === 0 ? 'FREE' : `₹${delivery}`}
            </span>
          </div>

          {delivery === 0 && (
            <p style={{
              fontSize: '12px', color: '#2e7d32', background: '#e8f5e9',
              borderRadius: '6px', padding: '6px 10px', marginBottom: '8px'
            }}>
              🎉 You get free delivery!
            </p>
          )}

          <hr className={styles.summaryDivider} />

          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout