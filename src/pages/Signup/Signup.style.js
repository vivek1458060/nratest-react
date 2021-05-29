import styled from 'styled-components';

const SignupWrapper = styled.div`
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
`

export default SignupWrapper;