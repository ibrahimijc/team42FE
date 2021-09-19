
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dropdown, Modal, Form } from 'react-bootstrap';
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import CloseIcon from "../../assets/images/close@3x.png";
import mapimg from "../../assets/images/people-10 (1).png";
import { getCustomer } from '../../store/actions/CustomerActions';
class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      "currency_code": "",
      "currency_name": "",
      "rate": "",
      "decimal": 0,
      "price_roundoff_formula": "",
      //Checkboxes Input
      "show_cost": false,
      "show_selling": false,
      "selling_is_cost_plus_markup": false,
      "use_as_purchase_cost": false,
      isLoading: false,
      readOnly: false,
      selectedID: "",
      CustomerList: []
    };


  }
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }


  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  renderCustomer = (customers) => {

    return (
  <div>
    
        <div key={customers.UserId} className="row">

        <div className=" mb-3">
                                    {/* <img src={customers.UserImage} alt="card_img "style={{"width":"390px", "height":"830px"}} /> */}
                                    <img src={mapimg} style={{ "width": "500px ", "height": "300px" }} />
                                  </div>



                                </div>
                                <div className="row">

                                  <div className="col-sm-6 p-0">
                                    <label class=" col-sm-12"><b className="ml-2">Email Address :</b></label>

                                  </div>
                                  <div className="col-sm-6 p-0">
                                    <p class=" col-sm-12">{customers.UserEmail}</p>

                                  </div>


                                </div>
                                 <div className="row">

                                  <div className="col-sm-6 p-0">
                                    <label class=" col-sm-12"><b className="ml-2">User Name :</b></label>

                                  </div>
                                  <div className="col-sm-6 p-0">
                                    <p class=" col-sm-12">{customers.UserName}</p>

                                  </div>


                                </div>
      
                        </div>


)
}


    

 
    //   <tr  className="trColor " >
    //     <th scope="row"> </th>
    //     <td> {customers.UserId}</td>
    //     <td> {customers.UserName}</td>
    //     <td>{customers.UserEmail}</td>
    //     <td><span className=" badge badge-pill inventry-save" >&nbsp;&nbsp;Edit &nbsp; &nbsp;</span>
    //       <span className=" badge badge-pill inventry-save" onClick={this.toggleModal}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
    //       <span className=" badge badge-pill inventry-save">&nbsp;&nbsp; View &nbsp;&nbsp; </span>
    //       <span className=" badge badge-pill inventry-save" onClick={() => this.props.history.push('/customer/customerindexlist',{UserId:customers.UserId ,UserName:customers.UserName} )}>&nbsp;&nbsp; Index &nbsp;&nbsp; </span>
    //     </td>

    //   </tr>
 
//     )
//   }







  render() {

    const { isLoading } = this.state;





    return (


        <div>
 
        <div>
 
          <div className="row col-md-12 Container pl-0 pr-0">
            <div className="col-md-12 p-0">
              <div className="inventry-wrapper m-2 ">
                <div className="row">
                  <div className="col-sm-7">
                    <label className="SHOP-DETAILS p-0">CUSTOMER TEMPLATE</label>
                  </div>
                  <div className="col-sm-5">
                    <div className="       input-container ">
                      <input type="text" className=" SHOP-DETAILS   input-text   col-sm-11 " placeholder="Search Index" />

                    </div>
                  </div>

                </div>
              </div>
              <div className="inventry-wrapper m-2 ">
                
             
             <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="row">

                      <div className=" col-sm-4 col-md-4 col-xs-4  col-lg-4 col-xl-4"></div>
                      <div className=" col-sm-4 col-md-4 col-xs-4  col-lg-4 col-xl-4">
                        <div class="card" >
                          <div className="m-0 ">
                            <div class="card-body p-0">
                              <div className="col-sm-12 ">
                    {this.props.location.state.customer &&  this.renderCustomer(this.props.location.state.customer)}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>    </div>
                        

                        </div>
                        </div>
                
                        
                        
                    
                        </div>
                       
                      </div>
               


    )
  }

}

CustomerProfile.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
  getCustomer
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
