import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constant";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      window.location.href = "/Success";
    });
  };

  render() {
    const { keranjangs } = this.props;
    let totalBayar = keranjangs.reduce(
      (accumulator, currentValue) => accumulator + currentValue.total_harga,
      0
    );
    return (
      <>
        {/* web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-5 mb-3">
              <h5>
                Total Harga :{" "}
                <strong className="float-end">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h5>
              <Button
                className="btn-success mt-2 w-100"
                size="lg"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} size="sm" />
                <strong className="ms-2">Bayar</strong>
              </Button>
            </Col>
          </Row>
        </div>
        {/* mobile */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-5 mb-3">
              <h5>
                Total Harga :{" "}
                <strong className="float-end">
                  Rp. {numberWithCommas(totalBayar)}
                </strong>
              </h5>
              <Button
                className="btn-success mt-2 w-100"
                size="lg"
                onClick={() => this.submitTotalBayar(totalBayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} size="sm" />
                <strong className="ms-2">Bayar</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
