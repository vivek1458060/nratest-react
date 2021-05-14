import styled from 'styled-components';

const HeaderWrapper = styled.div`
    .menu-unfold-icon {
        display: none;
    };

    .menu-right {
        display: inline-block;
    }

    .menu-right-items {
        display: flex;
    }
    
    @media(max-width: 768px) {
        .menu-unfold-icon {
            display: inline-block;
        }
        .menu-right {
            display: none;
        }
    };
`

export default HeaderWrapper;