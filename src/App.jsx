import { Routes, Route } from 'react-router-dom'

import LoginPage from './components/pages/login/LoginPage'
import RegisterForm from "./components/pages/login/RegisterForm"
import ErrorPage from './components/pages/error/ErrorPage'
import { UserProvider } from './providers/UserProvider'

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </UserProvider>
  );
}

export default App;
