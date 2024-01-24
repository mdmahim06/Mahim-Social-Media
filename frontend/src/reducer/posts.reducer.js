import { POSTS, POSTS_ERROR, POSTS_LOADING, SINGLE_POST, SINGLE_POST_ERROR, SINGLE_POST_LOADING } from '../constants/Post.constants';

const postsSlice = (state, action) => {
    switch (action.type) {
        case POSTS_LOADING:
            return {
                ...state,
                loading: true,
                posts: [],
                error: false
            };
        case POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload,
                error: false
            };
        case POSTS_ERROR:
            return {
                ...state,
                loading: false,
                posts: [],
                error: true
            };
        case SINGLE_POST_LOADING:
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    loading: true,
                    post: {},
                    error: false
                }
            };
        case SINGLE_POST:
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    loading: false,
                    post: action.payload,
                    error: false
                }
            };
        case SINGLE_POST_ERROR:
            return {
                ...state,
                singlePost: {
                    ...state.singlePost,
                    loading: false,
                    post: {},
                    error: true
                }
            };

        default:
            return state;
    }
};

export default postsSlice;
