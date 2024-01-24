import styled from 'styled-components';
import AppHelmet from '../../Helpers/AppHelmet';
import Loading from '../../assets/images/layouts/Loading';
import { FcCancel } from 'react-icons/fc';
import { FaRegCheckCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_VERIFY_API } from '../../constants/Account.constants';
import axios from 'axios';
import Button from '../../assets/styles/Button';
import Cookies from 'js-cookie';

const VerifyAccount = () => {
    const [code, setCode] = useState('');
    const [txtErr, setTxtErr] = useState('');
    const [valid, setValid] = useState(false);
    const [icons, setIcons] = useState({
        loading: false,
        cancel: false,
        check: false
    });

    const navigate = useNavigate();
    const prevCode = Cookies.get('code');
    const token = Cookies.get('token');
    !prevCode && !token && navigate('/signin?message=Your account created please login');

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (valid === true) {
            await axios.get(ACCOUNT_VERIFY_API + '?token=' + token).then((res) => {
                if (res.data.status === 202) {
                    Cookies.set('login', 'true', { expires: 99999 });
                    Cookies.remove('message');
                    Cookies.remove('code');
                    window.location.href = 'http://localhost:3000/profile';
                }
                if (res.data.status === 500) {
                    setTxtErr(res.data.message);
                }
            });
        }
    };

    useEffect(() => {
        if (code.length > 0) {
            if (code === prevCode) {
                setIcons({
                    ...icons,
                    loading: false,
                    cancel: false,
                    check: true
                });
                setValid(true);
            } else {
                setIcons({
                    ...icons,
                    loading: false,
                    cancel: true,
                    check: false
                });
            }
        }
        if (sessionStorage.getItem('login') === 'true') {
            navigate('/signin?message=Please Log in your account');
        }
    }, [code]);

    return (
        <>
            <AppHelmet title="User name F" />
            <Wrapper>
                <form onSubmit={handelSubmit}>
                    <h1>Verify your Account</h1>
                    <hr />
                    {txtErr && <span className="errTxt">{txtErr}</span>}
                    <div className="code">
                        <input type="text" name="code" placeholder="code" required autoComplete="off" autoFocus value={code} onChange={(e) => setCode(e.target.value)} maxLength={4} minLength={4} />
                        <label style={{ color: `${icons.check === true ? 'green' : 'red'}` }}>
                            {icons.loading === true && <Loading />}
                            {icons.cancel === true && <FcCancel />}
                            {icons.check === true && <FaRegCheckCircle />}
                        </label>
                    </div>
                    <div className="submit">
                        <Button>Submit</Button>
                    </div>
                </form>
            </Wrapper>
        </>
    );
};
const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 5rem 0;

    form {
        background: #021b82;
        padding: 0.9rem 2.5rem;
        border: 2px solid #006fff;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 30rem;

        .code {
            margin-bottom: 1.5rem;
            position: relative;

            input {
                font-size: 1.4rem;
                border: 2px solid #ddd;
                padding: 0.5rem 2rem;
                border-radius: 1rem;
                background: #ddd;
                transition: all 0.2s;
                text-align: center;

                &:focus {
                    background: #333;
                    color: white;
                }
            }
            label {
                position: absolute;
                top: 0.5rem;
                right: -2.4rem;
                font-size: 2rem;
                pointer-events: none;
                width: 2rem;
            }
        }

        h1 {
            margin-bottom: 0.6rem;
        }
        hr {
            width: 100%;
            margin-bottom: 1rem;
        }
        .errTxt {
            margin-bottom: 0.8rem;
            font-weight: 600;
            font-size: 1.1rem;
            display: flex;
            justify-content: center;
            background: red;
            color: #000;
            padding: 0.4rem 0;
            border-radius: 0.1rem;
        }
    }
`;

export default VerifyAccount;
