import { useEffect, useState } from 'react';
import {Modal} from 'antd'
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';

export default function RenderAuthModal(props) {
    const [show, setShow] = useState(props.show)
    const [authType, setAuthType] = useState('login');

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);
    return (
        <Modal
            visible={show}
            onCancel={props.onClose}
            footer={null}
        >
            {
                authType === 'login' ? (
                    <Login
                        parent="modal"
                        closeParentModal={props.onClose}
                        onAuthTypeChange={setAuthType}
                    />
                ) : (
                    <Signup
                        parent="modal"
                        closeParentModal={props.onClose}
                        onAuthTypeChange={setAuthType}
                    />
                )
            }
        </Modal>
    )
};