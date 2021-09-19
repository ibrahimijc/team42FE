
import React, { Component } from 'react';

import { connect } from 'react-redux';
import Noty from 'noty';
import { uploadData, } from '../../store/actions/dataActions';
class UploadData extends Component {
  constructor(props) {
    super(props);
    this.state = {

      isLoading: false,
      selectedFile: null
    };


  }




  onFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  }


  onFileUpload = () => {
    if (!this.state.selectedFile) {
      window.alert('Please input valid file')
      return
    }
    const formData = new FormData();

    // Update the formData object 
    formData.append(
      "file",
      this.state.selectedFile
    );

    this.setState({ isLoading: true })
    this.props.uploadData(formData).then((res) => {
      this.setState({ isLoading: false })

      if (res.status == "success") {
        new Noty({
          text: "Succsessfully Uploaded data",
          layout: "topRight",
          theme: "bootstrap-v4",
          type: "success",
          timeout: 2000
        }).show();
        this.props.history.push("/dataset/viewdata")

      } else {
        new Noty({
          text: "Something went wrong",
          layout: "topRight",
          theme: "bootstrap-v4",
          type: "error",
          timeout: 1000
        }).show();
      }
      console.log(res);
    }).catch((err) => {
      this.setState({ isLoading: false })
      console.log(err)
    })

  }
  render() {

    const { isLoading } = this.state;

    if (this.state.isLoading) {
      return <div class="loader-large" role="status">  </div>
    } else {



      return (

        <div>
          <div>
            <div className="row col-md-12 Container pl-0 pr-0">
              <div className="col-md-12 p-0">
                <div className="inventry-wrapper m-2 ">
                  <div className="row">
                    <div className="col-sm-7">
                      <label className="SHOP-DETAILS p-0">UPLOAD DATA</label>
                    </div>

                  </div></div>

                <div className="inventry-wrapper m-2 ">
                  
                  <div className="col-sm-12">
                    <div className="row">

                      <div className="col-sm-4 mt-4">
                        <input type="file" className="col-sm-12" accept=".csv,.xlsx" onChange={this.onFileChange} />
                      </div>

                      <div className="input-container mt-4">
                        <div class="round">
                          <input type="checkbox" className="  col-sm-8" id="checkbox" />
                          <label for="checkbox"></label>
                        </div>
                        <label className="check-box-label">On Duplicate Update existing </label>
                      </div>


                    </div>
                  </div>
                  <hr></hr>



                  <div className="col-sm-12 ">
                    <div className="row">
                      <div className="col-sm-4 mt-5"> </div>
                      <div className="col-sm-4">
                        <button class="submit-btn3 text-center" onClick={this.onFileUpload}>Upload File</button>
                      </div>
                      <div className="col-sm-4"> </div>
                    </div>
                  </div>


                  <div className="col-sm-12 mt-5">
                    <div className="row">
                      <div className="col-sm-3"> </div>
                      <div className="col-sm-3">

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
}

UploadData.propTypes = {

};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({
  uploadData
})
export default connect(mapStateToProps, mapDispatchToProps)(UploadData);
