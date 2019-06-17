import React, { Component } from 'react';
import Navigation from './Navigation/Navigation';
import Logo from './Logo/Logo';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm';
import SignIn from './SignIn/SignIn';
import Register from './Register/Register';
import FaceRecognition from './FaceRecognition/FaceRecognition';
import Rank from './Rank';
import Clarifai from 'clarifai';
import './App.css';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
 apiKey: 'd3f07c5da6e44cfe8b5e933f17e25826'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
      value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route:'signin',
      issignedIn: 'false',
      user: {
        id: '',
        name: '',
        email: '',
        password:'',
        entries: 0,
        joined: ''
      }
    }
  }

loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    Name: data.name,
    email: data.email,
    password:data.password,
    entries: data.joined,
    joined: data.joined
  }})
}

 calculateFaceLocation = (data) => {
    const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box ;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height= Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box:box});
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonClick = () => {
   this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => {
        if(response) {
          fetch('http://localhost3001/image' , {
          method: 'put',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
        })
      })
    }

      this.displayFaceBox(this.calculateFaceLocation(response))
    })
      .catch(err => console.log(err));

    }
    onRouteChange = (route) => {
      if (route ==='signout') {
        this.setState({issignedIn: false})
      } else if (route ==='home'){
        this.setState({issignedIn: true})
      }
      this.setState({route:route});
    }
  render() {
    return (
      <div className="App">
        <Particles className='particles'
              params={particlesOptions}
                />
        <Navigation onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home'

        ? <div>
        <Logo/>
          <Rank/>
         <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
      :(
        this.state.route === 'signin'
        ?<SignIn onRouteChange = {this.onRouteChange}/>
        :<Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
      )
}
</div>
    );
  }
}

export default App;
