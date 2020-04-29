import './App.css';
import React from 'react';

class App extends React.Component {

    state = { screenText: '', num1: 0, num2: 0, operationType: '', result: 0 };

    onInputNumber = (num) => {
        const screenText = this.state.screenText === '0' ? num : this.state.screenText + num.toString(); 
        this.setState({ screenText })
    }

    onInputDot = () => {
        if(this.state.screenText){
            const screenText = this.state.screenText + '.';
            this.setState({ screenText });
        }
    }

    onInputOperation = async (operationType) => {

        if(this.state.num1 === 0) {
            const num1 = this.state.screenText;
            this.setState({ num1, screenText: '', operationType})

        } else if(this.state.num2 === 0) {
            const num2 = this.state.screenText;

            if(num2) {
                await this.setState({ num2: num2, screenText: '', operationType})
                this.calResult();
            }else {
                this.setState({ operationType })
            }

        }
    }

    calResult = async () => {
        var result = 0;
        if(this.state.num2 === 0) {
            const num2 = this.state.screenText;
            if(!num2){
                return;
            }
            await this.setState({ num2: num2 })
        }
        switch (this.state.operationType) {
            case '+':
                result = parseFloat(this.state.num1) + parseFloat(this.state.num2);
                this.setState({ screenText: '', num1: result, num2: 0, result });
                break;
            case '-':
                result = parseFloat(this.state.num1) - parseFloat(this.state.num2);
                this.setState({ screenText: '', num1: result, num2: 0, result });
                break;
            case '*':
                result = parseInt(this.state.num1) * parseInt(this.state.num2);
                this.setState({ screenText: '', num1: result, num2: 0, result });
                break;
            case '/':
                result = parseFloat(this.state.num1) / parseFloat(this.state.num2);
                this.setState({ screenText: '', num1: result, num2: 0, result });
                break;

        }

    }

    onClearScreen = () => {
        this.setState({ screenText: '', num1: 0, num2: 0, operationType:'', result: 0});
    }
    
    render() {
        return (
            <div id="root">
                <label id="display"> {this.state.result} </label>
                <input id="cdisplay" type="text" value={this.state.screenText} disabled="disabled"/>
                <button onClick={ () => this.onClearScreen() } id="clear">AC </button>
                <button onClick={ () => this.onInputOperation('/') } id="divide">/</button>
                <button onClick={ () => this.onInputOperation('*') } id="multiply">*</button>
                <button onClick={ () => this.onInputNumber(7) } id="seven">7</button>
                <button onClick={ () => this.onInputNumber(8) }  id="eight">8</button>
                <button onClick={ () => this.onInputNumber(9) }  id="nine">9</button>
                <button onClick={ () => this.onInputOperation('-') }  id="minus">-</button>
                <button onClick={ () => this.onInputNumber(4) }  id="four">4</button>
                <button onClick={ () => this.onInputNumber(5) }  id="five">5</button>
                <button onClick={ () => this.onInputNumber(6) }  id="six">6</button>
                <button onClick={ () => this.onInputOperation('+') }id="plus">+</button>
                <button onClick={ () => this.onInputNumber(1) }  id="one">1</button>
                <button onClick={ () => this.onInputNumber(2) }  id="two">2</button>
                <button onClick={ () => this.onInputNumber(3) }  id="three">3</button>
                <button onClick={ () => this.onInputNumber(0) }  id="zero">0</button>
                <button onClick={ () => this.onInputDot() }  id="dot">.</button>
                <button onClick={ this.calResult } id="equal">=</button>
            </div>
        );
    }
}

export default App;