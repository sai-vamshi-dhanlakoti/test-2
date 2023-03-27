import { get, post, put, del } from '../../fetcher';
import ENDPOINT from '../../fetcher/endpoint';
import { Product } from './interface';
import { ProductValues } from './product-form';

export const getProductList = () => {
  return get(ENDPOINT.PRODUCT.LISTING);
};

export const createProduct = (data: ProductValues) => {
  return post<ProductValues>(ENDPOINT.PRODUCT.CREATE, data);
};
export const getProductDetail = (productId: Product['_id']) => {
  return get(`${ENDPOINT.PRODUCT.DETAIL}/${productId}`);
};

export const updateProduct = (
  productId: Product['_id'],
  data: ProductValues
) => {
  return put<ProductValues>(`${ENDPOINT.PRODUCT.DETAIL}/${productId}`, data);
};

export const deleteProduct = (productId: Product['_id']) => {
  return del(`${ENDPOINT.PRODUCT.DETAIL}/${productId}`);
};
