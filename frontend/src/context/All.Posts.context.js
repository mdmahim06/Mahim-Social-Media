import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer/All.Posts.reducer';
import axios from 'axios';
import { ALL_POSTS, ALL_POSTS_API, ALL_POSTS_ERROR, ALL_POSTS_LOADING } from '../constants/All.Posts.constants';

const initialState = {
    loading: false,
    allPosts: [],
    error: false
};

const AllPostsContext = createContext();

export const AllPostsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getAllPosts = async () => {
        dispatch({ type: ALL_POSTS_LOADING });
        try {
            await axios.get(ALL_POSTS_API).then((res) => {
                if (res.data === 500) {
                    dispatch({
                        type: ALL_POSTS_ERROR
                    });
                }
                if (res.data === 404) {
                    dispatch({
                        type: ALL_POSTS,
                        payload: []
                    });
                } else {
                    dispatch({
                        type: ALL_POSTS,
                        payload: res.data
                    });
                }
            });
        } catch (error) {
            dispatch({
                type: ALL_POSTS_ERROR
            });
        }
    };

    return <AllPostsContext.Provider value={{ ...state, getAllPosts }}>{children}</AllPostsContext.Provider>;
};

export const useAllPostsContext = () => {
    return useContext(AllPostsContext);
};
