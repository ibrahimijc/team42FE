
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dropdown, Form } from 'react-bootstrap';
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import { getAllTemplates } from '../../store/actions/templateActions';
import placeholder from "../../assets/images/placeholder.png";


class AllTemplateGrid extends Component {

  constructor(props) {
    super(props);
    this.state = {

      isLoading: false,
      readOnly: false,
      selectedID: "",
      gridList: []
    };


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




  rendorCategoryIndexMatric = (categorIndexMatricList) => {
    return categorIndexMatricList.map((matric, index) =>

      <div key={index} className="row">
        <div className=" col-sm-12">
          <div className="row mb-1">
            <div className=" col-md-8 col-sm-8  col-xs-8 col-lg-8  ml-2">
              <p class="card-text">&nbsp;&nbsp; Sub Metric </p>

            </div>
            <div className=" col-md-3 col-sm-3 col-xs-3 col-lg-3 ml-1">
              <p class="card-text"> {matric.Weight}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderCategory = (categoryList) => {
    return categoryList.map((category, index) =>

      <div>
        <div key={index} className="row">
          <div className=" col-sm-12">
            <div className="row mb-2 mt-2">
              <div className=" col-sm-8  ml-2">
                <p class="card-text font-weight-bold">&nbsp; {category.CategoryName} </p>

              </div>
              <div className=" col-sm-3  ">
                <p class="card-text font-weight-bold"> {category.Weight}</p>
              </div>
            </div>
          </div>
        </div>
        {category.indexcategory_matric && this.rendorCategoryIndexMatric(category.indexcategory_matric)}
      </div>
    )
  }

  renderTemplate = () => {
    return this.state.gridList.map((template, index) =>

    <div className=" col-sm-6 col-md-4 col-12  col-lg-3 col-xl-3 mb-3">
    <div class="card" >
      <div className="m-0 p-0 template-hieght">
        <div class="card-body p-0">
              <img src={template.Image ? template.Image : placeholder} style={{ "width": "100% ", "height": "150px" }} />
              <h5 class="card-title ml-1 mt-1">{template.TempleteName}</h5>
              <p class="card-text ml-1"><b>Description</b></p>

             
       

            </div>

 
            <div className=" col-sm-12 pl-2 pr-2 ">
                <p >{template.Description ? template.Description : "No Description Available for this Index"}</p>
 
              </div>

            {/* {template.indexCategory && this.renderCategory(template.indexCategory)} */}

          </div>
          <div class="card-body">
            <button class="submit-btn2 text-center" onClick={() => this.props.history.push('/template/detail', { index: template ,admin :false})}>SEE MORE</button>
          </div>
        </div>
      </div>


    )
  }


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
                    <label className="SHOP-DETAILS p-0">ADMIN TEMPLATE</label>
                  </div>
                  <div className="col-sm-5">
                    <div className="       input-container ">
                      <input type="text" className=" SHOP-DETAILS   input-text   col-sm-11 " placeholder="Search Index" />

                    </div>
                  </div>

                </div>
              </div>
               <div className="inventry-wrapper m-2 ">
                <div className="text-right mb-2 pt-2 mr-4">
                  <button class="submit-btn6 text-center" onClick={() => this.props.history.push('/template/method')}>Create New Template</button>
                </div>
                {
                  this.state.isLoading ? <div class="loader-large" role="status"> </div> :
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="row">
                        {this.state.gridList.length > 0 ? this.renderTemplate() :
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

AllTemplateGrid.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
  getAllTemplates
})
export default connect(mapStateToProps, mapDispatchToProps)(AllTemplateGrid);
