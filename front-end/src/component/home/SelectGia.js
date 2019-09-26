import React, {Component} from 'react';
import Select from "react-select";

class SelectGia extends Component {
    render() {
        let Options=[
            {value:'1',label:'< 1 tr'},
            {value:'13',label:'1 - 3 tr'},
            {value:'35',label:'3 - 5 tr'},
            {value:'57',label:'5 - 7 tr'},
            {value:'7',label:'> 7tr'},
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
                    onChange={(value)=>{this.props.onFilterGia(value)}}
                />
            </div>
        );
    }
}

export default SelectGia;