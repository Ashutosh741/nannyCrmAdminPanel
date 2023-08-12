import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import adminLayout from "../hoc/adminLayout";
import { URL } from "../Url";
import axios from "axios";
import { Link, Navigate, useNavigate, useNavigation } from "react-router-dom";
import * as XLSX from "xlsx";
import { Bars, Preloader } from "react-preloader-icon";
import TotalProfit from "../navigationPage/TotalProfit";
import AyaPaymentListContent from "./AyaPaymentListContent";
import { useReactToPrint } from "react-to-print";

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
  const [selectedType, setSelectedType] = useState(""); // local or outstation
  const [selectedStation, setSelectedStation] = useState(null);

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

  const tableRef = useRef();

  const handlePrintTable = useReactToPrint({
    content : ()=>tableRef.current,

  })

  console.log(list.file);

  useEffect(()=>{
    <AyaPaymentListContent type={selectedType}/>
    console.log("request sent")
    // console.log("sele")
  },[selectedType])


  const handleStation = (stationType) => {
    setSelectedStation((prevStation) => (prevStation === stationType ? null : stationType));
    setSelectedType(stationType);

  };

  return (
    <>
      <section className="regList">
        <Container>
          <Row>
            <Col md="12">
              <div className="my-3">
                <div className="d-flex align-items-center gap-5 w-100">
                <div className="w-100 text-start">
                  <Button
                    className={`stationbtn btn bg-primary text-white mx-2 ${selectedStation === "Local" ? "active" : ""}`}
                    onClick={() => handleStation("Local")}
                  >
                    LOCAL
                  </Button>
                  <Button
                    className={`stationbtn btn bg-primary text-white ${selectedStation === "Out-Station" ? "active" : ""}`}
                    onClick={() => handleStation("Out-Station")}
                  >
                    OUT STATION
                  </Button>
                  </div>
                  <div className="w-100 text-end">
                    <Button
                      className="btn bg-primary text-white mx-2"
                      onClick={handlePrintTable}
                    >
                      PRINT TABLE
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
                    <AyaPaymentListContent type = {selectedType}/>
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

export default adminLayout(AyaPaymentList);
