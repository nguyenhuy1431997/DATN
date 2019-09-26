import React, { Component } from 'react';
import Products from './../home/Products';
import { connect } from 'react-redux';
// import { Col } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import CardItem from './../home/CardItem';
import * as actions from './../../component/actions/index';
import { Alert } from 'react-bootstrap';
// import axios from 'axios';

// import Product from './../components/Product';

class ProductContainers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            shopping: [],
        }
        this.onShopping = this.onShopping.bind(this);
        this.downShopping = this.downShopping.bind(this);
        this.onEraseShopping = this.onEraseShopping.bind(this);
    }

    componentDidMount() {
        this.props.stateproducts();
        this.props.stateShopping();
    }

    onShopping(name, _id, price, accout) {
        if (this.props.shopping.length === 0) {
            this.props.onShopping(name, _id, price, accout);
        }

        if (this.props.shopping.length > 0) {
            const resut = this.props.shopping.filter(shopping => shopping.accout === accout);


            if (resut.length > 0) {
                // console.log('dfg');
                // let sp=resut;;
                for (var i = 0; i < this.props.shopping.length; i++) {
                    if (accout === this.props.shopping[i].accout) {
                        // console.log(this.props.shopping[i]);
                        // sp.push(this.props.shopping[i]);
                        if (_id === this.props.shopping[i]._id) {
                            let id = this.props.shopping[i].id;
                            // && accout===this.props.shopping[i].accout
                            let sl = this.props.shopping[i].sl + 1;
                            this.props.upShopping(id, name, _id, sl, price, accout);
                        }

                    }
                }

                const kt = resut.filter(sp => sp._id === _id);
                if (kt.length === 0) {
                    this.props.onShopping(name, _id, price, accout);
                }

            }
            if (resut.length === 0) {
                this.props.onShopping(name, _id, price, accout);
            }
        }
    }
    downShopping(name, _id, price, accout) {
        for (let i = 0; i < this.props.shopping.length; i++) {
            if (accout === this.props.shopping[i].accout) {
                if (_id === this.props.shopping[i]._id) {
                    let id = this.props.shopping[i].id;
                    let sl = this.props.shopping[i].sl - 1;
                    if (sl === 0) {
                        this.props.onEraseShopping(id);
                    } else {
                        this.props.downShopping(id, name, _id, sl, price, accout);
                    }
                }
            }
        }
    }
    onEraseShopping(id) {
        this.props.onEraseShopping(id);
    }
    render() {
        let { products } = this.props;
        let { access } = this.props;
        let {khuvuc,loai,namNu,gia,s,loc}=this.props;
        let t;
        for (let i=0;i<gia.length;i++){
            if (gia[i]==='>'){
                t=9;
                break;
            }
            if(Number(gia[i])===1||Number(gia[i])===3||Number(gia[i])===5||Number(gia[i])===7) {
                t=Number(gia[i]);
            }

        }
        let l;
        if (loc==='giacaodenthap'){
            l=1;
        }
        if (loc==='giathapdencao'){
            l=2;
        }
        let elm = products.map((product, index) => {
            return <Products
                key={index}
                product={product}
                // shopping={shopping}
                access={access}
                onShopping={this.onShopping}
                accout={this.props.accout}
            />
        });
        return (
            <Container>
                <br />
                <Alert variant="dark" className={"d-flex flex-column align-items-center"}>
                    DANH SÁCH PHÒNG TRỌ
                </Alert>
                <Row>
                    {   l?
                        elm.filter(elm => elm.props.product.khuvuc.toLowerCase().indexOf(khuvuc.toLowerCase()) > -1)
                            .filter(elm => elm.props.product.loaiphong.toLowerCase().indexOf(loai.toLowerCase()) > -1)
                            .filter(elm => elm.props.product.nam_nu.toLowerCase().indexOf(namNu.toLowerCase()) > -1)
                            .filter(elm => (
                                elm.props.product.price/1000<(t?t:5000) && elm.props.product.price/1000>(t?(t-2):0)
                            ))
                            .filter(elm => (
                                elm.props.product.dientich<(s?Number(s)+3:500) && elm.props.product.dientich>(s?Number(s)-3:0)
                                )
                            )
                            .sort(function(a, b) {
                                if (l===1){
                                    return b.props.product.price - a.props.product.price;
                                }
                                if (l===2){
                                    return a.props.product.price - b.props.product.price;
                                }
                            })
                        :
                        elm.filter(elm => elm.props.product.khuvuc.toLowerCase().indexOf(khuvuc.toLowerCase()) > -1)
                            .filter(elm => elm.props.product.loaiphong.toLowerCase().indexOf(loai.toLowerCase()) > -1)
                            .filter(elm => elm.props.product.nam_nu.toLowerCase().indexOf(namNu.toLowerCase()) > -1)
                            .filter(elm => (
                                elm.props.product.price/1000<(t?t:5000) && elm.props.product.price/1000>(t?(t-2):0)
                            ))
                            .filter(elm => (
                                    elm.props.product.dientich<(s?Number(s)+3:500) && elm.props.product.dientich>(s?Number(s)-3:0)
                                )
                            )
                    }
                </Row>
                <br />
                {
                    this.props.access && this.props.shopping.length > 0 &&
                    <Alert variant="dark" className={"d-flex flex-column align-items-center"}>
                        GIỎ HÀNG CỦA TÔI
                    </Alert>
                }
                {this.props.access && this.props.shopping.length > 0 && <Row className="mt-sm-4">
                    <Col>
                        <Table striped bordered hover className="bg-light">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                                <th></th>
                            </tr>
                            </thead>
                            <CardItem
                                // shopping={shopping}
                                accout={this.props.accout}
                                onShopping={this.onShopping}
                                downShopping={this.downShopping}
                                onEraseShopping={this.onEraseShopping}
                            />
                        </Table>
                    </Col>
                </Row>}
            </Container>
        );
    }
}
const mapStatetoProps = state => {
    return {

        products: state.Products,
        shopping: state.shopping,
        users: state.auth_reducer
    }
}
const mapDispatchToProps = (dispatch, action) => {
    return {
        stateShopping: () => {
            // console.log(value);
            dispatch(actions.stateShoppingAPI());
        },
        stateproducts: () => {
            dispatch(actions.stateproductsAPI());
        },
        onShopping: (name, _id, price, accout) => {
            // console.log(value);
            dispatch(actions.onShoppingAPI(name, _id, price, accout));
        },
        upShopping: (id, name, _id, sl, price, accout) => {
            dispatch(actions.upShoppingAPI(id, name, _id, sl, price, accout));
        },
        downShopping: (id, name, _id, sl, price, accout) => {
            dispatch(actions.downShoppingAPI(id, name, _id, sl, price, accout));
        },
        onEraseShopping: (id) => {
            dispatch(actions.onEraseShoppingAPI(id));
        }
    }
};
export default connect(mapStatetoProps, mapDispatchToProps)(ProductContainers);