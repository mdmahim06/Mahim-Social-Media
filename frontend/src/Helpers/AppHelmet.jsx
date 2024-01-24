import { PropTypes } from "prop-types"
import { Helmet, HelmetProvider } from "react-helmet-async"
import Favicon from "../assets/images/layouts/favicon.ico";

const AppHelmet = ({title = "Welcome",favicon = Favicon}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title} : Mahim Social Media</title>
        <link rel="shortcut icon" href={favicon} type="image/x-icon"/>
      </Helmet>
    </HelmetProvider>
  )
}

AppHelmet.propTypes = {
    title : PropTypes.string,
    favicon : PropTypes.string
}

export default AppHelmet
