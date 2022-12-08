import styled from "styled-components";

export const AnswerButton = styled.div`
        background-color: ${props => props.theme.colors.button_Background};
        color: ${props => props.theme.colors.btnText};
        border: 2px solid;
        border-color: ${props => props.theme.colors.border};
        height: 60px;
        width: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
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