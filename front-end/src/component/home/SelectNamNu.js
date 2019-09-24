import React, {Component} from 'react';
import Select from "react-select";

class SelectNamNu extends Component {
    render() {
        let OptionsNamNu=[
            {value:'nam',label:'Nam'},
            {value:'nu',label:'Nữ'},
            {value:'namnuchung',label:'Chung Nam-Nữ'},
            ];
        return (
            <div>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={[]}
                    name="color"
                    options={OptionsNamNu}
                    placeholder='Ưu tiên Nam/nữ'
                    isClearable
                    onChange={(value)=>{this.props.onFilterNamNu(value)}}
                />
            </div>
        );
    }
}

export default SelectNamNu;