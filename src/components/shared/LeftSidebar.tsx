import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { INavLink } from '@/types';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={170}
            height={36}
          />
        </Link>
        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img
            src={user.imageUrl || '/assets/images/profile-placeholder.svg'}
            alt='user'
            className='h-14 w-14 rounded-full'
          />
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>
        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map(({ imgURL, label, route }: INavLink) => {
            const isActive = pathname === route;
            return (
              <li
                key={label}
                className={`group leftsidebar-link ${
                  isActive ? 'bg-primary-500' : ''
                }`}
              >
                <NavLink to={route} className='flex gap-4 items-center p-4'>
                  <img
                    src={imgURL}
                    alt={label}
                    className={`group-hover:invert-white ${
                      isActive ? 'invert-white' : ''
                    }`}
                  />
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button className='shad-button_ghost' onClick={() => signOut()}>
        <img src='/assets/icons/logout.svg' alt='logout' />
        <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  );
};
