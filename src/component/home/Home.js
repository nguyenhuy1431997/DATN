import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Nav, Navbar ,Carousel} from 'react-bootstrap';
import { ButtonGroup, DropdownButton, Dropdown ,ButtonToolbar} from 'react-bootstrap';
import ProductContainers from './../containers/ProductContainers';
import { Container,Row,Col } from 'react-bootstrap';
import './Home.css';
import Select from 'react-select';
import SelectKhuvuc from "./SelectKhuvuc";
import SelectGia from "./SelectGia";
import SelectLoai from "./SelectLoai";
import SelectNamNu from "./SelectNamNu";
import Dientich from "./Dientich";
import Loc from "./Loc";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: ""
        }
    }

    onfilter(value) {
        this.setState({
            filter: value
        });
    }

    render() {
        var { access } = this.props;
        var { filter } = this.state;
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
                 {/*<div className="d-flex justify-content-center align-items-center">*/}
                 {/*    <ButtonGroup className="mt-4 center w-75">*/}
                 {/*       <Button variant="secondary" onClick={() => this.onfilter("")}>Tất cả</Button>*/}
                 {/*       /!*<Button variant="secondary" onClick={() => this.onfilter("iPhone")}>Khu vực</Button>*!/*/}
                 {/*        <DropdownButton variant="secondary" as={ButtonGroup} title="Khu vực" id="bg-nested-dropdown">*/}
                 {/*            <Dropdown.Item eventKey="1"  >NOKIA</Dropdown.Item>*/}
                 {/*            <Dropdown.Item eventKey="2" >REALME </Dropdown.Item>*/}
                 {/*            <Dropdown.Item eventKey="3" >HUAWEI </Dropdown.Item>*/}
                 {/*        </DropdownButton>*/}
                 {/*        <Button variant="secondary" onClick={() => this.onfilter("VIVO")}>Loại trọ</Button>*/}
                 {/*       <Button variant="secondary" onClick={() => this.onfilter("SAMSUNG")}>Diện tích</Button>*/}
                 {/*       <Button variant="secondary" onClick={() => this.onfilter("OPPO")}>Giá</Button>*/}
                 {/*       <Button variant="secondary" onClick={() => this.onfilter("XIAOMI")}>Ưu tiên Nam/nữ</Button>*/}
                 {/*       <Button variant="secondary" onClick={() => this.onfilter("HUAWEI")}>chung/riêng chủ</Button>*/}
                 {/*        <DropdownButton variant="secondary" as={ButtonGroup} title="Xem thêm" id="bg-nested-dropdown">*/}
                 {/*           <Dropdown.Item eventKey="1"  >NOKIA</Dropdown.Item>*/}
                 {/*           <Dropdown.Item eventKey="2" >REALME </Dropdown.Item>*/}
                 {/*           <Dropdown.Item eventKey="3" >HUAWEI </Dropdown.Item>*/}
                 {/*        </DropdownButton>*/}
                 {/*   </ButtonGroup>*/}
                 {/*</div>*/}



                {/*<br />*/}
                {/*<ProductContainers*/}
                {/*access={access}*/}
                {/*accout={this.props.accout}*/}
                {/*filter={filter}*/}
                {/*>*/}
                {/*</ProductContainers>*/}
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
                            <SelectKhuvuc/>
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
                            <SelectLoai/>
                        </Col>
                        <Col>
                            <SelectNamNu/>
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
                                <button className='create'>
                                    Thêm trọ
                                    <i className="fa fa-plus"></i>
                                </button>
                            }
                        </Col>
                    </Row>
                </Container>
                <ProductContainers
                access={access}
                accout={this.props.accout}
                filter={filter}
                >
                </ProductContainers>
            </div>
        );
    }

}

export default Home;
