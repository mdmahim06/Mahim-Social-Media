import AppHelmet from '../Helpers/AppHelmet';
import WelcomeSection from '../components/Home/WelcomeSection';

const About = () => {
    return (
        <>
            <AppHelmet title="About us" />
            <div>
                <WelcomeSection title="Mahim Social Media" about={true} />
            </div>
        </>
    );
};

export default About;
