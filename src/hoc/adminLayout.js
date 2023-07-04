




import React, { useState, useEffect } from "react";
import Header from './../common/header';
import Sidebar from './../common/sidebar';
import { Preloader, Bars } from 'react-preloader-icon';

const adminLayout = (ChildComponent) => {
    const AdminLayout = (props) => {
        const [pageLoaded, setPageLoaded] = useState(false);
        const [saveLeadClickEvent, setSaveLeadClickEvent] = useState("");

        useEffect(() => {
            setTimeout(() => {
                setPageLoaded(true);
            }, 1000);
        }, []);

        const renderHtml = () => {
            if (!pageLoaded) {
                return (
                    <div className="loading-page">
                        <div className="center">
                            <Preloader use={Bars} size={60} strokeWidth={10} strokeColor="#f7b085" duration={600} />
                        </div>
                    </div>
                );
            }

            return (
                <div className="d-flex w-100" id="wrapper">
                    {/* <!-- Sidebar--> */}
                    <Sidebar />
                    {/* <!-- Page content wrapper--> */}
                    <div className="main w-100" id="page-content-wrapper">
                        {/* <!-- Top navigation--> */}
                        <Header />
                        {/* <!-- Page content--> */}
                        <div className="container-fluid content-container">
                            <ChildComponent {...props} />
                        </div>
                    </div>
                </div>
            );
        };

        const addLeadModalFooterContent = () => {
            return (
                <>
                    <div style={{ width: "100%" }}>
                        <button onClick={() => setSaveLeadClickEvent((Math.random() + 1).toString(36).substring(7))} className="btn btn-default low-height-btn">Add Lead</button>
                    </div>
                </>
            );
        };

        const handleParentData = (e) => {
            console.log(e);
        };

        return <>{renderHtml()}</>;
    };

    return AdminLayout;
};

export default adminLayout;
