import {createGlobalStyle, ThemeProvider} from "styled-components"
import { Theme } from "./Theme"

const GlobalStyle = createGlobalStyle`
    *
    {
        margin: 0;
        padding: 0;
    }

    html
    {
        font-size: 16px;
    }

    body
    {
        font-family: ${props => props.theme.fonts.text}, sans-serif;
        background-color: ${props => props.theme.background};
    }

    .main-container
    {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: fit-content;
        /* overflow-y: scroll; */
    }

    h1
    {
        display: flex;
        justify-content: center;
        color: blue;
        padding-bottom: 60px;
    }

    h2
    {
        color: darkblue;
    }

    form
    {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    form p
    {
        margin-bottom: 20px;
    }

    input[type=range]
    {
        margin: 5px;
        &:hover
        {
            cursor: pointer;
        }
    }

    select
    {
        color: darkblue;
        font-size: 16px;
        height: 40px;
        padding: 10px;
        &:hover
        {
            cursor: pointer;
        }
    }

    .radioBtns
    {
        display: flex;
        border: 2px solid gray;
        padding: 15px;
        margin: 20px 0;
    }

    input[type=radio]
    {
        margin: 10px;
        &:hover
        {
            cursor: pointer;
        }
    }

    form > button
    {
        font-size: 16px;
        color: darkblue;
        margin: 5px;
        border-radius: 15px;
        padding: 20px;
        &:hover
        {
            cursor: pointer;
        }
    }

    .question-container
    {
        display: flex;
        text-align: left;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 700px;
        margin: 0 auto;
    }

    .question-multiple, .question-boolean
    {
        width: 100%;
        margin: 20px 0;
    }

    .question-multiple h3, .question-boolean h3
    {
        margin: 20px 0;
    }
    
    .question-multiple .answer p
    {
        color: ${props => props.theme.colors.btnText};
    }

    .answer-boolean
    {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80px;
    }
    

    .answer-box
    {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0 auto;
        height: 80px;
    }

    .answer-box > h2
    {
        text-align: center;
        margin: auto;
    }


    .newGame
    {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        &>div
        {
            background-color: salmon;
        }
    }
`

const Provider = ({ children }) => 
{
    return(
        <ThemeProvider theme={Theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export default Provider;