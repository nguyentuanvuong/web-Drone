import React from 'react';
import {
    Page,
    Navbar,
    NavTitleLarge,
    Card
} from 'zmp-framework/react';
import api from 'zmp-sdk';





import io from 'socket.io-client';
const socket = io('https://d108-2001-ee0-4b4a-7d00-39f3-44b1-d380-573a.ngrok.io');
socket.on('connect', () => {
    console.log(socket.id);
    socket.on('results', (msg) => {
        console.log(msg);
    });
    socket.on('sensor', (msg) => {
        console.log(msg);
    });
});


// api.login({
//   success: async () => {
//     // xử lý khi gọi api thành công
//     api.getUserInfo({
//       success: (data) => {
//         // xử lý khi gọi api thành công
//         const { userInfo } = data;
//         console.log(userInfo.name);
//         console.log(userInfo.avatar);
//       },
//       fail: (error) => {
//         // xử lý khi gọi api thất bại
//         console.log(error);
//       }
//     }
//     );
//   },
//   fail: (error) => {
//     // xử lý khi gọi api thất bại
//     console.log(error);
//   }
// });
const HomePage = () => {



    return (
        <Page name="home" navbarLarge>
            {/* Top Navbar */}
            <Navbar >
                <NavTitleLarge>My App</NavTitleLarge>
            </Navbar>
            {/* Page content */}
            <Card inset>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Độ ẩm</h4>
                                <p className="card-category">C</p>
                            </div>
                            <div className="card-body">
                                <div id="task-complete" className="chart-circle mt-4 mb-3">
                                    <div className="circles-wrp" style={{ position: 'relative', display: 'inline-block' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={150} height={150}>
                                            <path fill="transparent" stroke="#eee" strokeWidth={8} d="M 74.98553920253764 4.000001472638488 A 71 71 0 1 1 74.90138242439691 4.000068488950063 Z" className="circles-maxValueStroke" />
                                            <path fill="transparent" stroke="#1D62F0" strokeWidth={8} d="M 74.98553920253764 4.000001472638488 A 71 71 0 1 1 7.458509176231658 53.11057293342702 " className="circles-valueStroke" />
                                        </svg>
                                        <div className="circles-text" style={{ position: 'absolute', top: '0px', left: '0px', textAlign: 'center', width: '100%', fontSize: '52.5px', height: '150px', lineHeight: '150px' }}>80%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </Card>
        </Page>
    );
}
export default HomePage;