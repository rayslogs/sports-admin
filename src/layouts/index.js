import PropTypes from 'prop-types'
import { blankRouters } from 'router'
import PrimaryLayout from './primary-layout'
import BlankLayout from './BlankLayout'

function BasicLayout(props) {
  if (blankRouters.indexOf(props.location.pathname) > -1) {
    return <BlankLayout>{props.children}</BlankLayout>
  }
  return <PrimaryLayout>{props.children}</PrimaryLayout>
}

BasicLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object
}

export default BasicLayout
