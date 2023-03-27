import React, { useEffect, useState } from 'react';

import { DEFAULT_NOTIFICATION } from '../constants';
import { ShowNotification } from '../interface';

interface IAppContext {
  showNotification: ShowNotification;
  setShowNotification?: (showNotification: ShowNotification) => void;
}

const INITIAL_VALUE_CONTEXT = {
  showNotification: DEFAULT_NOTIFICATION,
};

export const MyAppContext = React.createContext<IAppContext>(
  INITIAL_VALUE_CONTEXT
);

export default function MyAppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [valueContext, setValueContext] = useState(INITIAL_VALUE_CONTEXT);

  const setShowNotification = (showNotification: ShowNotification) => {
    setValueContext((prev) => ({ ...prev, showNotification }));
  };

  useEffect(() => {
    setValueContext((prev) => ({
      ...prev,
      setShowNotification,
    }));
  }, []);

  return (
    <MyAppContext.Provider value={valueContext}>
      {children}
    </MyAppContext.Provider>
  );
}
