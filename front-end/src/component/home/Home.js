import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Nav, Navbar ,Carousel} from 'react-bootstrap';
import ProductContainers from './../containers/ProductContainers';
import { Container,Row,Col } from 'react-bootstrap';
import './Home.css';
import SelectKhuvuc from "./SelectKhuvuc";
import SelectGia from "./SelectGia";
import SelectLoai from "./SelectLoai";
import SelectNamNu from "./SelectNamNu";
import Dientich from "./Dientich";
import Loc from "./Loc";
import {Modal,ModalHeader,ModalBody,ModalFooter} from "reactstrap";
import Select from "react-select";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            khuvuc: "",
            loai: "",
            namNu:"",
            show:false
        };
        this.onFilterKhuvuc=this.onFilterKhuvuc.bind(this);
        this.onFilterLoai=this.onFilterLoai.bind(this);
        this.onFilterNamNu=this.onFilterNamNu.bind(this);
        this.handleShow=this.handleShow.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onFilterKhuvuc(value) {
        if(value){
            this.setState({
                khuvuc: value.label
            });
        }else {
            this.setState({
                khuvuc:""
            })
        }

    }
    onFilterLoai(value) {
        if(value){
            this.setState({
                loai: value.label
            });
        }else {
            this.setState({
                loai:""
            })
        }

    }

    onFilterNamNu(value) {
        if(value){
            this.setState({
                namNu: value.label
            });
        }else {
            this.setState({
                namNu:""
            })
        }

    }

    handleShow(){
        this.setState({
            show:!this.state.show
        })
    }

    handleClose(){
        this.setState({
            show:!this.state.show
        })
    }

    onChange(event){
        // let target = event.target;
        // let name = target.name;
        // let value = target.value;
        console.log(event)
    }

    onSubmit(event){
        event.preventDefault();
        console.log("-------");
    }

    render() {
        let { access } = this.props;
        let { khuvuc,loai,namNu,show } = this.state;
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
        let OptionsLoai=[
            {value:'tuquan',label:'Tự quản'},
            {value:'chungchu',label:'Chung chủ'},
            {value:'chungcu',label:'Chung cư'},
        ];
        let OptionsNamNu=[
            {value:'nam',label:'Nam'},
            {value:'nu',label:'Nữ'},
            {value:'namnuchung',label:'Chung Nam-Nữ'},
        ];
        return (
            <div className="Home">
                <Navbar className="Header">
                    <Navbar.Brand href="#home" className="text-light">RAVEN</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home" className="text-light">Home</Nav.Link>
                        <Nav.Link href="#features" className="text-light">Features</Nav.Link>
                        <Nav.Link href="#pricing" className="text-light">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        {!this.props.access && <Button
                            variant="outline-light"
                            className="mr-sm-2"
                            onClick={() => {
                                this.props.onRegisterLinkClick && this.props.onRegisterLinkClick()
                            }}
                        >
                            Đăng Nhập
                        </Button>}
                        {!this.props.access && <Button
                            variant="outline-light"
                            className="mr-sm-2"
                            onClick={() => {
                                this.props.onLoginLinkClick && this.props.onLoginLinkClick()
                            }}
                        >Đăng Ký</Button>}
                        {this.props.access &&

                        <span
                            className="icon-login mr-sm-2 fa fa-user-circle pr-2"
                        >&nbsp;
                            Chào {this.props.accout} !
                            </span>
                        }
                        {this.props.access && <Button
                            variant="outline-light"
                            onClick={() => {
                                this.props.onMore && this.props.onMore()
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
                            <SelectKhuvuc onFilterKhuvuc={this.onFilterKhuvuc}/>
                        </Col>
                        <Col>
                            <SelectGia/>
                        </Col>
                        <Col>
                            <Dientich/>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col>

                        </Col>
                        <Col>
                            <SelectLoai onFilterLoai={this.onFilterLoai}/>
                        </Col>
                        <Col>
                            <SelectNamNu onFilterNamNu={this.onFilterNamNu}/>
                        </Col>
                        <Col>
                            <Loc/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <hr/>
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
                                this.props.access &&
                                <button className='create'  onClick={this.handleShow}>
                                    Thêm trọ
                                    <i className="fa fa-plus"/>
                                </button>
                            }
                        </Col>
                    </Row>
                </Container>
                <Modal isOpen={show}>
                    <ModalHeader>Thêm phòng</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit} className="formAdd">
                            <input placeholder="Tên" className="mr-4 mb-4"/>
                            <input placeholder="Địa chỉ"/>
                            <input placeholder="Giá" className="mr-4 mb-4"/>
                            <input placeholder="Diện tích"/>
                            <Select
                                className="basic-single mb-4"
                                classNamePrefix="select"
                                defaultValue={[]}
                                name="color"
                                options={OptionsKhuVuc}
                                placeholder='Chọn khu vực'
                                isClearable
                                onChange={this.onChange}

                            />
                            <Select
                                className="basic-single mb-4"
                                classNamePrefix="select"
                                defaultValue={[]}
                                name="color"
                                options={OptionsNamNu}
                                placeholder='Chọn loại phòng'
                                isClearable
                                onChange={this.onChange}
                            />
                            <Select
                                className="basic-single mb-4"
                                classNamePrefix="select"
                                defaultValue={[]}
                                name="color"
                                options={OptionsLoai}
                                placeholder='Ưu tiên Nam/Nữ'
                                isClearable
                                onChange={this.onChange}
                            />
                            <ModalFooter>
                                <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                                <Button type="submit" color="primary">Add</Button>
                            </ModalFooter>

                        </Form>
                    </ModalBody>
                </Modal>
                <ProductContainers
                    access={access}
                    accout={this.props.accout}
                    khuvuc={khuvuc}
                    loai={loai}
                    namNu={namNu}
                >
                </ProductContainers>
            </div>
        );
    }

}

export default Home;
