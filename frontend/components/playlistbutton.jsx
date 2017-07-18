import Modal from './modal'
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'



class PlaylistButton extends React.Component   {
  constructor(props){
    super(props)
    this.state = { modalOpen: false}
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.close = this.close.bind(this)
    // Errors may be caused by binding close
  }

  openModal() {
    this.setState({ modalOpen: true })
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }


  close(e) {
    e.preventDefault()
    this.setState({ modalOpen: false})
  }



  render(){
    let backdrop;
    if (this.state.modalOpen === true ){
      backdrop = <div className='modal-backdrop' onClick={e => this.close(e)}/>
    }

    return(
      <div className='playlist-button'>
        <button id='add-to-playlist-button' onClick={() => this.openModal()} ></button>
        <Modal isOpen={this.state.modalOpen} onClose={(e) => this.close(e)} >
          <div className='playlist-form-heading-div'>
            <h3 className='playlist-form-header'>Create a Playlist</h3>
          </div>
          <div className='rest-of-playlist-form'>
            <div className='create-playlist-textfield'>
              <span className='playlist-title-span'>Playlist Title</span>
              <input type="text" className='create-playlist-input-title' />
            </div>
              <div className='create-playlist-textfield'>
                <span className='playlist-title-span'>Description (Optional)</span>
                <input type="text" className='create-playlist-input-description' />
              </div>
            </div>
            <button type='submit' className='submit-playlist-button'>Save</button>
        </Modal>
        {backdrop}
      </div>
    )
  }
}


  const mapStateToProps = (state) => {
    return { currentUser: state.session.currentUser  }
  }

  const mapDispatchToProps = (dispatch) => {
    return {

    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(PlaylistButton);
