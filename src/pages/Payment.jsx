import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import CustomerPaymentList from "./CustomerPaymentList";
import { useReactToPrint } from "react-to-print";

function Payment() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  const handleRowClick = (item) => {
    // console.log(`/customerreg/${item._id}`);

    navigate(`/payment/${item._id}`, { state: { item } });
  };

  const apiCategory = () => {
    setLoading(true);
    axios
      .get(`${URL}/customerreg`)
      .then((res) => {
        setList(res.data.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(list);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Data");
    XLSX.writeFile(workbook, "customer_data.xlsx");
  };

  useEffect(() => {
    apiCategory();
  }, []);

  // const filterData = (data) => {
  //   const filteredList = data.filter((item) => {
  //     const nameMatch = item.name
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());
  //     const numberMatch = item.contactNumber.toString().includes(searchTerm);
  //     return nameMatch || numberMatch;
  //   });
  //   return filteredList;
  // };

  const filterData = (data) => {
    const filteredList = data.filter((item) => {
      const nameMatch =
        item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const numberMatch =
        item.contactNumber &&
        item.contactNumber.toString().includes(searchTerm);
      return nameMatch || numberMatch;
    });
    return filteredList;
  };

  useEffect(() => {
    const filteredList = filterData(list);
    setFilteredData(filteredList);
    setCurrentPage(1);
  }, [list, searchTerm]);

  const tableRef = useRef();

  const handlePrintTable = useReactToPrint({
    content : ()=>tableRef.current,
  })

  return (
    <>
      <section className="regList">
        <Container>
          <Row>
            <Col md="12">
              <div className="my-3 text-end">
                <div className="d-flex align-items-center gap-5 w-100">
                  {/* Search Field */}
                  {/* <div className="w-100">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search by name and Contact Number"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div> */}
                  <div className="w-100 text-end">
                    <Button
                      className="btn bg-primary text-white mx-2"
                      onClick={handlePrintTable}
                    >
                      Print Table
                    </Button>
                    <Button className="btn bg-primary text-white">
                      <Link className="" to={"/customer"}>
                        Add Customer
                      </Link>
                    </Button>
                    {/* Download Excel Button */}
                    <Button
                      className="btn bg-primary text-white mx-2"
                      onClick={handleDownloadExcel}
                    >
                      Download Excel
                    </Button>
                  </div>
                </div>
              </div>
              <div className="container" ref = {tableRef}>
                <div className="row">
                  <form onSubmit={handlePrintTable}>
                  <CustomerPaymentList/>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default adminLayout(Payment);
