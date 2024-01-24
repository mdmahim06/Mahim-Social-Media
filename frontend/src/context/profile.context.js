import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducer/profile.reducer';
import { LOGIN, LOGOUT, PROFILE, PROFILE_ERROR, PROFILE_GET, PROFILE_LOADING } from '../constants/Profile.constants';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
    loading: false,
    profile: {},
    error: false,
    login: false
};

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getProfile = async (url) => {
        if (Cookies.get('login') === 'true') {
            const token = Cookies.get('token');
            dispatch({ type: PROFILE_LOADING });
            dispatch({ type: LOGIN });
            await axios.get(url + '?token=' + token).then((res) => {
                if (res.data === 500) {
                    dispatch({ type: PROFILE_ERROR });
                } else {
                    dispatch({ type: PROFILE, payload: res.data.data });
                }
            });
        } else {
            dispatch({ type: LOGOUT });
        }
    };

    useEffect(() => {
        getProfile(PROFILE_GET);
    }, []);
    useEffect(() => {
        if (state.error === true) {
            const confirm = window.confirm('Server Error! If you want to try again');
            if (confirm) {
                window.location.reload();
            }
        }
    }, [state.error]);

    return <ProfileContext.Provider value={{ ...state }}>{children}</ProfileContext.Provider>;
};
export const useProfileContext = () => {
    return useContext(ProfileContext);
};
