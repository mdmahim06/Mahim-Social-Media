const CONTACT_POST_API = 'http://localhost/Mahim-social/backend/Contact.php';

const VALIDEDEMAILS = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
const VALIDUSRNAMES = (un) => {
    return String(un)
        .toLowerCase()
        .match(/^[a-zA-Z0-9]+$/);
};

export { CONTACT_POST_API, VALIDEDEMAILS, VALIDUSRNAMES };
