import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleMobileNavVisibility } from '../../store/reducers/Layout';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { logoutUser, } from '../../store/actions/authActions';

class Header extends Component {
  constructor(props) {
    super(props);


    this.state = {

      isLoading: false

    };
    // Update Selected Resturant 

  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }
  componentDidMount() {
  }



  render() {
    console.log(this.props.mobileNavVisibility)
    const { toggleMobileNavVisibility, logoutUser, mobileNavVisibility } = this.props
    return (
      <Navbar class="navbar" fluid={true} collapseOnSelect>



          <i onClick={toggleMobileNavVisibility} className="nav-menu material-icons fs-24">menu</i>
        
        <Nav className="nav-right">

          <li>
            <button class="nav-item" onClick={logoutUser}>Log out</button>
          </li>

        </Nav>
      </Navbar>
    )
  }
}


const mapStateToProps = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility,
});

const mapDispatchToProp = ({
  toggleMobileNavVisibility,
  logoutUser

});

export default connect(mapStateToProps, mapDispatchToProp)(Header);