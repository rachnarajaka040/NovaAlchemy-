import React, { useEffect, useState,createContext  } from 'react';
import { Table, Button, Space, Select, Input, Popconfirm, message, Card,Row, Col } from 'antd';
import axios from 'axios';

const { Search } = Input;

const SpaceList = ({ onEdit }) => {
    const [spaces, setSpaces] = useState([]);
    const [filteredSpaces, setFilteredSpaces] = useState([]);
    const [filterType, setFilterType] = useState('');

    const fetchSpaces = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/spaces');
            setSpaces(response.data);
            setFilteredSpaces(response.data);
        } catch (error) {
            message.error('Failed to fetch spaces');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/spaces/${id}`);
            message.success('Space deleted successfully');
            fetchSpaces();
        } catch (error) {
            message.error('Failed to delete space');
        }
    };

    const handleFilterChange = (value) => {
        setFilterType(value);
        const filtered = spaces.filter((space) => !value || space.type === value);
        setFilteredSpaces(filtered);
    };

    const handleSearch = (value) => {
        const filtered = spaces.filter((space) =>
            space.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSpaces(filtered);
    };

    useEffect(() => {
        fetchSpaces();
    }, []);

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
        { title: 'Occupied', dataIndex: 'occupied', key: 'occupied' },
        { title: 'Price Per Unit', dataIndex: 'pricePerUnit', key: 'pricePerUnit' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => onEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this space?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Card title="Spaces" bordered={true}>
            <Space style={{ marginBottom: 20 }}>
                <Select
                    placeholder="Filter by Type"
                    onChange={handleFilterChange}
                    style={{ width: 200 }}
                >
                    <Select.Option value="">All</Select.Option>
                    <Select.Option value="hanger">Hanger</Select.Option>
                    <Select.Option value="shelf">Shelf</Select.Option>
                </Select>
                <Search
                    placeholder="Search by Name"
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                />
            </Space>
            <Table dataSource={filteredSpaces} columns={columns} rowKey="_id" />
        </Card>
    );
};

export default SpaceList;
