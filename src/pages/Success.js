import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constant";

export default class Success extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map((keranjang, i) => {
          return axios
            .delete(API_URL + "keranjangs/" + keranjang.id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        });
        this.setState({ keranjangs });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div className="mt-4 text-center">
          <Image src="assets/images/success.png" width="500" />
          <h1>Success</h1>
          <p>Terima kasih sudah melakukan pemesanan!</p>
          <Button className="btn-success" as={Link} to="/">
            Kembali ke halaman
          </Button>
        </div>
      </div>
    );
  }
}
