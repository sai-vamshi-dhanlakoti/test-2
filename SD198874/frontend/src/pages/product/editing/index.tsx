import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import FeatherIcon from 'feather-icons-react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductForm, { ProductValues } from '../product-form';
import { updateProduct } from '../fetch';
import { FormikHelpers } from 'formik';
import { MyAppContext } from '../../../app-context';
import { NOTIFICATION_STATUS } from '../../../interface';
import './index.scss';

function Product() {
  const navigate = useNavigate();
  const { setShowNotification } = useContext(MyAppContext);

  const { productId } = useParams();

  const handleBack = () => {
    navigate('/product');
  };
  const handleSubmit = (
    values: ProductValues,
    { setSubmitting }: FormikHelpers<ProductValues>
  ) => {
    if (productId) {
      setSubmitting(true);
      updateProduct(productId, values)
        .then(() => {
          if (setShowNotification) {
            setShowNotification({
              show: true,
              title: '',
              message: 'Edit the product successfully',
              status: NOTIFICATION_STATUS.SUCCESS,
            });
          }
        })
        .catch(() => {
          if (setShowNotification) {
            setShowNotification({
              show: true,
              title: '',
              message: 'Edit the product failed',
              status: NOTIFICATION_STATUS.DANGER,
            });
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };
  return (
    <div className="product_create_container ">
      <Button
        onClick={handleBack}
        className="btn-back"
        variant="outline-secondary"
      >
        <FeatherIcon icon="arrow-left" />
      </Button>
      <div className="create_form">
        <div className="title">Edit product</div>
        <ProductForm handleSubmit={handleSubmit} editing />
      </div>
    </div>
  );
}

export default Product;
