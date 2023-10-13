import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils.js";

const Menus = ({ menu, addToCart }) => {
  return (
    <Col md="4" xs="6" className="mb-4">
      <Card
        className="shadow"
        onClick={() => addToCart(menu)}
        style={{ cursor: "pointer" }}
      >
        <Card.Img
          variant="top"
          src={
            "/assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
          style={{ width: "100%", height: "180px" }}
        />
        <Card.Body>
          <Card.Title>
            {menu.nama}
            <strong>({menu.kode})</strong>
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
