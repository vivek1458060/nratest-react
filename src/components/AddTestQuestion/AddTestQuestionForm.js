import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Button, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
    .dynamic-delete-button {
        position: relative;
        top: 4px;
        margin: 0 8px;
        color: #999;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s;
    }
    .dynamic-delete-button:hover {
        color: #777;
    }
    .dynamic-delete-button[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }
`

function createCorrectOptions(options) {
    return options.map((a, index) => ({ label: index + 1, value: index + 1 }));
}

function AddTestForm(props) {
    const initialOptions = ['', '', '', ''];
    const formRef = useRef(null);
    const [correctOptions, setCorrectOptions] = useState(createCorrectOptions(initialOptions));

    useEffect(() => {
        if (props.values) {
            formRef.current.setFieldsValue(props.values);
        }
    }, [])

    const onCancel = () => {
        formRef.current.resetFields();
        props.onCancel()
    }

    const onFinish = (values) => {
        props.onSubmitQuestion(values);
        formRef.current.resetFields();
    };

    const handleOptionChange = (values) => {
        if (values.options) {
            setCorrectOptions(createCorrectOptions(formRef.current.getFieldsValue().options));
            formRef.current.setFieldsValue({ correctOption: null });
        }
    }
    return (
        <Wrapper>
            <Form
                name="dynamic_form_item"
                onFinish={onFinish}
                ref={formRef}
                layout="vertical"
                onValuesChange={(values) => handleOptionChange(values)}
            >
                <Form.Item
                    label="Question"
                    validateTrigger={['onChange', 'onBlur']}
                    name="question"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input question text",
                        },
                    ]}
                // noStyle
                >
                    <Input.TextArea placeholder="Type your quesetion here..." autoSize={{ minRows: 4 }} style={{ width: '100%' }} />
                </Form.Item>
                <Form.List
                    initialValue={initialOptions}
                    name="options"
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 4) {
                                    return Promise.reject(new Error('At least 4 Options'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={index === 0 ? 'Options' : ''}
                                    required={true}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input an option or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="Type your option here..." style={{ width: '80%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '80%' }}
                                    icon={<PlusOutlined />}
                                >
                                    Add Option
                            </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item
                    label="Correct Option"
                    validateTrigger={['onChange', 'onBlur']}
                    name="correctOption"
                    rules={[
                        {
                            required: true,
                            message: "Please select a correct option",
                        },
                    ]}
                // noStyle
                >
                    <Select placeholder="Please select a correct option" options={correctOptions} style={{ width: '80%' }} />
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