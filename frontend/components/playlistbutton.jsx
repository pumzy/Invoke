import Modal from './modal'
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {createPlaylist, addSongToPlaylist, fetchPlaylistsByUserID, removePlaylists, removeSongFromPlaylist, removePlaylist} from '../actions/playlist_actions'



class PlaylistButton extends React.Component   {
  constructor(props){
    super(props)
    this.state = { modalOpen: false, title: "", description: "", addsection: true, createsection: false, filter: ""}
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.close = this.close.bind(this)
    this.createModal = false
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleform = this.toggleform.bind(this);
    this.addSong = this.addSong.bind(this)
    this.removeSong = this.removeSong.bind(this)



    // Errors may be caused by binding close
    // Basically keep retreiving playlists until it is done, and set this.props.playlist to the songs in the last playlist?
    // But when you click the add playlist button, this basically means that they do not show the existing tracks of the playlist that you add it to.
  }

  componentDidMount(){

  }

  openModal() {
    this.setState({ modalOpen: true })
    this.props.fetchPlaylistsByUserID(this.props.currentUser.id)

  }

  closeModal() {
    this.setState({ modalOpen: false })

  }

  addSong(pl){
    this.props.addSongToPlaylist(this.props.song.id, pl.id)


  }

  removeSong(pl){
    this.props.removeSongFromPlaylist(this.props.song.id, pl.id)

  }


    update(field) {
      return e => this.setState({
        [field]: e.currentTarget.value
      });
    }


  close(e) {
    e.preventDefault()
    this.setState({ modalOpen: false})
    this.props.removePlaylists()
  }

  componentWillUnmount(){

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPlaylist({title: this.state.title, description: this.state.description}).then(response => {
      this.props.addSongToPlaylist(this.props.song.id, response.playlist.id)
    })
    this.setState({addsection: true, createsection: false})
    $('#modal-playlist-add-header').addClass('modal-playlist-header-active')
    $('#modal-playlist-create-header').removeClass('modal-playlist-header-active')
  }

  toggleform(e){
    if (this.state.addsection === true && e.target.id === "modal-playlist-create-header"){
      this.setState({addsection: false, createsection: true})
      $('#modal-playlist-create-header').addClass('modal-playlist-header-active')
      $('#modal-playlist-add-header').removeClass('modal-playlist-header-active')
    } else if(this.state.createsection === true && e.target.id === "modal-playlist-add-header") {
      this.setState({addsection: true, createsection: false})
      $('#modal-playlist-add-header').addClass('modal-playlist-header-active')
      $('#modal-playlist-create-header').removeClass('modal-playlist-header-active')
    }
  }



  render(){
    if(this.props.currentUser.playlistnum === 0){
      this.createModal = true
    }

    let formComponent;
    let formheader;

    if (this.createModal === true){
    formheader =   <div className='playlist-form-heading-div'>
                      <h3 className='playlist-form-header'>Create a Playlist</h3>
                    </div>
    } else {
    formheader =  <div className='playlist-form-heading-div'>
                    <ul className='playlist-form-header-ul'>
                      <li className='pfhul modal-playlist-header-active' id='modal-playlist-add-header' onClick={this.toggleform}> Add to Playlist </li>
                      <li className='pfhul' id='modal-playlist-create-header' onClick={this.toggleform}> Create a playlist</li>
                    </ul>
                  </div>
        }



    if (this.createModal === true || this.state.createsection === true){

      formComponent =
      <div >

        <div className='rest-of-playlist-form'>
          <div className='create-playlist-textfield'>
            <span className='playlist-title-span'>Playlist Title<span className='required-field-asterisk'> *</span></span>
            <input type="text" onChange={this.update('title')} value={this.state.title} className='create-playlist-input-title' />
          </div>
            <div className='create-playlist-textfield'>
              <span className='playlist-title-span'>Description (Optional)</span>
              <input onChange={this.update('description')} value={this.state.description} type="text" className='create-playlist-input-description' />
            </div>
            <div className='playlist-songs-form'>
              <ul className='playlist-songs-form-ul'>
                <li className='playlist-songs-form-ul-li'>
                  <div className='psfui-image'>
                    <img src={this.props.song.cover_art_url}></img>
                  </div>
                  <div className='psfui-info'>
                    <span className='psfui-infou'>{this.props.song.user.username} -</span>
                    <span className='psfui-infot'>{this.props.song.title}</span>
                  </div>
                </li>
                <li className='playlist-songs-form-ul-li'></li>
                <li className='playlist-songs-form-ul-li'></li>
                <li className='playlist-songs-form-ul-li'></li>
              </ul>
            </div>
          </div>
          <button onClick={this.handleSubmit} className='submit-playlist-button'>Save</button>
        </div>
      } else {

        if (this.props.possiblePlaylists.length > 0){

          let searchHash = {}

          let searchRes = this.props.possiblePlaylists.forEach(playlist =>{


            if (playlist.title.includes(this.state.filter)){
              searchHash[playlist.id] = playlist
            }
          })

          let searchLis = Object.values(searchHash).map(pl => {
            let addbutton = <button className='add-to-playlist-modal-button' onClick={() => this.addSong(pl)}> Add To Playlist</button>
            let addedbutton = <button className='remove-from-playlist-modal-button' onClick={() => this.removeSong(pl)}>Added</button>
            return  <li className='playlist-modal-filter-ul-li'>
                      <img src={pl.playlist_songs[0] ? pl.playlist_songs[0].cover_art_url: pl.user.avatar_url}></img>
                      <div className='pmfiulai'>
                        <span className='pmfiulau'>{pl.title}</span>
                        <div className='track-count-playlist-modal'><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgMTJoMnY0SDV6TTIxIDEyaDJ2NGgtMnpNMTcgMTBoMnY4aC0yek05IDhoMnYxMkg5ek0xMyA1aDJ2MThoLTJ6Ii8+PC9zdmc+"></img><span className='pmfiulst'>{pl.playlist_songs.length}</span></div>
                      </div>
                      {pl.playlist_songs.map(song => song.title).includes(this.props.song.title) ? addedbutton : addbutton }
                    </li>
          })






          formComponent = <div className='rest-of-playlist-form'>
            <input className='playlist-modal-filter-input' type='text' placeholder='Filter playlists' onChange={this.update('filter')} value={this.state.filter}></input>
              <ul className='playlist-modal-filter-ul'>
                {searchLis.slice(0,5)}
              </ul>
          </div>
        }
      }









    let backdrop;
    if (this.state.modalOpen === true ){
      backdrop = <div className='modal-backdrop' onClick={e => this.close(e)}/>
    }

      return(
        <div className='playlist-button'>
          <button id='add-to-playlist-button' onClick={() => this.openModal()} ></button>
          <Modal isOpen={this.state.modalOpen} onClose={(e) => this.close(e)} >
            {formheader}
            {formComponent}
          </Modal>
          {backdrop}
        </div>
      )
    }

}


  const mapStateToProps = (state) => {
    return { currentUser: state.session.currentUser,
             possiblePlaylists: state.playlists.allplaylists,
             byTitle: state.playlists.byTitle
          }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
      addSongToPlaylist: (songid, id) => dispatch(addSongToPlaylist(songid, id)),
      fetchPlaylistsByUserID: (id) => dispatch(fetchPlaylistsByUserID(id)),
      removePlaylists: () => dispatch(removePlaylists()),
      removeSongFromPlaylist : (songid, id) => dispatch(removeSongFromPlaylist(songid, id)),
      removePlaylist: (playlist) => dispatch(removePlaylist(playlist))
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(PlaylistButton);
