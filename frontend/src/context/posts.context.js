import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducer/posts.reducer';
import { POSTS, POSTS_ERROR, POSTS_LOADING, POST_API, SINGLE_POST, SINGLE_POST_API, SINGLE_POST_ERROR, SINGLE_POST_LOADING } from '../constants/Post.constants';
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
    loading: false,
    posts: [],
    error: false,
    singlePost: {
        loading: false,
        post: {},
        error: false
    }
};

const token = Cookies.get('token');

const postsContext = createContext();

export const PostsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getPosts = async () => {
        dispatch({ type: POSTS_LOADING });
        await axios.get(POST_API + '?token=' + token).then((res) => {
            if (res.data === 404) {
                dispatch({ type: POSTS_ERROR });
            } else {
                dispatch({ type: POSTS, payload: res.data });
            }
        });
    };
    const getSinglePosts = async (id) => {
        dispatch({ type: SINGLE_POST_LOADING });
        await axios.get(SINGLE_POST_API + '?id=' + id).then((res) => {
            if (res.data === 500) {
                dispatch({ type: SINGLE_POST_ERROR });
            } else {
                dispatch({ type: SINGLE_POST, payload: res.data });
            }
        });
    };

    return <postsContext.Provider value={{ ...state, getPosts, getSinglePosts }}>{children}</postsContext.Provider>;
};

export const usePostsContext = () => {
    return useContext(postsContext);
};
