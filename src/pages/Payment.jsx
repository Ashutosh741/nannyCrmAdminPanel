import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

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

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to the first page when searching
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sorting logic
  const sortedData = filteredData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = sortedData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <section className="regList">
        <Container>
          <Row>
            <Col md="12">
              <div className="my-3 text-end">
                <div className="d-flex align-items-center gap-5 w-100">
                  {/* Search Field */}
                  <div className="w-100">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search by name and Contact Number"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="w-100 text-end">
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
              <div className="table-responsive rounded-3">
                <table className="table table-responsive table-sm table-stripped table-bordered p-0">
                  <thead className="bg-blue text-white">
                    <tr className="text-uppercase">
                      <th>Sr. No.</th>
                      <th>Customer Code</th>
                      <th>Name</th>

                      <th>Image</th>
                      <th className="">Security Amount</th>
                      <th className="">GuardianName</th>
                      <th className="">Assign</th>
                      <th className="">Total Customer Bill</th>
                      <th className="">Total Customer Pay</th>
                      {/* <th>Customer bill</th>
                      <th>Amount Recieved</th>

                      <th className="">Customer balance</th>
                      <th className="">Status</th> */}

                      {/* <th className="">Action</th> */}
                    </tr>
                  </thead>

                  {loading ? (
                    <div className="text-center d-flex justify-content-center p-3">
                      Loading...
                    </div>
                  ) : (
                    <tbody>
                      {currentItems.map((item, index) => {
                        const newIndex = index + 1;

                        return (
                          <tr key={index} onClick={() => handleRowClick(item)}>
                            <td>{newIndex}</td>
                            <td>{item.customerCode}</td>
                            <td>{item.name}</td>
                            <td>
                              <img
                                src={`${URL}/${item.file}`}
                                class="img-fluid listimages"
                                alt=""
                              ></img>
                            </td>
                            <td className="">{item.securityAmount}</td>
                            <td className="">{item.guardianName}</td>
                            <td className="">{item.assign}</td>
                            <td className="">{item.totalCustomerBill}</td>
                            <td className="">{item.totalRecievedmoney}</td>

                            {/* <td>{item.customerbill}</td>
                            <td>{item.amount_received}</td>

                            <td className="">{item.balance}</td>
                            <td className="">{item.status}</td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
              {/* Pagination */}
              <div className="pagination-container">
                <nav>
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                        key={index}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default adminLayout(Payment);
