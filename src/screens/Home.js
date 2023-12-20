import {View} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {Typography} from '@components/atoms';
import {SafeAreaView} from 'react-native-safe-area-context';
import GlobalStyles from '@constants/styles';
import {removeLoginData, getLoginData} from '@utils/asyncStorage';
import routes from '@constants/routes';

const Home = ({navigation}) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const didMount = async () => {
      const loginData = await getLoginData();
      setEmail(loginData.email);
    };

    didMount();
  }, []);

  const onSignout = useCallback(async () => {
    await removeLoginData();
    navigation.navigate(routes.Signin);
  }, [navigation]);

  return (
    <SafeAreaView style={[GlobalStyles.flex1, GlobalStyles.alignContentCenter]}>
      <View style={[GlobalStyles.marginBottom20]}>
        <Typography.Text>Welcome</Typography.Text>
      </View>
      <View style={[GlobalStyles.marginBottom20]}>
        <Typography.Text>Email : {email}</Typography.Text>
      </View>

      <Typography.Button onPress={onSignout}>Sign Out</Typography.Button>
    </SafeAreaView>
  );
};

export default Home;
