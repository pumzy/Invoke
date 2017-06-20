import React from 'react';
import { connect, Link } from 'react-redux';

import { login, logout, signup, clearErrors } from '../actions/session_actions';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  componentWillMount(){
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    if (this.props.formType === 'login'){
      this.props.login({user})
    } else if (this.props.formType === 'signup'){
      this.props.signup({user})
    }
  }




  displayErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => ( <li key={`error-${i}`}> {error} </li>))}
      </ul>
    );
  }


  render() {
    let buttontext;
    if (this.props.formType === "signup"){
      buttontext = "Sign Up"
    } else{ buttontext = "Log In"
    };

    let headertext;
    if (this.props.formType === "signup"){
      headertext = `Welcome to our community ${this.state.username}`
    } else{ headertext = `Welcome back, ${this.state.username}`
    };
    return (
      <div className="session-form-container">

        <form onSubmit={this.handleSubmit} className="session-form-form">
        <h2>{headertext}</h2>
          {this.displayErrors()}
          <div className="session-form">
            <br/>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            <br/>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            <br/>
            <button onClick={this.handleSubmit} className='auth-form-button'>{buttontext}</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => {
  return {
    loggedIn: Boolean(session.currentUser),
    errors: session.errors,
  }
};

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    clearErrors: () => dispatch(clearErrors()),
    login: (user) => dispatch(login(user)),
    signup: (user) => dispatch(signup(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);





// processForm: user => dispatch(processForm(user)),
// formType
// const processForm = (formType === 'login') ? login : signup;
