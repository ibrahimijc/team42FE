import React from 'react';
 
import PrivateRoute from '../../utils/PrivateRoute';
import Customer from './Customer';
import ViewCustomer from './ViewCustomer'
import CustomerIndexList from './CustomerIndexList'
const Dashboard = ({match}) => (
    <div className="content">
      <PrivateRoute path={`${match.url}/viewcustomer`} component={Customer} />
      <PrivateRoute path={`${match.url}/index`} component={ViewCustomer} />
      <PrivateRoute path={`${match.url}/customerindexlist`} component={CustomerIndexList} />
    </div>
  );
  
  export default Dashboard;
 
 
 