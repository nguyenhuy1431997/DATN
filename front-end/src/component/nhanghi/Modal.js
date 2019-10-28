import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ModalHeader from "react-bootstrap/ModalHeader";
import Select from "react-select";
import * as actions from "./../../actions/index";
import { connect } from "react-redux";

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            ten:'',
            sdt:''
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.show} style={{ width: "90%", maxWidth: "1200px" }}>
                <Form className="formAdd" method="post" enctype="multipart/form-data">
                    <ModalHeader>Đặt phòng</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Tên</Label>
                            <Input
                                type="text"
                                name="ten"
                                // defaultValue={id ? name : ""}
                                // value={this.state.ten}
                                placeholder="Nhập tên"
                                onChange={(e) => this.setState({
                                    ten: e.target.value
                                })}
                            />
                            {this.state.ten === '' ? <div className="error-mes">Bắt buộc</div> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Số điện thoại</Label>
                            <Input
                                type="text"
                                name="sdt"
                                // defaultValue={id ? address : ""}
                                placeholder="Nhập số điện thoại"
                                onChange={(e) => this.setState({
                                    sdt: e.target.value
                                })}
                            />
                            {this.state.sdt === '' ? <div className="error-mes">Bắt buộc</div> : ''}
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.handleClose}>Cancel</Button>
                        {/* <Button disabled={disable} onClick={() => this.onSubmit(id)} color="primary">{!id ? 'All' : 'Save'}</Button> */}
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

const mapStatetoProps = state => {
    
};

const mapDispatchToProps = (dispatch, action) => {
    return {
    }
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddModal);