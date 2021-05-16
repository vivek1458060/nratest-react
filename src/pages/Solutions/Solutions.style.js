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

    .img-container {
        display: flex;
        align-items: center;
        margin: 0 0 0 60px;
    };

    @media (max-width: 768px) {
        .img-container  {
          flex: 100%;
          margin: 24px 0 0;
          img {
            max-width: unset !important;
          }
        }
    };
`

export default QuestionWrapper;