import React, {Component} from 'react';

//* Fetch data from trivia api
export default class Question extends Component {

    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await fetch(`https://opentdb.com/api.php?amount=50&type=multiple`);
        const data = await resp.json();
        console.log(data)
        // this.props.onSubmit(resp.data);
        // this.setState({ });
    };

    render() {
        return (
            <div>
                <button onClick={this.handleSubmit}>Click</button>
            </div>
        );
    }
    
}
