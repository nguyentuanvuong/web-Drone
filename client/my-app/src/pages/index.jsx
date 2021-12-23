import React from 'react';
import {
  useStore,
  Page,
  Navbar,
  Card,
  List,
  ListItem,
  Button
} from "zmp-framework/react";
import store from '../store';



import io from 'socket.io-client';
const socket = io('http://localhost:8000');
socket.on('connect', () => {
    console.log(socket.id);
    socket.on('results', (msg) => {
        console.log(msg);
    });
    socket.on('sensor', (msg) => {
        console.log(msg);
    });
});



const HomePage = () => {
    const loading = useStore('loading');
    const users = useStore('users');
    const loadUsers = () => {
        store.dispatch('getUsers');
    };
    return (
        <Page name='home'>
            <h1>nasjhck</h1>
            {users.length && (
                <List>
                    <p>bsdvbsdvb</p>
                    {users.map((user) => (
                        <ListItem title={user} key={user} />
                    ))}
                </List>
            )}
        </Page>
    );
};
export default HomePage;