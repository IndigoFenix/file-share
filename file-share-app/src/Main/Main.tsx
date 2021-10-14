import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FileDownloader from '../FileDownloader';
import FileUploader from '../FileUploader';
import './Main.scss';
import { Button } from 'reactstrap';

export interface props {
}
export interface state {
}
class Main extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        this.click = this.click.bind(this);
    }
    click(){
    }
    close(){

    }
    render() {
        return <div className="container">
            <div className="card mt-5 p-5">
            <h1 className="mb-5">Welcome to the File Sharing tool</h1>
            <div className="row">
                <div className="col-6">
                    <Popup trigger={<Button className="mb-3 bg-primary p-5">Upload File</Button>} modal nested>
                        <div className="modal-inner">
                                <FileUploader></FileUploader>
                        </div>
                    </Popup>
                </div>
                <div className="col-6">
                    <Popup trigger={<Button className="p-5">Download File</Button>} modal nested>
                        <div className="modal-inner">
                            <FileDownloader></FileDownloader>
                        </div>
                    </Popup>
                </div>
            </div>
                
            </div>
        </div>
    }
}

export default Main;
