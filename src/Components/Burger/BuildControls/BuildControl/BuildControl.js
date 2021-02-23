import React from 'react';
import './buildControl.css';

const buildControl = (props) => {
  return (
    <div className='BuildControl'>
      <div className='Label'>{props.label}</div>
      <button
        disabled={props.disabled}
        className='Less'
        onClick={props.removeIngredient}>
        Less
      </button>
      <button className='More' onClick={props.ingredientAdded}>
        More
      </button>
    </div>
  );
};

export default buildControl;
