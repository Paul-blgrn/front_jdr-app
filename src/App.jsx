import { useEffect } from 'react';
import { useDispatch  } from 'react-redux';
import { checkAuth } from './actions/userActions';

import { Routes, Route } from 'react-router-dom'

import LoginPage from './components/pages/login/Login'
import ErrorPage from './components/pages/error/ErrorPage'
import ReadBoard from './components/pages/boards/ReadBoard'
import DetailBoard from './components/pages/board/ReadBoard'
import Templates from './components/pages/templates/Main'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
}, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="/boards" element={<ReadBoard />}/>
      <Route path="/board/:id" element={<DetailBoard />}/>
      <Route path="/templates" element={<Templates />}/>
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
  );
}

export default App;
