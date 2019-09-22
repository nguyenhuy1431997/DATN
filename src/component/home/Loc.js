import React, {Component} from 'react';
import Select from "react-select";

class Loc extends Component {
    render() {
        let Options=[
            {value:'tatca',label:'Tất cả'},
            {value:'moinhat',label:'Mới nhất'},
            {value:'giacaodenthap',label:'Giá cao đến thấp'},
            {value:'giathapdencao',label:'Giá thấp đến cao'},
        ];
        return (
            <div>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={[]}
                    name="color"
                    options={Options}
                    placeholder='Lọc'
                />
            </div>
        );
    }
}

export default Loc;