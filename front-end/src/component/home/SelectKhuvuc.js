import React, {Component} from 'react';
import Select from "react-select";

class SelectKhuvuc extends Component {
    render() {
        let OptionsKhuVuc=[
            {value:'lienchien',label:'Liên Chiển'},
            {value:'haichau',label:'Hải Châu'},
            {value:'camle',label:'Cẩm Lệ'},
            {value:'thanhkhe',label:'Thanh Khê'},
            {value:'nguhanhson',label:'Ngũ Hành Sơn'},
            {value:'sontra',label:'Sơn Trà'},
            {value:'hoavang',label:'Hòa Vang'},
            {value:'hoangsa',label:'Hoàng Sa'},
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