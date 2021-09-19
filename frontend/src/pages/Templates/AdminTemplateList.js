
import React, { Component } from 'react';

import { connect } from 'react-redux';
import CloseIcon from "../../assets/images/close@3x.png";
import { Dropdown, Modal, Form } from 'react-bootstrap';
import Noty from 'noty';
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import { getAllTemplates, deleteTemplate } from '../../store/actions/templateActions';

class AdminTemplateList extends Component {

  constructor(props) {
    super(props);
    this.state = {

      isLoading: false,
      readOnly: false,
      selectedID: "",
      gridList: [],
      deletedItem: ""
    };


  }
  toggleModal = (template) => {
    this.setState({ showModal: !this.state.showModal, deletedItem: template })
  }
  toggleCloseModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  deleteItem = () => {

    if (this.state.deletedItem) {
      this.setState({ showModal: !this.state.showModal })
      this.props.deleteTemplate(this.state.deletedItem).then((res) => {
        console.log(res)
        if (res.status == "success") {
          this.setState(prevState => ({
            gridList: prevState.gridList.filter(arrayItem => arrayItem.TempleteId !== prevState.deletedItem.TempleteId),

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
    this.props.getAllTemplates().then((res) => {
      this.setState({ isLoading: false })
      console.log(res)
      if (res.content && res.content.template)
        this.setState({ gridList: res.content.template })
    }).catch((err) => {
      this.setState({ isLoading: false })
      console.log(err)  
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {


  }





  renderTemplate = () => {
    return this.state.gridList.map((template, key) =>

      <tr className="trColor " >
        <th scope="row"> </th>

        <td> {template.TempleteId}</td>
        <td>{template.TempleteName}</td>

        <td><span className=" badge badge-pill inventry-save" onClick={() => this.props.history.push('/template/detail', { index: template ,admin :false })}>&nbsp;&nbsp;Edit &nbsp; &nbsp;</span>
          <span className=" badge badge-pill inventry-save" onClick={() => this.toggleModal(template)}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
          <span className=" badge badge-pill inventry-save" onClick={() => this.props.history.push('/template/seeresult', { template: template  })}>&nbsp;&nbsp; Result &nbsp;&nbsp; </span>
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

                  <h1 className="text-center mt-4 ">Delete Template</h1>

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
                    <label className="SHOP-DETAILS p-0">ADMIN TEMPLATE</label>
                  </div>
                  <div className="col-sm-5">
                    <div className="       input-container ">
                      <input type="text" className=" SHOP-DETAILS   input-text   col-sm-11 " placeholder="Search Index" />

                    </div>
                  </div>

                </div>
              </div>

              {/* <div class="inventry-wrapper m-2">

                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-8">

                    </div>

                    <div className="col-sm-4">

                      <div className="text-right mb-2 mt-4">
                        <button class="submit-btn5 text-center" onClick={() => this.props.history.push('/template/detail')}>Create New Template</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="table-responsive ">
                  <table className="table table-hover thead-primary text-center">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Template ID  </th>
                        <th scope="col">Template Name </th>
                        <th scope="col">Action </th>
                      </tr>
                    </thead>

                    <tbody>



                      {this.renderTemplate()}


                    </tbody>

                  </table>
                </div>

              </div> */}
              <div className="inventry-wrapper m-2 ">
                <div className="text-right mb-2 pt-2 mr-4">
                  <button class="submit-btn6 text-center" onClick={() => this.props.history.push('/template/method')}>Create New Template</button>
                </div>
                {
                  this.state.isLoading ? <div class="loader-large" role="status"> </div> :
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="row">
                        {this.state.gridList.length > 0 ? <div className="table-responsive ">
                          <table className="table table-hover thead-primary text-center">
                            <thead>
                              <tr>
                                <th scope="col"></th>
                                <th scope="col">Template ID  </th>
                                <th scope="col">Template Name </th>
                                <th scope="col">Action </th>
                              </tr>
                            </thead>

                            <tbody>



                              {this.renderTemplate()}


                            </tbody>

                          </table>
                        </div> :
                          <div className="SHOP-DETAILS1  ">
                            No Templete Found
                        </div>
                        }
                      </div>
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

AdminTemplateList.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
  getAllTemplates,
  deleteTemplate
})
export default connect(mapStateToProps, mapDispatchToProps)(AdminTemplateList);
