import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    console.log('inside renderLinks', this.props.authenticated);
    if (this.props.authenticated) {
      // show a link to sign out
      return ([
        <li key='feature_private_1' className="nav-item">
          <Link to='/feature_private_1' className='nav-link'>Private 1</Link>
        </li>,
        <li key='signout' className="nav-item">
          <Link to='/signout' className='nav-link'>Sign Out</Link>
        </li>
      ])
    } else {
      // show a link to sign in or sign up
      // TIP: Return an array of list items instead of wrapping it up in a container (i.e. a div).  Forgetting to do so will result in 'Module Build Failed:.... : Adjacent JSX elements must be wrapped in an enclosing tag'
      return ([
        <li key='feature_private_1' className="nav-item">
          <Link to='/feature_private_1' className='nav-link'>Private 1</Link>
        </li>,
        <li key='signin' className="nav-item">
          <Link to='/signin' className='nav-link'>Sign In</Link>
        </li>,
        <li key='signup' className="nav-item">
          <Link to='/signup' className='nav-link'>Sign Up</Link>
        </li>
      ])
    }
  };

  render() {
    return (
      <nav className='navbar navbar-light'>
        <Link to="/" className='navbar-brand'>Redux Auth</Link>
        <ul className='nav navbar-nav'>
          { this.renderLinks() }
        </ul>
      </nav>
    );
  };
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
