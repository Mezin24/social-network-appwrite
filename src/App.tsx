import { Route, Routes } from 'react-router-dom';
import './global.css';
import { SigninForm } from './_auth/forms/SigninForm';
import { SignupForm } from './_auth/forms/SignupForm';
import { Home } from './_root';
import { RootLayout } from './_root/RootLayout';
import { AuthLayout } from './_auth/AuthLayout';

export const App = () => {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<AuthLayout />}>
        <Route path='/sign-in' element={<SigninForm />} />
        <Route path='/sign-in' element={<SignupForm />} />
      </Route>
      {/* private routes */}

      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};
