import React, {Component} from 'react';
import Select from "react-select";

class SelectLoai extends Component {
    render() {
        let OptionsLoai=[
            {value:'tuquan',label:'Tự quản'},
            {value:'chungchu',label:'Chung chủ'},
            {value:'chungcu',label:'Chung cư'},
        ];
        return (
            <div>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={[]}
                    name="color"
                    options={OptionsLoai}
                    placeholder='Chọn loại phòng'
                    isClearable
                    onChange={(value)=>{this.props.onFilterLoai(value)}}
                />
            </div>
        );
    }
}

export default SelectLoai;