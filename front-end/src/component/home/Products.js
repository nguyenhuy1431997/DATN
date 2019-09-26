import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import './Home.css';

class Products extends Component {


    onShopping() {

        if (this.props.access === false) {
            this.props.history.push("/about");
        }
        else {
            alert('Mua hàng thành công');

            this.props.onShopping(this.props.product.name,this.props.product.id,this.props.product.price,this.props.accout);
        }
    }

    onEraseTro(value){
        if(confirm('Bạn chắc chắn Xóa không ?')){//eslint-disable-line
            this.props.onEraseTro(value);
        }
    }

    render() {
        return (
            <Col className="Product mt-sm-4">
                <Card className="pt-3" style={{ width: '20em' }}>
                    <Card.Img style={{ height: '20em' }} variant="top" src={this.props.product.image}/>
                    <Card.Body>
                        <div className={"d-flex flex-column align-items-center"}>
                            <Card.Title>{this.props.product.name}</Card.Title>
                            <Card.Text>Địa chỉ: {this.props.product.diachi}</Card.Text>
                            <Card.Text>Diện tích: {this.props.product.dientich}m</Card.Text>
                            <Card.Text>Khu vực: {this.props.product.khuvuc}</Card.Text>
                        </div>
                        <hr />
                        <Container>
                            <Row>
                                <Col md={4}>{this.props.product.price}$</Col>
                                <Col >
                                    {
                                        this.props.access &&
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => this.onShopping()}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Button>
                                    }
                                </Col>
                                <Col >
                                    {
                                        this.props.access &&
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => this.onEraseTro(this.props.product.id)}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </Button>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        );
    }
}
export default withRouter(Products);
