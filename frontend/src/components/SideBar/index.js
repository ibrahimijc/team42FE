import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
 
 
import Nav from './Nav';
 

class SideBar extends Component {

  state = {};

render() {

    let {
       
      
  
      
    } = this.props;

    return (
      <div className="sidebar"   >

        <div className="brand">
          <a className="brand-name">
     
          </a>
        </div>

        <div className="sidebar-wrapper">
     
          <div className="line"></div>
          <Nav />
        </div>
   
        
      </div>
    )
  }
}

const mapStateToProps = state => ({
 
 
 
});

export default withRouter(
  connect(mapStateToProps)(SideBar)
);