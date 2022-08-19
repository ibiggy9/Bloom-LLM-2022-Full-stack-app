import React from 'react';
import { Container } from 'react-bootstrap';

export default function Spinner() {
  return (
    <div>
    <div className="loader">
      <i className="fa fa-cog fa-spin" />
    </div>
    <h4 className='mx-4'>Loading...</h4>
    
    </div>
  );
}


