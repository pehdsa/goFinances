import React, { useState, createContext, ReactNode, useContext, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthProviderProps = {
    children: ReactNode
}

type UserProps = {
    id: string,
    name: string,
    email: string,
    photo?: string
}

type AuthContextData = {
    user: UserProps,
    isLoading: boolean,
    signInWithGoogle: () => Promise<void>,
    signInWithApple: () => Promise<void>,
    logOut: () => Promise<void>
}

type AuthorizationResponse = {
    params: {
        access_token: string
    },
    type: string
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;  

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    
    const [ user, setUser ] = useState<UserProps>({} as UserProps);
    const [ isLoading, setIsLoading ] = useState(true);

    async function signInWithGoogle() {
        try {

            const RESPONSE_TYPE = "token";
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ CLIENT_ID }&redirect_uri=${ REDIRECT_URI }&response_type=${ RESPONSE_TYPE }&scope=${ SCOPE }`;

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${ params.access_token }`);
                const userInfo = await response.json();

                const userLogged = {
                    id: String(userInfo.id),
                    name: userInfo.name,
                    email: userInfo.email,
                    photo: userInfo.picture
                }
                
                setUser(userLogged);
                await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
                
            }


        } catch (error) {
            throw new Error(error);
        }
    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });

            if (credential) {
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email,
                    name: credential.fullName!.givenName!,
                    photo: `https://ui-avatars.com/api/?name=${ credential.fullName!.givenName! }&length=1`
                }

                setUser(userLogged);
                await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged));
                console.log(userLogged);
            }
            
        } catch (error) {
            throw new Error(error);
        }
    }

    async function logOut() {
        setUser({} as UserProps)
        await AsyncStorage.removeItem('@gofinances:user');
    }

    useEffect(() => {
        async function loadUserStoredData() {
            const data = await AsyncStorage.getItem('@gofinances:user');
            data && setUser(JSON.parse(data));
            setIsLoading(false);
        }
        loadUserStoredData();
    },[]);


    return (
        <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signInWithApple, logOut }}>
            { children }
        </AuthContext.Provider>        
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export {
    AuthProvider,
    useAuth
}