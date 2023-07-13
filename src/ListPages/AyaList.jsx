import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, FormGroup, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";
import { Bars, Preloader } from "react-preloader-icon";
import AyaListContent from "./AyaListContent";
import { useReactToPrint } from "react-to-print";

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

  const tableRef = useRef();

  const handlePrintTable = useReactToPrint({
    content : ()=> tableRef.current,
  })

  return (
    <>
      <section className="regList">
        <Container>
          <Row>
            <Col md="12">
              <div className="my-3">
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
                    {/* enable print table option here */}
                  <Button className="btn bg-primary text-white mx-2">
                      <Link className="" onClick = {handlePrintTable}>
                        Print Table
                      </Link>
                    </Button>
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
              <div className="container" ref = {tableRef}>
                <div className="row">
                  <form onSubmit = {handlePrintTable}>
                    <AyaListContent/>
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

export default adminLayout(AyaList);
