import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import cx from 'classnames';



class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">

        <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/" >
          <i className="material-icons fs-16">dashboard</i>
             <p>Dashboard</p>
          </Link>
        </li>

        <li className="heading">
          <span  >Customer</span>
        </li>



        <li className={location.pathname === '/customer/all' ? 'active' : null}>
          <Link to="/customer/all">
          <i className="material-icons fs-16">group</i>
            <p>All Customers</p>
          </Link>
        </li>

        <li className={location.pathname === '/customer/index' ? 'active' : null}>
          <Link to="/customer/index">
          <i className="material-icons fs-16">list</i>
            <p>All Customers Index Grid</p>
          </Link>
        </li>

        {/* <li className={cx("list-drop-down", { ["active"]: this.isPathActive('/template') && !this.state.templateMenuOpen, ["active-dropdown"]: this.state.templateMenuOpen })}>
          <a onClick={() => this.setState({ templateMenuOpen: !this.state.templateMenuOpen })}
            data-toggle="collapse">
            {/* <i  ><img src={this.isPathActive('/template') && !this.state.templateMenuOpen ? CART_WHITE : CART}></img></i> 
            <p>
              Template
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.templateMenuOpen}>
            <div>



              <ul className="nav">
                <li className={this.isPathActive('/template/allgrid') ? 'active' : null}>
                  <Link to="/template/allgrid">Admin Templates Grid</Link>
                </li>
                <li className={this.isPathActive('/template/templatelist') ? 'active' : null}>
                  <Link to="/template/templatelist">Admin Templates List</Link>
                </li>

              </ul>
            </div>
          </Collapse>
        </li>
 */}



        <li className="heading">
          <span  >Templates</span>
        </li>

   

        <li className={location.pathname === '/template/allgrid' ? 'active' : null}>
          <Link to="/template/allgrid">
          <i className="material-icons fs-16">list</i>
            <p>Admin Templates Grid</p>
          </Link>
        </li>
        <li className={location.pathname === '/template/templatelist' ? 'active' : null}>
          <Link to="/template/templatelist">
          <i className="material-icons fs-16">list</i>
            <p>Admin Templates List</p>
          </Link>
        </li>

       

        <li className="heading">
          <span  >Data Sets</span>
        </li>

        <li className={location.pathname === '/dataset/uplaoddata' ? 'active' : null}>
          <Link to="/dataset/uplaoddata">
          <i className="material-icons fs-16">publish</i>
            <p>Upload Data</p>
          </Link>
        </li>

        <li className={location.pathname === '/dataset/viewdata' ? 'active' : null}>
          <Link to="/dataset/viewdata">
          <i className="material-icons fs-16">table_view</i>
            <p>View Data</p>
          </Link>
        </li>

        {/* <li className={location.pathname === '/dataset/appenddata' ? 'active' : null}>
          <Link to="/dataset/appenddata">
            <i > </i>
            <p>Append Data</p>
          </Link>
        </li> */}
        
        <li className={location.pathname === '/dataset/deletedatapoint' ? 'active' : null}>
          <Link to="/dataset/deletedatapoint">
          <i className="material-icons fs-16">delete_sweep</i>
            <p>Delete Data Point</p>
          </Link>
        </li>

        <li className="heading">
          <span  >Category</span>
        </li>
        <li className={location.pathname === '/category/viewall' ? 'active' : null}>
          <Link to="/category/viewall">
            <i > </i>
            <p>View All</p>
          </Link>
        </li>

      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);