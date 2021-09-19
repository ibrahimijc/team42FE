
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dropdown, Form } from 'react-bootstrap';
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import { addCurrency, getCurrency, updateCurrency, deleteCurrency, getAllCurrency } from '../../store/actions/currencyActions';
class UploadData extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
      currencyList: []
    };


  }


  componentDidUpdate(prevProps, prevState, snapshot) {


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
            <div className="col-md-12 p-0">
              <div className="inventry-wrapper m-2 ">
                <div className="row">
                  <div className="col-sm-7">
                    <label className="SHOP-DETAILS p-0">DELETE DATA</label>
                  </div>


                </div></div>





              <div className="inventry-wrapper m-2 ">
                <div className="col-sm-12">
                  <div className="row">

                    <div className="col-sm-4">
                      <label class="Label-text col-sm-12">Year From</label>
                      <div className="       input-container ">
                        <input type="text" className="    input-text  m-0 col-sm-12" placeholder="2017" />
                      </div>

                    </div>

                    <div className="col-sm-4">
                      <label class="Label-text col-sm-12">Year To</label>
                      <div className="       input-container ">
                        <input type="text" className="    input-text  m-0 col-sm-12" placeholder="2020" />
                      </div>
                    </div>


                  </div>
                </div>


                <div className="col-sm-12 ">
                  <div className="row">

                    <div className="col-sm-2 mb-2 mr-0 ml-4 pr-0 p-0 ">
                      <label class="Label-text col-sm-12">&nbsp;</label>
                      <button class="submit-btn4 text-left">&nbsp; &nbsp; Select Catagory &nbsp; &nbsp;</button>

                    </div>
                    <div className="col-sm-2  text-left">
                      <div className="col-sm-9 mt-4 p-0 ml-0" >
                        <label class="Label-text col-sm-12 m-0">Metric</label>
                        <div class="form-group ">

                          <select id="1" class="form-control dropdwonclr">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>







                <div className="col-sm-12">
                  <div className="row">

                    <div className="col-sm-2 mr-0 ml-4 pr-0 p-0 ">

                      <button class="submit-btn4 text-left">&nbsp; &nbsp; Select Catagory &nbsp; &nbsp;</button>

                    </div>
                    <div className="col-sm-2 text-left">
                      <div className="col-sm-9  p-0 ml-0" >

                        <div class="form-group">

                          <select id="2" class="form-control dropdwonclr">
                            <option>qasim</option>
                            <option>ahmed</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        </div>                                          </div>
                    </div>


                  </div>
                </div>




                <hr></hr>

                <div className="col-sm-12 mt-5">
                  <div className="row">
                    <div className="col-sm-4 mt-5"> </div>
                    <div className="col-sm-4 mb-4">
                      <button class="submit-btn3 text-center">Delete</button>
                    </div>
                    <div className="col-sm-4"> </div>
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

})
export default connect(mapStateToProps, mapDispatchToProps)(UploadData);
