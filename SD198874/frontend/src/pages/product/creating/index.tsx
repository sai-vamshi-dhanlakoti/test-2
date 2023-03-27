import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import FeatherIcon from 'feather-icons-react';
import { useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik';

import './index.scss';
import ProductForm, { ProductValues } from '../product-form';
import { createProduct } from '../fetch';
import { NOTIFICATION_STATUS } from '../../../interface';
import { MyAppContext } from '../../../app-context';

function Product() {
  const navigate = useNavigate();

  const { setShowNotification } = useContext(MyAppContext);

  const handleBack = () => {
    navigate('/product');
  };

  const handleSubmit = (
    values: ProductValues,
    { setSubmitting }: FormikHelpers<ProductValues>
  ) => {
    setSubmitting(true);
    createProduct(values)
      .then(() => {
        if (setShowNotification) {
          setShowNotification({
            show: true,
            title: '',
            message: 'Create a new product successfully',
            status: NOTIFICATION_STATUS.SUCCESS,
          });
        }
        navigate('/product');
      })
      .catch(() => {
        if (setShowNotification) {
          setShowNotification({
            show: true,
            title: '',
            message: 'Create the product failed',
            status: NOTIFICATION_STATUS.DANGER,
          });
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
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
        <div className="title">Create a new product</div>
        <ProductForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Product;
