


import React from "react";
import PropTypes from 'prop-types';

const ModalComponent = (props) => {
    const renderFooter = () => {
        if (props.footerContent) {
            return (
                <div className="modal-footer">{props.footerContent}</div>
            );
        }
    };

    return (
        <>
            <div
                className={`modal fade ${props.className}`}
                id={props.id}
                tabIndex="-1"
                aria-labelledby={props.exampleModalLabel}
                data-bs-backdrop={props.dataBsBackdrop}
                aria-hidden={props.ariaHidden}
                style={{ display: "none" }}
            >
                <div
                    className={`${props.fullScreen ? "modal-fullscreen" : ""
                        } modal-dialog modal-dialog-scrollable`}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {props.title}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="modal-body">{props.content}</div>
                        {renderFooter()}
                    </div>
                </div>
            </div>
        </>
    );
};

ModalComponent.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ModalComponent;
