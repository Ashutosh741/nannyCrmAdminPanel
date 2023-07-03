import React, { useEffect, useState } from "react";
import { Button, Col, Container, FormGroup, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";
import { Bars, Preloader } from "react-preloader-icon";

function AyaList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [assign, setAssign] = useState("");

  const [assigncheck, setAssignCheck] = useState("");

  const [assignCustomer, setAssginCustomer] = useState([]);

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

    navigate(`/ayareg/${item._id}`, { state: { item } });
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
  }, [assigncheck]);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination to the first page when searching
  };

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
                      <th>work Shift</th>
                      <th className="">Working Location</th>
                      <th className="d-none"> joining</th>
                      <th className="d-none">closingDate</th>
                      <th className="d-none">presentAddress</th>
                      <th className="d-none">Vill</th>
                      <th className="d-none">street</th>
                      <th className="d-none">landmark</th>
                      <th className="d-none">post</th>
                      <th className="d-none">district</th>
                      <th className="d-none">state</th>
                      <th className="d-none">pin</th>
                      <th className="d-none">permanentAddress</th>
                      <th className="d-none">permanentVill</th>
                      <th className="d-none">permanentStreet</th>
                      <th className="d-none"> permanentLandmark</th>
                      <th className="d-none">permanentPost</th>
                      <th className="d-none">permanentDistrict</th>
                      <th className="d-none">permanentState</th>
                      <th className="d-none">permanentPin</th>
                      <th className="d-none">dateOfBirth</th>
                      <th className=""> gender</th>
                      <th className="">age</th>
                      <th className="d-none">nationality</th>
                      <th className="">contactNumber</th>
                      <th className="d-none">alternativeNumber</th>
                      <th className="d-none">religion</th>
                      <th className="d-none"> marriageStatus</th>
                      <th className="d-none">idCardType</th>
                      <th className="d-none">idCardNumber</th>
                      <th className="d-none"> statusAya</th>
                      <th className="d-none">Aya Speciality </th>
                      <th className="d-none"> Aya Can Speak</th>
                      {/* <th className="">Assign</th> */}
                      {/* <th className="d-none">ayaRemark</th> */}
                      {/* <th className="">Action</th> */}
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
                          ayaCanSpeak,
                          assign,
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
                              <td>{workShift}</td>
                              <td className="text-center">
                                <span className="custom_badge bg-primary text-center rounded-3">
                                  {workinglocation}
                                </span>
                              </td>
                              <td className="d-none">{joining}</td>
                              <td className="d-none">{closingDate}</td>
                              <td className="d-none">{presentAddress}</td>
                              <td className="d-none">{vill}</td>
                              <td className="d-none">{street}</td>
                              <td className="d-none">{landmark}</td>
                              <td className="d-none">{post}</td>
                              <td className="d-none">{district}</td>
                              <td className="d-none">{state}</td>
                              <td className="d-none">{pin}</td>
                              <td className="d-none">{permanentAddress}</td>
                              <td className="d-none">{permanentVill}</td>
                              <td className="d-none">{permanentStreet}</td>
                              <td className="d-none">{permanentLandmark}</td>
                              <td className="d-none">{permanentPost}</td>
                              <td className="d-none">{permanentDistrict}</td>
                              <td className="d-none">{permanentState}</td>
                              <td className="d-none">{permanentPin}</td>
                              <td className="d-none">{dateOfBirth}</td>
                              <td className="">{gender}</td>
                              <td className="">{age}</td>
                              <td className="d-none">{nationality}</td>
                              <td className="">{contactNumber}</td>
                              <td className="d-none">{alternativeNumber}</td>
                              <td className="d-none">{religion}</td>
                              <td className="d-none">{marriageStatus}</td>
                              <td className="d-none">{idCardType}</td>
                              <td className="d-none">{idCardNumber}</td>
                              <td className="d-none">{statusAya}</td>
                              <td className="d-none">{ayaRemark}</td>
                              <td className="d-none">{ayaSpeciality}</td>
                              <td className="d-none">{ayaCanSpeak}</td>
                              {/* <td className="">{assign}</td> */}

                              {/* <td className="">
                                <div className="">
                                 
                                  <button
                                    className="btn ms-2 bg-danger text-white deletebtn"
                                    onClick={() => handleDelete(item)}
                                  >
                                    <i class="fa-sharp fa-solid fa-trash"></i>
                                  </button>
                                </div>
                              </td> */}
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

export default adminLayout(AyaList);
