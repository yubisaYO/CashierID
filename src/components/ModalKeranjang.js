import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
// rafce

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  totalHarga,
  minus,
  plus,
  changeHandler,
  saveHandler,
  deleteHandler,
}) => {
  return keranjangDetail ? (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {keranjangDetail.product.nama}
          <strong>
            <span>
              {" "}
              (Rp. {numberWithCommas(keranjangDetail.product.harga)})
            </span>
          </strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Total Harga : </Form.Label>
            <p>
              <strong>Rp. {numberWithCommas(totalHarga)}</strong>
            </p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Jumlah Pesanan :</Form.Label>
            <br />
            <Button
              variant="secondary"
              size="sm"
              className="me-2 btn-success"
              onClick={() => minus()}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
            <strong>{jumlah}</strong>
            <Button
              variant="secondary"
              size="sm"
              className="ms-2 btn-success"
              onClick={() => plus()}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Keterangan : </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="e.g tambah telor dadar, pedas, gak pake sayur"
              value={keterangan}
              onChange={(event) => changeHandler(event)}
            />
          </Form.Group>
        </Form>
        <Button
          size="md"
          className="ms-2 btn-success"
          type="submit"
          onClick={saveHandler}
        >
          Simpan
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => deleteHandler(keranjangDetail.id)}>
          <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          kosong
          <strong>kosong</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalKeranjang;
