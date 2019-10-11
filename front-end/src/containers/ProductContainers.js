import React, { Component } from 'react';
import Products from '../component/home/Products';
import { connect } from 'react-redux';
// import { Col } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import CardItem from '../component/home/CardItem';
import * as actions from '../actions/index';
import { Alert } from 'react-bootstrap';
// import axios from 'axios';

// import Product from './../components/Product';

class ProductContainers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            shopping: [],
        }
        // this.onShopping = this.onShopping.bind(this);
        // this.downShopping = this.downShopping.bind(this);
        // this.onEraseShopping = this.onEraseShopping.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
        this.eraseRoom = this.eraseRoom.bind(this);
    }

    // componentWillMount() {
    //     this.props.getRooms()
    // }

    componentDidMount() {
        this.props.getRooms();
        // this.props.stateShopping();
    }

    // onShopping(name, _id, price, accout) {
    //     if (this.props.shopping.length === 0) {
    //         this.props.onShopping(name, _id, price, accout);
    //     }

    //     if (this.props.shopping.length > 0) {
    //         const resut = this.props.shopping.filter(shopping => shopping.accout === accout);


    //         if (resut.length > 0) {
    //             // console.log('dfg');
    //             // let sp=resut;;
    //             for (var i = 0; i < this.props.shopping.length; i++) {
    //                 if (accout === this.props.shopping[i].accout) {
    //                     // console.log(this.props.shopping[i]);
    //                     // sp.push(this.props.shopping[i]);
    //                     if (_id === this.props.shopping[i]._id) {
    //                         let id = this.props.shopping[i].id;
    //                         // && accout===this.props.shopping[i].accout
    //                         let sl = this.props.shopping[i].sl + 1;
    //                         this.props.upShopping(id, name, _id, sl, price, accout);
    //                     }

    //                 }
    //             }

    //             const kt = resut.filter(sp => sp._id === _id);
    //             if (kt.length === 0) {
    //                 this.props.onShopping(name, _id, price, accout);
    //             }

    //         }
    //         if (resut.length === 0) {
    //             this.props.onShopping(name, _id, price, accout);
    //         }
    //     }
    // }
    // downShopping(name, _id, price, accout) {
    //     for (let i = 0; i < this.props.shopping.length; i++) {
    //         if (accout === this.props.shopping[i].accout) {
    //             if (_id === this.props.shopping[i]._id) {
    //                 let id = this.props.shopping[i].id;
    //                 let sl = this.props.shopping[i].sl - 1;
    //                 if (sl === 0) {
    //                     this.props.onEraseShopping(id);
    //                 } else {
    //                     this.props.downShopping(id, name, _id, sl, price, accout);
    //                 }
    //             }
    //         }
    //     }
    // }
    // onEraseShopping(id) {
    //     this.props.onEraseShopping(id);
    // }

    updateRoom(id, name, address, price, area, districtId, description, priority, roomTypeId, images) {
        // console.log(id);
        this.props.handleShow(id, name, address, price, area, districtId, description, priority, roomTypeId, images);
    }

    eraseRoom(id) {
        // console.log(id)
        this.props.eraseRoom(id, this.props.auth._token);
    }
    render() {
        let { rooms, auth } = this.props;
        // let { access } = this.props;
        let { khuvuc, loai, namNu, gia, s, loc } = this.props;
        let t;
        for (let i = 0; i < gia.length; i++) {
            if (gia[i] === '>') {
                t = 9;
                break;
            }
            if (Number(gia[i]) === 1 || Number(gia[i]) === 3 || Number(gia[i]) === 5 || Number(gia[i]) === 7) {
                t = Number(gia[i]);
            }

        }
        let l;
        if (loc === 'giacaodenthap') {
            l = 1;
        }
        if (loc === 'giathapdencao') {
            l = 2;
        }
        let elm;
        if (rooms.length > 0) {
            elm = rooms.map((room, index) => {
                return <Products
                    key={index}
                    room={room}
                    // shopping={shopping}
                    // access={access}
                    updateRoom={this.updateRoom}
                    auth={auth}
                    eraseRoom={this.eraseRoom}
                />
            });
        }
        return (
            <Container>
                <br />
                <Alert variant="dark" className={"d-flex flex-column align-items-center"}>
                    DANH SÁCH PHÒNG TRỌ
                </Alert>
                <Row>
                    {elm &&
                        (l ?
                            elm.filter(elm => elm.props.room.districtName.toLowerCase().indexOf(khuvuc.toLowerCase()) > -1)
                                .filter(elm => elm.props.room.roomTypeName.toLowerCase().indexOf(loai.toLowerCase()) > -1)
                                .filter(elm => elm.props.room.priority.toLowerCase().indexOf(namNu.toLowerCase()) > -1)
                                .filter(elm => (
                                    elm.props.room.price / 1000 <= (t ? t : 5000) && elm.props.room.price / 1000 > (t ? (t - 2) : 0)
                                ))
                                .filter(elm => (
                                    elm.props.room.area < (s ? Number(s) + 3 : 500) && elm.props.room.area > (s ? Number(s) - 3 : 0)
                                )
                                )
                                .sort(function (a, b) {
                                    if (l === 1) {
                                        return b.props.room.price - a.props.room.price;
                                    }
                                    if (l === 2) {
                                        return a.props.room.price - b.props.room.price;
                                    }
                                })
                            :
                            elm.filter(elm => elm.props.room.districtName.toLowerCase().indexOf(khuvuc.toLowerCase()) > -1)
                                .filter(elm => elm.props.room.roomTypeName.toLowerCase().indexOf(loai.toLowerCase()) > -1)
                                .filter(elm => elm.props.room.priority.toLowerCase().indexOf(namNu.toLowerCase()) > -1)
                                .filter(elm => (
                                    elm.props.room.price / 1000 <= (t ? t : 5000) && elm.props.room.price / 1000 > (t ? (t - 2) : 0)
                                ))
                                .filter(elm => (
                                    elm.props.room.area < (s ? Number(s) + 3 : 500) && elm.props.room.area > (s ? Number(s) - 3 : 0)
                                )
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
        rooms: state.Rooms.rooms,
        users: state.auth_reducer
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getRooms: async () => {
            await dispatch(actions.getRooms());
        },
        eraseRoom: async (id, _token) => {
            await dispatch(actions.eraseRoom(id, _token));
        }
    }
};
// const mapDispatchToProps = (dispatch, action) => {
//     return {
//         stateShopping: () => {
//             // console.log(value);
//             dispatch(actions.stateShoppingAPI());
//         },
//         stateproducts: () => {
//             dispatch(actions.stateproductsAPI());
//         },
//         onShopping: (name, _id, price, accout) => {
//             // console.log(value);
//             dispatch(actions.onShoppingAPI(name, _id, price, accout));
//         },
//         upShopping: (id, name, _id, sl, price, accout) => {
//             dispatch(actions.upShoppingAPI(id, name, _id, sl, price, accout));
//         },
//         downShopping: (id, name, _id, sl, price, accout) => {
//             dispatch(actions.downShoppingAPI(id, name, _id, sl, price, accout));
//         },
//         onEraseShopping: (id) => {
//             dispatch(actions.onEraseShoppingAPI(id));
//         },
// onEraseTro: (id) => {
//     dispatch(actions.onEraseTroAPI(id));
// }
//     }
// };
export default connect(mapStatetoProps, mapDispatchToProps)(ProductContainers);