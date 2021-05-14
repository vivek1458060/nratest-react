import styled from 'styled-components';

const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; 
    margin: 0px auto;
    .container {
        width: 100%;
    }
    @media(max-width: 576px) {
        .ant-card {
            border: none;
        }
    };
    .image-container {
        display: flex;
        justify-content: center;
        img {
            width: 277px;
            height: 120px;
        }
    };
`

export default LoginWrapper;