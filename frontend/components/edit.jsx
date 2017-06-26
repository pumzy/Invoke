import React from 'react'
import {updateSong} from '../actions/song_actions'
import {fetchSongByTitle} from '../actions/song_actions'
import {connect} from 'react-redux'

class SongUpdate extends React.Component {
  constructor(props){
    super(props);


    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCoverart = this.updateCoverart.bind(this);
    this.goBack = this.goBack.bind(this);
    this.openCoverartUploadBox = this.openCoverartUploadBox.bind(this);
    this.state = {
      title: "",
      description: "",
      genre: "",
      imageFile: null,
      imageUrl: "",
      loading: false
    }


  }

  componentWillReceiveProps(nextProps){
  }

  componentDidMount(){
    // this.imagespoofbutton.style.opacity = '0.5'
    // this.imagespoofbutton.innerText = "Update your Cover Art"
    // this.imagespoofbutton.style.border = "1px solid black"

    this.props.fetchSongByTitle(this.props.match.params.title).then(() => (this.setState({
      title: this.props.song.title,
      description: this.props.song.description,
      genre: this.props.song.genre,
      imageFile: null,
      imageUrl: this.props.song.cover_art_url,
      loading: false
    })))

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
      formData.append("song[description]", this.state.description)
      if (this.props.song.cover_art_url !== this.state.imageUrl){
      formData.append("song[cover_art]", this.state.imageFile)
      }
      this.props.updateSong(formData, this.props.song.id).then(() => this.props.history.push(`/${this.props.currentUser}/${this.state.title}`))
      this.setState({loading:true})
    }

    update(field) {
      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }

  openCoverartUploadBox(){
    this.imagebutton.click()
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
    if (this.props.song){

    let buttontext = `Upload ${this.state.title}`
    let futureurl = `invoke-.herokuapp.com/${this.props.currentUser}/${this.state.title}`
    let headertext;
    let imageupload;
    let imagepreview;
    let trackupload;



   imageupload = <input type="file" onChange={this.updateCoverart} className="uploadsong-imageselectbutton" data-buttonText="Upload an image!" ref={input => this.imagebutton = input}/>
   imagepreview =  <img className="uploadsong-imagepreview" src={this.state.imageUrl} />
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
    return(
      <h1>loading</h1>
    )
  }


}

}


const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    currentUser: state.session.currentUser.username,
    song: state.songs.byTitle[ownProps.match.params.title]
  }
};

const mapDispatchToProps = (dispatch, { location }) => {
  return {
    updateSong: (song, id) => dispatch(updateSong(song, id)),
    fetchSongByTitle: (title) => dispatch(fetchSongByTitle(title))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongUpdate);
