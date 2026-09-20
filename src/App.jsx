import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductPage from '@/pages/ProductPage';
import { CartProvider } from '@/context/CartContext';

function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <Router>
          <ScrollToTop />
          <CartProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<ProductPage />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </CartProvider>
        </Router>
      </MotionConfig>
    </ErrorBoundary>
  )
}

export default App
