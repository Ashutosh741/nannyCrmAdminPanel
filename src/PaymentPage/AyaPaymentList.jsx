import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";
import { Bars, Preloader } from "react-preloader-icon";
import TotalProfit from "../navigationPage/TotalProfit";

function AyaPaymentList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const apiCategory = () => {
    setLoading(true);
    axios
      .get(`${URL}/ayareg`)
      .then((res) => {
        setList(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };
  const handleRowClick = (item) => {
    console.log(`/ayareg/${item._id}`);

    navigate(`/ayapayment/${item._id}`, { state: { item } });
  };

  const deleteCustomer = (item) => {
    axios
      .delete(`${URL}/ayareg/${item._id}`)
      .then((req, res) => {
        // Remove the deleted item from the list
        setList((prevList) =>
          prevList.filter((customer) => customer._id !== item._id)
        );
        console.log("Customer deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  //download Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(list);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Aya  Data");
    XLSX.writeFile(workbook, "Aya_data.xlsx");
  };

  useEffect(() => {
    apiCategory();
  }, []);

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

  // old code
  const filterData = (data) => {
    const filteredList = data.filter((item) => {
      const nameMatch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const numberMatch = item.contactNumber.toString().includes(searchTerm);
      return nameMatch || numberMatch;
    });
    return filteredList;
  };

  useEffect(() => {
    const filteredList = filterData(list);
    setFilteredData(filteredList);
    setCurrentPage(1);
  }, [list, searchTerm]);

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

  console.log(list.file);

  return (
    <>
      <section className="regList">
        <Container>
          <Row>
            <Col md="12">
              <div className="my-3">
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
                    <Button className="btn bg-primary text-white ">
                      <Link className="" to={"/ayareg"}>
                        Add Aya
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
              <div className="table-responsive  rounded-3">
                <table className="table table-responsive table-sm table-stripped table-bordered p-0">
                  <thead className="bg-blue text-white">
                    <tr className="text-uppercase">
                      <th>Sr.No.</th>
                      <th>Aya Code</th>
                      <th>name</th>
                      <th>images</th>
                      <th>father Name</th>
                      <th className=""> gender</th>
                      {/* <th className="">age</th> */}
                      <th className="">Assign</th>
                      <th className="">Total Cusotmer bill</th>
                      <th className="">Total Aya Paid</th>
                      {/* <th className="">Total Profit</th> */}

                      {/* <th className="">Payment Status</th> */}
                    </tr>
                  </thead>
                  {loading ? (
                    // <div className="text-center d-flex justify-content-center p-3">
                    //   Loading...
                    // </div>
                    <div className="d-flex align-item-center justify-cotnent-center w-100">
                      <Preloader
                        use={Bars}
                        size={60}
                        strokeWidth={100}
                        strokeColor="#f7b085"
                        duration={2000}
                      />
                    </div>
                  ) : (
                    <tbody>
                      {currentItems.map((item, index) => {
                        const newIndex = index + 1;
                        const {
                          ayaCode,
                          name,
                          guardianName,
                          workShift,
                          workinglocation,
                          joining,
                          closingDate,
                          presentAddress,
                          vill,
                          street,
                          landmark,
                          post,
                          district,
                          state,
                          pin,
                          permanentAddress,
                          permanentVill,
                          permanentStreet,
                          permanentLandmark,
                          permanentPost,
                          permanentDistrict,
                          permanentState,
                          permanentPin,
                          dateOfBirth,
                          gender,
                          age,
                          nationality,
                          contactNumber,
                          alternativeNumber,
                          religion,
                          marriageStatus,
                          idCardType,
                          idCardNumber,
                          statusAya,
                          ayaRemark,
                          ayaSpeciality,
                          file,
                          month,
                          paymentstatus,
                          ayaearn,
                          ayaCanSpeak,
                          assign,
                          totalAyapaid,
                          totalCustomerbill,
                          // totalProfit,
                        } = item;
                        return (
                          <>
                            <tr
                              key={item._id}
                              onClick={() => handleRowClick(item)}
                            >
                              <td>{newIndex}</td>
                              <td>{ayaCode}</td>
                              <td>{name}</td>
                              <td>
                                <img
                                  src={`${URL}/${file}`}
                                  className="img-fluid listimages"
                                  alt=""
                                />
                              </td>
                              <td>{guardianName}</td>

                              <td className="">{gender}</td>
                              {/* <td className="">{age}</td> */}
                              <td>{assign}</td>
                              <td className="">{totalCustomerbill}</td>
                              <td className="">{totalAyapaid}</td>
                              {/* <td>{totalProfit}</td> */}
                            </tr>
                          </>
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

export default adminLayout(AyaPaymentList);
