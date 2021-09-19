
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dropdown, Form } from 'react-bootstrap';
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import { v4 } from 'uuid';
import {  updateTemplate } from '../../store/actions/templateActions';
import MatricSearch from '../../components/MatricSearch.js';

class TemplateDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TempleteId:"",
      TempleteName:"",
      isLoading: false,
      filter_items: [{ "unique_key": v4(), "FilterID": "", "FilterValue": "", "Value": "" }],
      matric_items: [{ "unique_key": v4(), "Matric": 1, "Weight": ">", "Negative": 1 }],
      Catagory_items: [{ "unique_key": v4(), "CategoryName": 1, "Weight": ">", "Matric": [] }],
    };
    this.renderfilter = this.renderfilter.bind(this)
    this.rendermatric = this.rendermatric.bind(this)
    this.rendercatagory = this.rendercatagory.bind(this)


  }

  componentDidMount() {

    if (this.props != null && this.props.location.state != null && this.props.location.state.index) {

      const { index } = this.props.location.state;
      
      this.setState({ TempleteId :index.TempleteId,TempleteName:index.TempleteName })
      var filter_items = [];
      console.log(index)
      for (var j = 0; j < index.filters.length; j++) {
        var item = index.filters[j].FilterId;
        filter_items = [...filter_items, { 
         "unique_key": v4(),
         "FilterID": index.filters[j].FilterId, 
         "FilterValue": index.filters[j].FilterValue, 
         "Operator": index.filters[j].filters.Operator,
        "FilterTypeId":index.filters[j].FilterTypeId,
        "MatricsName":index.filters[j].matric.MatricsName,
        "MatricsId":index.filters[j].matric.MatricId,
        }]
      }
      console.log(filter_items)
      var category_items = []
      //  Catagory_items: [{ "unique_key": v4(), "Catagory": 1, "Weight": ">", "Matric": [] }],
      for (var i = 0 ; i< index.indexCategory.length;i++){
      


        var matric_list = []
        for (var j=0;j< index.indexCategory[i].indexcategory_matric.length;j++){
          matric_list =[ ...matric_list , {
            "unique_key": v4(),
            "CategoryMatricId": index.indexCategory[i].indexcategory_matric[j].CategoryMatricId,
             "Method": index.indexCategory[i].indexcategory_matric[j].Method,
             "Weight": index.indexCategory[i].indexcategory_matric[j].Weight,
        
            "MatricsId":index.indexCategory[i].indexcategory_matric[j].Matric.MatricId,
            "MatricsName":index.indexCategory[i].indexcategory_matric[j].Matric.MatricsName
          } ] 
        }

        console.log(matric_list)
        category_items = [...category_items, { 
          "unique_key": v4(),
          "CategoryName": index. indexCategory[i] .CategoryName, 
          "IndexCategoryId": index. indexCategory[i] .IndexCategoryId, 
          "Weight": index. indexCategory [i].Weight, 
          "Matric":matric_list
         }]
      }
      this.setState({filter_items:filter_items})
      this.setState( {Catagory_items :category_items } )

     
    }
  }



  componentDidUpdate(prevProps, prevState, snapshot) {


  }


  updateIndex = ()=>{
      var data = {
        "TempleteId":this.state.TempleteId,
        "TempleteName":this.state.TempleteName,
        "Filter":this.state.filter_items,
        "Category":this.state.Catagory_items
      }
      console.log(data)

    this.props.updateTemplate(data).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  handleAddcatagoryItem = () => {
    this.setState({
      Catagory_items: ([...this.state.Catagory_items, { "unique_key": v4(), "Catagory": 1, "Weight": ">", "Matric": [] }])
    });
  };
  handleRemoveCatagoryItem = (idx) => {
    this.setState(prevState => ({
      Catagory_items: prevState.Catagory_items.filter((s, index) => idx !== index)
    }))
  };
  handleCatagoryItemChange = (idx, evt) => {
    console.log(idx)
    console.log(evt.target.value)
    const newDealItems = this.state.filter_items.map((item, sidx) => {
      if (idx !== sidx) return item;
      return { ...item, [evt.target.name]: evt.target.value };
    });
    this.setState({ filter_items: newDealItems });
  };

  rendercatagory() {
    return this.state.Catagory_items.map((item, idx) =>
      <div key={item.unique_key} className="row">

        <div>

          <div className="col-sm-12">

            <div className="row">

              <div className="col-sm-3">
                <label class="Label-text col-sm-12">Catagories</label>
                <div className="       input-container ">
                  <input type="text" className=" input-text  m-0 col-sm-12" value = {item.CategoryName } />
                </div>
              </div>

              <div className="col-sm-2">
                <label class="Label-text col-sm-12">Weight</label>
                <div className="       input-container "  >
                  <input type="text" className="    input-text  m-0 col-sm-12"  value = { item.Weight } />
                  <span className=" badge badge-pill ml-2 mt-2 inventry-save">&nbsp;&nbsp; Edit &nbsp;&nbsp; </span>
                  <span className=" badge badge-pill ml-1 mt-2 inventry-save " onClick={() => this.handleRemoveCatagoryItem(idx)}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
                </div>
              </div>




            </div>

          </div>

          <div className="col-sm-12">
           
            <label className="SHOP-DETAILS3">Metric</label>
            {this.rendermatric(item.Matric, idx)}
            <div className="text-right mt-2 mr-5">
              <button class="submit-btn2 text-center" onClick={() => this.handleAddMatricItem(idx)} >&nbsp; &nbsp; Add Metric &nbsp; &nbsp;</button>
            </div>

          </div>
           <hr></hr>




        </div>




      </div>
    )

  }




  handleAddFilterItem = () => {
    this.setState({
      filter_items: ([...this.state.filter_items, { "unique_key": v4(), "Matric": 1, "FilterType": ">", "Value": 100 }])
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

  doParentToggle(index, result) {
    console.log(result)
    console.log(index)

    const newDealItems = this.state.filter_items.map((item, sidx) => {
      if (index !== sidx) return item;
      return { ...item, MatricsName: result.MatricsName, MatricId: result.MatricId };
    });
    this.setState({ filter_items: newDealItems });

  }

  renderfilter() {
    return this.state.filter_items.map((filter, idx) =>
      <div key={filter.unique_key} className="row">


        <div className="col-sm-3">
          <label class="Label-text col-sm-12">Metric</label>
          <div className="       input-container ">
            {/* <input type="text" className="input-text  m-0 col-sm-12" value={filter.MatricsName}/> */}
            <MatricSearch
              parentToggle={this.doParentToggle}
              index={idx}
            />
          </div>
        </div>
        <div className="col-sm-2">
          <label class="Label-text col-sm-12">Filter Type</label>
          <div className="       input-container " >
            <input type="text" className="    input-text  m-0 col-sm-12" value = {filter.Operator}/>
          </div>
        </div>
        <div className="col-sm-3">
          <label class="Label-text col-sm-12">Value</label>
          <div className="       input-container ">
            <input type="text" className="    input-text  m-0 col-sm-12" value = {filter.FilterValue}/>
            <span className=" badge badge-pill ml-2 mt-2 inventry-save">&nbsp;&nbsp; Edit &nbsp;&nbsp; </span>
            <span className=" badge badge-pill ml-1 mt-2 inventry-save" onClick={() => this.handleRemoveFilterItem(idx)}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
          </div>






        </div>

      </div>
    )

  }


  handleAddMatricItem = (categoryID) => {

    const newCategoryItems = this.state.Catagory_items.map((item, sidx) => {
      if (categoryID !== sidx) return item;
      else
        item.Matric = [...item.Matric, { "unique_key": v4(), "Matric": "", "Weight": "", "Negative": 1 ,"Method":"", "MatricsName":""}]
      return item;
    });

    this.setState({
      Catagory_items: newCategoryItems
    });
  };

  handleRemoveMatricItem = (categoryIndex, matricIndex) => {

    const newCategoryItems = this.state.Catagory_items.map((item, sidx) => {
      if (categoryIndex !== sidx) return item;

      const Matric = item.Matric.filter((s, index) => matricIndex !== index)

      return {
        ...item,
        Matric: Matric,
      };
    });
    this.setState({
      Catagory_items: newCategoryItems
    })

  };

  handleMatricItemChange = (idx, evt) => {
    console.log(idx)
    console.log(evt.target.value)

    const newDealItems = this.state.matric_items.map((item, sidx) => {
      if (idx !== sidx) return item;
      return { ...item, [evt.target.name]: evt.target.value };
    });
    this.setState({ matric_items: newDealItems });
  };
  rendermatric(matricList, categoryIndex) {

 
    return matricList.map((item, idx) =>
      <div key={idx} className="row">


        <div className="col-sm-1">
        </div>


        <div className="col-sm-3">



          <label class="Label-text col-sm-12">Metric</label>
          <div className="       input-container ">
            <input type="text" className="    input-text mt-2 m-0 col-sm-12" value = { item.MatricsName }/>
          </div>


        </div>
        <div className="col-sm-2">


          <label class="Label-text col-sm-12">Weight</label>
          <div className="       input-container ">
            <input type="text" className="    input-text mt-2  m-0 col-sm-12"value = {item.Weight  } />
          </div>




        </div>

        <div className="col-sm-2 ">
          <label class="Label-text1 mr-4 col-sm-12">Method</label>

          <div class="form-group">

            <select id="2" class="form-control input-text mt-2  m-0  dropdwonclr2">
              <option>Postive</option>
              <option>Negative</option>
            
            </select>
          </div>







        </div>
        <div className="col-sm-3">
          <label class="Label-text col-sm-12">&nbsp;</label>

          <span className=" badge badge-pill ml-2 mt-3 inventry-save">&nbsp;&nbsp; Edit &nbsp;&nbsp; </span>
          <span className=" badge badge-pill ml-1 mt-3 inventry-save" onClick={() => this.handleRemoveMatricItem(categoryIndex, idx)} >&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>




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
                    <label className="SHOP-DETAILS p-0">Template Detail</label>
                  </div>




                </div></div>
              <div className="inventry-wrapper m-2 ">
                <div className="SHOP-DETAILS1"> 
                  {this.props.location.state.index.TempleteName }
                <hr></hr>
                </div>


                <label className="SHOP-DETAILS1">Filter</label>

                <div className="col-sm-12">



                  {this.renderfilter()}
                  <div className="text-right mt-2 mr-5">
                    <button class="submit-btn2 text-center" onClick={() => this.handleAddFilterItem()}>&nbsp; &nbsp; Add Filter &nbsp; &nbsp;</button>
                  </div>
                </div>

                <hr></hr>

                <label className="SHOP-DETAILS1">CATEGORIES</label>
                {this.rendercatagory()}
                <div className="text-right mt-2 mr-5">
                  <button class="submit-btn2 text-center" onClick={() => this.handleAddcatagoryItem()}>&nbsp; &nbsp; Add Category &nbsp; &nbsp;</button>
                </div>


                <div className="text-right mt-2 mr-5">
                  <button class="submit-btn2 text-center" onClick={() => this.updateIndex()}>&nbsp; &nbsp; Update &nbsp; &nbsp;</button>
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
