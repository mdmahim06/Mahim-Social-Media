import SettingProfilePc from './Setting.profile.pc';
import SettingProfileb from './Setting.profile.b';
import SettingProfileName from './Setting.profile.name';
import SettingProfileDeleteAndLogout from './Setting.profile.delete.and.logout';
import SettingProfileUsername from './Setting.profile.username';

const SettingProfile = () => {
    return (
        <>
            <SettingProfilePc />
            <SettingProfileb />
            <SettingProfileName />
            <SettingProfileUsername />
            <SettingProfileDeleteAndLogout />
        </>
    );
};

export default SettingProfile;
