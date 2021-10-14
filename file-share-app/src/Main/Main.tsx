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
        return <div>
            <h1>Welcome to the File Sharing tool</h1>
            <Popup trigger={<Button>Upload File</Button>} modal nested>
                <div className="modal-inner">
                        <FileUploader></FileUploader>
                </div>
            </Popup>
            <Popup trigger={<Button>Download File</Button>} modal nested>
                <div className="modal-inner">
                    <FileDownloader></FileDownloader>
                </div>
            </Popup>
        </div>
    }
}

export default Main;
