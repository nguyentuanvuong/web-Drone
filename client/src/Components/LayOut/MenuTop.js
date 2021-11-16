import React, { Component } from 'react';

class MenuTop extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark mb-1 position-fixed fixed-top" style={{backgroundColor: '#55B3D9'}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">FIRE PROTECTION SYSTEM</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 test-name test-name">
                        {/* <li class="nav-item active">
                    <a class="nav-link" href="/">Home</a>
                </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/ConnectCamera">Connect camera</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/training">Training</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/ALlCam">All camera</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/Mission">Mission controls</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/lora-map">Map Lora</a>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul className="dropdown-menu dropdown-menu-ligth" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item " href="/admin">Admin</a></li>
                            {/* <li><hr class="dropdown-divider"></li> */}
                            <li><a className="dropdown-item" href="/login">Login</a></li>
                        </ul>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-primary" type="submit">Search</button>
                    </form>
                    </div>
                </div>
                </nav>
            </div>
        );
    }
}

export default MenuTop;