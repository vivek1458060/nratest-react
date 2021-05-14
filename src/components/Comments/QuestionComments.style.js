import styled from 'styled-components';

const QuestionCommentsWrapper = styled.div`
    .comments {
        margin-top: 10px;
    };
    .comments.ant-list-bordered {
        border: none;
    };
    @media(max-width: 467px) {
        .comment-form {
            flex-direction: column;
        };
        .add-comment-btn {
            margin-top: 10px;
        }
    };
`

export default QuestionCommentsWrapper;