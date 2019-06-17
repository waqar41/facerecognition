import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange , onButtonClick}) => {
  return (
    <div>
      <p className='f3'>
        {'This Magic Brain Will Detect Faces in your Pictures. '}
      </p>
      <div className='center'>
       <div className='form center w-50 pa4 br3 shadow-4 '>
        <input className='f4 pa2 w-70 ' type='tex' onChange={onInputChange}/>
        <button className='w-30 grow f4 link ph3 pv2 dib black bg-light-purple' onClick={onButtonClick}  > Detect </button>
       </div>
      </div>
    </div>

  );
}
export default ImageLinkForm;
