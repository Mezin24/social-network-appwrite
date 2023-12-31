import { Outlet, Navigate } from 'react-router-dom';

export const AuthLayout = () => {
  const isAuthenticated = false;
  return isAuthenticated ? (
    <Navigate to='/' />
  ) : (
    <>
      <section className='flex flex-1 justify-center items-center flex-col py-5'>
        <Outlet />
      </section>
      <img
        src='assets/images/side-img.jpg'
        alt='side image'
        className='h-full hidden md:block w-1/2 object-cover bg-no-repeat'
      />
    </>
  );
};
