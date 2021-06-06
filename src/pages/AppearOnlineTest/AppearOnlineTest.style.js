import styled from 'styled-components';

const AppearOnlineTestWrapper = styled.div`
    padding: 0px 20px 80px;
    .header {
        background: white;
        display: flex;
        justify-content: space-between;
        > {
            color: white !important;
        }
    };
    .steps-content {
        min-height: 300px;
        margin-top: 16px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        background-color: #fafafa;
        border: 1px dashed #e9e9e9;
        border-radius: 2px;
        }

    .steps-action {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;
    }
`

export default AppearOnlineTestWrapper;