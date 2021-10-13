import React, { Component } from 'react';
import { downloadFile } from '../services/file';

export interface props {
}
export interface state {
    'key': string,
    'downloaded':Boolean,
    'filename':string | null,
}
class FileDownloader extends Component<props, state> {
    
    constructor(props: props) {
        super(props);
        this.setState({'key': '','downloaded':false,'filename':null});
    }

    convertFile(filename:string,arr:Buffer){
        console.log(arr);
        var byteArray = new Uint8Array(arr);
        console.log(byteArray);
        var a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' }));
        a.download = filename;
        document.body.appendChild(a)
        a.click();
        document.body.removeChild(a)
    }

    onFileKeyChange = (event:any) => {
        console.log(event.target.value);
        this.setState({'key':event.target.value});
    }

    onFileDownload = () => {
        if (this.state.key != ''){
            downloadFile(this.state.key).then(value=>{
                console.log(value);
                this.setState({'downloaded':true,'filename':value.name});
                this.convertFile(value.name,value.data);
            });
        }
    }

    render() {

        return (
            <div>
                <h3>File Download</h3>
                <div>
                    <input type="text" onChange={this.onFileKeyChange} />
                    <button onClick={this.onFileDownload}>
                        Download
                    </button>
                </div>
            </div>
        );
    }
}

export default FileDownloader;
