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

  useEffect(()=>{
    <AyaListContent type={selectedType}/>
    console.log("request sent")
  },[selectedType])

 
  // console.log(list.file);

  const tableRef = useRef();

  const handlePrintTable = useReactToPrint({
    content : ()=> tableRef.current,
  })


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
                    <AyaListContent type={selectedType}/>
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
