import React from 'react';
import './Main.scss';
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
    render() {
        
        return <div>
            <div>Main works!</div>
        </div>
    }
}

export default Main;
