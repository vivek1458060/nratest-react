import styled from 'styled-components';

const HeaderWrapper = styled.div`
    .header {
        background: white;
        display: flex;
        justify-content: space-between;
        > {
            color: white !important;
        }
    };

    .header.ant-layout-header {
        padding: 0 10px;
    }

    .logo {
        object-fit: cover; 
        width: 175px;
        max-height: 64px;
    };

    .menu-right {
        display: flex;
        align-items: center;
    };

    @media(max-width: 992px) {

    };
`

export default HeaderWrapper;