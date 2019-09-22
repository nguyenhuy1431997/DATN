import React, {Component} from 'react';
import Select from "react-select";

class SelectNamNu extends Component {
    render() {
        let Options=[
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
                    options={Options}
                    placeholder='Ưu tiên Nam/nữ'
                />
            </div>
        );
    }
}

export default SelectNamNu;