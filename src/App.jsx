import { Routes, Route } from 'react-router-dom'

import LoginPage from './components/pages/login/LoginPage'
import ErrorPage from './components/pages/error/ErrorPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}/>
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
  );
}

export default App;
