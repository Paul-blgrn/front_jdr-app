import { useEffect } from 'react';
import { useDispatch  } from 'react-redux';
import { checkAuth } from './actions/userActions';

import { Routes, Route } from 'react-router-dom'

import MainPage from './components/pages/homepage/Main'
import LoginPage from './components/pages/login/Login'
import ErrorPage from './components/pages/error/ErrorPage'
import ReadBoard from './components/pages/boards/ReadBoard'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
}, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/boards" element={<ReadBoard />}/>
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
  );
}

export default App;
