import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';

class SignOut extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div>
        Thanks for Coming By!
        <br />
        <Link to='/signin' className='btn btn-primary'>Sign In</Link>
      </div>
    );
  }
}

export default connect(null, actions)(SignOut);
