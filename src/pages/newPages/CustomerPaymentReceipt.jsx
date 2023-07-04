import React from 'react';
import '../../assets/css/customerPayment.css';
import logo from "../../assets/images/logo.png";
const CustomerPaymentReceipt = (props) => {
  return (
    <>
      <div className='container'ref={props.customerPrint}>
        <div className="row">
            <div className="col">
                <div className="row receipt">
                    <div className="col-6">
                        <img src = {logo} className='companyLogo'/>
                    </div>
                    <div className="col-6 contactNumber">
                        <span>MOBILE NO : 97349-15314<br></br></span>
                        <span>70010-85855</span>
                    </div>
                    <div className="col-12 companyName">
                        <span>Joy Guru Janakalyan Trust <span style = {{color : "black",fontWeight:"lighter",fontFamily:"system-ui"}}>&</span> Service</span>
                    </div>
                    <div className="col-12 companyAddress">
                        <span>SARBAMANGALA PALLY, M.K ROAD, ENGLISH BAZAR, MALDA - 732101</span>
                    </div>
                    <div className="row-1 col-12 mb-2">
                        <div className="serial">
                        <form>
                            <label>SL NO:
                                <input type="text" />
                            </label>
                        </form>
                            {/* <span>SL NO.</span> */}
                        </div>
                        <div className="prop">
                        <form>
                            <label>PROP:
                                <input type="text" />
                            </label>
                        </form>
                            {/* <span> MR. ABHIJIT PODDAR</span> */}
                        </div>
                        <div className="date">
                            <span>PAYMENT DATE: </span>
                        </div>
                    </div>
                    <div className="col-12 row-2 mb-2">
                        <div className="partyName">
                            <span>PARTY NAME</span>
                        </div>
                    </div>
                    <div className="col-12 row-3 mb-2">
                        <div className="address">
                            <span>ADDRESS</span>
                        </div>
                    </div>
                    <div className="col-12 row-4 mb-2">
                        <div className="purpose">
                            <span>PURPOSE OF</span>
                        </div>
                    </div>
                    <div className="col-12 row-5 mb-2">
                        <div className="mobile">
                            {/* <form>
                                <label>MOBILE NO:
                                    <input type="text" />
                                </label>
                            </form> */}
                            <span>MOBILE NO.</span>
                        </div>
                        <div className="rate">
                            <form>
                                <label>PER DAY RATE
                                    <input type="text" />
                                </label>
                            </form>
                            {/* <span></span> */}
                        </div>
                    </div>
                    <div className="col-12 row-6 mb-2">
                        <div className="duration">
                            <form>
                                <label>DURATION DATE: FROM 
                                    <input type="date" />
                                </label>
                            </form>
                            {/* <span></span> */}
                        </div>
                        <div className="to">
                            <form>
                                <label>TO 
                                    <input type="date" />
                                </label>
                            </form>
                            {/* <span>TO</span> */}
                        </div>
                        <div className="total">
                            <span>TOTAL:</span>
                        </div>
                    </div>
                    <div className="col-12 row-7 mb-2">
                        <div className="amountInWord">
                            <span>TOTAL AMOUNT (IN WORDS): </span>
                        </div>
                    </div>
                    <div className="row text-center mt-3 mb-5">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <div className="display text-start">
                                <span className='currency'>RS-</span>
                                <span className='amount'>/-</span>
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    <div className="col-6 text-center mb-2">
                        <div className="line">
                            <hr></hr>
                        </div>
                        <span>CUSTOMER SIGNATURE</span>
                    </div>
                    <div className="col-6 text-center mb-2">
                        <div className="line">
                            <hr></hr>
                        </div>
                        <span>FOR: JOY GURU JANAKALYAN TRUST & SERVICE</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default CustomerPaymentReceipt
