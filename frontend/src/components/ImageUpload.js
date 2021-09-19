
import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
 
import { v4 } from 'uuid';
 
import PLACEHOLDER from "../assets/images/upload_placeholder.png";
import { uploadImage } from '../../src/store/actions/imageActions';
class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUploading:false,
            key:v4(),
            image:null,
            file:null,
            url:null,
        };
    }
    componentDidMount() {
    }
    static getDerivedStateFromProps(nextProps, prevState) {
    }
    renderImages = () => {
        return (
            <div className="col-sm-12 pl-1 pr-0 store-image-container">
                {this.state.image &&
                    <img src={this.state.image} className="col-sm-12  imghgt p-0 m-0 " />
                }
                {!this.state.image && <img src={PLACEHOLDER} className="col-sm-12  imghgt p-0 m-0 " />}
                {this.state.image && <label className="img-cross" onClick={() => this.onImageRemove( )}></label>}
                <div className="img-edit">
                    <a>
                        <label className="file-upload"><input type="file" key={this.state.key} onChange={(event) => this.onImageChange(event)} /> </label>
                        <i className="fa fa-pencil fa-lg"></i>
                    </a>
                </div>
            </div>
        )
    }

    onImageRemove = ( ) => {
    
        this.setState({
            image:null,
            file:null,
            url:null,
        });
        this.props.onImageUploaded(null);
    }
    onImageChange = (event ) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
   
            this.setState({
                image:   reader.result,
                file:file,
                key:v4()
            }, () => {
                this.uploadImage(file);

            });
        }
        reader.readAsDataURL(file)
    }

    uploadImage = (file ) => {
        const payload = new FormData();
        payload.append('file', file);
        this.setState({ isUploading: true });
        this.props.uploadImage(payload).then((res) => {
            console.log(res.content);
            this.setState({ isUploading: false });
            if (res.content && res.content.path) {
                
                console.log(res.content.path);
                this.props.onImageUploaded(res.content.path);
            }
        }).catch((err) => {
            this.setState({ isUploading: false })
        })
    }

    render() {
        const { containerClassName } = this.props
        return (
            <div className={cx(containerClassName)} >               
                {this.renderImages()}
            </div>
        )
    }

}






ImageUpload.propTypes = {
 
};


const mapStateToProps = state => ({

});

const mapDispatchToProps = ({

    uploadImage
})
export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
