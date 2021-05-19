import styled from 'styled-components';

const HeaderWrapper = styled.div`
    .header {
        background: white;
        display: flex;
        justify-content: space-between;
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

    .menu-unfold-icon {
        display: none;
    };

    @media(max-width: 992px) {
        .menu-right-items {
            display: none;
        };
        .menu-unfold-icon {
            display: block;
        };
    };
`

export default HeaderWrapper;