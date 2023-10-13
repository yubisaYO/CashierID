import React, { Component } from "react";
import {
  Hasil,
  ListCategory,
  NavbarComponent,
  Menus,
} from "../components/index";
import { Col, Container, Row } from "react-bootstrap";
import { API_URL } from "../utils/constant";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryChoosed: "Makanan",
      keranjangs: [],
    };
  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoryChoosed)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });

    this.getListKeranjang();
  }

  changeCategory = (value) => {
    this.setState({
      menus: [],
      categoryChoosed: value,
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addToCart = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Success",
                text: "Sukses Masuk ke Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Success",
                text: "Sukses Masuk ke Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { menus, categoryChoosed, keranjangs } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategory
              changeCategory={this.changeCategory}
              categoryChoosed={categoryChoosed}
            />
            <Col className="mt-3">
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row className="menu">
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      addToCart={this.addToCart}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang()}/>
          </Row>
        </Container>
      </div>
    );
  }
}
