
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dropdown, Form } from 'react-bootstrap';
import TextFieldGroup from '../../components/FormInputs/TextFieldGroup'
import { addCurrency, getCurrency, updateCurrency, deleteCurrency, getAllCurrency } from '../../store/actions/currencyActions';
import mapimg from "../../assets/images/download.png";

import { Chart } from "react-google-charts";
import { getResult } from "../../store/actions/resultActions"
import { CSVLink, CSVDownload } from "react-csv";
//
class SeeResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            data: [],
            currencyList: [],
            templeteName: '',
            templeteType: '',
        };


    }


    onExportClick = () => {

        var imgUri = this.state.chart;
        var link = window.document.createElement("a");
        link.setAttribute("href", imgUri);
        link.setAttribute("download", this.state.templeteName + ".png");
        link.click();
    }
    componentDidMount() {
        if (this.props.location.state && this.props.location.state.template) {
            const { template } = this.props.location.state
            console.log(template)
            this.setState({ templeteName: template.TempleteName, templeteType: template.Type })
            this.props.getResult(template.TempleteId).then((res) => {
                if (res.status === "success") {
                    console.log(res.content)
                    var result_data = JSON.parse(res.content.result);
                    result_data = [res.content.columns, ...result_data]
                    this.setState({ data: result_data })
                }

            }).catch((err) => {
                console.log(err)
            })
        }

    }








    componentDidUpdate(prevProps, prevState, snapshot) {


    }




    render() {

        const { isLoading } = this.state;

        const that = this;
        const chartEvents = [
            {
                eventName: "ready",
                callback(Chart) {
                    var imgUri = Chart.chartWrapper.getChart().getImageURI();
                    imgUri = imgUri.replace(/^data:image\/png/, 'data:application/octet-stream');
                    if (imgUri !== that.state.chart) {


                        that.setState({ chart: imgUri })
                    }

                }
            }
        ];


        return (


            <div>
                <div className="col-sm-12">

                    <div className="inventry-wrapper mb-2">
                        <div className="row p-0">
                            <div className="col-sm-7 p-0">
                                <label className="SHOP-DETAILS p-0">Result</label>
                            </div>

                        </div>
                    </div>

                    <Chart
                        height={'500px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.data}

                        chartEvents={chartEvents}
                        options={{
                           
                            chartArea: { left:'10%', width: "65%",right:'25%'  ,height:'85%' ,bottom:'10%' ,top:'5%'},
                            explorer: {axis: 'horizontal', keepInBounds: true},
                            hAxis: {
                                format: '####',
                                title: 'Year',
                                gridlines: {
                                    color:'none',
                                    count: this.state.data.length,
                                }
                            },
                            vAxis: {
                                title: 'Index Values',
                                gridlines: {
                                    color:'none',
                                  
                                }
                            },
                            series: {
                                1: { curveType: 'function' },
                            },
                        }}

                        rootProps={{ 'data-testid': '2' }}
                    />

                    <div className="mt-4 mb-3 text-center">

                    </div>

                    <div className="col-sm-12 text-center  mb-5">

                        <button class="col-sm-2 submit-btn7 ml-2 mr-2 text-center" onClick={this.onExportClick}>Export Result</button>
                        <button class="col-sm-2 submit-btn7  ml-2 mr-2 text-center"><CSVLink className='export-csv' filename={this.state.templeteName+'.csv'} data={this.state.data}>Export CSV</CSVLink></button>
                       {console.log(this.props.location.state.template.Type) }
                        {this.props.location.state.template.Type == 'INDEX' &&
                        <button class="col-sm-2 submit-btn7  ml-2 mr-2 text-center" onClick={() => this.props.history.push('/template/detail', { index: this.props.location.state.template ,admin:false })}>Edit</button> }

                    </div>

                </div>



            </div>

        )
    }

}

SeeResult.propTypes = {

};  


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
    getResult
})
export default connect(mapStateToProps, mapDispatchToProps)(SeeResult);
