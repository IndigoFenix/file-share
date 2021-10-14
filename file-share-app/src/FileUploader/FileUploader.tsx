import React, { Component } from 'react';
import { uploadFile } from '../services/file';
import { Button, Input } from 'reactstrap';

export interface props {
}
export interface state {
    selectedFile: null | File,
    uploaded: Boolean,
    filekey: null | string,
    error: null | string
}
class FileUploader extends Component<props, state> {
    
    constructor(props: props) {
        super(props);
        this.state = {'selectedFile':null,'uploaded':false,'filekey':null,'error':null};
    }

    clearFile = () => {
        this.setState({'selectedFile':null,'uploaded':false,'filekey':null,'error':null});
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
                            <h4 className="text-center">Your file key: <span className="text-primary">{this.state.filekey}</span></h4>
                            <h5 className="text-center">Send this to a friend to let them download your file.</h5>
                            <Button onClick={this.clearFile}>
                                Upload new file
                            </Button>
                        </div>
                    :
                        <div>
                            <h3 className="text-center">File Upload</h3>
                            <Input type="file" onChange={this.onFileChange} />
                            {this.state.selectedFile ?
                                <Button onClick={this.onFileUpload}>
                                    Upload!
                                </Button>
                            :
                                <span>File not selected</span>
                            }
                            {this.state.error ? <div className="error">{this.state.error}</div> : ''}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default FileUploader;
