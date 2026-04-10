import { useState } from 'react'
import { FiPlus, FiTrash2, FiLogOut, FiImage } from 'react-icons/fi'
import { MdAdminPanelSettings, MdInventory } from 'react-icons/md'
import { BsBoxSeam } from 'react-icons/bs'
import styles from '../styles/Admin.module.css'

const ADMIN_PASSWORD = 'admin123'

const CATEGORIES = ['Electronics', 'Fashion', 'Kitchen', 'Sports', 'Books', 'Other']

const emptyForm = { name: '', price: '', category: 'Electronics', image: '' }

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')

  // ── Login ──
  function handleLogin(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('Wrong password! Hint: admin123')
    }
  }

  // ── Form change ──
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setFormError('')
  }

  // ── Add product ──
  function handleAdd(e) {
    e.preventDefault()

    if (!form.name.trim()) return setFormError('Product name is required')
    if (!form.price || form.price <= 0) return setFormError('Enter a valid price')
    if (!form.image.trim()) return setFormError('Image URL is required')

    setProducts(prev => [
      { ...form, id: Date.now(), price: Number(form.price) },
      ...prev
    ])
    setForm(emptyForm)
    setFormError('')
  }

  // ── Delete product ──
  function handleDelete(id) {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // ── Login screen ──
  if (!loggedIn) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginCard}>

          <div className={styles.loginIcon}>
            <MdAdminPanelSettings size={36} color="#1a1a2e" />
          </div>

          <h2 className={styles.loginTitle}>Admin Panel</h2>
          <p className={styles.loginSubtitle}>
            Enter your password to manage products
          </p>

          <form onSubmit={handleLogin}>
            <input
              className={styles.loginInput}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                setLoginError('')
              }}
            />

            {loginError && (
              <p style={{ color: '#e94560', fontSize: '13px', marginBottom: '12px' }}>
                {loginError}
              </p>
            )}

            <button type="submit" className={styles.loginButton}>
              <MdAdminPanelSettings size={18} />
              Login
            </button>
          </form>

          <p className={styles.loginHint}>Password: admin123</p>
        </div>
      </div>
    )
  }

  // ── Admin dashboard ──
  return (
    <div className={styles.container}>

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          <MdAdminPanelSettings size={28} color="#e94560" />
          Admin Panel
        </h2>
        <button
          className={styles.logoutButton}
          onClick={() => {
            setLoggedIn(false)
            setPassword('')
          }}
        >
          <FiLogOut size={15} />
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#e8f0ff' }}>
            <BsBoxSeam size={22} color="#1a1a2e" />
          </div>
          <div>
            <div className={styles.statNumber}>{products.length}</div>
            <div className={styles.statLabel}>Total Products</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#ffe8ec' }}>
            <MdInventory size={22} color="#e94560" />
          </div>
          <div>
            <div className={styles.statNumber}>{CATEGORIES.length}</div>
            <div className={styles.statLabel}>Categories</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#e8f5e9' }}>
            <FiPlus size={22} color="#2e7d32" />
          </div>
          <div>
            <div className={styles.statNumber}>
              {products.length > 0
                ? '₹' + Math.min(...products.map(p => p.price))
                : '—'}
            </div>
            <div className={styles.statLabel}>Lowest Price</div>
          </div>
        </div>
      </div>

      {/* Add product form */}
      <div className={styles.formCard}>
        <p className={styles.formTitle}>
          <FiPlus size={16} />
          Add New Product
        </p>

        <form onSubmit={handleAdd}>

          {/* Image preview */}
          <div className={styles.previewWrapper}>
            {form.image ? (
              <img
                src={form.image}
                alt="Preview"
                className={styles.previewImage}
                onError={e => e.target.style.display = 'none'}
              />
            ) : (
              <div className={styles.previewPlaceholder}>
                <FiImage size={28} />
                <span>Image preview will appear here</span>
              </div>
            )}
          </div>

          <input
            className={styles.inputFull}
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Paste image URL here (from Unsplash, etc.)"
          />

          <div className={styles.formGrid}>
            <input
              className={styles.input}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product name"
            />
            <input
              className={styles.input}
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price (₹)"
              type="number"
              min="1"
              onKeyPress={e => { if (isNaN(e.key)) e.preventDefault() }}
            />
          </div>

          <select
            className={styles.select}
            name="category"
            value={form.category}
            onChange={handleChange}
            style={{ marginBottom: '14px' }}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {formError && (
            <p style={{
              color: '#e94560', fontSize: '13px',
              marginBottom: '12px', fontWeight: '600'
            }}>
              ⚠️ {formError}
            </p>
          )}

          <button type="submit" className={styles.addButton}>
            <FiPlus size={18} />
            Add Product
          </button>

        </form>
      </div>

      {/* Products list */}
      <div className={styles.sectionHeader}>
        <p className={styles.sectionTitle}>Your Products</p>
        <span className={styles.productCount}>
          {products.length} products
        </span>
      </div>

      <div className={styles.productGrid}>
        {products.length === 0 ? (
          <p className={styles.emptyProducts}>
            No products added yet. Use the form above!
          </p>
        ) : (
          products.map(p => (
            <div key={p.id} className={styles.productCard}>
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className={styles.productImage}
                  onError={e => e.target.style.display = 'none'}
                />
              ) : (
                <div className={styles.productImagePlaceholder}>
                  <FiImage size={28} />
                </div>
              )}
              <div className={styles.productInfo}>
                <p className={styles.productName}>{p.name}</p>
                <p className={styles.productPrice}>₹{p.price}</p>
                <p className={styles.productCategory}>{p.category}</p>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(p.id)}
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Admin