import React, {Component} from 'react';
import Select from "react-select";

class SelectGia extends Component {
    render() {
        let Options=[
            {value:'13',label:'1 tr - 3 tr'},
            {value:'35',label:'3 tr - 5 tr'},
            {value:'57',label:'5 tr - 7 tr'},
        ];
        return (
            <div>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={[]}
                    name="color"
                    options={Options}
                    placeholder='Chọn giá'
                    isClearable
                />
            </div>
        );
    }
}

export default SelectGia;