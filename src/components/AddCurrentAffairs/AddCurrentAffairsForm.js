import React, { useEffect, useRef } from 'react';
import { Button, Form, Input, Space } from 'antd';

function AddCurrentAffairsForm(props) {
    const formRef = useRef(null);

    useEffect(() => {
        if (props.values) {
            formRef.current.setFieldsValue(props.values);
        }
    }, [])

    const onFinish = (values) => {
        props.onSubmit(values);
    }
    return (
        <Form
            name="dynamic_form_item"
            onFinish={onFinish}
            ref={formRef}
            layout="vertical"
        >
            <Form.Item
                label="Title"
                validateTrigger={['onChange', 'onBlur']}
                name="title"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: "Please input title text",
                    },
                ]}
            >
                <Input.TextArea placeholder="Type title here..." autoSize={{ minRows: 2 }} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                label="Description"
                validateTrigger={['onChange', 'onBlur']}
                name="description"
                rules={[
                    {
                        required: false,
                        whitespace: true,
                        message: "Please input description text",
                    },
                ]}
            >
                <Input.TextArea placeholder="Type description here..." autoSize={{ minRows: 4 }} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
                <Space type="vertical">
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button onClick={props.onCancel}>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    )
}


export default AddCurrentAffairsForm;