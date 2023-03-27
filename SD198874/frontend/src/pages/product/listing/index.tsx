import React, { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import FeatherIcon from 'feather-icons-react';
import { useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';

import './index.scss';
import { Button } from 'react-bootstrap';
import { deleteProduct, getProductList } from '../fetch';
import { Product as ProductInterface } from '../interface';
import { MyAppContext } from '../../../app-context';
import { NOTIFICATION_STATUS } from '../../../interface';
import { formatNumber } from 'utils/format-number';

function Product() {
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [productSelected, setProductSelected] =
    React.useState<ProductInterface | null>(null);
  const [productList, setProductList] = useState<ProductInterface[] | null>(
    null
  );
  const { setShowNotification } = useContext(MyAppContext);

  const navigate = useNavigate();
  const fetchData = () => {
    setLoading(true);
    getProductList()
      .then((res) => {
        if (res.status === 200) {
          setProductList(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  const handleCreateProduct = () => {
    navigate(`/product/create`);
  };
  const handleClickTrash = (product: ProductInterface) => {
    setModalShow(true);
    setProductSelected(product);
  };

  const handleDeleteProduct = () => {
    if (productSelected) {
      deleteProduct(productSelected._id)
        .then(() => {
          fetchData();
          setModalShow(false);
          if (setShowNotification) {
            setShowNotification({
              show: true,
              title: '',
              message: 'Delete the product successfully',
              status: NOTIFICATION_STATUS.SUCCESS,
            });
          }
        })
        .catch(() => {
          if (setShowNotification) {
            setShowNotification({
              show: true,
              title: '',
              message: 'Delete the product failed',
              status: NOTIFICATION_STATUS.DANGER,
            });
          }
        });
    }
  };

  return (
    <div className="product_container">
      <div className="title">Products</div>
      <div className="filter_container">
        <Button variant="outline-primary" onClick={handleCreateProduct}>
          <FeatherIcon icon="plus" /> Create
        </Button>
      </div>
      <div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Name</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="text-center" colSpan={5}>
                  <Spinner animation="border" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </td>
              </tr>
            ) : productList && productList.length > 0 ? (
              productList.map((p, index) => (
                <tr key={p._id}>
                  <td className="text-center">{index + 1}</td>
                  <td>{p.name}</td>
                  <td className="text-center">{formatNumber(p.quantity)}</td>
                  <td className="text-center"></td>
                  <td width="10%">
                    <div className="d-flex items-center justify-content-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProduct(p._id)}
                      >
                        <FeatherIcon icon="edit" />
                      </Button>

                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={<Tooltip id={`tooltip-'top`}>Delete</Tooltip>}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleClickTrash(p)}
                        >
                          <FeatherIcon icon="trash-2" />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-secondary">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Confirm
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Do you want to delete this product?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalShow(false)} variant="danger">
              NO
            </Button>
            <Button onClick={handleDeleteProduct} variant="outline-primary">
              YES
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Product;
