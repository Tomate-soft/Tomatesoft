import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setErrors, toggleLoading } from '../../redux/actions/auth';
import Loader from '@/components/loaders/loader';

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const { loginUsers } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.auth);

  




  if (loginUsers.length > 0) {
    return <Outlet />;
  } else if (isLoading) {
    return <Loader />;
  } else {
    dispatch(toggleLoading(true));
    dispatch(setErrors('email y/o contraseña invalidos'));
    return <Navigate to="login" />;
  }
}
