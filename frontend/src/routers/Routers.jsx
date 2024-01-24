import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { GlobalStyle } from '../assets/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import AppHelmet from '../Helpers/AppHelmet';
import Error from '../pages/Error';
import SignIn from '../pages/account/SignIn';
import SignUp from '../pages/account/SignUp';
import UserName from '../components/account/UserName';
import VerifyAccount from '../components/account/VerifyAccount';
import Profile from '../pages/account/Profile';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Setting from '../pages/account/Setting';
import Createpost from '../pages/account/Create.post';
import Post from '../pages/Post';
import Posts from '../pages/Posts';

const Routers = () => {
    const theme = {
        colors: {
            heading: 'rgb(24 24 29)',
            text: 'rgba(29,29,29,0.8)'
        },
        media: {
            mobile: '768px',
            tab: '998px'
        }
    };
    useEffect(() => {
        const session = Cookies.get('login');
        if (!session) {
            Cookies.set('login', 'false', { expires: 99999 });
            Cookies.remove('token');
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AppHelmet />
                <GlobalStyle />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/username" element={<UserName />} />
                    <Route path="/verify" element={<VerifyAccount />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/setting/profile" element={<Setting settingType="profile" />} />
                    <Route path="/setting/email" element={<Setting settingType="email" />} />
                    <Route path="/setting/pwd" element={<Setting settingType="pwd" />} />
                    <Route path="/createpost" element={<Createpost />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default Routers;
