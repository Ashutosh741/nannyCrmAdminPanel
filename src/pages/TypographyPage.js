import React from 'react'
import adminLayout from '../hoc/adminLayout'

function TypographyPage() {
    return (
        <>
            <div className="d-flex text-muted">
                <table className="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Source</th>
                            <th>Created On</th>
                            <th>Updated On</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>Tarun Dhiman</td>
                            <td>tarun.dhiman@abc.com</td>
                            <td>Website</td>
                            <td>23-aug-2019</td>
                            <td>26-aug-2019</td>
                            <td>
                                <div className="dropdown table-action-dropdown">
                                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
                                        <li><a className="dropdown-item" href="#"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</a></li>
                                        <div className="dropdown-divider"></div>
                                        <li><a className="dropdown-item text-danger" href="#"><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>Ashwani Dhiman</td>
                            <td>ashwani.dhiman@abc.com</td>
                            <td>IPO</td>
                            <td>23-aug-2019</td>
                            <td>26-aug-2019</td>
                            <td>
                                <div className="dropdown table-action-dropdown">
                                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
                                        <li><a className="dropdown-item" href="#"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</a></li>
                                        <div className="dropdown-divider"></div>
                                        <li><a className="dropdown-item text-danger" href="#"><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>Ashwani Dhiman</td>
                            <td>ashwani.dhiman@abc.com</td>
                            <td>IPO</td>
                            <td>23-aug-2019</td>
                            <td>26-aug-2019</td>
                            <td>
                                <div className="dropdown table-action-dropdown">
                                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
                                        <li><a className="dropdown-item" href="#"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</a></li>
                                        <div className="dropdown-divider"></div>
                                        <li><a className="dropdown-item text-danger" href="#"><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>Gagan Chhabra</td>
                            <td>gagan@abc.com</td>
                            <td>IPO</td>
                            <td>23-aug-2019</td>
                            <td>26-aug-2019</td>
                            <td>
                                <div className="dropdown table-action-dropdown">
                                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButtonSM" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" aria-hidden="true"></i></button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonSM">
                                        <li><a className="dropdown-item" href="#"><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</a></li>
                                        <div className="dropdown-divider"></div>
                                        <li><a className="dropdown-item text-danger" href="#"><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Delete</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <nav className="table-bottom-center-pagination" aria-label="Page navigation example ">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default adminLayout(TypographyPage)