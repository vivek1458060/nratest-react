import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Input, Space, Select, DatePicker, InputNumber, Row } from 'antd';
import moment from 'moment';

const Wrapper = styled.div``

function AddTestForm(props) {
  const formRef = React.useRef();
  const [type, setType] = useState(null);
  useEffect(() => {
    if (props.values) {
      if(props.values.type === 'ONLINETEST') setType('ONLINETEST')
      formRef.current.setFieldsValue({
        ...props.values,
        liveDate: props.values.liveDate ? moment(props.values.liveDate) : null
      });
    }
  })
  const onFinish = (values) => {
    if(values.liveDate) values.liveDate = values.liveDate.valueOf();
    props.onCreateTest(values);
  };
  const onCancel = () => {
    props.onCancel()
  }
  const isOnlineTest = type === 'ONLINETEST';
  return (
    <Wrapper>
      <Form onFinish={onFinish} ref={formRef} layout="vertical">
        <Form.Item
          label="Test Type"
          validateTrigger={['onChange', 'onBlur']}
          name="type"
          rules={[
            {
              required: true,
              whitespace: false,
              message: "Please select a test Type",
            },
          ]}
        >
          <Select options={[
            { label: 'Quiz', value: 'QUIZ' },
            { label: 'Online Test', value: 'ONLINETEST' }
          ]} placeholder="Select Test Type" onChange={setType} />
        </Form.Item>
        <Form.Item
          label="Title"
          validateTrigger={['onChange', 'onBlur']}
          name="title"
          rules={[
            {
              required: true,
              whitespace: false,
              message: "Please input a Title of Test",
            },
          ]}
        >
          <Input placeholder="Type your Title here..." />
        </Form.Item>
        <Form.Item
          label="Description"
          validateTrigger={['onChange', 'onBlur']}
          name="description"
        >
          <Input.TextArea placeholder="Type your quesetion here..." autoSize={{ minRows: 2 }} />
        </Form.Item>
        <Row>
        <Form.Item
          label="No. of Question"
          validateTrigger={['onChange', 'onBlur']}
          name="totalQuestion"
          rules={[
            {
              required: true,
              message: "Enter Ques No.",
            },
          ]}
          style={{marginRight: '10px'}}
        >
          <InputNumber style={{ width: 150 }} placeholder="Enter duration" />
        </Form.Item>
        <Form.Item
          label="Test Duration(min)"
          validateTrigger={['onChange', 'onBlur']}
          name="testDuration"
          rules={[
            {
              required: true,
              message: "Please input test Duration",
            },
          ]}
        >
          <InputNumber style={{ width: 150 }} placeholder="Enter duration" />
        </Form.Item>
        </Row>
        <Row>
          {isOnlineTest && <Form.Item
            label="Live Date & Time"
            validateTrigger={['onChange', 'onBlur']}
            name="liveDate"
            rules={[
              {
                required: false,
                message: "Please select Date and Time for test to go Live",
              },
            ]}
            style={{ marginRight: '10px' }}
          >
            <DatePicker showTime style={{ width: 150 }} />
          </Form.Item>}
          {isOnlineTest && <Form.Item
            label="Live Duration(min)"
            validateTrigger={['onChange', 'onBlur']}
            name="liveDuration"
            rules={[
              {
                required: false,
                message: "Please input Live Duration",
              },
            ]}
            suffix="Min"
          >
            <InputNumber suffix="Minutes" style={{ width: 150 }} placeholder="Enter duration" />
          </Form.Item>}
        </Row>
        <Form.Item>
          <Space type="vertical">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={onCancel}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default AddTestForm;