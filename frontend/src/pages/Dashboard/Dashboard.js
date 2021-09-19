
import React, { Component } from 'react';

import { connect } from 'react-redux';
 
import { Chart } from "react-google-charts";
import {getResult} from "../../store/actions/resultActions"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      showModal: false,
      selectedID: "",
      currencyList: []
    };


  }

  componentDidMount(){
    this.props.getResult(1).then((res)=>{
       if(res.status==="success"){
        console.log(res.content)
        var result_data = JSON.parse(res.content.result);
        result_data =[ res.content.columns , ...result_data]
        this.setState({data:result_data})
      }

    }).catch((err)=>{
      console.log(err)
  })
     
   }
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {


  }




  render() {




    return (


      <div>

        <div>
          <div className="row col-md-12 Container pl-0 pr-0">
            <div className="col-md-12 p-0">
              <div class="inventry-wrapper m-2">
                <div class="inventry-wrapper m-2"></div>
                <div className="text-center ">
                  <h1 className="m-5 p-5">Homepage Content Comming Soon</h1>
                </div>

                <Chart
                   height={'500px'}
                  chartType="LineChart"
                  loader={<div>Loading Chart</div>}
                  data={ this.state.data}
                  options={{
                    hAxis: {
                      title: 'Year',
                    },
                    vAxis: {
                      title: 'Index Values',
                    },
                    series: {
                      1: { curveType: 'function' },
                    },
                  }}
                  rootProps={{ 'data-testid': '2' }}
                />

              </div>
            </div>




          </div>





        </div>


      </div>

    )
  }

}

Dashboard.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
  getResult
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
