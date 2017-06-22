import React from 'react'
import { Link } from 'react-router-dom'

class Error404 extends React.Component {
  constructor(props){
    super(props)
  }


render(){
  return (
    <div className="error-page">
      <h1 className="404-title">We can’t find that user.</h1>
        <p className="404Text">A report has been sent to our tech brigade. <br/> (Which is just one confused guy) <br/>Please check back in a bit.</p>
        <div className="backhome">
          <Link to="/stream">Take me back home</Link>
        </div>
    </div>
    )
  }
}



export default Error404;
