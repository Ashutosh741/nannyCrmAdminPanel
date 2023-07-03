import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { URL } from "../../Url";
import adminLayout from "../../hoc/adminLayout";

function Booking() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [newBookingNotification, setNewBookingNotification] = useState(false);

  const apiCategory = () => {
    setLoading(true);
    axios
      .get(`${URL}/booking`)
      .then((res) => {
        setList(res.data.data);
        setLoading(false);
        checkNewBookingNotification(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const checkNewBookingNotification = (data) => {
    const unseenBookings = data.filter((booking) => !booking.seen);
    if (unseenBookings.length > 0) {
      setNewBookingNotification(true);
    }
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

  const filterData = (data) => {
    const filteredList = data.filter((item) => {
      const nameMatch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return nameMatch;
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

  const sortedData = filteredData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    // Sort by createdAt in descending order
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt < b.createdAt) {
      return;
      return 1;
    }
    return 0;
  });

  // Handle notification when new booking requests are not seen
  useEffect(() => {
    const unseenBookings = list.filter((booking) => !booking.seen);
    if (unseenBookings.length > 0 && !document.hidden) {
      setNewBookingNotification(true);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setNewBookingNotification(false);
      } else if (unseenBookings.length > 0) {
        setNewBookingNotification(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [list]);

  // Handle opening the booking page
  const navigate = useNavigate();

  const handleOpenBookingPage = () => {
    navigate("/booking");
    setNewBookingNotification(false);
  };

  // Sorting logic
  // const sortedData = filteredData.sort((a, b) => {
  //   if (a[sortConfig.key] < b[sortConfig.key]) {
  //     return sortConfig.direction === "ascending" ? -1 : 1;
  //   }
  //   if (a[sortConfig.key] > b[sortConfig.key]) {
  //     return sortConfig.direction === "ascending" ? 1 : -1;
  //   }
  //   return 0;
  // });

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = sortedData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Rest of the code

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

                    {newBookingNotification && (
                      <Button
                        className="btn bg-primary text-white mx-2"
                        onClick={handleOpenBookingPage}
                      >
                        New Booking
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="table-responsive rounded-3">
                <table className="table table-responsive table-sm table-stripped table-bordered p-0">
                  <thead className="bg-blue text-white">
                    <tr className="text-uppercase">
                      <th>Sr. No</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Created At</th>
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
                          <tr key={index}>
                            <td>{newIndex}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.message}</td>
                            <td>{item.createdAt.substring(0, 10)}</td>
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

export default adminLayout(Booking);
