import React from 'react';
import { connect, Link } from 'react-redux';

import { login, logout, signup } from '../../actions/session_actions';

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
      this.props.history.push('/stream');
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({user});
  }


  displayErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => ( <li key={`error-${i}`}> {error} </li>))}
      </ul>
    );
  }


  render() {

    return (
      <div className="session-form-container">
        <form onSubmit={this.handleSubmit} className="session-form-form">
          Welcome to Invoke.
          <br/>
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
            <button onClick={this.handleSubmit}></button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ session }) => {
  return {
    loggedIn: Boolean(session.currentUser),
    errors: session.errors
  }
};

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
  const processForm = (formType === 'login') ? login : signup;
  return {
    processForm: user => dispatch(processForm(user)),
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
