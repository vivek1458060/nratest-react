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
            const currentAffairs = res.data.currentAffairs;
            this.setState({ currentAffairs });
            return currentAffairs;
        } catch (e) {
            console.log(e);
            throw 'err'
        }
    }
    async componentDidMount() {
        try {
            const data = await this.getCurrentAffairs(this.state.date);
            if (!data.length) {
                const prevDate = this.state.date.subtract(1, 'day');
                await this.getCurrentAffairs(prevDate);
                this.setState({ date: prevDate });
            }
        } catch (e) { }
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
                <div style={{ display: 'flex', alignItems: 'flex-end', margin: '15px 0px' }}>
                    <div>
                        <div><strong>Date</strong></div>
                        <DatePicker
                            onChange={this.onDateChange}
                            defaultValue={this.state.date}
                            style={{ width: 200 }}
                            disabledDate={(current) => current && current > moment().endOf('day')}
                            allowClear={false}
                            format="MMMM Do YYYY"
                        />
                    </div>
                    {isAdmin && <Button style={{marginLeft: '10px'}} type="primary" onClick={this.onShow}>Add One</Button>}
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
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
                                            <div style={{ color: '#377dff', whiteSpace: 'break-spaces' }}>{item.title}</div>
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
                                    description={<span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: item.description }}></span>}
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