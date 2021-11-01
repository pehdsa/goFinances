
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';

import Theme from './src/global/styles/theme';
import { AppRoutes } from './src/routes/app.routes';

import { Signin } from './src/screens/Signin';

export default function App() {

    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <>
        <StatusBar barStyle="light-content" />
        <ThemeProvider theme={ Theme }>
            <Signin />
        </ThemeProvider>
        </>
    );
}
