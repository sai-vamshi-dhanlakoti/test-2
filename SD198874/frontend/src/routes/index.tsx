import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home';
import Product from '../pages/product/listing';
import ProductCreate from '../pages/product/creating';
import ProductEdit from '../pages/product/editing';
import Layout from '../layout';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/product',
    element: (
      <Layout>
        <Product />
      </Layout>
    ),
  },
  {
    path: '/product/:productId',
    element: (
      <Layout>
        <ProductEdit />
      </Layout>
    ),
  },
  {
    path: '/product/create',
    element: (
      <Layout>
        <ProductCreate />
      </Layout>
    ),
  },
]);

export default router;
