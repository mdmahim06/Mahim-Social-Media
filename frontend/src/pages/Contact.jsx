import styled from 'styled-components';
import ContactPage from '../assets/images/Contact/ContactPage';
import ContactForm from '../components/Contact/ContactForm';
import AppHelmet from '../Helpers/AppHelmet';
import ContactList from '../components/Contact/ContactList';

const Contact = () => {
    return (
        <>
            <AppHelmet title="Contact us" />
            <Wrapper>
                <ContactPage />
                <ContactForm />
            </Wrapper>
            <ContactList />
        </>
    );
};

const Wrapper = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export default Contact;
