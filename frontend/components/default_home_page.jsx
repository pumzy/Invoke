import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout, clearErrors } from '../actions/session_actions'
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SessionForm from './session_form'
import Modal from './modal'



class DefaultHomePage extends React.Component   {
  constructor(props){
    super(props)
    this.state = { loginModalOpen: false, createModalOpen: false }
  }

  openLoginModal() {
    this.setState({ loginModalOpen: true })
  }
  openCreateModal() {
    this.setState({ createModalOpen: true })
  }

  closeLoginModal() {
    this.setState({ loginModalOpen: false})
  }

  closeCreateModal() {
    this.setState({ createModalOpen: false})
  }



  render(){
    let heading = <h1>Welcome to Invoke</h1>
      return (
        <div>
          {heading}


        <button onClick={() => this.openLoginModal()}>Login</button>
        <Modal isOpen={this.state.loginModalOpen} onClose={() => this.closeLoginModal()}>
          <SessionForm formType={'login'} />
        </Modal>


        <button className='create-new-user-homepage-button' onClick={() => this.openCreateModal()}>Create a new account</button>
        <Modal isOpen={this.state.createModalOpen} onClose={() => this.closeCreateModal()}>
          <SessionForm formType={'signup'} />
        </Modal>
        </div>
      );
    }
  }



const mapStateToProps = (state) => {
  return { currentUser: state.session.currentUser,
           errors: state.session.errors  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    clearErrors: () => dispatch(clearErrors()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHomePage);







//
//   render(){
//     let heading = <h1>Welcome to Invoke</h1>
//     if (this.props.currentUser) {
//       return (
//         <div>
//           <h1> {this.props.currentUser.username} - are you ready to get invoked?</h1>
//           <button onClick={this.props.logout}> Log Out!</button>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           {heading}
//         <Link to='/signup'> Sign Up </Link>
//         <Link to='/login'> Log In </Link>
//         </div>
//       );
//     }
//   }
// }



// <AuthRoute path="/login" component={SessionForm} />
// <AuthRoute path="/signup" component={SessionForm} />
