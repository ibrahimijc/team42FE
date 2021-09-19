
import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import { connect } from 'react-redux';
import { Dropdown, Form } from 'react-bootstrap';
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import { v4 } from 'uuid';
import { getAlldata } from '../../store/actions/dataActions';
import Pagination from "react-js-pagination";


const columns = [
  { key: 'id', name: 'DataID' },
  { key: 'countryName', name: 'Country Name' },
  { key: 'year', name: 'Year' },
  { key: 'metric', name: 'Metric' },
  { key: 'value', name: 'Value' },
  { key: 'action', name: 'Action' },
];






class UploadData extends Component {
  constructor(props) {
    super(props);
    this.state = {



      isLoading: false,
      readOnly: false,
      selectedID: "",
      currencyList: [],
      matric_items: [{ "unique_key": v4() }],

      catagory_items: [{ "unique_key": v4() }],
      gridList: [],
      columns: [],
      fromYear: "",
      toYear: "",
      firstPage: "1",
      currentPage: 1,
      rowsPerPage: "100",
      totalPages: "",
      totalRows: "",
      nextPage: "",
      prevPage: "",
      pageNumbers: [],


    };

    this.renderfilter = this.renderfilter.bind(this)
    this.renderpaginate = this.renderpaginate.bind(this)



  }
  componentDidMount() {
    this.setState({
      isLoading: true,
    })
    const data = {
      "currentPage": this.state.currentPage,
      "rowsPerPage": this.state.rowsPerPage
    }
    this.props.getAlldata(data).then((res) => {
      this.setState({ isLoading: false })
      const pN = []

      //console.log(res)
      if (res.content && res.content.data)
        for (let i = 1; i <= res.content.pagenation.pages; i++) {
          pN.push(i);
        }
      this.setState({
        gridList: res.content.data,
        totalPages: res.content.pagenation.pages,
        totalRows: res.content.pagenation.total,
        nextPage: res.content.pagenation.next_num,
        prevPage: res.content.pagenation.prev_num,
        pageNumbers: pN
      })
      console.log(this.state.totalRows)
      console.log(this.state.pageNumbers)
    }).catch((err) => {
      this.setState({ isLoading: false })
      console.log(err)
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {


  }


  handleAddDealItem = () => {
    this.setState({
      matric_items: ([...this.state.matric_items, { "unique_key": v4() }])
    });
  };

  handleRemoveDealItem = (idx) => {
    this.setState(prevState => ({
      matric_items: prevState.matric_items.filter((s, index) => idx !== index)
    }))

  };

  handleDealItemChange = (idx, evt) => {
    console.log(idx)
    console.log(evt.target.value)

    const newDealItems = this.state.matric_items.map((item, sidx) => {
      if (idx !== sidx) return item;
      return { ...item, [evt.target.name]: evt.target.value };
    });
    this.setState({ matric_items: newDealItems });
  };

  renderpaginate() {
    console.log(this.state.nextPage)
    return this.state.pageNumbers.map((n) =>
      //let classes = this.state.currentPage === n ? styles.active : '';

      <li class="page-item" value={n} onClick={() => this.paginateData(n)}><a class="Base-btn page-link" href="#">{this.state.firstPage == n ? n : '.' && this.state.prevPage == n ? n : " " && this.state.currentPage == n ? n : "." && this.state.currentPage == n + 2 ? "." : " " && this.state.nextPage == n ? n : "." && this.state.totalPages == n ? n : "."}</a></li>

    )

  }

  renderfilter() {
    return this.state.matric_items.map((item, idx) =>
      <div key={item.unique_key} className="row">

        <div className="col-sm-3">
          <label class="Label-text col-sm-12">Metric</label>
          <div className="       input-container ">
            <input type="text" className="    input-text  m-0 col-sm-12" />
          </div>
        </div>
        <div className="col-sm-2">

          <label class="Label-text col-sm-12 ml-4">Filter Type</label>
          <div class="input-container">
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
            <input type="text" className="    input-text  m-0 col-sm-12" />
            <span className=" badge badge-pill ml-2 mt-2 inventry-save">&nbsp;&nbsp; Edit &nbsp;&nbsp; </span>
            <span className=" badge badge-pill ml-1 mt-2 inventry-save" onClick={() => this.handleRemoveDealItem()}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
          </div>



        </div>

      </div>
    )

  }

  paginateData = (currentPage) => {

    this.setState({ gridList: [] })
    console.log(this.state.fromYear)
    let data = {}
    if (currentPage) {
      data = {
        "fromYear": this.state.fromYear,
        "toYear": this.state.toYear,
        "currentPage": currentPage,
        "rowsPerPage": this.state.rowsPerPage
      }
    } else {
      data = {
        "fromYear": this.state.fromYear,
        "toYear": this.state.toYear,
        "currentPage": this.state.currentPage,
        "rowsPerPage": this.state.rowsPerPage,
      }
    }

    console.log(data);
    this.props.getAlldata(data).then((res) => {
      this.setState({ isLoading: false })
      //console.log(res)
      if (res.content && res.content.data)
        this.setState({
          gridList: res.content.data,
          totalPages: res.content.pagenation.pages,
          totalRows: res.content.pagenation.total,
          nextPage: res.content.pagenation.next_num,
          prevPage: res.content.pagenation.prev_num,
          currentPage: currentPage
        })

    }).catch((err) => {
      console.log(err)
    })

  }


  searchData = (rowsPerPage) => {

    this.setState({ gridList: [] })
    console.log(this.state.fromYear)
    let data = {}
    if (rowsPerPage) {
      data = {
        "fromYear": this.state.fromYear,
        "toYear": this.state.toYear,
        "currentPage": this.state.currentPage,
        "rowsPerPage": rowsPerPage
      }
    } else {
      data = {
        "fromYear": this.state.fromYear,
        "toYear": this.state.toYear,
        "currentPage": this.state.currentPage,
        "rowsPerPage": this.state.rowsPerPage,
      }
    }

    console.log(data);
    this.props.getAlldata(data).then((res) => {
      this.setState({ isLoading: false })
      //console.log(res)
      if (res.content && res.content.data)
        this.setState({
          gridList: res.content.data,
          totalPages: res.content.pagenation.pages,
          totalRows: res.content.pagenation.total,
          nextPage: res.content.pagenation.next_num,
          prevPage: res.content.pagenation.prev_num,
        })

    }).catch((err) => {
      console.log(err)
    })

  }

  onChangeOption = (e) => {

    console.log(e.target.value)
    this.setState({ rowsPerPage: e.target.value })
    console.log(this.state.rowsPerPage)
    this.searchData(e.target.value)
  }

  handleAddCategoryItem = () => {
    this.setState({
      catagory_items: ([...this.state.catagory_items, { "unique_key": v4() }])
    });
  };

  handleRemoveCategoryItem = (idx) => {
    this.setState(prevState => ({
      catagory_items: prevState.catagory_items.filter((s, index) => idx !== index)
    }))

  };
  handlePageChange(currentPage) {
    console.log(`active page is ${currentPage}`);
    this.setState({ gridList: [] })
    console.log(this.state.fromYear)
    let data = {}
    if (currentPage) {
      data = {
        "fromYear": this.state.fromYear,
        "toYear": this.state.toYear,
        "currentPage": currentPage,
        "rowsPerPage": this.state.rowsPerPage
      }
    } else {
      data = {
        "fromYear": this.state.fromYear,
        "toYear": this.state.toYear,
        "currentPage": this.state.currentPage,
        "rowsPerPage": this.state.rowsPerPage,
      }
    }

    console.log(data);
    this.props.getAlldata(data).then((res) => {
      this.setState({ isLoading: false })
      //console.log(res)
      if (res.content && res.content.data)
        this.setState({
          gridList: res.content.data,
          totalPages: res.content.pagenation.pages,
          totalRows: res.content.pagenation.total,
          nextPage: res.content.pagenation.next_num,
          prevPage: res.content.pagenation.prev_num,
          currentPage: currentPage
        })

    }).catch((err) => {
      console.log(err)
    })
  }

  handleCategoryItemChange = (idx, evt) => {
    console.log(idx)
    console.log(evt.target.value)

    const newDealItems = this.state.matric_items.map((item, sidx) => {
      if (idx !== sidx) return item;
      return { ...item, [evt.target.name]: evt.target.value };
    });
    this.setState({ matric_items: newDealItems });
  };
  renderCatagory() {
    return this.state.catagory_items.map((item, idx) =>
      <div key={item.unique_key} className="row mt-2">


        <div className="col-sm-3">

          <div className="       input-container ">
            <input type="text" className="    input-text  m-0 col-sm-12" />
            <span className=" badge badge-pill ml-2 mt-2 inventry-save">&nbsp;&nbsp; Edit &nbsp;&nbsp; </span>
            <span className=" badge badge-pill ml-1 mt-2 inventry-save" onClick={() => this.handleRemoveCategoryItem(idx)}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
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
                    <label className="SHOP-DETAILS p-0">VIEW DATA</label>
                  </div>
                </div></div>
              <div className="inventry-wrapper m-2 ">
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-4">
                      <label class="Label-text col-sm-12" >Year From</label>
                      <div className="       input-container ">
                        <input type="text" className="    input-text  m-0 col-sm-12" onChange={(x) => this.setState({ "fromYear": x.target.value })} value={this.state.fromYear} />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <label class="Label-text col-sm-12" >Year To</label>
                      <div className="       input-container ">
                        <input type="text" className="    input-text  m-0 col-sm-12" onChange={(x) => this.setState({ "toYear": x.target.value })} value={this.state.toYear} />
                      </div>
                    </div>

                  </div>
                  <div className="text-right mt-2 mr-4">
                    <button class="submit-btn2 text-center" onClick={() => this.searchData()}>&nbsp; &nbsp; Search &nbsp; &nbsp;</button>
                  </div>
                </div>
                <hr></hr>
                {/* <div className="col-sm-12"> */}
                  {/* <div className="">
                    {this.renderfilter()}
                  </div> */}
                  {/* <div className="text-right mt-2 mr-4">
                    <button class="submit-btn2 text-center" onClick={() => this.handleAddDealItem()}>&nbsp; &nbsp; Add Filter &nbsp; &nbsp;</button>
                  </div>
                  <hr></hr> */}
                {/* </div> */}
                {/* <label class="Label-text col-sm-12">Category Name</label>
                {this.renderCatagory()}
                <div className="text-left mt-2">
                  <button class="submit-btn2 text-center" onClick={() => this.handleAddCategoryItem()}>&nbsp; &nbsp; Add Category &nbsp; &nbsp;</button>
                </div> */}
                {/* <hr></hr> */}
                <div className="pl-2 ml-2">
                  <ReactDataGrid
                    columns={[
                      { key: 'DataId', name: 'DataID' },
                      { key: 'CountryName', name: 'Country Name', },
                      { key: 'DataYear', name: 'Year' },
                      { key: 'MatricsName', name: 'Metric' },
                      { key: 'DataValue', name: 'Value', editable: true },
                      { key: 'action', name: 'Action' },
                    ]}

                    rows={this.state.gridList}

                  />
                  <div className="col-sm-12 col-md-12 col-12  col-xl-12 ">
                    <div className="row ">

                      <div className="col-sm-5  col-md-5 col-5  col-xl-4 col-lg-5 p-1 mt-3">
                      <div className="col-sm-5 mt-2 p-0">
                  <b className="">Total Rows :{this.state.totalRows}</b>
                          </div>

                      </div>

                      <div className="col-sm-5  col-md-5 col-5  col-xl-3 col-lg-5 mt-3 ">
                        <div className="row" >

                          <div className="col-sm-5 mt-2 p-0">
                            <b className="">Rows per page</b>
                          </div>
                          <div className="col-sm-7 pl-0 pr-2">


                            <select id="2" class="form-control input-text   m-0  dropdwonclr2" onChange={this.onChangeOption}>
                              <option value="100" >{"100"}</option>
                              <option value="200" >{"200"}</option>
                              <option value="300" >{"300"}</option>
                            </select>

                          </div>
                        </div>
                      </div>
                      <div className="col-sm-3  col-md-3 col-5  col-xl-4 col-lg-2 pl-0 mt-3">
                        {/* <div className="row ">

                          <ul class="pagination">
                            <li class="page-item"><a class="Base-btn page-link" href="#">Previous</a></li> */}
                        {/* <li class="page-item"><a class="Base-btn page-link" href="#">1</a></li>
                            <li class="page-item"><a class="Base-btn page-link" href="#">2</a></li>
                            <li class="page-item"><a class="Base-btn page-link" href="#">3</a></li> */}
                        {/* {this.renderpaginate()}
                            <li class="page-item"><a class="Base-btn page-link" href="#">Next</a></li>
                          </ul>
                        </div> */}
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          prevPageText='prev'
                          nextPageText='next'
                          firstPageText='first'
                          lastPageText='last'
                          //activeClass='background-color:black'
                          activePage={this.state.currentPage}
                          itemsCountPerPage={this.state.rowsPerPage}
                          totalItemsCount={this.state.totalRows}
                          pageRangeDisplayed={5}
                          onChange={this.handlePageChange.bind(this)}
                        />
                      </div>
                    </div>
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

UploadData.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
  getAlldata
})
export default connect(mapStateToProps, mapDispatchToProps)(UploadData);


{/* <div class="inventry-wrapper m-2">
                  <div className="table-responsive ">
                    <table className="table table-hover thead-primary text-center">
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          <th scope="col">Country Name  </th>
                          <th scope="col">Year </th>
                          <th scope="col">Metric </th>
                          <th scope="col">Value </th>
                          <th scope="col">Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="trColor " >
                          <th scope="row"> </th>
                          <td>Pakistan</td>
                          <td>2017</td>
                          <td>GDP</td>
                          <td>3.24</td>
                          <td><span className=" badge badge-pill inventry-save" >&nbsp;&nbsp;Edit &nbsp; &nbsp;</span>
                            <span className=" badge badge-pill inventry-save" onClick={this.toggleModal}>&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
                          </td>
                        </tr>
                        <tr className="trColor " >
                          <th scope="row"> </th>
                          <td>USA</td>
                          <td>2018</td>
                          <td>GDP</td>
                          <td>10.6</td>
                          <td><span className=" badge badge-pill inventry-save">&nbsp;&nbsp;Edit &nbsp; &nbsp;</span>
                            <span className=" badge badge-pill inventry-save">&nbsp;&nbsp; Delete &nbsp;&nbsp; </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div> */}