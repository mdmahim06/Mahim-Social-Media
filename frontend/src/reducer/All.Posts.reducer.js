import { ALL_POSTS, ALL_POSTS_ERROR, ALL_POSTS_LOADING } from '../constants/All.Posts.constants';

const AllPostsSlice = (state, action) => {
    switch (action.type) {
        case ALL_POSTS_LOADING:
            return {
                ...state,
                loading: true,
                allPosts: [],
                error: false
            };
        case ALL_POSTS:
            return {
                ...state,
                loading: false,
                allPosts: action.payload,
                error: false
            };
        case ALL_POSTS_ERROR:
            return {
                ...state,
                loading: false,
                allPosts: [],
                error: true
            };

        default:
            return state;
    }
};

export default AllPostsSlice;
