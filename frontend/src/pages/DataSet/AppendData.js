
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
                    <label className="SHOP-DETAILS p-0">Append Data</label>
                  </div>
                 

               </div></div>

               
            
                <div className="inventry-wrapper m-2 ">
         
          
              <div className="col-sm-12">
                <div className="row">

                  <div className="col-sm-4">
                    <label class="Label-text col-sm-12">Metric</label>
                    <div className="       input-container ">
                      <input type="text" className="    input-text  m-0 col-sm-12" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <label class="Label-text col-sm-12">Category</label>
                    <div className="       input-container ">
                      <input type="text" className="    input-text  m-0 col-sm-12" />
                    </div>
                  </div>
                  <div className="input-container mt-4">
            <div class="round">
              <input type="checkbox" className="  col-sm-8" id="checkbox" />
              <label for="checkbox"></label>
            </div>
            <label className="check-box-label">Replace with existing rows</label>

          </div>
             
                </div>
              </div>
              <hr></hr>

              <div className="col-sm-12 mt-5">
              <div className="row">
              <div className="col-sm-4 mt-5"> </div>
              <div className="col-sm-4">
              <button class="submit-btn3 text-center">Upload File</button>
                </div>
              <div className="col-sm-4"> </div>
                </div>
                </div>


                <div className="col-sm-12 mt-5">
              <div className="row">
              <div className="col-sm-3"> </div>
              <div className="col-sm-3">
            
                </div>
              <div className="col-sm-4 mb-4">
                 <div class="progress progress1 ">
    <div class="progress-bar  progress-bar-success " role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{"width":"40%"}}>
       
    </div>
    </div> </div>
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
