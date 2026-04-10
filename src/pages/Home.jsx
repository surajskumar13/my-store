import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import products from '../data/products'
import styles from '../styles/Home.module.css'

const categories = ['All', 'Electronics', 'Fashion', 'Kitchen']

function Home() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesCategory =
      activeCategory === 'All' || product.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <Hero />

      <main className={styles.home}>

        <div className={styles.header}>
          <h2 className={styles.title}>Our Products</h2>
          <div className={styles.searchWrapper}>
            <FiSearch size={16} color="#999" />
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category filter buttons */}
        <div className={styles.filters}>
          {categories.map(cat => (
            <button
              key={cat}
              className={
                activeCategory === cat
                  ? styles.filterBtnActive
                  : styles.filterBtn
              }
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.length > 0 ? (
            filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className={styles.empty}>No products found.</p>
          )}
        </div>

      </main>
    </div>
  )
}

export default Home