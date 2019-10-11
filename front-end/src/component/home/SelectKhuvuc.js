import React, {Component} from 'react';
import Select from "react-select";

class SelectKhuvuc extends Component {
    render() {
        let OptionsKhuVuc=[
            {value:1,label:'Liên Chiểu'},
            {value:2,label:'Hải Châu'},
            {value:3,label:'Cẩm Lệ'},
            {value:4,label:'Thanh Khê'},
            {value:5,label:'Ngũ Hành Sơn'},
            {value:6,label:'Sơn Trà'},
            {value:7,label:'Hòa Vang'},
            {value:8,label:'Hoàng Sa'},
        ];
        return (
            <div>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={[]}
                    name="color"
                    options={OptionsKhuVuc}
                    placeholder='Chọn khu vực'
                    onChange={(value)=>{this.props.onFilterKhuvuc(value)}}
                    isClearable
                />
            </div>
        );
    }
}

export default SelectKhuvuc;