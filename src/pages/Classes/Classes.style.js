import styled from 'styled-components';

const ClassesWrapper = styled.div`
    .mobile-subtitle {
        display: none;
    };
    .ant-page-header-heading-title {
        white-space: unset;
    };
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