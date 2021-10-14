import React, { Component } from 'react';
import { downloadFile } from '../services/file';
import { Button, Input } from 'reactstrap';

export interface props {
}
export interface state {
    'key': string,
    'downloaded':Boolean,
    'filename':string | null,
    'error':string | null
}
class FileDownloader extends Component<props, state> {
    
    constructor(props: props) {
        super(props);
        this.state = {'key': '','downloaded':false,'filename':null,'error':null};
    }

    //Converts 
    browserDownloadFile(filename:string,arr:Buffer){
        var byteArray = new Uint8Array(arr);
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }));
        a.download = filename;
        document.body.appendChild(a)
        a.click();
        document.body.removeChild(a)
    }

    onFileKeyChange = (event:any) => {
        this.setState({'key':event.target.value});
    }

    onFileDownload = () => {
        this.setState({'downloaded':false,'filename':null,'error':null});
        if (this.state.key != ''){
            downloadFile(this.state.key).then(value=>{
                this.setState({'downloaded':true,'filename':value.name,'error':null});
                this.browserDownloadFile(value.name,value.data.data);
            }).catch(error=>{
                this.setState({'error':error})
            });
        }
    }

    render() {

        return (
            <div className="p-3">
                <h3 className="text-center pb-3">File Download</h3>
                <div>
                    <Input type="text" className='mb-3 text-center' placeholder="Enter your file key" onChange={this.onFileKeyChange} />
                    <Button className="w-100" onClick={this.onFileDownload}>
                        Download
                    </Button>
                    {this.state.error ? <div className="error">{this.state.error}</div> : ''}
                </div>
            </div>
        );
    }
}

export default FileDownloader;
