import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setBlockType } from './actions'
import Header from '../../components/Editor/blocks/header'

function mapStateToProps (state, ownProps) {
  return {
    ...ownProps
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    onSetBlockType: setBlockType
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
