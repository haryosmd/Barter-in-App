import React from "react";
import Table from "react-bootstrap/Table";
import "../App.css";
import Navcomp from "../components/Navcomp";
import Itemtdcomp from "../components/itemtdcomp";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { ITEM_GET } from "../lib/apollo/queries/itemget";
import { ITEM_EDIT } from "../lib/apollo/queries/itemedit";

function Home() {
  const { loading, error, data, refetch } = useQuery(ITEM_GET, {
    variables: { token: localStorage.access_token },
  });

  const useQuery2 = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  };

  let query = useQuery2();

  let [title, settitle] = useState(query.get("title") || "");
  let [category, setcategory] = useState(query.get("category") || "");
  let [status, setstatus] = useState(query.get("status") || "");

  const chtitle = (e) => {
    settitle(e.target.value);
  };
  const chcategory = (e) => {
    setcategory(e.target.value);
  };
  const chstatus = (e) => {
    setstatus(e.target.value);
  };

  const [itemedit] = useMutation(ITEM_EDIT);

  const editthis = (xid, str) => {
    itemedit({
      variables: {
        token: localStorage.access_token,
        itemId: xid,
        status: str,
      },
    })
      .then((ayy) => {
        Swal.showLoading();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: `something went wrong.`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .finally((iyey) => {
        Swal.showLoading();
        refetch();
      });
  };

  const ConditionalLink = () => {
    if (!title && !category && !status) {
      return (
        <Link to="/">
          <button className="btn-sm btn-secondary m-1">Filter</button>
        </Link>
      );
    } else if (title && !category && !status) {
      return (
        <Link to={`/?title=${title}`}>
          <button className="btn-sm btn-secondary m-1">Filter</button>
        </Link>
      );
    } else if (title && category && !status) {
      return (
        <Link to={`/?title=${title}&category=${category}`}>
          <button className="btn-sm btn-secondary m-1">Filter</button>
        </Link>
      );
    } else if (title && category && status) {
      return (
        <Link to={`/?title=${title}&category=${category}&status=${status}`}>
          <button className="btn-sm btn-secondary m-1">Filter</button>
        </Link>
      );
    } else if (!title && category && status) {
      return (
        <Link to={`/?category=${category}&status=${status}`}>
          <button className="btn-sm btn-secondary m-1">Filter</button>
        </Link>
      );
    } else if (!title && !category && status) {
      return (
        <Link to={`/?status=${status}`}>
          <button className="btn-sm btn-secondary m-1">Filter</button>
        </Link>
      );
    } else if (!title && category && !status) {
      return (
        <Link to={`/?category=${category}`}>
          <button className="btn-sm btn-secondary m-1">Filter</button>
        </Link>
      );
    } else {
      return (
        <Link to={`/?title=${title}&status=${status}`}>
          <button className="btn-sm btn-secondary m-1">Filter</button>
        </Link>
      );
    }
  };

  const ConditionaFilter = (props) => {
    if (!props.title && !props.category && !props.status) {
      return data.getItemsAdmin.map((el) => (
        <Itemtdcomp key={el.id} el={el} editthis={editthis} />
      ));
    } else if (props.title && !props.category && !props.status) {
      return data.getItemsAdmin
        .filter(
          (el) =>
            el.title.toLowerCase().includes(props.title.toLowerCase()) === true
        )
        .map((el) => <Itemtdcomp key={el.id} el={el} editthis={editthis} />);
    } else if (props.title && props.category && !props.status) {
      return data.getItemsAdmin
        .filter(
          (el) =>
            el.title.toLowerCase().includes(props.title.toLowerCase()) === true
        )
        .filter(
          (el) =>
            el.category.toLowerCase().includes(props.category.toLowerCase()) ===
            true
        )
        .map((el) => <Itemtdcomp key={el.id} el={el} editthis={editthis} />);
    } else if (props.title && props.category && props.status) {
      return data.getItemsAdmin
        .filter(
          (el) =>
            el.title.toLowerCase().includes(props.title.toLowerCase()) === true
        )
        .filter(
          (el) =>
            el.category.toLowerCase().includes(props.category.toLowerCase()) ===
            true
        )
        .filter(
          (el) =>
            el.statusPost.toLowerCase().includes(props.status.toLowerCase()) ===
            true
        )
        .map((el) => <Itemtdcomp key={el.id} el={el} editthis={editthis} />);
    } else if (!props.title && props.category && props.status) {
      return data.getItemsAdmin
        .filter(
          (el) =>
            el.category.toLowerCase().includes(props.category.toLowerCase()) ===
            true
        )
        .filter(
          (el) =>
            el.statusPost.toLowerCase().includes(props.status.toLowerCase()) ===
            true
        )
        .map((el) => <Itemtdcomp key={el.id} el={el} editthis={editthis} />);
    } else if (!props.title && !props.category && props.status) {
      return data.getItemsAdmin
        .filter(
          (el) =>
            el.statusPost.toLowerCase().includes(props.status.toLowerCase()) ===
            true
        )
        .map((el) => <Itemtdcomp key={el.id} el={el} editthis={editthis} />);
    } else if (!props.title && props.category && !props.status) {
      return data.getItemsAdmin
        .filter(
          (el) =>
            el.category.toLowerCase().includes(props.category.toLowerCase()) ===
            true
        )
        .map((el) => <Itemtdcomp key={el.id} el={el} editthis={editthis} />);
    } else {
      return data.getItemsAdmin
        .filter(
          (el) =>
            el.title.toLowerCase().includes(props.title.toLowerCase()) === true
        )
        .filter(
          (el) =>
            el.statusPost.toLowerCase().includes(props.status.toLowerCase()) ===
            true
        )
        .map((el) => <Itemtdcomp key={el.id} el={el} editthis={editthis} />);
    }
  };

  if (loading) {
    return (
      <div className="whole">
        <Navcomp></Navcomp>
        <div className="main" style={{ width: "100%", color: "white" }}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }

  if (data) {
    Swal.close();
    return (
      <div className="whole">
        <Navcomp></Navcomp>
        <div
          className="main d-flex align-items-center"
          style={{ width: "100%", color: "white" }}
        >
          <form
            className="d-flex justify-content-between"
            style={{ width: "90.5%" }}
            id="carform"
          >
            <input
              className="form-control w-50 m-1"
              type="text"
              placeholder="Item title"
              value={title}
              onChange={chtitle}
            />
            <select
              className="form-select form-select-sm w-25 m-1"
              id="cars2"
              form="carform"
              value={category}
              onChange={chcategory}
            >
              <option value="">-- any category --</option>
              <option value="Decoration">Decoration</option>
              <option value="Fashion">Fashion</option>
              <option value="Book">Book</option>
              <option value="Electronic">Electronic</option>
              <option value="Automotive">Automotive</option>
              <option value="Other">Other</option>
            </select>
            <select
              className="form-select form-select-sm w-25 m-1"
              id="cars"
              form="carform"
              value={status}
              onChange={chstatus}
            >
              <option value="">-- any status --</option>
              <option value="Accepted">Accepted</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ConditionalLink></ConditionalLink>
          </form>
          <Table
            striped
            bordered
            hover
            style={{
              width: "90%",
              marginTop: "3rem",
            }}
          >
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Brand</th>
                <th scope="col">PurchasedOn</th>
                <th scope="col">Images</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <ConditionaFilter
                title={query.get("title")}
                category={query.get("category")}
                status={query.get("status")}
              />
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Home;
