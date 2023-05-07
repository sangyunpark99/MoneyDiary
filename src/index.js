import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styled from 'styled-components';
import {BrowserRouter} from 'react-router-dom';

const Container = styled.div`
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  min-height:80vh;
  margin-top:30px;
`;

ReactDOM.render(
  <BrowserRouter>
    <Container>
      <App/>
    </Container>
  </BrowserRouter>,
  document.getElementById('root')
);
