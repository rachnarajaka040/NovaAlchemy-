import React, { useState,createContext  } from 'react';
import { Layout } from 'antd';
import SpaceList from './components/SpaceList';
import SpaceForm from './components/SpaceForm';

const { Header, Content, Footer } = Layout;

const App = () => {
    const [spaceToEdit, setSpaceToEdit] = useState(null);

    const handleFormSubmit = () => {
        setSpaceToEdit(null);
    };

    return (
        <Layout>
            <Header style={{ color: 'white', textAlign: 'center' }}>
                <h1 style={{ color: 'white', margin: 0 }}>Shop Space Management</h1>
            </Header>
            <Content style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
                <SpaceForm spaceToEdit={spaceToEdit} onFormSubmit={handleFormSubmit} />
                <SpaceList onEdit={setSpaceToEdit} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>© 2024 Shop Space Management</Footer>
        </Layout>
    );
};

export default App;
