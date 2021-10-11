import axios from 'axios';

import React, { Component } from 'react';

export interface props {
}
export interface state {
    selectedFile: null | File,
    uploaded: Boolean,
    fileid: null | string
}
class FileUploader extends Component<props, state> {
    
    constructor(props: props) {
        super(props);
        this.setState({'selectedFile':null,'uploaded':false,'fileid':null});
    }

    // On file select (from the pop up)
    onFileChange = (event:any) => {
        console.log('File change',event);
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
        if (this.state.selectedFile == null) return false;

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "uploadedfile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        
        // Details of the uploaded file
        console.log(formData);
        
        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData).then(result=>{
            console.log(result);
            this.setState({'uploaded':true,'selectedFile':null})
        }).catch(error=>{
            console.error(error);
        });
    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

        if (this.state.selectedFile != null) {

            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                <h3>File Upload</h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
            </div>
        );
    }
}

export default FileUploader;
