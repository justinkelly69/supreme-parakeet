import * as React from "react"
import styled from 'styled-components';

const colorPallet = {
    light: {
        textColor: 'black',
        backgroundColor: 'white',
        borderColor: 'navy'
    },
    dark: {
        textColor: 'white',
        backgroundColor: 'black',
        borderColor: 'skyblue'
    }
}

const Input = styled.input<{ $inputColor?: string, mode: string }>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.$inputColor || "#BF4F74"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;