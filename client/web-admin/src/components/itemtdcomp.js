import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Itemtdcomp({ el, editthis }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ConditionalDropdown = (props) => {
    const status = props.status;
    const xid = props.el.id;
    if (status === `Pending`) {
      return (
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
            {el.statusPost}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <p style={{ marginLeft: "1rem" }}> -- change to -- </p>
            <Dropdown.Item onClick={() => editthis(xid, "Accepted")}>
              Accepted
            </Dropdown.Item>
            <Dropdown.Item onClick={() => editthis(xid, "Rejected")}>
              Rejected
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else if (status === `Accepted`) {
      return (
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-success text-green"
            id="dropdown-basic"
          >
            {el.statusPost}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <p style={{ marginLeft: "1rem" }}> -- change to -- </p>
            <Dropdown.Item onClick={() => editthis(xid, "Pending")}>
              Pending
            </Dropdown.Item>
            <Dropdown.Item onClick={() => editthis(xid, "Rejected")}>
              Rejected
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return (
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-danger text-red"
            id="dropdown-basic"
          >
            Rejected
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <p style={{ marginLeft: "1rem" }}> -- change to -- </p>
            <Dropdown.Item onClick={() => editthis(xid, "Accepted")}>
              Accepted
            </Dropdown.Item>
            <Dropdown.Item onClick={() => editthis(xid, "Pending")}>
              Pending
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  return (
    <tr>
      <td style={{ width: "10%" }}>{el.title}</td>
      <td>{el.category}</td>
      <td style={{ width: "30%" }}>{el.description}</td>
      <td style={{ width: "10%" }}>{el.brand}</td>
      <td>{el.yearOfPurchase}</td>
      <td>
        <img
          src={el.Images[0].imageUrl}
          alt=""
          style={{
            margin: "0.5rem",
            width: "200px",
            height: "250px",
            borderRadius: "10px",
          }}
        />
      </td>
      <td>
        <ConditionalDropdown status={el.statusPost} el={el} />
      </td>
      <td>
        <Button variant="primary" onClick={handleShow}>
          See All Images
        </Button>
      </td>
      <Modal show={show} onHide={handleClose} style={{ width: "100vw" }}>
        <Modal.Header>
          <Modal.Title>{el.title}'s images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-row flex-wrap">
            {el.Images.map((x, index) => (
              <img
                key={index}
                src={x.imageUrl}
                alt=""
                style={{ margin: "0.5rem", width: "100%" }}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
}

export default Itemtdcomp;
