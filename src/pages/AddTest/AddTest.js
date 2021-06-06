import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, List, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AddTestWrapper from './AddTest.style';
import axios from 'axios';

import AddTestForm from '../../components/AddTest/AddTestForm';

class AddTest extends Component {
  state = {
    tests: [],
    show: false,
    editItem: null,
  }
  async componentDidMount() {
    try {
      const res = await axios.get("/test/all");
      this.setState({ tests: res.data.tests });
    } catch (e) {
      console.log(e);
    }
  }
  onCreateTest = async (values) => {
    try {
      if (this.state.editItem) {
        const res = await axios.put(`/test/${this.state.editItem._id}`, values);
        this.setState({
          tests: this.state.tests.map((test) => {
            if (test._id === this.state.editItem._id) {
              return res.data.test
            }
            return test;
          }),
          editItem: null,
        });
        message.success(`Test ${values.title} edited successfully`);
      } else {
        const res = await axios.post("/test", values);
        this.setState({
          tests: [res.data.test, ...this.state.tests],
        });
        message.success(`Test ${values.title} created successfully`);
      }
      this.setState({ show: false });
    } catch (e) {
      message.error("Something went wrong!");
      console.log(e);
    }
  }
  onEdit = (id) => {
    this.setState({
      show: true,
      editItem: this.state.tests.filter(({ _id }) => _id === id)[0]
    });
  }
  onDelete = (item) => {
    Modal.confirm({
      title: 'Do you want to delete this test?',
      icon: <ExclamationCircleOutlined />,
      content: item.title,
      onOk: async () => {
        try {
          await axios.delete(`/test/${item._id}`);
          this.setState({
            tests: this.state.tests.filter(({ _id }) => _id !== item._id)
          });
          message.success(`Test ${item.title} deleted successfully`);
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
    return (
      <AddTestWrapper>
        <h1 style={{ display: 'flex', justifyContent: 'space-between' }}>
          Created Tests
          <Button type="primary" onClick={this.onShow}>Create a new Test</Button>
        </h1>
        <List
          className="demo-loadmore-list"
          bordered="true"
          // loading={initLoading}
          itemLayout="vertical"
          // loadMore={loadMore}
          dataSource={this.state.tests}
          renderItem={item => (
            <List.Item
              actions={[
                <a onClick={(e) => {
                  e.preventDefault();
                  this.onEdit(item._id)
                }}>Edit</a>,
                <a onClick={(e) => {
                  e.preventDefault();
                  this.onDelete(item)
                }}>Delete</a>,
                <Link to={`/create-online-test-questions/${item._id}`}>Add Question</Link>
              ]
              }
            >
              {/* <Skeleton avatar title={false} loading={item.loading} active> */}
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              {/* <div>content</div> */}
              {/* </Skeleton> */}
            </List.Item>
          )}
        >
        </List>
        <br />
        <Modal
          title={`${this.state.editItem ? 'Edit' : 'Add'} Test`}
          visible={this.state.show}
          closable={false}
          footer={<></>}
        >
          <AddTestForm
            values={this.state.editItem}
            onCreateTest={this.onCreateTest}
            onCancel={this.onCancel}
          />
        </Modal>
      </AddTestWrapper>
    );
  }
}

export default AddTest;