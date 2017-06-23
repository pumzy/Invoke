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
      songUrl: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCoverart = this.updateCoverart.bind(this);
    this.updateTrack = this.updateTrack.bind(this);
  }


  updateCoverart(e){
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
    var file = e.currentTarget.files[0]
    var fileReader = new FileReader();
    var that = this;
    fileReader.onloadend = () => (
      that.setState({songFile: file, songUrl: fileReader.result})
    );

    if (file){
      fileReader.readAsDataURL(file);
    };
  }




  handleSubmit(e) {
      e.preventDefault();
      var formData = new FormData();
      formData.append("song[title]", this.state.title)
      formData.append("song[genre]", this.state.genre)
      formData.append("song[cover_art]", this.state.imageFile)
      formData.append("song[track]", this.state.songFile)
      this.props.createSong(formData)
    }

    update(field) {
      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }



  updateCoverart(e){
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


    let headertext;
    headertext = `Add ${this.state.title} to the Invoke database`

    let imageupload;
    let imagepreview;
    let trackupload;

   imageupload = <input type="file" onChange={this.updateCoverart} className="filestyleimage" data-buttonText="Upload an image!" />
   imagepreview =  <img className="uploadsong-imagepreview" src={this.state.imageUrl} />
  //  $(":file").filestyleimage({buttonText: "Choose some coverart", input: false, buttonBefore: true});

   trackupload = <input type="file" onChange={this.updateTrack} className="filestyleimage" data-buttonText="Upload an image!" />
  //  $(":file").filestyleimage({buttonText: "Choose a track", input: false, buttonBefore: true});

    return (
      <div className="upload-form-container">

        <form onSubmit={this.handleSubmit} className="upload-form-form">
        <h2>{headertext}</h2>
          <div className="upload-form">
            <span>{trackupload}</span>
            <br/>
            <input type="text"
                value={this.state.title}
                onChange={this.update('title')}
                className="upload-input"
                placeholder="Song Title"
              />
            <br/>
            <br/>
              <input type="text"
                value={this.state.genre}
                onChange={this.update('genre')}
                className="upload-input"
                placeholder="Song Genre"
              />
            <br/>
            <span className="imagepreviewonform"> {imageupload} {imagepreview}</span>
            <br />
            <button onClick={this.handleSubmit} className='upload-form-button'>{buttontext}</button>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = ({ session }) => {
  return {
    loggedIn: Boolean(session.currentUser),
    errors: session.errors,
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
