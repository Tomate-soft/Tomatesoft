import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setErrors, toggleLoading } from '../../redux/actions/auth';
import styles from './home.module.css';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Aside from '../../components/aside/aside';
import Loader from '../../components/loaders/loader';

export default function Home() {
  const dispatch = useDispatch();
  const { loginUsers } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginUsers.length > 0) {
      dispatch(toggleLoading(false));
    }
  }, []);

  if (loginUsers.length !== 1 ) {
    dispatch(setErrors('Email y/o contraseña invalidos'));
    dispatch(toggleLoading(true));
  }
  return (
    <div className={styles.container}>
     
        <>
          <Header />
          <div>
            <Aside />
            <Main />
          </div>
        </>
    </div>
  );
}
