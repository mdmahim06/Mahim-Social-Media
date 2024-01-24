import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer/single.profile.reducer';
import { SINGLE_PROFILE, SINGLE_PROFILE_API, SINGLE_PROFILE_ERROR, SINGLE_PROFILE_LOADING } from '../constants/Single.profile.constants';
import axios from 'axios';

const initialState = {
    loading: false,
    user: null,
    error: false
};

const SingleProfileContext = createContext();

export const SingleProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getSingleProfile = async (username) => {
        try {
            dispatch({ type: SINGLE_PROFILE_LOADING });
            await axios.get(`${SINGLE_PROFILE_API}?username=${username}`).then((res) => {
                if (res.data === 500) {
                    dispatch({ type: SINGLE_PROFILE_ERROR });
                } else {
                    dispatch({ type: SINGLE_PROFILE, payload: res.data });
                }
            });
        } catch (error) {
            dispatch({ type: SINGLE_PROFILE_ERROR });
        }
    };

    return <SingleProfileContext.Provider value={{ ...state, getSingleProfile }}>{children}</SingleProfileContext.Provider>;
};

export const useSingleProfile = () => {
    return useContext(SingleProfileContext);
};
