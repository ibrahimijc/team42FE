
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dropdown, Modal, Form } from 'react-bootstrap';
import CloseIcon from "../../assets/images/close@3x.png";
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import Noty from 'noty';

import { getCustomerIndex,deleteIndex } from '../../store/actions/indexActions';

import { addCurrency, getCurrency, updateCurrency, deleteCurrency, getAllCurrency } from '../../store/actions/currencyActions';
class CustomerIndexList extends Component {
    constructor(props) {
        super(props);
        this.state = {

         
           
 
            isLoading: false,
            readOnly: false,
            selectedID: "",
            currencyList: [],
            gridList: [],
            deletedItem:""
        };
    
    
      }
      toggleModal = (template) => {
        this.setState({ showModal: !this.state.showModal ,deletedItem:template  })
      }
      toggleCloseModal=()=>{
        this.setState({ showModal: !this.state.showModal    })
      }
      
      deleteItem = ()=>{
        
        if(this.state.deletedItem ){
          this.setState({ showModal: !this.state.showModal })
          this.props.deleteIndex(this.state.deletedItem ).then((res)=>{
            console.log(res)
            if (res.status == "success") {
            this.setState(prevState => ({
                gridList: prevState.gridList.filter(arrayItem => arrayItem.TempleteId !==  prevState.deletedItem.TempleteId),
       
          }))
          new Noty({
            text: "Deleted Successfully",
            layout: "topRight",
            theme: "bootstrap-v4",
            type: "success",
            timeout: 1000
        }).show();
    
         this.setState({
          deletedItem:""
         })
        }
          }).catch((err)=>{
            console.log(err)
          })
        }
      }
    
    componentDidMount() {

        if (this.props.location.state && this.props.location.state.UserId) {
            const { UserId } = this.props.location.state

            this.props.getCustomerIndex(UserId).then((res) => {
                console.log(res)
                if (res.content && res.content.index)
                    this.setState({ gridList: res.content.index })
            }).catch((err) => {
                console.log(err)
            })
        }
    }
  


    renderIndex = () => {
        return this.state.gridList.map((template,index, key) =>
            <tr key={template.TempleteId} className="trColor " >
                <th scope="row"> </th>

                <td> {template.TempleteId}</td>
                <td>{template.TempleteName}</td>

                <td><span className=" badge badge-pill inventry-save" onClick={() => this.props.history.push('/template/updateindex', { index: template })}>&nbsp;&nbsp;Edit &nbsp; &nbsp;</span>
                    <span className=" badge badge-pill inventry-save"onClick={()=> this.toggleModal(template)}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
                    <span className=" badge badge-pill inventry-save" onClick={() => this.props.history.push('/template/seeresult', { template: template })}>&nbsp;&nbsp; View &nbsp;&nbsp; </span>
                </td>

            </tr>
        )
    }



    render() {

        const { isLoading } = this.state;





        return (


            <div>
                {/* <div className="row col-md-12 Container pl-0 pr-0">
          <div className="col-md-12 p-0">

            <div className="inventry-wrapper m-2 ">
              <div className="row">
                <div className ="card">
                <div className="col-sm-6">
                  <label className="SHOP-DETAILS p-0">CUSTOMER LIST</label>
                </div>
                <div className="col-sm-6">
                
                    <input type="text" className=" margin-input  col-sm-10" />
                    </div>
                
        </div>
                </div>
              </div>
            </div>
          </div> */}
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

                                    <h1 className="text-center mt-4 ">Delete Index</h1>

                                    <p>Do you really want to delete these records? This process cannot be undone</p>
                                    <div className="col-sm-12  mb-4  ">
                                        <div className="row">
                                            <div className="col-sm-3"></div>

                                            <div className="col-sm-3">
                                                <button class="submit-btn8 text-center" >Cancel</button>
                                            </div>
                                            <div className="col-sm-3">
                                                <button class="submit-btn8 text-center"onClick={()=> this.deleteItem()}>Delete</button>
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
                                        <label className="SHOP-DETAILS p-0">Customer Index</label>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="       input-container ">
                                            <input type="text" className=" SHOP-DETAILS   input-text   col-sm-11 " placeholder="Search Customer Index" />

                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="inventry-wrapper m-2 ">
                                <div className="SHOP-DETAILS1  ">
                                    {this.props.location.state ? this.props.location.state.UserName : ""}

                                </div>



                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-8">

                                        </div>


                                    </div>
                                </div>
                                <div className="table-responsive ">
                                    <table className="table table-hover thead-primary text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Index ID  </th>
                                                <th scope="col">Index Name </th>
                                                <th scope="col">Action </th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {this.renderIndex()}

                                        </tbody>

                                    </table>
                                </div>

                            </div>







                        </div>




                    </div>





                </div>


            </div>

        )
    }

}

CustomerIndexList.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
    getCustomerIndex,
    deleteIndex
})
export default connect(mapStateToProps, mapDispatchToProps)(CustomerIndexList);
