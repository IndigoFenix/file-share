import React, { Component, RefObject } from 'react';
import { uploadFile } from '../services/file';
import { Button, Input } from 'reactstrap';
import './FileUploader.scss';

export interface props {
}
export interface state {
    selectedFile: null | File,
    uploaded: Boolean,
    filekey: null | string,
    error: null | string
}
class FileUploader extends Component<props, state> {

    fileButtonRef:RefObject<HTMLInputElement>
    
    constructor(props: props) {
        super(props);
        this.fileButtonRef = React.createRef();
        this.state = {'selectedFile':null,'uploaded':false,'filekey':null,'error':null};
    }

    clearFile = () => {
        this.setState({'selectedFile':null,'uploaded':false,'filekey':null,'error':null});
    }

    fileSelectButtonClick = (event:any) => {
        if (this.fileButtonRef.current){
            console.log(this.fileButtonRef.current);
            this.fileButtonRef.current.click();
        }
    }

    // On file select
    onFileChange = (event:any) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    // On file upload (click the upload button)
    onFileUpload = () => {
        if (this.state.selectedFile == null) return false;

        //Create the form and set basic fields
        const formData = new FormData();
        formData.set('name',this.state.selectedFile.name);
        let split = this.state.selectedFile.name.split('.');
        formData.set('ext',split[split.length - 1]);

        // Add file to formData
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        
        // Send formData object
        uploadFile(formData).then((result)=>{
            this.setState({'uploaded':true,'selectedFile':null,'filekey':result.key})
        }).catch(error=>{
            this.setState({'error':error});
        })
    };

    render() {
        return (
            <div className="p-3">
                <div>
                    {this.state.uploaded ? 
                        <div>
                            <h3 className="text-center">File Uploaded Successfully</h3>
                            <h4 className="text-center">Your file key is:</h4>
                            <h1 className="text-center text-primary">{this.state.filekey}</h1>
                            <h5 className="text-center">Send this to a friend to let them download your file.</h5>
                            <Button className="w-100" onClick={this.clearFile}>
                                Upload new file
                            </Button>
                        </div>
                    :
                        <div>
                            <h3 className="text-center">File Upload</h3>
                            <input ref={this.fileButtonRef} className="hide" type="file" onChange={this.onFileChange} />
                            <Button className="w-100" onClick={this.fileSelectButtonClick}>
                                {this.state.selectedFile ? 'Change File' : 'Select File'}
                            </Button>
                            {this.state.selectedFile ?
                                <div>
                                    <h5 className="text-center my-2">{this.state.selectedFile.name}</h5>
                                    <Button className="w-100 bg-primary" onClick={this.onFileUpload}>
                                        Upload!
                                    </Button>
                                </div>
                            :
                                <h5 className="text-center mt-2">File not selected</h5>
                            }
                            {this.state.error ? <div className="error text-center mt-2">{this.state.error}</div> : ''}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default FileUploader;
