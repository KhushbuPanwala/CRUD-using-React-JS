import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

class NativeSelects extends Component {
    state = {
        age: '',
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div>
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                    Age
                </InputLabel>
                <NativeSelect value={this.state.age} onChange={this.handleChange} name="age">
                    <option value="">None</option>
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </NativeSelect>
            </div >
        );
    }
}
export default NativeSelects;