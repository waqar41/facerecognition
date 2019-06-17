import React from 'react';

const Navigation = ({onRouteChange, issignedIn}) => {
  if(issignedIn) {
    return(

 <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
    <p onClick={() =>onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>SignOut</p>
  </nav>);
} else {
  return (

  <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
    <p onClick={() =>onRouteChange('home')} className='f3 link dim black underline pa3 pointer'>SignIn</p>
    <p onClick={() =>onRouteChange('Register')} className='f3 link dim black underline pa3 pointer'>Register</p>
  </nav>);
}
}

export default Navigation;
