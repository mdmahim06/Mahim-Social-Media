import { LOGIN, LOGOUT, PROFILE, PROFILE_ERROR, PROFILE_LOADING } from '../constants/Profile.constants';

const ProfileSlice = (state, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true,
                profile: [],
                error: false
            };
        case PROFILE:
            return {
                ...state,
                loading: false,
                profile: action.payload,
                error: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                profile: [],
                error: true
            };
        case LOGIN:
            return {
                ...state,
                login: true
            };
        case LOGOUT:
            return {
                ...state,
                login: false
            };
        default:
            return state;
    }
};

export default ProfileSlice;
