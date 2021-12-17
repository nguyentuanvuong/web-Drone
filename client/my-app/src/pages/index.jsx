import React from 'react';
import {
  Page,
  Navbar,
  NavTitleLarge,
  Card
} from 'zmp-framework/react';

import api from 'zmp-sdk';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

socket.on('connect', () => {
  console.log(socket.id);
  socket.on('results',(msg)=>{
    console.log(msg);
    // alert("Hello! I am an alert box!!");
  });
  
  socket.on('sensor',(msg)=>{
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
        <p>Trang Trong</p>
      </Card>

    </Page>
  );
}
export default HomePage;