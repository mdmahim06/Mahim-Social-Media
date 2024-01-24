const PROFILE_GET = 'http://localhost/mahim-social/backend/account/profile.php';
const SINGLE_PROFILE_GET = 'http://localhost/mahim-social/backend/account/singleAccount.php';
const PROFILE_DELETE_ACCOUNT = 'http://localhost/Mahim-social/backend/account/delete.php';
const PROFILE_IMAGE = 'http://localhost/mahim-social/backend/account/porfileImage.php';
const PROFILE_NAME_AND_BIO = 'http://localhost/mahim-social/backend/account/profile_name_and_bio.php';
const PROFILE_PASSWORD = 'http://localhost/mahim-social/backend/account/password.php';
const PROFILE_FORGET_PASSWORD = 'http://localhost/mahim-social/backend/account/forgetPassword.php';

const PROFILE_LOADING = 'PROFILE_LOADING';
const PROFILE = 'PROFILE';
const PROFILE_ERROR = 'PROFILE_ERROR';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const FUllName = (fname, lname) => {
    const fullName = `${fname} ${lname}`;
    return fullName;
};

export {
    PROFILE_GET,
    SINGLE_PROFILE_GET,
    PROFILE_DELETE_ACCOUNT,
    PROFILE_IMAGE,
    PROFILE_NAME_AND_BIO,
    PROFILE_PASSWORD,
    PROFILE_FORGET_PASSWORD,
    PROFILE_LOADING,
    PROFILE,
    PROFILE_ERROR,
    LOGIN,
    LOGOUT,
    FUllName
};
