import React, {Component} from 'react';
import Select from "react-select";

class SelectLoai extends Component {
    render() {
        let Options=[
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
                    options={Options}
                    placeholder='Chọn loại phòng'
                />
            </div>
        );
    }
}

export default SelectLoai;