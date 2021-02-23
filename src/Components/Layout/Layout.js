import React from 'react';
import Aux from '../../Hoc/Aux';
import './Layout.css';

const layout = (props) => (
  <Aux>
    <div className='content'>Toolbar, SideDsrawer, , bootBackdrop</div>
    <main>{props.children}</main>
  </Aux>
);

export default layout;
