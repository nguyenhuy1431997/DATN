import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Nav, Navbar, Carousel } from 'react-bootstrap';
import ProductContainers from '../../containers/ProductContainers';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';
import SelectKhuvuc from "./SelectKhuvuc";
import SelectGia from "./SelectGia";
import SelectLoai from "./SelectLoai";
import SelectNamNu from "./SelectNamNu";
import Dientich from "./Dientich";
import Loc from "./Loc";
import AddModal from './AddModal';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            address: '',
            price: '',
            area: '',
            districtId: '',
            description: '',
            priority: '',
            roomTypeId: '',
            images: '',
            khuvuc: "",
            loai: "",
            namNu: "",
            gia: "",
            s: "",
            loc: "",
            show: false
        };
        this.onFilterKhuvuc = this.onFilterKhuvuc.bind(this);
        this.onFilterLoai = this.onFilterLoai.bind(this);
        this.onFilterNamNu = this.onFilterNamNu.bind(this);
        this.onFilterGia = this.onFilterGia.bind(this);
        this.onFilterDienTich = this.onFilterDienTich.bind(this);
        this.onFilterLoc = this.onFilterLoc.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    onFilterKhuvuc(value) {
        if (value) {
            this.setState({
                khuvuc: value.label
            });
        } else {
            this.setState({
                khuvuc: ""
            })
        }

    }
    onFilterLoai(value) {
        if (value) {
            this.setState({
                loai: value.label
            });
        } else {
            this.setState({
                loai: ""
            })
        }

    }

    onFilterNamNu(value) {
        if (value) {
            this.setState({
                namNu: value.value
            });
        } else {
            this.setState({
                namNu: ""
            })
        }

    }
    onFilterGia(value) {
        if (value) {
            this.setState({
                gia: value.label
            });
        } else {
            this.setState({
                gia: ""
            })
        }

    }
    onFilterDienTich(value) {
        if (value) {
            this.setState({
                s: value
            });
        } else {
            this.setState({
                s: ""
            })
        }

    }

    onFilterLoc(value) {
        if (value) {
            this.setState({
                loc: value.value
            });
        } else {
            this.setState({
                loc: ""
            })
        }

    }

    handleShow(id, name, address, price, area, districtId, description, priority, roomTypeId, images) {
        // console.log(id);
        if (id) {
            this.setState({
                id: id,
                name: name,
                address: address,
                price: price,
                area: area,
                districtId: districtId,
                description: description,
                priority: priority,
                roomTypeId: roomTypeId,
                images: images,
                show: !this.state.show
            })
        }
        else {
            this.setState({
                show: !this.state.show
            })
        }

    }

    handleClose() {
        this.setState({
            id: null,
            name:null,
            address:null,
            price:null,
            area:null,
            districtId:null,
            description:null,
            priority:null,
            roomTypeId:null,
            show: !this.state.show
        })
    }

    render() {
        // let { access } = this.props;
        let { auth } = this.props;
        let { id, name, address, price, area, districtId, description, priority, roomTypeId, images, khuvuc, loai, namNu, gia, s, loc, show } = this.state;
        return (
            <div className="Home">
                <Navbar className="Header">
                    <Navbar.Brand href="#home" className="text-light">Trang chủ</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home" className="text-light">Trang cá nhân</Nav.Link>
                        <Nav.Link href="#features" className="text-light">Nhà Trọ</Nav.Link>
                        <Nav.Link href="#pricing" className="text-light">Nhà nghỉ</Nav.Link>
                    </Nav>
                    <Form inline>
                        {!auth._token && <Button
                            variant="outline-light"
                            className="mr-sm-2"
                            onClick={() => {
                                this.props.onRegisterLinkClick && this.props.onRegisterLinkClick()
                            }}
                        >
                            Đăng Nhập
                        </Button>}
                        {!auth._token && <Button
                            variant="outline-light"
                            className="mr-sm-2"
                            onClick={() => {
                                this.props.onLoginLinkClick && this.props.onLoginLinkClick()
                            }}
                        >Đăng Ký</Button>}
                        {auth._token &&

                            <span
                                className="icon-login mr-sm-2 fa fa-user-circle pr-2"
                            >&nbsp;
                            Chào {auth.user.result.name} !
                            </span>
                        }
                        {auth._token && <Button
                            variant="outline-light"
                            onClick={() => {
                                this.props.logOut && this.props.logOut(auth._token)
                            }}
                        >Đăng xuất</Button>}
                    </Form>
                </Navbar>
                <div className="container mt-3">
                    <Carousel className="slide">
                        <Carousel.Item className='slide_Item'>
                            <img
                                className="d-block w-100"
                                src="https://www.top10danang.com/wp-content/uploads/2018/07/thue-phong-tro-da-nang-8.png"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.top10danang.com/wp-content/uploads/2018/07/thue-phong-tro-da-nang-8.png"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.top10danang.com/wp-content/uploads/2018/07/thue-phong-tro-da-nang-8.png"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <Container className='mt-4'>
                    <Row>
                        <Col>
                            <button className='tatca'>
                                Tất cả
                            </button>
                        </Col>
                        <Col>
                            <SelectKhuvuc onFilterKhuvuc={this.onFilterKhuvuc} />
                        </Col>
                        <Col>
                            <SelectGia onFilterGia={this.onFilterGia} />
                        </Col>
                        <Col>
                            <Dientich onFilterDienTich={this.onFilterDienTich} />
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>

                        </Col>
                        <Col>
                            <SelectLoai onFilterLoai={this.onFilterLoai} />
                        </Col>
                        <Col>
                            <SelectNamNu onFilterNamNu={this.onFilterNamNu} />
                        </Col>
                        <Col>
                            <Loc onFilterLoc={this.onFilterLoc} />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <hr />
                </Container>
                <Container className='t-4'>
                    <Row>
                        <Col>

                        </Col>
                        <Col>

                        </Col>
                        <Col>

                        </Col>
                        <Col>
                            {
                                auth._token &&
                                <button className='create' onClick={() => this.handleShow(id, name, address, price, area, districtId, description, priority, roomTypeId, images)}>
                                    Thêm trọ
                                    <i className="fa fa-plus" />
                                </button>
                            }
                        </Col>
                    </Row>
                </Container>
                <AddModal
                    id={id}
                    name={name}
                    address={address}
                    price={price}
                    area={area}
                    districtId={districtId}
                    description={description}
                    priority={priority}
                    roomTypeId={roomTypeId}
                    images={images}
                    show={show}
                    handleClose={this.handleClose}
                    _token={auth._token}
                />
                <ProductContainers
                    // access={access}
                    auth={auth}
                    khuvuc={khuvuc}
                    loai={loai}
                    namNu={namNu}
                    gia={gia}
                    s={s}
                    loc={loc}
                    handleShow={this.handleShow}
                >
                </ProductContainers>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        auth: state.auth_reducer
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        getRooms: async () => {
            await dispatch(actions.getRooms());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
