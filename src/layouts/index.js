import PropTypes from "prop-types"
import PrimaryLayout from "./primary-layout"

function BasicLayout(props) {
  return <PrimaryLayout>{props.children}</PrimaryLayout>
}

BasicLayout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default BasicLayout
