import React, { useEffect, useState } from "react";
import { Button, Col, Container, FormGroup, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import Pagination from "../components/Pagination";

function CustomerList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleRowClick = (item) => {
    console.log(`/customerreg/${item._id}`);

    navigate(`/customerreg/${item._id}`, { state: { item } });
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

  //   const handleSearch = (event) => {
  //     setSearchTerm(event.target.value);
  //   };
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

  // const filterDataByDate = (data, fromDate, toDate) => {
  //   return data.filter((item) => {
  //     const createdDate = new Date(item.createdDate);
  //     return (
  //       createdDate >= new Date(fromDate) && createdDate <= new Date(toDate)
  //     );
  //   });
  // };

  return (
    <>
      <section className="regList">
        <Container>
          <Row>
            {/* <Col md="12">
              <div className="d-flex align-items-center gap-4 flex-wrap">
                <FormGroup>
                  <label htmlFor="">From created Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="">To created Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </FormGroup>
                <button className="btn filterbtn" onClick={apiCategory}>
                  <i className="fa-solid fa-filter"></i>
                </button>
              </div>
            </Col> */}
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
                      <th>Father's / Husband Name</th>
                      <th>Images</th>
                      <th className="d-none">Date Of Booking</th>
                      <th className="d-none">Date Of Requirement</th>
                      <th className="d-none">Requirement Purpose</th>
                      <th className="d-none">Security Deposit Amount</th>
                      <th className="d-none">Closing Date</th>
                      <th className="d-none">Security Deposit Adjustment</th>
                      <th className="d-none">Present Address</th>
                      <th className="d-none">Vill</th>
                      <th className="d-none">Street</th>
                      <th className="d-none">Landmark</th>
                      <th className="d-none">Post</th>
                      <th className="d-none">District</th>
                      <th className="d-none">State</th>
                      <th className="d-none">Pin</th>
                      <th className="d-none">Permanent Address</th>
                      <th className="d-none">Permanent Vill</th>
                      <th className="d-none">Permanent Street</th>
                      <th className="d-none">Permanent Landmark</th>
                      <th className="d-none">Permanent Post</th>
                      <th className="d-none">Permanent District</th>
                      <th className="d-none">Permanent State</th>
                      <th className="d-none">Permanent Pin</th>
                      <th className="d-none">Date of Birth</th>
                      <th className="">Gender</th>
                      <th className="">Age</th>
                      <th className="d-none">Nationality</th>
                      <th className="">Contact Number</th>
                      <th className="d-none">Alternative Number</th>
                      <th className="d-none">Religion</th>
                      <th className="d-none">Marriage Status</th>
                      <th className="d-none">ID Card Type</th>
                      <th className="d-none">ID Card Number</th>
                      <th className="d-none">Status for Customer</th>
                      <th className="d-none">Customer Remark</th>
                      <th className="d-none">Customer Can Speak</th>
                      {/* <th className="">Action</th> */}
                      <th className="">Assign</th>
                      <th className="">Created At</th>
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
                            <td>{item.guardianName}</td>
                            <td>
                              <img
                                src={`${URL}/${item.file}`}
                                className="img-fluid listimages"
                                alt=""
                              />
                            </td>
                            <td className="d-none">
                              {item.booking.substring(0, 10)}
                            </td>
                            <td className="d-none">
                              {item.dateRequirement.substring(0, 10)}
                            </td>

                            <td className="d-none">
                              {item.requirementpurpose}
                            </td>
                            <td className="d-none">{item.securityAmount}</td>
                            <td className="d-none">
                              {item.closingDate.substring(0, 10)}
                            </td>
                            <td className="d-none">
                              {item.securityAdjustment}
                            </td>
                            <td className="d-none">{item.presentAddress}</td>
                            <td className="d-none">{item.vill}</td>
                            <td className="d-none">{item.street}</td>
                            <td className="d-none">{item.landmark}</td>
                            <td className="d-none">{item.post}</td>
                            <td className="d-none">{item.district}</td>
                            <td className="d-none">{item.state}</td>
                            <td className="d-none">{item.pin}</td>
                            <td className="d-none">{item.permanentAddress}</td>
                            <td className="d-none">{item.permanentVill}</td>
                            <td className="d-none">{item.permanentStreet}</td>
                            <td className="d-none">{item.permanentLandmark}</td>
                            <td className="d-none">{item.permanentPost}</td>
                            <td className="d-none">{item.permanentDistrict}</td>
                            <td className="d-none">{item.permanentState}</td>
                            <td className="d-none">{item.permanentPin}</td>
                            <td className="d-none">
                              {item.dateOfBirth.substring(0, 10)}
                            </td>
                            <td className="">{item.gender}</td>
                            <td className="">{item.age}</td>
                            <td className="d-none">{item.nationality}</td>
                            <td className="">{item.contactNumber}</td>
                            <td className="d-none">{item.alternativeNumber}</td>
                            <td className="d-none">{item.religion}</td>
                            <td className="d-none">{item.marriageStatus}</td>
                            <td className="d-none">{item.idCardType}</td>
                            <td className="d-none">{item.idCardNumber}</td>
                            <td className="d-none">{item.statusofCustomer}</td>
                            <td className="d-none">{item.customerRemark}</td>
                            <td className="d-none">{item.customerSpeak}</td>

                            <td className="">{item.assign}</td>
                            <td className="">
                              {" "}
                              {item.createdAt
                                ? item.createdAt.substring(0, 10)
                                : ""}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
              {/* Pagination */}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default adminLayout(CustomerList);
