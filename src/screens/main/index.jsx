import React, { Component } from 'react';
import CircleAndLabel, {
  CIRCLE_MODE
} from '../../components/circle/CircleAndLabel';
import Grid from '../../components/Grid';
import './custom.css';
import Quad1 from './Quad1';
import Quad2 from './Quad2';
import Quad3 from './Quad3';
import Quad4 from './Quad4';
import Rodape from './rodape';
import Quad5 from './Quad5';
import AnosHeader from './AnosHeader';

export class Main extends Component {
  render() {
    return (
      <div className="row backNormal">
        <Quad1 />
        <Quad2 />
        <div className="w-100" />
        <Quad3 />
        <Quad4 />
        <div className="w-100" />
        <AnosHeader label="ANOS INICIAIS" />
        <div className="w-100" />
        <Quad5 />
        <Rodape />
      </div>
    );
  }
}

export default Main;
