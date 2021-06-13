import React from 'react';
import { Button, Form, Space, Modal, message, Card, DatePicker, Empty } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddCurrentAffairsForm from '../components/AddCurrentAffairs/AddCurrentAffairsForm';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

class AddCurrentAffairs extends React.Component {
    state = {
        currentAffairs: [],
        show: false,
        editItem: null,
        date: moment()
    }
    handleEdit = (item) => {
        this.setState({
            show: true,
            editItem: item
        });
    }
    getCurrentAffairs = async (date) => {
        try {
            const res = await axios.get("/current-affairs/all",
                {
                    params: {
                        startDate: date.clone().startOf("day").valueOf(),
                        endDate: date.clone().endOf("day").valueOf()
                    }
                });
            this.setState({ currentAffairs: res.data.currentAffairs });
        } catch (e) {
            console.log(e);
        }
    }
    componentDidMount() {
        this.getCurrentAffairs(this.state.date);
    }
    onDateChange = (e) => {
        this.setState({ date: e })
        this.getCurrentAffairs(e);
    };
    onSubmit = async (values) => {
        try {
            values.date = this.state.date.valueOf();
            if (this.state.editItem) {
                const res = await axios.put(`/current-affairs/${this.state.editItem._id}`, values);
                this.setState({
                    currentAffairs: this.state.currentAffairs.map((item) => {
                        if (item._id === this.state.editItem._id) {
                            return res.data.currentAffair
                        }
                        return item;
                    }),
                    editItem: null,
                });
                message.success(`Current Affair ${values.title} edited successfully`);
            } else {
                const res = await axios.post("/current-affairs", values);
                this.setState({
                    currentAffairs: [res.data.currentAffair, ...this.state.currentAffairs],
                });
                message.success(`Current Affair ${values.title} created successfully`);
            }
            this.setState({ show: false });
        } catch (e) {
            message.error("Something went wrong!");
            console.log(e);
        }
    }
    handleDelete = (item) => {
        Modal.confirm({
            title: 'Do you want to delete below item?',
            icon: <ExclamationCircleOutlined />,
            content: item.title,
            onOk: async () => {
                try {
                    await axios.delete(`/current-affairs/${item._id}`);
                    this.setState({
                        currentAffairs: this.state.currentAffairs.filter(({ _id }) => _id !== item._id)
                    });
                    message.success(`${item.title} deleted successfully`);
                } catch (e) {
                    console.log(e);
                }
            },
            onCancel() { },
        });
    }
    onCancel = () => this.setState({ show: false, editItem: null })
    onShow = () => this.setState({ show: true })
    render() {
        const isAdmin = this.props.user?.role === 'admin';
        return (
            <div>
                <h1 style={{ fontWeight: 400, textAlign: 'center' }}>Current Affairs</h1>
                <div style={{ display: 'flex' }}>
                    <Form.Item
                        validateTrigger={['onChange', 'onBlur']}
                        name="date"
                        rules={[
                            {
                                required: false,
                                message: "Please select a date",
                            },
                        ]}
                        style={{ marginRight: '10px' }}
                    >
                        <DatePicker
                            onChange={this.onDateChange}
                            defaultValue={this.state.date}
                            style={{ width: 150 }}
                            disabledDate={(current) => current && current > moment().endOf('day')}
                            allowClear={false}
                        />
                    </Form.Item>
                    {isAdmin && <Button type="primary" onClick={this.onShow}>Add One</Button>}
                </div>
                <Space direction="vertical" style={{ display: 'flex' }}>
                    {
                        this.state.currentAffairs.map((item) => (
                            <Card
                                hoverable
                                key={item._id}
                            >
                                <Card.Meta
                                    title={
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ color: '#377dff' }}>{item.title}</div>
                                            {isAdmin && <Space style={{ margin: '10px 0px' }}>
                                                <Button onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.handleEdit(item);
                                                }}
                                                    type="primary"
                                                >Edit</Button>
                                                <Button onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.handleDelete(item);
                                                }}
                                                    type="danger"
                                                >Delete</Button>
                                            </Space>}
                                        </div>
                                    }
                                    description={<span dangerouslySetInnerHTML={{ __html: item.description }}></span>}
                                />
                            </Card>
                        ))
                    }
                </Space>
                {
                    this.state.currentAffairs.length === 0 && <Empty />
                }
                <Modal
                    destroyOnClose
                    title={`${this.state.editItem ? 'Edit' : 'Add'} Current Affair (${this.state.date.format("LL")})`}
                    visible={this.state.show}
                    closable={false}
                    footer={null}
                >
                    <AddCurrentAffairsForm
                        values={this.state.editItem}
                        onSubmit={this.onSubmit}
                        onCancel={this.onCancel}
                        date={this.state.date}
                    />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(AddCurrentAffairs);