import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';

import DashboardPage from './pages/DashboardPage';
import TypographyPage from './pages/TypographyPage'
import LoginPage from './pages/auth/LoginPage'
import ResetPassword from './pages/auth/ResetPassword';
import ProfilePage from './pages/profile/ProfilePage';
import ChangePasswordPage from './pages/profile/ChangePasswordPage';
import UserPreferencesPage from './pages/profile/UserPreferencesPage'
import AdminBlankPage from './pages/AdminBlankPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerRegister from './pages/CustomerRegister';

import AyaList from './ListPages/AyaList';
import CustomerList from './ListPages/CustomerList';
import AyaReg from './pages/AyaReg';
import AyaDetails from './DetailPage/AyaDetails';
import CustomerDetail from './DetailPage/CustomerDetail';
import AyaAssign from './DetailPage/AyaAssign';
import CustomerAssign from './DetailPage/CustomerAssign';
import Attendence from './pages/Attendence';
import Booking from './pages/Booking';
import TestBooking from './pages/auth/TestBooking';
import Payment from './pages/Payment';
import PaymentEdit from './pages/PaymentEdit';
import AyaPayment from './PaymentPage/AyaPayment';
import AyaPaymentList from './PaymentPage/AyaPaymentList';
import Test from './ListPages/Test';
import TotalAvailbleWork from './navigationPage/TotalAvailbleWork';
import TotalAvailbleCustomer from './navigationPage/TotalAvailbleCustomer';
import SecurityMoney from './navigationPage/SecurityMoney';
import TotalAmountRec from './navigationPage/TotalAmountRec';
import TotalAyaPayment from './navigationPage/TotalAyaPayment';
import CustomerPaymentReceipt from './pages/newPages/CustomerPaymentReceipt';
import AyaPaymentReceipt from './pages/newPages/AyaPaymentReceipt';
import AyaBill from './pages/newPages/AyaBill';
import CustomerBill from './pages/newPages/CustomerBill';


function App() {
    return (
        <Router>
            <Routes>
                {/* <Route exact path='/' element={<DashboardPage />} /> */}
                <Route exact path='/' element={<LoginPage />} />
                <Route exact path='/dashboard' element={<DashboardPage />} />
                <Route exact path='/reset-password' element={<ResetPassword />} />
                <Route exact path='/profile' element={<ProfilePage />} />
                <Route exact path='/change-password' element={<ChangePasswordPage />} />
                <Route exact path='/preferences' element={<UserPreferencesPage />} />
                <Route exact path='/typography' element={<TypographyPage />} />
                <Route exact path='/blank-page' element={<AdminBlankPage />} />
                <Route exact path='/customer' element={<CustomerRegister />} />
                <Route exact path='/ayareg' element={<AyaReg />} />
                <Route exact path='/ayaList' element={<AyaList />} />
                <Route exact path='/customerlist' element={<CustomerList />} />
                <Route exact path='/ayaDetail' element={<AyaDetails />} />
                <Route exact path='/test' element={<Test />} />
                {/* <Route exact path='/test2' element={<Test2 />} /> */}
                {/* <Route exact path='/ayaassign' element={<AyaAssign />} /> */}

                <Route exact path='/booking' element={<Booking />} />
                <Route exact path='/testbooking' element={<TestBooking />} />
                <Route exact path='/payment' element={<Payment />} />
                <Route exact path='/ayapayment' element={<AyaPaymentList />} />

                <Route path="ayareg" element="">
                    <Route path=':id' element={<AyaDetails />} />
                </Route>
                <Route path="customerreg" element="">
                    <Route path=':id' element={<CustomerDetail />} />
                </Route>
                <Route path="customerassign" element="">
                    <Route path=':id' element={<CustomerAssign />} />
                </Route>
                <Route path="payment" element="">
                    <Route path=':id' element={<PaymentEdit />} />
                </Route>
                <Route path="ayaassign" element="">
                    <Route path=':id' element={<AyaAssign />} />
                </Route>
                <Route path="ayapayment" element="">
                    <Route path=':id' element={<AyaPayment />} />
                </Route>




                <Route exact path='/attendence' element={<Attendence />} />
                <Route exact path='/totalAvaibleNanny' element={<TotalAvailbleWork />} />
                <Route exact path='/totalAvaibleCustomer' element={<TotalAvailbleCustomer />} />
                <Route exact path='/customerBill' element={<TotalAvailbleCustomer />} />

                <Route exact path='/securityAmount' element={<SecurityMoney />} />
                <Route exact path='/totalAmount' element={<TotalAmountRec />} />
                <Route exact path='/totalAyapaid' element={<TotalAyaPayment />} />
                {/* <Route path='generateBill' element = {<CustomerPaymentReceipt/>}/> */}
                <Route path='generateCustomerBill' element = {<CustomerPaymentReceipt/>}/>
                <Route path='generateAyaBill' element = {<AyaPaymentReceipt/>}/>

                <Route path="generateAyaBill" element="">
                    <Route path=':id' element={<AyaPaymentReceipt />} />
                </Route>

                <Route path="generateCustomerBill" element="">
                    <Route path=':id' element={<CustomerPaymentReceipt/>} />
                </Route>

                {/* <Route path = ':id' element = {<CustomerPaymentReceipt/>}/> */}
                {/* </Route> */}
            </Routes>
        </Router>
    )
}

export default App;

//  make protected routes without login user dont enter modify the routes according to this






// new Protected Routes










// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { useState } from 'react';

// // Define a variable to store the authentication state
// const isAuthenticated = false;

// // Higher-order component for protected routes
// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   // Check if the user is authenticated
//   if (!isAuthenticated) {
//     // Redirect to the login page if not authenticated
//     return <Navigate to="/login" />;
//   }

//   // Render the component if authenticated
//   return <Route {...rest} element={Element} />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<DashboardPage />} />
//         <Route exact path="/login" element={<LoginPage />} />
//         <Route exact path="/reset-password" element={<ResetPassword />} />
//         <Route exact path="/attendence" element={<Attendence />} />

//         {/* Protected routes */}
//         <ProtectedRoute exact path="/profile" element={<ProfilePage />} />
//         <ProtectedRoute exact path="/change-password" element={<ChangePasswordPage />} />
//         <ProtectedRoute exact path="/preferences" element={<UserPreferencesPage />} />
//         <ProtectedRoute exact path="/typography" element={<TypographyPage />} />
//         <ProtectedRoute exact path="/blank-page" element={<AdminBlankPage />} />
//         <ProtectedRoute exact path="/customer" element={<CustomerRegister />} />
//         <ProtectedRoute exact path="/ayareg" element={<AyaReg />} />
//         <ProtectedRoute exact path="/ayaList" element={<AyaList />} />
//         <ProtectedRoute exact path="/customerlist" element={<CustomerList />} />
//         <ProtectedRoute exact path="/ayaDetail" element={<AyaDetails />} />
//         <ProtectedRoute exact path="/booking" element={<Booking />} />

//         <ProtectedRoute
//           path="/ayareg"
//           element={
//             <ProtectedRoute
//               path=":id"
//               element={<AyaDetails />}
//             />
//           }
//         />
//         <ProtectedRoute
//           path="/customerreg"
//           element={
//             <ProtectedRoute
//               path=":id"
//               element={<CustomerDetail />}
//             />
//           }
//         />
//         <ProtectedRoute
//           path="/customerassign"
//           element={
//             <ProtectedRoute
//               path=":id"
//               element={<CustomerAssign />}
//             />
//           }
//         />
//         <ProtectedRoute
//           path="/ayaassign"
//           element={
//             <ProtectedRoute
//               path=":id"
//               element={<AyaAssign />}
//             />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

