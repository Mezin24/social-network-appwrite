import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = useCallback(async () => {
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });

        setIsAuthenticated(true);

        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null
    ) {
      navigate('/sign-in');
    }
    checkAuthUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      setUser,
      setIsAuthenticated,
      checkAuthUser,
    }),
    [checkAuthUser, isAuthenticated, isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserContext = () => useContext(AuthContext);