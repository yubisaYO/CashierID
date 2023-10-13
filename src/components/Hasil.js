import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { ListGroup, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import axios from "axios";
import { API_URL } from "../utils/constant";
import swal from "sweetalert";

//rcc -> shortcut
export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }
  handleShow = (keranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: keranjang,
      jumlah: keranjang.jumlah,
      keterangan: keranjang.keterangan,
      totalHarga: keranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  minus = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  plus = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  saveHandler = (event) => {
    console.log("berhasil submit");
    this.handleClose();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Success",
          text: "Sukses Update Pesanan " + data.product.nama,
          icon: "success",
          button: false,
          timer: 1000,
        });
        this.props.getListKeranjang();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeHandler = (event) => {
    this.setState(
      {
        keterangan: event.target.value,
      },
      () => {
        console.log(this.state.keterangan);
      }
    );
  };

  deleteHandler = (id) => {
    this.handleClose();
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Delete",
          text:
            "Sukses Hapus Pesanan " + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1000,
        });
        this.props.getListKeranjang();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { showModal, keranjangDetail, jumlah, totalHarga, keterangan } =
      this.state;
    const { keranjangs, getListKeranjang } = this.props;
    return (
      <Col md="3" className="mt-3">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        <Card className="hasil">
          <ListGroup>
            {keranjangs &&
              keranjangs.map((keranjang, i) => (
                <ListGroup.Item
                  onClick={() => this.handleShow(keranjang)}
                  style={{ cursor: "pointer" }}
                  key={keranjang.id}
                >
                  <Row>
                    <Col xs="2">
                      <Badge bg="primary" pill>
                        {keranjang.jumlah}
                      </Badge>
                    </Col>
                    <Col>
                      <h5>{keranjang.product.nama}</h5>
                      <span>
                        Rp. {numberWithCommas(keranjang.product.harga)}
                      </span>
                    </Col>
                    <Col>
                      <strong>
                        Rp. {numberWithCommas(keranjang.total_harga)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

            <ModalKeranjang
              showModal={showModal}
              handleClose={this.handleClose}
              keranjangDetail={keranjangDetail}
              jumlah={jumlah}
              keterangan={keterangan}
              totalHarga={totalHarga}
              minus={this.minus}
              plus={this.plus}
              changeHandler={this.changeHandler}
              saveHandler={this.saveHandler}
              deleteHandler={this.deleteHandler}
            />
          </ListGroup>
        </Card>
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
