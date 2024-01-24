import { SINGLE_PROFILE, SINGLE_PROFILE_ERROR, SINGLE_PROFILE_LOADING } from '../constants/Single.profile.constants';

const singleProfileSlice = (state, action) => {
    switch (action.type) {
        case SINGLE_PROFILE_LOADING:
            return {
                loading: true,
                error: false,
                user: null
            };
        case SINGLE_PROFILE:
            return {
                loading: false,
                error: false,
                user: { ...action.payload }
            };
        case SINGLE_PROFILE_ERROR:
            return {
                loading: false,
                error: true,
                user: null
            };

        default:
            break;
    }
};
export default singleProfileSlice;
