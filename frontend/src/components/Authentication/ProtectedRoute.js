import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AppContext);
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;