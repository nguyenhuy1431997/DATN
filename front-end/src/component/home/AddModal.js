import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ModalHeader from "react-bootstrap/ModalHeader";
import Select from "react-select";
import * as actions from "./../../actions/index";
import { connect } from "react-redux";

class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ten: null,
            diachi: null,
            gia: null,
            dientich: null,
            noidung: null,
            khuvuc: null,
            loai: null,
            namnu: null,
            file: null
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (id) => {
        const { _token } = this.props
        const { name, address, price, area, districtId, description, priority, roomTypeId, images, rooms } = this.props;
        const { ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file } = this.state;
        if (ten === null) this.setState({ ten: name ? name : null });
        if (diachi === null) this.setState({ diachi: address ? address : null });
        if (gia === null) this.setState({ gia: price ? price : null });
        if (dientich === null) this.setState({ dientich: area ? area : null });
        if (noidung === null) this.setState({ noidung: description ? description : null });
        if (khuvuc === null) this.setState({ khuvuc: districtId ? districtId : null });
        if (loai === null) this.setState({ loai: roomTypeId ? roomTypeId : null });
        if (namnu === null) this.setState({ namnu: priority ? priority : null });

        // if (ten === null || diachi === null || gia === null || dientich === null || noidung === null || khuvuc === null || loai === null || namnu === null) {
        //     this.setState({
        //         ten: name ? name : null,
        //         diachi: address ? address : null,
        //         gia: price ? price : null,
        //         dientich: area ? area : null,
        //         noidung: description ? description : null,
        //         khuvuc: districtId ? districtId : null,
        //         loai: roomTypeId ? roomTypeId : null,
        //         namnu: priority ? priority : null
        //     })
        // }
        if (id) {
            // console.log(name, address, price, area, districtId, description, priority, roomTypeId, images, rooms);
            //     console.log(ten?ten:name, diachi?diachi:address, gia?gia:price, 
            //         dientich?dientich:area, noidung?noidung:description, khuvuc?khuvuc:districtId, 
            //         loai?loai:roomTypeId, namnu?namnu:priority, file?file:images);
            this.props.updateRoom(id, ten ? ten : name, diachi ? diachi : address, gia ? gia : price,
                dientich ? dientich : area, noidung ? noidung : description, khuvuc ? khuvuc : districtId,
                loai ? loai : roomTypeId, namnu ? namnu : priority, file ? file : images, rooms, _token).then(() => {
                    this.props.handleClose();
                    this.setState({
                        ten: null,
                        diachi: null,
                        gia: null,
                        dientich: null,
                        noidung: null,
                        khuvuc: null,
                        loai: null,
                        namnu: null,
                        file: null
                    })
                })
        } else {
            this.props.allRoom(ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file, _token).then(() => {
                this.props.handleClose();
                this.setState({
                    ten: null,
                    diachi: null,
                    gia: null,
                    dientich: null,
                    noidung: null,
                    khuvuc: null,
                    loai: null,
                    namnu: null,
                    file: null
                })
            })
        }

    };

    render() {
        const { id, name, address, price, area, districtId, description, priority, roomTypeId, images, rooms } = this.props;
        const { ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file } = this.state
        // console.log(id);
        // console.log(rooms)
        const disable = !((ten||name) && (diachi||address) && (gia||price) && (dientich||area) 
        && (noidung||description) && (khuvuc||districtId) && (loai||roomTypeId) && (namnu||priority));
        let OptionsKhuVuc = [
            { value: 1, label: 'Liên Chiểu' },
            { value: 2, label: 'Hải Châu' },
            { value: 3, label: 'Cẩm Lệ' },
            { value: 4, label: 'Thanh Khê' },
            { value: 5, label: 'Ngũ Hành Sơn' },
            { value: 6, label: 'Sơn Trà' },
            { value: 7, label: 'Hòa Vang' },
            { value: 8, label: 'Hoàng Sa' },
        ];
        let OptionsLoai = [
            { value: 1, label: 'Tự quản' },
            { value: 2, label: 'Chung chủ' },
            { value: 3, label: 'Chung cư' },
        ];
        let OptionsNamNu = [
            { value: 1, label: 'Nam' },
            { value: 0, label: 'Nữ' },
            { value: 'namnuchung', label: 'Chung Nam-Nữ' },
        ];
        let n;
        let k;
        let l;
        if (id) {
            for (let i = 0; i < OptionsKhuVuc.length; i++) {
                if (OptionsKhuVuc[i].value === districtId) {
                    k = OptionsKhuVuc[i];
                }
            }
            for (let i = 0; i < OptionsLoai.length; i++) {
                if (OptionsLoai[i].value === roomTypeId) {
                    l = OptionsLoai[i];
                }
            }
            if (priority === "male") n = OptionsNamNu[0];
            if (priority === "female") n = OptionsNamNu[1];
        }
        return (
            <Modal isOpen={this.props.show} style={{ width: "90%", maxWidth: "1200px" }}>
                <Form className="formAdd" method="post" enctype="multipart/form-data">
                    <ModalHeader>Thêm phòng</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>Tên trọ</Label>
                            <Input
                                type="text"
                                name="ten"
                                defaultValue={id ? name : ""}
                                // value={this.state.ten}
                                placeholder="Tên trọ"
                                onChange={(e) => this.setState({
                                    ten: e.target.value
                                })}
                            />
                            {this.state.ten === '' ? <div className="error-mes">Bắt buộc</div> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Địa chỉ</Label>
                            <Input
                                type="text"
                                name="diachi"
                                defaultValue={id ? address : ""}
                                placeholder="Địa chỉ"
                                onChange={(e) => this.setState({
                                    diachi: e.target.value
                                })}
                            />
                            {this.state.diachi === '' ? <div className="error-mes">Bắt buộc</div> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Giá</Label>
                            <Input
                                type="text"
                                name="gia"
                                defaultValue={id ? price : ""}
                                placeholder="Giá"
                                onChange={(e) => this.setState({
                                    gia: Number(e.target.value)
                                })}
                            />
                            {this.state.gia === '' ? <div className="error-mes">Bắt buộc</div> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Diện tích</Label>
                            <Input
                                type="text"
                                name="dientich"
                                defaultValue={id ? area : ""}
                                placeholder="Diện tích"
                                onChange={(e) => this.setState({
                                    dientich: Number(e.target.value)
                                })}
                            />
                            {this.state.dientich === '' ? <div className="error-mes">Bắt buộc</div> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Nội dung</Label>
                            <Input
                                type="textarea"
                                name="noidung"
                                defaultValue={id ? description : ""}
                                onChange={(e) => this.setState({
                                    noidung: e.target.value
                                })}
                            />
                            {this.state.noidung === '' ? <div className="error-mes">Bắt buộc</div> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Nam/Nữ</Label>
                            <Select
                                className="basic-single mb-4"
                                classNamePrefix="select"
                                // defaultValue={[]}
                                name="namnu"
                                defaultValue={id ? n : ""}
                                // value={priority}
                                options={OptionsNamNu}
                                placeholder='Ưu tiên Nam/Nữ'
                                isClearable
                                onChange={(e) => this.setState({
                                    namnu: e ? e.value : ''
                                })
                                }
                            />
                            {this.state.namnu === '' ? <div className="error-mes">Bắt buộc</div> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Chọn khu vực</Label>
                            <Select
                                className="basic-single mb-4"
                                classNamePrefix="select"
                                // defaultValue={[]}
                                name="khuvuc"
                                defaultValue={id ? k : ""}
                                options={OptionsKhuVuc}
                                placeholder='Chọn khu vực'
                                isClearable
                                onChange={(e) => this.setState({
                                    khuvuc: e ? e.value : ''
                                })}
                            />
                            {this.state.khuvuc === '' ? <div className="error-mes">Bắt buộc</div> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label>Chọn loại phòng</Label>
                            <Select
                                className="basic-single mb-4"
                                classNamePrefix="select"
                                // defaultValue={[]}
                                name="loai"
                                defaultValue={id ? l : ""}
                                options={OptionsLoai}
                                placeholder='Chọn loại'
                                isClearable
                                onChange={(e) => this.setState({
                                    loai: e ? e.value : ''
                                })}
                            />
                            {this.state.loai === '' ? <div className="error-mes">Bắt buộc</div> : ''}
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleFile">File</Label>
                            <Input
                                type="file"
                                name="file"
                                // value={id ? images : null}
                                id="exampleFile"
                                onChange={(e) => console.log(e.target.files[0])
                                    //     this.setState({
                                    //     file: e.target.value
                                    // })
                                }
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.handleClose}>Cancel</Button>
                        <Button disabled={disable} onClick={() => this.onSubmit(id)} color="primary">{!id ? 'All' : 'Save'}</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

const mapStatetoProps = state => {
    return {
        rooms: state.Rooms.rooms
    }
};

const mapDispatchToProps = (dispatch, action) => {
    return {
        allRoom: async (ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file, _token) => {
            await dispatch(actions.allRoom(ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file, _token));
        },
        updateRoom: async (id, ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file, rooms, _token) => {
            await dispatch(actions.updateRoom(id, ten, diachi, gia, dientich, noidung, khuvuc, loai, namnu, file, rooms, _token));
        }
    }
};

export default connect(mapStatetoProps, mapDispatchToProps)(AddModal);