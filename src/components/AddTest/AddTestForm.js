import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
    
`

function AddTestForm(props) {
  const formRef = React.useRef();
  useEffect(() => {
    if(props.values) {
      formRef.current.setFieldsValue(props.values);
    }
  })
  const onFinish = (values) => {
    props.onCreateTest(values);
    formRef.current.resetFields();
  };
  const onCancel = () => {
    formRef.current.resetFields();
    props.onCancel()
  }
  return (
    <Wrapper>
      <Form onFinish={onFinish} ref={formRef} layout="vertical">
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
        // noStyle
        >
          <Input placeholder="Type your Title here..." />
        </Form.Item>
        <Form.Item
          // {...formItemLayout}
          label="Description"
          validateTrigger={['onChange', 'onBlur']}
          name="description"
        // noStyle
        >
          <Input.TextArea placeholder="Type your quesetion here..." autoSize={{ minRows: 4 }} />
        </Form.Item>
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