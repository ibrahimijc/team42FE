import React from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../store/reducers/Layout';
import { withRouter } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';
 
import UpdateIndex from '../Templates/UpdateIndex'
import UpdateTemplate from '../Templates/UpdateTemplate'
import Customer from '../Customer/Customer'

import CustomerIndex from '../Customer/CustomerIndex'
import CustomerIndexList from '../Customer/CustomerIndexList'
import CustomerProfile from '../Customer/CustomerProfile' 
 
import SeeResult from '../Templates/SeeResult'

 

import UploadData from '../DataSet/UploadData'
import ViewData from '../DataSet/ViewData'
import AppendData from '../DataSet/AppendData'
import DeleteDataPoint from '../DataSet/DeleteDataPoint'

import ViewAllCategories from '../Category/ViewAllCategories'




/**
 * Pagess
 */ 
 

 
import PrivateRoute from '../../utils/PrivateRoute';
import TemplateDetail from '../Templates/TemplateDetail';
import Dashboard from '../Dashboard/Dashboard';
import AllTemplateGrid from '../Templates/AllTemplateGrid';
import AdminTemplateList from '../Templates/AdminTemplateList';
import Method from '../Templates/Method';

// import AdminTemplateGrid from '../Templates/AdminTemplateGrid'
 
const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  return (
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
      <div className="wrapper">
        <div className="close-layer" onClick={hideMobileMenu}></div>
        <SideBar />

        <div className="main-panel">
          <Header />
     
          <PrivateRoute exact path="/" component={Dashboard} /> 

          <PrivateRoute exact path="/customer/all" component={Customer} /> 
   
          <PrivateRoute exact path="/customer/index" component={CustomerIndex} /> 
          <PrivateRoute exact path="/customer/customerindexlist" component={CustomerIndexList} /> 
          <PrivateRoute exact path="/customer/customerprofile" component={CustomerProfile} /> 

          <PrivateRoute exact path="/template/allgrid" component={AllTemplateGrid} />   
          
          <PrivateRoute exact path="/template/updateindex" component={UpdateIndex} /> 
          
          <PrivateRoute exact path="/template/updatetemplate" component={UpdateTemplate} /> 

          <PrivateRoute exact path="/template/templatelist" component={AdminTemplateList} /> 
          
          <PrivateRoute exact path="/template/detail" component={TemplateDetail} />
          <PrivateRoute exact path="/template/seeresult" component={SeeResult} />

          <PrivateRoute exact path="/dataset/uplaoddata" component={UploadData} />
          <PrivateRoute exact path="/dataset/viewdata" component={ViewData} />
          <PrivateRoute exact path="/dataset/appenddata" component={AppendData} />
          <PrivateRoute exact path="/dataset/deletedatapoint" component={DeleteDataPoint} />
          <PrivateRoute exact path="/template/method" component={Method} /> 

          <PrivateRoute exact path="/category/viewall" component={ViewAllCategories} />

       
          <Footer />
        </div>
      </div>
    </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility,
     
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));