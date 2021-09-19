
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dropdown, Modal, Form } from 'react-bootstrap';
import CloseIcon from "../../assets/images/close@3x.png";
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import Noty from 'noty';

import { getCustomer, deleteUser } from '../../store/actions/CustomerActions';
class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isLoading: false,
      readOnly: false,
      selectedID: "",
      CustomerList: [],
      deletedItem: ""
    };


  }
  toggleModal = (customers) => {
    this.setState({ showModal: !this.state.showModal, deletedItem: customers })
  }
  toggleCloseModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  deleteItem = () => {

    if (this.state.deletedItem) {
      this.setState({ showModal: !this.state.showModal })
      this.props.deleteUser(this.state.deletedItem).then((res) => {
        console.log(res)
        if (res.status == "success") {
          this.setState(prevState => ({
            CustomerList: prevState.CustomerList.filter(arrayItem => arrayItem.UserId !== prevState.deletedItem.UserId),

          }))
          new Noty({
            text: "Deleted Successfully",
            layout: "topRight",
            theme: "bootstrap-v4",
            type: "success",
            timeout: 1000
          }).show();

          this.setState({
            deletedItem: ""
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }



  componentDidMount() {
    this.setState({ isLoading: true })
    this.props.getCustomer().then((res) => {
      this.setState({ isLoading: false })
      console.log(res.content.Customer)
      if (res.content && res.content.Customer.length)
        this.setState({ CustomerList: res.content.Customer })
    }).catch((err) => {
      this.setState({ isLoading: false })
      console.log(err)
    })
  }



  renderCustomer = () => {


    return this.state.CustomerList.map((customers, key) =>



      <tr key={customers.userId} className="trColor " >
        <th scope="row"> </th>
        <td> {customers.UserId}</td>
        <td> {customers.UserName}</td>
        <td>{customers.UserEmail}</td>
        <td>
          <span className=" badge badge-pill inventry-save" onClick={() => this.toggleModal(customers)}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
          <span className=" badge badge-pill inventry-save" onClick={() => this.props.history.push('/customer/customerprofile', { customer: customers })}>&nbsp;&nbsp; View &nbsp;&nbsp; </span>
          <span className=" badge badge-pill inventry-save" onClick={() => this.props.history.push('/customer/customerindexlist', { UserId: customers.UserId, UserName: customers.UserName })}>&nbsp;&nbsp; Index &nbsp;&nbsp; </span>
        </td>

      </tr>

    )
  }







  render() {

    const { isLoading } = this.state;





    return (


      <div>

        <div>
          <div className="row col-md-12 Container pl-0 pr-0">

            <Modal
              dialogClassName="col-sm-12"
              show={this.state.showModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >


              <div className="  modal-body">
                <div className=" text-right">
                  <img className="modal-close-icon" onClick={this.toggleModal} src={CloseIcon} />
                </div>
                <div className="text-center">
                  <h1 className="text-center mt-4 ">Delete Account</h1>

                  <p>Do you really want to delete these records? This process cannot be undone</p>
                  <div className="col-sm-12  mb-4  ">
                    <div className="row">
                      <div className="col-sm-3"></div>

                      <div className="col-sm-3">
                        <button class="submit-btn8 text-center" >Cancel</button>
                      </div>
                      <div className="col-sm-3">
                        <button class="submit-btn8 text-center" onClick={() => this.deleteItem()}>Delete</button>
                      </div>
                      <div className="col-sm-3"></div>
                    </div>

                  </div>
                </div>
              </div>


            </Modal>




            <div className="col-md-12 p-0">
              <div className="inventry-wrapper m-2 ">
                <div className="row">
                  <div className="col-sm-7">
                    <label className="SHOP-DETAILS p-0">CUSTOMER LIST</label>
                  </div>
                  <div className="col-sm-5">
                    <div className="       input-container ">
                      <input type="text" className=" SHOP-DETAILS   input-text   col-sm-11 " placeholder="Search Customer" />

                    </div>
                  </div>

                </div>
              </div>


              <div class="inventry-wrapper m-2">
                {isLoading ? <div className="loader-large"> </div> :
                  <div class="inventry-wrapper m-2">
                    {this.state.CustomerList.length > 0 ?
                      <div className="table-responsive ">
                        <table className="table table-hover thead-primary text-center">
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Customer ID  </th>
                              <th scope="col">Customer Name </th>
                              <th scope="col">Customer Email </th>
                              <th scope="col">Action </th>

                            </tr>
                          </thead>
                          <tbody>

                            {this.renderCustomer()}
                          </tbody>
                        </table>
                      </div>
                      : <div className="SHOP-DETAILS1  ">No Customers Found </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>


        </div>





      </div>


    )
  }

}

Customer.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
  getCustomer,
  deleteUser

})
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
