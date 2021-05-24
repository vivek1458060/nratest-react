import styled from 'styled-components';

const ClassesWrapper = styled.div`
    .mobile-subtitle {
        display: none;
    }
    @media(max-width: 576px) {
        .mobile-subtitle {
            display: block;
        }
        .ant-page-header-heading-sub-title {
            display: none;
        }
    }
`

export default ClassesWrapper;