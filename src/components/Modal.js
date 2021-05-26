import { Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { history } from '../App';

function ModalComponent(props) {
    // if(history.location.search.includes("demo=true")) {
    //     history.push(history.location.pathname);
    //     props.showModal({ type: 'SHOW' });
    // }
    return (
        props.modal?.show && <Modal
            // title="Basic Modal"
            visible={props.modal?.show}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: true }}
            closable={false}
            footer={
                <Button type="primary" onClick={props.hideModal}>Close</Button>
            }
            bodyStyle={{padding: '0px'}}
        >
            <iframe
                src="https://www.youtube.com/embed/epFguv3JLPE"
                width="100%"
                height="300px"
                allow="fullscreen;"
            ></iframe>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    modal: state.modal,
});

const mapDispatchToProps = (dispatch) => ({
    showModal: () => dispatch({ type: 'SHOW' }),
    hideModal: () => dispatch({ type: 'HIDE' })
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);