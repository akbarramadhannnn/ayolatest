import React, {useEffect} from 'react';
import Navigation, {navigate} from '@navigation';
import {getLoginData} from '@utils/asyncStorage';
import routes from '@constants/routes';

const App = ({}) => {
  useEffect(() => {
    const checkUserSignin = async () => {
      const loginData = await getLoginData();
      if (loginData?.isSignin) {
        navigate(routes.Home);
      }
    };

    checkUserSignin();
  }, []);

  return <Navigation />;
};

export default App;
