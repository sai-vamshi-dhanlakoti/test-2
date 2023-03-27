import Nav from 'react-bootstrap/Nav';
import FeatherIcon from 'feather-icons-react';
import { NavLink } from 'react-router-dom';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

import './layout.scss';
import { useContext, useState } from 'react';
import { MyAppContext } from 'app-context';
import { DEFAULT_NOTIFICATION } from '../constants';

interface Props {
  children: React.ReactNode;
}

const ROUTERS = [
  {
    href: '/',
    label: 'Home',
    icon: 'home',
  },
  {
    href: '/product',
    label: 'Product',
    icon: 'align-justify',
  },
];
const TAB_ITEM = 'TAB_ITEM';

export default function Layout({ children }: Props) {
  const { showNotification, setShowNotification } = useContext(MyAppContext);
  const [navTabSelected, setNavTabSelected] = useState(() => {
    return localStorage.getItem(TAB_ITEM) || '/';
  });
  const handleClickNavItem = (value: string) => {
    setNavTabSelected(value);
    localStorage.setItem(TAB_ITEM, value);
  };
  return (
    <div className="d-flex overflow-hidden vh-100">
      <div
        style={{ width: 280, padding: 24, borderRight: '1px solid #e9ecef' }}
        className="vh-100"
      >
        <Nav defaultActiveKey="/" className="flex-column gap-2">
          {ROUTERS.map((r) => (
            <NavLink
              onClick={() => handleClickNavItem(r.href)}
              key={r.href}
              to={r.href}
            >
              <Nav.Item>
                <Nav.Link
                  as="div"
                  className={`d-flex gap-3 nav-link-item text-decoration-none ${
                    navTabSelected === r.href ? 'activate' : ''
                  }`}
                >
                  <FeatherIcon icon={r.icon} />
                  {r.label}
                </Nav.Link>
              </Nav.Item>
            </NavLink>
          ))}
        </Nav>
      </div>
      <main style={{ flex: 1, padding: 40 }} className="flex-1 overflow-auto">
        {children}
      </main>

      <ToastContainer className="p-3" position={'top-end'}>
        <Toast
          className="d-inline-block m-1"
          bg={showNotification.status}
          onClose={() =>
            setShowNotification && setShowNotification(DEFAULT_NOTIFICATION)
          }
          show={showNotification.show}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className={'text-white'}>
            {showNotification.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
