import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductSingleCard from "../../components/home/ProductSingleCard";
import Spinner from '../../components/spinner';
import { FaSearch } from 'react-icons/fa';
import Header from '../../components/headerfooter/Header';
import Footer from '../../components/headerfooter/Footer';

const HaircarePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/products?category=Hair Care")
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div style={styles.pageContainer}>
        {loading ? <Spinner /> : (
          <>
            <div style={styles.searchContainer}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by product name"
                value={searchQuery}
                onChange={handleSearch}
                style={styles.searchInput}
              />
            </div>
            <div style={styles.productGrid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <ProductSingleCard key={item._id} product={item} />
                ))
              ) : (
                <p>No products available.</p>
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
    padding: '1rem',
    minHeight: '100vh',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '1.5rem',
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchIcon: {
    position: 'absolute',
    left: '15px',
    color: '#007bff',
    fontSize: '1.5rem',
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 2rem 0.75rem 50px',
    borderRadius: '30px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '1.1rem',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
};

export default HaircarePage;