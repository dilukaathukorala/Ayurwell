import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/spinner';
import ProductSingleCard from '../../components/home/ProductSingleCard';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const ProductsCardPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/products')
      .then((response) => {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(e.target.value.toLowerCase()) ||
      product.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <div>
      <Header />
      <div style={styles.pageContainer}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div style={styles.buttonContainer}>
              {[
                { name: 'Oil', image: '/src/assets/oil.jpg' },
                { name: 'Skincare', image: '/src/assets/skin.jpg' },
                { name: 'Haircare', image: '/src/assets/hair.jpg' },
                { name: 'Remedies', image: '/src/assets/re.jpg' }
              ].map((category) => (
                <div
                  key={category.name}
                  style={styles.categoryButton}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    style={styles.buttonImage}
                  />
                  <span style={styles.buttonText}>
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

            <div style={styles.searchButtonContainer}>
              <div style={styles.searchInputContainer}>
                <FaSearch style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search by product name or category"
                  value={searchQuery}
                  onChange={handleSearch}
                  style={styles.searchInput}
                />
              </div>
            </div>

            <div style={styles.productGrid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <ProductSingleCard key={item._id} product={item} />
                ))
              ) : (
                <p style={styles.noProducts}>No products available.</p>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

// Inline styles
const styles = {
  pageContainer: {
    backgroundColor: 'white',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
  },
  buttonContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Responsive grid layout
    gap: '1rem',
    width: '100%',
    maxWidth: '900px',
    marginBottom: '2rem',
  },
  categoryButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    width: '100%', // Ensures equal width
    maxWidth: '200px', // Limits size to prevent oversized cards
    height: '150px', // Sets a consistent height
    position: 'relative',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.7)',
  },
  buttonText: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    textAlign: 'center',
  },
  searchButtonContainer: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  searchInputContainer: {
    position: 'relative',
    width: '100%',
  },
  searchInput: {
    width: '100%',
    padding: '1rem 1rem 1rem 40px',
    borderRadius: '30px',
    backgroundColor: '#fff',
    fontSize: '1.1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: '2px solid #007bff',
    outline: 'none',
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#007bff',
    fontSize: '1.2rem',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
    width: '100%',
  },
  noProducts: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default ProductsCardPage;
