import styled from 'styled-components';

const QuestionWrapper = styled.div`
    padding-bottom: 80px;
    .list-meta {
        align-items: center;
    };
    .list-meta .ant-list-item-meta-title {
        display: flex;
        justify-content: space-between;
    }
    .ant-collapse-header {
        display: none;
    };
    .ant-collapse, .ant-collapse-content, .ant-collapse-item {
        border: none;
    };
    .comment-collapse {
        .ant-collapse-content-box {
            padding: 0px;
        };
        .ant-collapse-item {
            border-bottom: none;
        };
    };
    .title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    };
`

export default QuestionWrapper;