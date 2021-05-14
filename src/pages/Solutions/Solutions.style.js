import styled from 'styled-components';

const QuestionWrapper = styled.div`
    padding-bottom: 80px;
    .list-meta {
        align-items: center;
    };
    .list-meta .ant-list-item-meta-title {
        margin-bottom: 0px;
    };
    .ant-collapse-header {
        display: none;
    };
    .ant-collapse, .ant-collapse-content, .ant-collapse-item {
        border: none;
    };
    .comment-collapse {
        .ant-collapse-content-box {
            padding: 0px;
        }
    }
`

export default QuestionWrapper;