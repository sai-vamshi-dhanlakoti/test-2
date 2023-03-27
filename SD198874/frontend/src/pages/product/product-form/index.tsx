import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import FeatherIcon from 'feather-icons-react';
import { Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

import './index.scss';
import { getProductDetail } from '../fetch';
import { useParams } from 'react-router-dom';

export interface ProductValues {
  name: string;
  quantity: number | '';
  image_url: string;
}

interface Props {
  handleSubmit: (
    values: ProductValues,
    formikHelpers: FormikHelpers<ProductValues>
  ) => void;
  editing?: boolean;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  quantity: yup.string().required(),
  image_url: yup.string(),
});

export default function ProductForm({ handleSubmit, editing }: Props) {
  const { productId } = useParams();

  const [initialValues, setInitialValues] = useState<ProductValues>({
    name: '',
    quantity: '',
    image_url: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };
  const handleClickUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (editing && productId) {
      getProductDetail(productId).then((res) => {
        if (res.status === 200) {
          setInitialValues({
            name: res.data.name,
            quantity: res.data.quantity,
            image_url: '',
          });
        }
      });
    }
  }, [editing]);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      enableReinitialize
      initialValues={initialValues}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product image</Form.Label>
            <div className="d-flex flex-column gap-2">
              <Image width={200} src="https://picsum.photos/200" />
              <input
                onChange={handleChangeFiles}
                ref={inputRef}
                type="file"
                hidden
              />
              <div>
                <Button
                  className="d-inline-block"
                  variant="outline-primary"
                  onClick={handleClickUpload}
                >
                  <FeatherIcon icon="plus" />
                  Upload
                </Button>
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              Name<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="name"
              value={values.name}
              placeholder="Enter name"
              onChange={handleChange}
              isValid={touched.name && !errors.name}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Quantity<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={values.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              isValid={touched.quantity && !errors.quantity}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.quantity}
            </Form.Control.Feedback>
          </Form.Group>
          <Button disabled={isSubmitting} variant="primary" type="submit">
            {isSubmitting ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              'Save'
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
