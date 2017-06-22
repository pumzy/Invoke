import React from 'react'

class SongUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      genre: '',
      imageFile: null,
      imageUrl: null,
      songFile: null,
      songUrl: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCoverart = this.updateCoverart.bind(this);
    this.updateTrack = this.updateTrack.bind(this);
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

  updateTrack(e){
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




  handleSubmit(e) {
      e.preventDefault();
      const song = this.state;



      if (this.props.formType === 'login'){
        this.props.login({user})
      } else if (this.props.formType === 'signup'){
        var formData = new FormData();

        if (this.state.imageUrl !== null){
        formData.append("user[username]", this.state.username)
        formData.append("user[password]", this.state.password)
        formData.append("user[avatar]", this.state.imageFile)
        this.props.upload(formData)
        } else {
          formData.append("user[username]", this.state.username)
          formData.append("user[password]", this.state.password)
        this.props.uploadnocover(this.state)
        }
      }
    }


  updateFile(e){
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




}
