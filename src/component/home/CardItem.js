import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from './../../component/actions/index';
import { Button } from 'react-bootstrap';

class CardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stt:""
        };
    }

    

    onEraseShopping = (value) => {
        // console.log(value);
        // alert('nhan thanh cong '+ this.props._id);
        if(confirm('Bạn chắc chắn Xóa không ?')){//eslint-disable-line
            this.props.onEraseShopping(value);
        }
        
    }

    downShopping(name,_id,price,accout) {
        // console.log(value);
        // alert('nhan thanh cong '+ this.props._id);
        this.props.downShopping(name,_id,price,accout);
    }


    upShopping(name,_id,price,accout){
        // console.log(value);
        this.props.onShopping(name,_id,price,accout);
    }

    render() {
        var stt=0;
        var elm = this.props.shopping.map((shopping, index) => {
            if(this.props.accout===shopping.accout){
                stt=stt+1;
                return <tr key={index}>
                <td>{stt}</td>
                <td>{shopping.name}</td>
                <td>
                    <Button className="mr-4" onClick={()=>this.downShopping(shopping.name,shopping._id,shopping.price,shopping.accout)}><i className="fa fa-sort-down"></i></Button>
                    {shopping.sl}
                    <Button className="ml-4" onClick={()=>this.upShopping(shopping.name,shopping._id,shopping.price,shopping.accout)}><i className="fa fa-sort-up"></i></Button>
                </td>
                <td>{shopping.price*shopping.sl}</td>
                <td><Button
                    variant="outline-primary"
                    onClick={() => this.onEraseShopping(shopping.id)}
                >
                    <i className="fa fa-trash"></i>
                </Button></td>
            </tr>
            }
            
        });
        return (
            <tbody>
                {elm}
            </tbody>
        );
    }

}

const mapStatetoProps = state => {
    return {
        products: state.Products,
        shopping: state.shopping
    }
}

// const mapDispatchToProps = (dispatch, action) => {
//     return {
//         onEraseShopping: (value) => {
//             // console.log(value);
//             dispatch(actions.EraseShoppingAPI(value));
            
//         }
//     }
// };



export default connect(mapStatetoProps, null)(CardItem);
