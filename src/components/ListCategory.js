import React, { Component } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";
import "../css/ListCategory.css";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return (
      <FontAwesomeIcon icon={faUtensils} style={{ marginRight: "10px" }} />
    );
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} style={{ marginRight: "10px" }} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} style={{ marginRight: "10px" }} />;
};

export default class ListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoryChoosed } = this.props;
    return (
      <Col md="2" className="mt-3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />

        <ListGroup>
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                onClick={() => changeCategory(category.nama)}
                key={category.id}
                style={{ cursor: "pointer", transition: "0.55s" }}
                className={
                  categoryChoosed === category.nama ? "category-active" : null
                }
              >
                <Row>
                  <Col md="2">
                    <Icon nama={category.nama} />
                  </Col>
                  <Col md="10">
                    <h5>{category.nama}</h5>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
