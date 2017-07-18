import React from 'react'
import {createSong} from '../actions/song_actions'
import {connect} from 'react-redux'

class SongUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      genre: '',
      imageFile: null,
      imageUrl: "",
      songFile: null,
      songUrl: null,
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCoverart = this.updateCoverart.bind(this);
    this.updateTrack = this.updateTrack.bind(this);
    this.goBack = this.goBack.bind(this);
    this.openCoverartUploadBox = this.openCoverartUploadBox.bind(this);
    this.openSongUploadBox = this.openSongUploadBox.bind(this);

  }


  updateCoverart(e){
    e.preventDefault();
    var file = e.currentTarget.files[1]
    var fileReader = new FileReader();
    var that = this;
    fileReader.onloadend = () => (
      that.setState({imageFile: file, imageUrl: fileReader.result})
    );

    if (file){
      fileReader.readAsDataURL(file);
    };
  }

  updateTrack(e){
    e.preventDefault();
    var file = e.currentTarget.files[0]
    var fileReader = new FileReader();
    var that = this;
    fileReader.onloadend = () => (
      that.setState({songFile: file, songUrl: fileReader.result})
    );

    if (file){
      fileReader.readAsDataURL(file);
    };
    var xhr = new XMLHttpRequest();
      xhr.open("GET", this.state.songUrl);
      xhr.responseType = "arraybuffer";

      xhr.addEventListener("load", function onResponse(progressEvent){
        var waveform = WaveformData.create(progressEvent.target);

        console.log(waveform);
      });

      xhr.send();
    debugger
  }

  goBack(e){
    e.preventDefault()
    console.log("hello")
    this.props.history.goBack();
  }




  handleSubmit(e) {
      e.preventDefault();
      var formData = new FormData();
      formData.append("song[title]", this.state.title)
      formData.append("song[genre]", this.state.genre)
      formData.append("song[cover_art]", this.state.imageFile)
      formData.append("song[track]", this.state.songFile)
      formData.append("song[description]", this.state.description)
      this.props.createSong(formData).then(() => this.props.history.push(`/${this.props.currentUser}/${this.state.title}`))
      this.setState({loading:true})
    }

    update(field) {
      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }

  openCoverartUploadBox(){
    this.imagebutton.click()
    this.imagespoofbutton.style.opacity = '0.5'
    this.imagespoofbutton.innerText = "Update your Cover Art"
    this.imagespoofbutton.style.border = "1px solid black"
  }

  openSongUploadBox(){
    this.songbutton.click()
  }


  updateCoverart(e){
    e.preventDefault();
    var file = e.currentTarget.files[0]
    var fileReader = new FileReader();
    var that = this;
    fileReader.onloadend = () => (
      that.setState({imageFile: file, imageUrl: fileReader.result})
    );


    if (file){
      fileReader.readAsDataURL(file);
    };
  }

  render() {
    let buttontext = `Upload ${this.state.title}`

    let futureurl = `invoke-.herokuapp.com/${this.props.currentUser}/${this.state.title}`


    let headertext;
    headertext = `Add ${this.state.title} to the Invoke database`
    // Include this later

    let imageupload;
    let imagepreview;
    let trackupload;

   imageupload = <input type="file" onChange={this.updateCoverart} className="uploadsong-imageselectbutton" data-buttonText="Upload an image!" ref={input => this.imagebutton = input}/>
   imagepreview =  <img className="uploadsong-imagepreview" src={this.state.imageUrl} />
  //  $(":file").filestyleimage({buttonText: "Choose some coverart", input: false, buttonBefore: true});

   trackupload = <input type="file" onChange={this.updateTrack} className="file-upload-input" data-buttonText="Upload a song!" ref={input => this.songbutton = input} />
  //  $(":file").filestyleimage({buttonText: "Choose a track", input: false, buttonBefore: true});
    // <span>{trackupload}</span>


if (this.state.songFile !== null){
    return (
      <div className="centerer">
      <div className="upload-form-container">
        <div className="upload-div">
          <form onSubmit={this.handleSubmit} className="upload-form-form">
        <div className="form-content">
          <div className="upload-image-section"> {imageupload} <button className="spoof-imageupload" ref={button => this.imagespoofbutton = button} onClick={this.openCoverartUploadBox}>Choose your Cover Art</button> {imagepreview}</div>
            <div className="typing-fields">
              <ul className="upload-list">

                <li className="title"> Title
                <input type="text"
                    value={this.state.title}
                    onChange={this.update('title')}
                    className="upload-input"
                    placeholder="Name your track"
                  />
              </li>

              <li className="future-url">{futureurl}</li>

                <li className="genre"> Genre
                  <input type="text"
                    value={this.state.genre}
                    onChange={this.update('genre')}
                    className="upload-input"
                    placeholder="eg:Rock"
                  />
                </li>

                <li > Description
                  <textarea className="description" rows="6" onChange={this.update('description')} placeholder="Describe your track" >
                  </textarea>
                </li>


              </ul>
              <div className="uploadbuttons">
            <button onClick={this.handleSubmit} className='upload-form-button'>Save</button>
            <button onClick={this.goBack} className="backbutton">Cancel</button>
              </div>
          </div>
        </div>
      </form>
        </div>
      </div>
      </div>
    );
  } else {
    return (
      <div className="upload-file-container">
        <div className="upload-div">
          <h1 className="upload-title">Upload to Invoke</h1>
            {trackupload}
            <button className="upload-spoof-button" onClick={this.openSongUploadBox}>Choose a file to upload</button>
          </div>
      </div>
    )


  }


}

}


const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser.username
  }
};

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    createSong: (song) => dispatch(createSong(song))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongUpload);
