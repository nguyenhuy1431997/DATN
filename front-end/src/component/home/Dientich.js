import React, {Component} from 'react';

class Dientich extends Component {
    render() {
        return (
            <div>
                <input
                    className='dientich'
                    placeholder='Chọn diện tích m2'
                    onChange={(value)=>{this.props.onFilterDienTich(value.target.value)}}
                />
            </div>
        );
    }
}

export default Dientich;