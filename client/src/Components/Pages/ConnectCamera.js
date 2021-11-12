import React, { Component } from 'react';

class ConnectCamera extends Component {
    render() {
        return (
            <div className="row">
                <div id="list_camera" style={{display: 'none'}} className=" scrollarea col-4 " />
                <div id="view-Cam" className="text-center">
                    <video id="video" style={{display: 'none'}} autoPlay> </video>
                    <canvas id="results" style={{display: 'none'}} />
                </div>
            </div>
        );
    }
}

export default ConnectCamera;