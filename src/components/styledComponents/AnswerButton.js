import styled from "styled-components";

export const AnswerButton = styled.div`
        background-color: ${props => props.theme.colors.button_Background};
        color: ${props => props.theme.colors.btnText};
        border: 2px solid;
        border-color: ${props => props.theme.colors.border};
        max-height: 140px;
        min-height: 70px;
        min-width: 140px;
        width: 150px;
        display: flex;
        padding: 0.25rem;
        align-items: center;
        justify-content: center;
        word-wrap: break-word;
        &:hover
        {
            cursor: pointer;
            background-color: ${props => props.theme.colors.hovered};
            color: black;
        };   

    &:checked
    {
        background-color: ${props => props.theme.colors.checked.background};
        color: ${props => props.theme.colors.checked.text};
    };

`