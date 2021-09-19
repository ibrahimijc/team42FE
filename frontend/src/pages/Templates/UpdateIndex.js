
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dropdown, Form, Modal } from 'react-bootstrap';

import MatricSearch from '../../components/MatricSearch.js';
import CloseIcon from "../../assets/images/close@3x.png";
import {   updateTemplate} from '../../store/actions/templateActions';

import { v4 } from 'uuid';
import Noty from 'noty';

class TemplateDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TempleteName: "",
      isLoading: false,
      filter_items: [{ "unique_key": v4(), "MatricsName": "", "MatricsId": "", "FilterTypeId": "1", "FilterValue": "" }],
      matric_items: [{ "unique_key": v4(), "Matric": 1, "Weight": "", "Method": "" }],
      Catagory_items: [],
      selectedItem: "",
      selectedIndexCategory: "",
      totalWeight: 0,
      imageURL:"",
      description:""
    };
    this.renderfilter = this.renderfilter.bind(this)
    this.rendermatric = this.rendermatric.bind(this)
    this.rendercatagory = this.rendercatagory.bind(this)
    this.onFilterMatricSearchChange = this.onFilterMatricSearchChange.bind(this)
 
  }

  componentDidMount() {

    if (this.props != null && this.props.location.state != null && this.props.location.state.index) {

      const { index } = this.props.location.state;

      this.setState({ TempleteId: index.TempleteId, TempleteName: index.TempleteName })
      var filter_items = [];
      console.log(index)
      for (var j = 0; j < index.filters.length; j++) {
        var item = index.filters[j].FilterId;
        filter_items = [...filter_items, {
          "unique_key": v4(),
          "FilterID": index.filters[j].FilterId,
          "FilterValue": index.filters[j].FilterValue,
          "Operator": index.filters[j].filters.Operator,
          "FilterTypeId": index.filters[j].FilterTypeId,
          "MatricsName": index.filters[j].matric.MatricsName,
          "MatricsId": index.filters[j].matric.MatricId,
        }]
      }
      console.log(filter_items)
      var category_items = []
    
      for (var i = 0; i < index.indexCategory.length; i++) {



        var matric_list = []
        for (var j = 0; j < index.indexCategory[i].indexcategory_matric.length; j++) {
          matric_list = [...matric_list, {
            "unique_key": v4(),
            "CategoryMatricId": index.indexCategory[i].indexcategory_matric[j].CategoryMatricId,
            "Method": index.indexCategory[i].indexcategory_matric[j].Method,
            "Weight": index.indexCategory[i].indexcategory_matric[j].Weight,

            "MatricsId": index.indexCategory[i].indexcategory_matric[j].Matric.MatricId,
            "MatricsName": index.indexCategory[i].indexcategory_matric[j].Matric.MatricsName
          }]
        }

        console.log(matric_list)
        category_items = [...category_items, {
          "unique_key": v4(),
          "CategoryName": index.indexCategory[i].CategoryName,
          "IndexCategoryId": index.indexCategory[i].IndexCategoryId,
          "Weight": index.indexCategory[i].Weight,
          "Matric": matric_list
        }]
      }
      this.setState({ filter_items: filter_items })
      this.setState({ Catagory_items: category_items })


    }
  }
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  handleAddcatagoryItem = () => {
    var total = this.state.totalWeight
    var newWeight = 0
    if (total < 100) {
      newWeight = 100 - total
      total = total + newWeight;
    }
    this.setState({
      Catagory_items: ([...this.state.Catagory_items, { "unique_key": v4(), "CategoryName": "", "Weight": newWeight, "Matric": [], total: 0 }]),
      totalWeight: total
    });
  };
  handleRemoveCatagoryItem = (idx) => {
    var total = 0;
    const newCategoryItems = this.state.Catagory_items.map((item, sidx) => {
      if (idx !== sidx) {
        total = Number(total) + Number(item.Weight, 10);
        return item;
      }
    });
    this.setState(prevState => ({
      Catagory_items: prevState.Catagory_items.filter((s, index) => idx !== index), totalWeight: total
    }))
  };
  handleCatagoryItemChange = (idx, evt) => {
    // console.log(idx)
    console.log(evt.target.value);
    var total = 0;
    const newCategoryItems = this.state.Catagory_items.map((item, sidx) => {
      if (idx !== sidx) {
        total = Number(total) + Number(item.Weight, 10);
        return item;
      }
      if (isNaN(evt.target.value) || !evt.target.value )
        total = Number(total) + Number(item.Weight, 10);
      else
        total = Number(total) + Number(evt.target.value, 10);
      return { ...item, [evt.target.name]: evt.target.value };
    });
    console.log("Total : ", total)
    this.setState({ Catagory_items: newCategoryItems, totalWeight: total });
  };

  rendercatagory() {
    return this.state.Catagory_items.map((item, idx) =>
      <div key={item.unique_key} className="">

        <div>
          <div className="col-sm-12 col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="row">
              <div className="col-sm-4  col-xl-4 col-lg-4 col-md-4 col-4">
                <label class="Label-text col-sm-12">Category Name</label>
                <div className="input-container">
                  <input type="text" className="input-text  m-0 col-sm-12" name="CategoryName" value={item.CategoryName}
                    onChange={(e) => this.handleCatagoryItemChange(idx, e)} />
                </div>
              </div>
              <div className="col-sm-6 col-xl-2 col-lg-2 col-md-6 col-6">
                <label class="Label-text col-sm-12" >Weight</label>
                <div className="input-container">
                  <input type="text" className="input-text  m-0 col-sm-12"
                    name="Weight" value={item.Weight}
                    onChange={(e) => this.handleCatagoryItemChange(idx, e)}
                  />
                  <span className=" badge badge-pill ml-4 mt-2 inventry-save " onClick={() => this.handleRemoveCatagoryItem(idx)}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
                </div>
              </div>


            </div>
          </div>
          <div className="col-sm-12">
            <label className="SHOP-DETAILS3">Metric</label>
            {this.rendermatric(item.Matric, idx)}
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-7">
                  <div className="text-left mt-2 mr-5 ml-4">
                    {item.total < 100 && <p className="weight-yellow"> Metric Weight  {item.total} </p>}
                    {item.total == 100 && <p className="weight-green"> Perfect {item.total} </p>}
                    {item.total > 100 && <p className="weight-red"> Metric Weight  {item.total} </p>}


                  </div>
                </div>
                <div className="col-sm-4">
                  <div className=" mt-2 mr-5">
                    <button class="submit-btn2 text-center" onClick={() => this.handleAddMatricItem(idx)} >&nbsp; &nbsp; Add Metric &nbsp; &nbsp;</button>
                  </div>
                </div>
              </div>
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    )

  }




  handleAddFilterItem = () => {

    this.setState({
      filter_items: ([...this.state.filter_items, { "unique_key": v4(), "MatricsName": "", "MatricsId": "", "FilterTypeId": "1", "FilterValue": "" }])
    });
  };
  handleRemoveFilterItem = (idx) => {
    this.setState(prevState => ({
      filter_items: prevState.filter_items.filter((s, index) => idx !== index)
    }))
  };
  handleFilterItemChange = (idx, evt) => {
    console.log(idx)
    console.log(evt.target.value)
    const newDealItems = this.state.filter_items.map((item, sidx) => {
      if (idx !== sidx) return item;
      return { ...item, [evt.target.name]: evt.target.value };
    });
    this.setState({ filter_items: newDealItems });
  };

  onFilterSearchClick = (index) => {
    this.setState({ showModal: true, selectedItem: index, selectedIndexCategory: "" }, () => {

    })
  }
  onMatricSearchClick = (categoryIndex, selectedItem) => {
    console.log(categoryIndex)
    this.setState({ showModal: true, selectedItem: selectedItem, selectedIndexCategory: categoryIndex }, () => {
    })
  }
  renderfilter() {
    return this.state.filter_items.map((item, idx) =>
      <div key={item.unique_key} className="row">
        <div className="col-sm-3">
          <label class="Label-text col-sm-12">Metric</label>
          <div className="       input-container ">
            <input type="text" className="    input-text  m-0 col-sm-12" onClick={() => this.onFilterSearchClick(idx)} value={item.MatricsName} readOnly={true} />
          </div>
        </div>
        <div className="col-sm-2">
          <label class="Label-text col-sm-12 ml-0">Filter Type</label>
          <div class="form-group">
            <select id="2" class="form-control input-text   m-0  dropdwonclr2" name="FilterTypeId" onChange={(e) => this.handleFilterItemChange(idx, e)} value={item.FilterTypeId}>
              <option value="1">{">"}</option>
              <option value="2">{"<"}</option>
              <option value="3">{"="}</option>
            </select>
          </div>
        </div>
        <div className="col-sm-3">
          <label class="Label-text col-sm-12">Value</label>
          <div className="       input-container ">
            <input type="number" min={1} onChange={(e) => this.handleFilterItemChange(idx, e)} name="FilterValue" value={item.FilterValue} className="    input-text  m-0 col-sm-12" />
            <span className=" badge badge-pill ml-4 mt-2 inventry-save" onClick={() => this.handleRemoveFilterItem(idx)}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
          </div>
        </div>

      </div>
    )
  }


  handleAddMatricItem = (categoryID) => {

    const newCategoryItems = this.state.Catagory_items.map((item, sidx) => {

      if (categoryID !== sidx) return item;
      else {
        var total = item.total
        var newItemWeight = 0
        if (total < 100) {
          newItemWeight = 100 - total
          total = total + newItemWeight
        }
        item.Matric = [...item.Matric, { "unique_key": v4(), "MatricsName": "", "MatricsId": "", "Weight": newItemWeight, "Method": "POSITIVE" }]
        item.total = total
      }
      return item;
    });
    this.setState({
      Catagory_items: newCategoryItems
    });

  };

  handleChangeMatricItem = (categoryIndex, matricIndex, evt) => {

    const newCategoryItems = this.state.Catagory_items.map((item, sidx) => {
      if (categoryIndex !== sidx) return item;

      var total = 0;
      const Matric = item.Matric.map((item, sidx) => {

        if (matricIndex !== sidx) {
          total = Number(total, 10) + Number(item.Weight, 10)
          return item
        };
        if (isNaN(evt.target.value)  )
          total = Number(total, 10) + Number(item.Weight, 10)
        else
          total = Number(total, 10) + Number(evt.target.value, 10)
        return { ...item, [evt.target.name]: evt.target.value };
      });

      return {
        ...item,
        Matric: Matric,
        total: total
      };
    });
    this.setState({
      Catagory_items: newCategoryItems
    })
  };


  handleRemoveMatricItem = (categoryIndex, matricIndex) => {

    console.log(categoryIndex)
    const newCategoryItems = this.state.Catagory_items.map((item, sidx) => {
      if (categoryIndex !== sidx) return item;

      var total = 0
      item.Matric.map((item, idx) => {
        if (matricIndex !== idx) {
          total = total + Number(item.Weight, 10);
        }
      })
      const Matric = item.Matric.filter((s, index) => matricIndex !== index);
      return {
        ...item,
        Matric: Matric,
        total: total
      };
    });
    this.setState({
      Catagory_items: newCategoryItems
    })

  };


  rendermatric(matricList, categoryIndex) {


    return matricList.map((item, idx) =>
      <div key={item.unique_key} className="row">


        <div className="col-sm-1">
        </div>
        <div className="col-sm-3">
          <label class="Label-text col-sm-12">Metric</label>
          <div className="       input-container ">
            <input type="text" className="input-text mt-2 m-0 col-sm-12" onClick={() => this.onMatricSearchClick(categoryIndex, idx)} value={item.MatricsName} readOnly={true} />
          </div>
        </div>
        <div className="col-sm-2">
          <label class="Label-text col-sm-12">Weight</label>
          <div className="input-container ">
            <input type="text" className="input-text mt-2  m-0 col-sm-12" value={item.Weight} name="Weight" onChange={(e) => this.handleChangeMatricItem(categoryIndex, idx, e)} />
          </div>
        </div>

        <div className="col-sm-2">
          <label class="Label-text col-sm-12 p-0 ml-2">Method</label>
          <div class="form-group">
            <select id="2" class="form-control input-text mt-2  m-0  dropdwonclr2" value={item.Method}
              name="Method"
              onChange={(e) => this.handleChangeMatricItem(categoryIndex, idx, e)}
            >
              <option value={"POSITIVE"}>POSITIVE</option>
              <option value={"NEGATIVE"}>NEGATIVE</option>
            </select>
          </div>

        </div>
        <div className="col-sm-3">
          <label class="Label-text col-sm-12">&nbsp;</label>
          <span className=" badge badge-pill ml-1 mt-3 inventry-save" onClick={() => this.handleRemoveMatricItem(categoryIndex, idx)} >&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
        </div>
      </div>
    )

  }
  // <label className="SHOP-DETAILS1">Index Name</label>
  //               <div className="       input-container ">
  //                 <input type="text" className="    input-text mt-2 mb-3  m-0 col-sm-4" value={this.props.location.state.index.TempleteName} />

  //                 {/* {this.props.location.state.index.TempleteName } */}
  //                 <hr></hr>
  //               </div>


  updateTemplate = () => {
    
    const data = {
      "TempleteId": this.state.TempleteId,
      "TempleteName": this.state.TempleteName,
      "Image":this.state.imageURL,
      "Description":this.state.description,
      "Filter": this.state.filter_items,
      "Category": this.state.Catagory_items
    }
    console.log(data)
    this.props.updateTemplate(data).then((res) => {
      if (res.status && res.status == "success") {
        new Noty({
          text: "Succsessfully Created Template",
          layout: "topRight",
          theme: "bootstrap-v4",
          type: "success",
          timeout: 1000
        }).show();
        this.props.history.push("/customer/index")

      } else {
        new Noty({
          text: "Something went wrong",
          layout: "topRight",
          theme: "bootstrap-v4",
          type: "error",
          timeout: 1000
        }).show();
      }

    }).catch((err) => {
      console.log(err)
    })
  }

  onFilterMatricSearchChange(index, categoryIndex, result) {
    console.log(result)
    console.log(categoryIndex)
    if (categoryIndex !== "") {
      const newCategoryItems = this.state.Catagory_items.map((item, sidx) => {
        if (categoryIndex !== sidx) return item;

        const Matric = item.Matric.map((item, sidx) => {
          if (index !== sidx) return item;
          return { ...item, MatricsName: result.MatricsName, MatricsId: result.MatricId };
        });

        return {
          ...item,
          Matric: Matric,
        };
      });
      this.setState({
        Catagory_items: newCategoryItems
      })
    } else {
      const newFilterItem = this.state.filter_items.map((item, sidx) => {
        if (index !== sidx) return item;
        return { ...item, MatricsName: result.MatricsName, MatricsId: result.MatricId };
      });
      this.setState({ filter_items: newFilterItem });
    }
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
                <div className="text-center ">
                  <div className="col-sm-12 mb-3">
                    <div className="row">

                      <div className="col-sm-9 ">
                        <MatricSearch
                          parentToggle={this.onFilterMatricSearchChange}
                          index={this.state.selectedItem}
                          categoryIndex={this.state.selectedIndexCategory}
                        />
                      </div>
                      <div className="col-sm-2">
                        <button class="submit-btn10 " onClick={this.toggleModal} >Select</button>
                      </div>
                      <div className="col-sm-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>



            <div className="col-md-12 p-0">
              <div className="inventry-wrapper m-2 ">
                <div className="row">
                  <div className="col-sm-7">
                    <input className="SHOP-DETAILS input-text pl-3" onChange={(x) => this.setState({ "TempleteName": x.target.value })} value={this.state.TempleteName} placeholder="Index Name" />
                  </div>

                </div>
              </div>
              <div className="inventry-wrapper m-2 ">
                {/* <label className="SHOP-DETAILS1">Index Name</label>
                <div className="       input-container ">
                  <input type="text" className="    input-text mt-2 mb-3  m-0 col-sm-4" value={this.state.TempleteName} name="TempleteName" onChange={(x) => this.setState({ "TempleteName": x.target.value })} />


                  <hr></hr>
                </div> */}


                <label className="SHOP-DETAILS1 mt-3">Filter</label>
                <div className="col-sm-12">
                  {this.renderfilter()}
                  <div className="text-right mt-2 mr-5">
                    <button class="submit-btn2 text-center" onClick={() => this.handleAddFilterItem()}>&nbsp; &nbsp; Add Filter &nbsp; &nbsp;</button>
                  </div>
                </div>

                <hr></hr>

                <label className="SHOP-DETAILS1">Categories</label>
                {this.rendercatagory()}
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-9 p-0">
                      <div className="text-left mt-2 mr-5 ml-4">
                        {this.state.totalWeight < 100 && <p className="weight-yellow"> Category Weight  {this.state.totalWeight} </p>}
                        {this.state.totalWeight == 100 && <p className="weight-green"> Perfect {this.state.totalWeight} </p>}
                        {this.state.totalWeight > 100 && <p className="weight-red"> Category Weight  {this.state.totalWeight} </p>}
                      </div>
                    </div>
                    <div className="col-lg-3 p-0">
                      <div className="text-right mt-2 mr-5">
                        <button class="submit-btn2 text-center" onClick={() => this.handleAddcatagoryItem()}>&nbsp; &nbsp; Add Category &nbsp; &nbsp;</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right mt-2 mr-5">
                <button class="submit-btn2 text-center" onClick={() => this.updateTemplate()}>&nbsp; &nbsp; Submit &nbsp; &nbsp;</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }

}

TemplateDetail.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
   updateTemplate
})
export default connect(mapStateToProps, mapDispatchToProps)(TemplateDetail);


{/* <div className="col-sm-12">
                  <div className="row">

                    <div className="col-sm-3 "></div>
                    <div className="col-sm-5  ">
                      <div className="marginrr" >

                        <p className="mb-0"><b className="ml-1 ">Economic Data</b></p>
                        <div className=" ml-2"> GDP</div>
                        <div className=" ml-2">FDI</div>

                        <p className="mb-0  "><b className="ml-1 "  >Catagories 2</b></p>
                        <div className="ml-2">Seaside</div>
                        <div className="ml-2">Offshare</div>
                        <div className="ml-2">Tax</div>
                      </div>

                    </div>
                    <div className="col-sm-2"></div>
                  </div>
                </div> */}