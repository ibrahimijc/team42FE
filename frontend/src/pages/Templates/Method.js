
import React, { Component } from 'react';

import { connect } from 'react-redux';
import CloseIcon from "../../assets/images/close@3x.png";
import { Dropdown, Modal, Form } from 'react-bootstrap';
import Noty from 'noty';
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import { getAllIndex, deleteTemplate, getAllTemplates } from '../../store/actions/templateActions';

import ImageUpload from "../../components/ImageUpload"
class Method extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: "1",
            isLoading: false,
            readOnly: false,
            selectedID: "",
            selectedItem: "",
            gridList: [],
            templeteList: [],
            deletedItem: "",
            imageURL: "",
            description: ""
        };

        this.handleClickNext = this.handleClickNext.bind(this);

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
        this.props.getAllIndex().then((res) => {
            this.setState({ isLoading: false })
            console.log(res)
            if (res.content && res.content.index)
                this.setState({ gridList: res.content.index })
        }).catch((err) => {
            this.setState({ isLoading: false })
            console.log(err)
        })

        this.props.getAllTemplates().then((res) => {
            this.setState({ isLoading: false })
            console.log(res)
            if (res.content && res.content.template)
                this.setState({ templeteList: res.content.template })
        }).catch((err) => {
            this.setState({ isLoading: false })
            console.log(err)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }


    handleClickNext(e) {


        if (this.state.value === '1') {
            console.log("Here")
            this.props.history.push('/template/detail', {
                "TempleteName": this.state.TempleteName,
                admin: false,
                "description": this.state.description,
                "imageURL": this.state.imageURL
            })
        } else if (this.state.value === '2' && this.state.selectedID) {
            var item = this.state.templeteList.find((element) => {
                return element.TempleteId == this.state.selectedID;
            })

            this.props.history.push('/template/detail', {
                index: item, admin: false, "TempleteName": this.state.TempleteName,
                "description": this.state.description,
                "imageURL": this.state.imageURL
            })
        }
    }



    renderSelect = () => {


        return (
            <div>
                <label class="Label-text col-sm-12 mt-3">Select Template</label>
                <div class="form-group">
                    <select id="2" value={this.state.selectedID} onChange={this.handleChange} class="form-control input-text mt-2  m-0  dropdwonclr2"
                        onChange={(e) => this.setState({ selectedID: e.target.value })}>
                        {this.renderTemplateName()}
                    </select>
                </div>
            </div>
        )
    }


    renderTemplateName = () => {
        return this.state.templeteList.map((template, key) =>

            <option value={template.TempleteId} >{template.TempleteName}</option>
        )
    }
    onImageUploaded = (url) => {
        this.setState({ imageURL: url })
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
                                        <label className="SHOP-DETAILS p-0">MY TEMPLATE</label>
                                    </div>


                                </div>
                            </div>


                            <div className="inventry-wrapper m-2 ">


                                <div className="col-sm-12 mt-2">
                                    <div className="row mt-2">
                                        {/* <div className="col-sm-4"></div> */}
                                        <div className="col-sm-4">
                                            <label className="SHOP-DETAILS1 ml-0 mt-2 ">Template Name</label>

                                            <input type="text" className="    input-text mt-2 mb-3  m-0 col-sm-12" name="TempleteName" onChange={(x) => this.setState({ "TempleteName": x.target.value })} />

                                            <label className="SHOP-DETAILS1 ml-0 mt-2">Description</label>

                                            <textarea type="text" className="    textboxx-text mt-2 mb-3  m-0 col-sm-12"
                                                rows={5} maxLength={500} onChange={(x) => this.setState({ description: x.target.value })}
                                            >{this.state.description}</textarea>
                                            <label class="SHOP-DETAILS1 ml-0 mt-2 pl-0 col-sm-12">Image</label>
                                            <div className=" ml-0  pl-0 col-sm-12     ">
                                                <ImageUpload onImageUploaded={this.onImageUploaded} containerClassName="m-0  pl-0 col-sm-12" />
                                            </div>



                                        </div>

                                    </div>
                                    <div className="text-right mb-4 pt-2 mr-4">
                                        <button class="submit-btn6 text-center" onClick={(e) => this.handleClickNext(e)}>Create Template</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        )
    }

}

Method.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
    getAllIndex,
    deleteTemplate,
    getAllTemplates
})
export default connect(mapStateToProps, mapDispatchToProps)(Method);
