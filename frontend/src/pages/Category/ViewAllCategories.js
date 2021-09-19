
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dropdown, Modal, Form } from 'react-bootstrap';
import CloseIcon from "../../assets/images/close@3x.png";
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import { getCatagory, updateCatagory, deleteCategory ,postCatagory} from '../../store/actions/CatagoryAction';
import Noty from 'noty';
class ViewAllCategories extends Component {

  constructor(props) {
    super(props);
    this.state = {

       "MatricCategoryID": 1,

       "MatricCategoryName": "",

      isLoading: false,
      readOnly: false,
      selectedID: "",
      CatagoryList: [],
      deletedItem: "",
      editObject: {}
    };
    this.onEditCatagory = this.onEditCatagory.bind(this);
    this.onAddCatagory = this.onAddCatagory.bind(this);




  }

  toggleModal = (category) => {
    this.setState({ showModal: !this.state.showModal, deletedItem: category })
  }
  toggleEditModal = (category) => {
    this.setState({ editModal: !this.state.editModal, editObject: category })
  }
  toggleEditCloseModal = () => {
    this.setState({ editModal: !this.state.editModal })
  }
  toggleCloseModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }
  toggleAddModal = (category) => {
    this.setState({ addModal: !this.state.addModal, category })
  }
  toggleAddCloseModal = () => {
    this.setState({ addModal: !this.state.addModal })
  }

  deleteItem = () => {

    if (this.state.deletedItem) {
      this.setState({ showModal: !this.state.showModal })
      this.props.deleteCategory(this.state.deletedItem).then((res) => {
        console.log(res)
        if (res.status == "success") {
          this.setState(prevState => ({
            CatagoryList: prevState.CatagoryList.filter(arrayItem => arrayItem.MatricCategoryID !== prevState.deletedItem.MatricCategoryID),

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
    this.props.getCatagory().then((res) => {
      this.setState({ isLoading: false })
      console.log(res)
      if (res.content && res.content.category)
        this.setState({ CatagoryList: res.content.category })
    }).catch((err) => {
      this.setState({ isLoading: false })
      console.log(err)
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {



  }
  onAddCatagory() {
    console.log("store clocker");
    const catagoryData = {
      
      "MatricCategoryName": this.state.MatricCategoryName,
    };


    this.setState({ isProcessing: true })

    this.props.postCatagory(catagoryData).then(res => {
      this.setState({ isProcessing: false, addModal: false })
      

      if (res.status) {
        new Noty({
          text: "Succsessfully Update Catagory",
          layout: "topRight",
          theme: "bootstrap-v4",
          type: "success",
          timeout: 1000
        }).show();
        // this.props.history.push("/store/all")
      } else {
        new Noty({
          text: "Something went wrong",
          layout: "topRight",
          theme: "bootstrap-v4",
          type: "error",
          timeout: 1000
        }).show();
      }

    }).catch(err => {
      this.setState({ isProcessing: false })
      var validationError = {}
      var serverError = []
      if (err.hasOwnProperty('validation')) {
        err.validation.map(obj => {
          if (obj.hasOwnProperty('param')) {
            validationError[obj["param"]] = obj["msg"]
          } else {
            serverError = [...serverError, obj]
          }
        });
        this.setState({ errors: validationError });
        this.setState({ serverError: serverError });
      } else {
        this.setState({ serverError: [{ "msg": "server not responding" }] })
      }
    });

  }


  onEditCatagory() {
    console.log("store clocker");
    const catagoryData = {
      "MatricCategoryID": this.state.editObject.MatricCategoryID,
      "MatricCategoryName": this.state.editObject.MatricCategoryName
    };


    this.setState({ isProcessing: true })

    this.props.updateCatagory(catagoryData).then(res => {
      this.setState({ isProcessing: false, editModal: false })


      if (res.status) {
        new Noty({
          text: "Succsessfully Update Category",
          layout: "topRight",
          theme: "bootstrap-v4",
          type: "success",
          timeout: 1000
        }).show();
        // this.props.history.push("/store/all")
      } else {
        new Noty({
          text: "Something went wrong",
          layout: "topRight",
          theme: "bootstrap-v4",
          type: "error",
          timeout: 1000
        }).show();
      }

    }).catch(err => {
      this.setState({ isProcessing: false })
      var validationError = {}
      var serverError = []
      if (err.hasOwnProperty('validation')) {
        err.validation.map(obj => {
          if (obj.hasOwnProperty('param')) {
            validationError[obj["param"]] = obj["msg"]
          } else {
            serverError = [...serverError, obj]
          }
        });
        this.setState({ errors: validationError });
        this.setState({ serverError: serverError });
      } else {
        this.setState({ serverError: [{ "msg": "server not responding" }] })
      }
    });

  }







  renderCategory = () => {
    return this.state.CatagoryList.map((category, index) =>

      <tr key={index} className="trColor " >
        <th scope="row"> </th>

        <td> {category.MatricCategoryID}</td>
        <td>{category.MatricCategoryName}</td>

        <td>
          <span className=" badge badge-pill inventry-save" onClick={() => this.toggleEditModal(category)}>&nbsp;&nbsp; Edit &nbsp;&nbsp; </span>

          <span className=" badge badge-pill inventry-save" onClick={() => this.toggleModal(category)}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
        </td>

      </tr>


    )
  }

  onEditCategoryNameChange = (e) => {
    const { editObject } = this.state
    const { name, value } = e.target;

    editObject[name] = value
    this.setState({ editObject: editObject })
  }


  render() {

    const { isLoading } = this.state;





    return (


      <div>

        <div>

          <div className="row col-md-12 Container pl-0 pr-0">
            <Modal


              dialogClassName="col-sm-12"
              show={this.state.addModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >


              <div className="  modal-body">
                <div className=" text-right">
                  <img className="modal-close-icon" onClick={this.toggleAddCloseModal} src={CloseIcon} />
                </div>
                <div className="text-center">

                  <div className="col-sm-12  mb-4  ">
                    <div className="row">
                      <div className="col-sm-3">

                      </div>

                      <div className="col-sm-6">
                        <label class="Label-text col-sm-12">Category Name:</label>
                        <div className="       input-container ">

                        <input type="text" value={this.state.MatricCategoryName} className="   input-text  m-0 col-sm-12"  name="MatricCategoryName" onChange={(x) => this.setState({"MatricCategoryName":x.target.value})} />
                        </div>
                      </div>


                    </div>

                  </div>





                  <div className="col-sm-12  mb-4  ">
                    <div className="row">
                      <div className="col-sm-3"></div>

                      <div className="col-sm-3">
                        <button class="submit-btn8 text-center" onClick={this.toggleAddModal} >Cancel</button>
                      </div>
                      <div className="col-sm-3">
                        <button class="submit-btn8 text-center" onClick={() => this.onAddCatagory()}>Save</button>
                      </div>
                      <div className="col-sm-3"></div>
                    </div>

                  </div>
                </div>





              </div>


            </Modal>




            <Modal


              dialogClassName="col-sm-12"
              show={this.state.editModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >


              <div className="  modal-body">
                <div className=" text-right">
                  <img className="modal-close-icon" onClick={this.toggleEditCloseModal} src={CloseIcon} />
                </div>
                <div className="text-center">

                  <div className="col-sm-12  mb-4  ">
                    <div className="row">
                      <div className="col-sm-3"></div>

                      <div className="col-sm-6">
                        <label class="Label-text col-sm-12">Category Name:</label>
                        <div className="       input-container ">
                          <input value={this.state.editObject.MatricCategoryName} name="MatricCategoryName" onChange={this.onEditCategoryNameChange} type="text" className="    input-text  m-0 col-sm-12" />
                        </div>
                      </div>


                    </div>

                  </div>





                  <div className="col-sm-12  mb-4  ">
                    <div className="row">
                      <div className="col-sm-3"></div>

                      <div className="col-sm-3">
                        <button class="submit-btn8 text-center" onClick={this.toggleEditCloseModal} >Cancel</button>
                      </div>
                      <div className="col-sm-3">
                        <button class="submit-btn8 text-center" onClick={() => this.onEditCatagory()}>Save</button>
                      </div>
                      <div className="col-sm-3"></div>
                    </div>

                  </div>
                </div>





              </div>


            </Modal>


            <Modal


              dialogClassName="col-sm-12"
              show={this.state.showModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >


              <div className="  modal-body">
                <div className=" text-right">
                  <img className="modal-close-icon" onClick={this.toggleCloseModal} src={CloseIcon} />
                </div>
                <div className="text-center">

                  <h1 className="text-center mt-4 ">Delete Category</h1>

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
                    <label className="SHOP-DETAILS p-0">VIEW CATEGORY</label>
                  </div>
                  <div className="col-sm-5">
                    <div className="       input-container ">
                      <input type="text" className=" SHOP-DETAILS   input-text   col-sm-11 " placeholder="Search category" />

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


                    </div>
                  </div>
                </div>
                <div className="table-responsive ">
                  <table className="table table-hover thead-primary text-center">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">catagory ID  </th>
                        <th scope="col">catagory Name </th>
                        <th scope="col">Action </th>
                      </tr>
                    </thead>

                    <tbody>



                      {this.renderCategory()}


                    </tbody>

                  </table>
                </div>

              </div> */}

              <div className="inventry-wrapper m-2 ">
                <div className="text-right mb-2 pt-2 mr-4">
                  <button class="submit-btn6 text-center" onClick={() => this.toggleAddModal()}>Add Category</button>
                </div>

                {
                  this.state.isLoading ? <div class="loader-large" role="status"> </div> :
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="row">
                        {this.state.CatagoryList.length > 0 ? <div className="table-responsive ">
                          <table className="table table-hover thead-primary text-center">
                            <thead>
                              <tr>
                                <th scope="col"></th>
                                <th scope="col">Category ID  </th>
                                <th scope="col">Category Name </th>
                                <th scope="col">Action </th>
                              </tr>
                            </thead>

                            <tbody>



                              {this.renderCategory()}


                            </tbody>

                          </table>
                        </div> :
                          <div className="SHOP-DETAILS1  ">
                            No Category Found
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

ViewAllCategories.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
  getCatagory, deleteCategory, updateCatagory,postCatagory
})
export default connect(mapStateToProps, mapDispatchToProps)(ViewAllCategories);
