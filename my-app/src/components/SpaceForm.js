import React, { useEffect,createContext  } from 'react';
import { Form, Input, InputNumber, Select, Button, Card, Tooltip, Divider, message ,Row, Col} from 'antd';
import axios from 'axios';

const SpaceForm = ({ spaceToEdit, onFormSubmit }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (spaceToEdit) {
            form.setFieldsValue(spaceToEdit);
        } else {
            form.resetFields();
        }
    }, [spaceToEdit, form]);

    const handleSubmit = async (values) => {
        try {
            if (spaceToEdit) {
                await axios.put(`http://localhost:4000/api/spaces/${spaceToEdit._id}`, values);
                message.success('Space updated successfully');
            } else {
                await axios.post('http://localhost:4000/api/spaces', values);
                message.success('Space created successfully');
            }
            onFormSubmit();
            form.resetFields();
        } catch (error) {
            message.error('Failed to save space');
        }
    };

    return (
        <Card title={spaceToEdit ? 'Edit Space' : 'Add New Space'} bordered={true} style={{ marginBottom: 20 }}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Tooltip title="Enter the unique name of the space">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the space name' }]}
                    >
                        <Input placeholder="Enter space name" />
                    </Form.Item>
                </Tooltip>
                <Tooltip title="Select the type of space (hanger or shelf)">
                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please select the type' }]}
                    >
                        <Select placeholder="Select type">
                            <Select.Option value="hanger">Hanger</Select.Option>
                            <Select.Option value="shelf">Shelf</Select.Option>
                        </Select>
                    </Form.Item>
                </Tooltip>
                <Divider>Capacity Details</Divider>
                <Form.Item
                    label="Capacity"
                    name="capacity"
                    rules={[{ required: true, message: 'Please enter the capacity' }]}
                >
                    <InputNumber min={0} placeholder="Enter capacity" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Occupied Space"
                    name="occupied"
                    rules={[{ required: true, message: 'Please enter the occupied space' }]}
                >
                    <InputNumber min={0} placeholder="Enter occupied space" style={{ width: '100%' }} />
                </Form.Item>
                <Divider>Pricing Details</Divider>
                <Form.Item
                    label="Price Per Unit"
                    name="pricePerUnit"
                    rules={[{ required: true, message: 'Please enter the price per unit' }]}
                >
                    <InputNumber min={0} placeholder="Enter price per unit" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        {spaceToEdit ? 'Update Space' : 'Create Space'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default SpaceForm;
