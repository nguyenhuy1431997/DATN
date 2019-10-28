import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import './Home.css';

class Products extends Component {


    updateRoom(id,name,address,price,area,districtId,description,priority,roomTypeId,images) {
        // console.log(id,name,address,price,area,districtName,description,priority,roomTypeName,images)
        this.props.updateRoom(id,name,address,price,area,districtId,description,priority,roomTypeId,images);
    }

    eraseRoom(id) {
        if (confirm('Bạn chắc chắn Xóa không ?')) {//eslint-disable-line
            this.props.eraseRoom(id);
        }
    }

    dat(id){
        this.props.dat(id)
    }

    render() {
        const { room } = this.props;
        // console.log(room);
        
        return (
            <Col className="Product mt-sm-4">
                <Card className="pt-3" style={{ width: '20em' }}>
                    {/* <Card.Img style={{ height: '20em' }} variant="top" src={this.props.product.image}/> */}
                    <Card.Body>
                        <div className={"d-flex flex-column align-items-center"}>
                            <Card.Title>{room.name}</Card.Title>
                            <Card.Text>Địa chỉ: {room.address}</Card.Text>
                            <Card.Text>Diện tích: {room.area}m</Card.Text>
                            <Card.Text>Khu vực: {room.districtName}</Card.Text>
                        </div>
                        <hr />
                        <Container>
                            <Row>
                                <Col md={4}>{room.price}$</Col>
                                <Col >
                                    {
                                        this.props.auth._token &&
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => this.updateRoom(
                                                room.id,
                                                room.name,
                                                room.address,
                                                room.price,
                                                room.area,
                                                room.districtId,
                                                room.description,
                                                room.priority,
                                                room.roomTypeId,
                                                room.images
                                                )}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </Button>
                                    }
                                </Col>
                                <Col >
                                    {
                                        this.props.auth._token &&
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => this.eraseRoom(this.props.room.id)}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </Button>
                                    }
                                </Col>
                                <Col >
                                    {
                                        this.props.nhanghi && !this.props.auth._token &&
                                        <Button
                                            variant="outline-primary"
                                            onClick={() => this.dat(this.props.room.id)}
                                        >
                                            Đặt
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
