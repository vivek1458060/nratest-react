import styled from 'styled-components';

const QuestionWrapper = styled.div`
    padding-bottom: 80px;
    .list-meta {
        align-items: center;
    };
    .list-meta .ant-list-item-meta-title {
        margin-bottom: 0px;
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
    .ant-list-item-action li:last-child {
        display: block;
        text-align: unset;
    };
    .filters {
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        justify-content: flex-end;
        padding: 12px;
    };
    .title-card {
        .title {
            margin-bottom: 0px;
            font-weight: 300;
        };
        .subtitle {
            margin-bottom: 0px;
            margin-top: 0px;
            font-style: italic;
            font-weight: 300;
        };
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