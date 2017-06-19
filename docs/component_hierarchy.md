# React Component Hierarchy

## Default Home Page

AuthForm -- Sign in vs Sign up
  * Invoke logo
  * This has to come with the respective buttons, with both buttons being embedded in the background image/logo.
Trending Songs -- Can just use the a broken down version of the charts component for this.
Search Bar



## Logged In Home Page

* StreamContainer  -- This would include:
  * Playlistplay Containers (Different from a playlist container)
  * Songplay Containers
* ChartsContainer -- This would include:
  * This is essentially just a playlist with the top 50 songs, so
  * A Playlist Container, with a number of PlaylistSongPlay Containers. 
* SidebarContainer -- Pass in
  * Who to Follow
    * This will have a number of User widgets (UserWidgetContainer)
  * Recent Likes
    * This will have a number of Song widgets (SongWidgetContainer)
  * HistoryContainer with the current user passed in
* DiscoverContainer -- Pass in
  * The current user
* NavbarContainer -- Pass in
  * The current user
* AudioPlayer Container.


## Artist/User Show Page

* SidebarContainer -- Pass in
  * UserFollowsandFollowersContainer - With the user whose page it is.
    * This will have a number of User widgets (UserWidgetContainer)
  * RecentLikesContainer -- With the user whose page it is.
    * This will have a number of Song widgets (SongWidgetContainer)
  * NumberOfFollowsContainer
  * NumberOfFollowersContainer
* AllContainer
  * A number of Songplay Containers
  * PlaylistPlay Containers
* SongsContainer
  * A number of Songplay Containers
* Playlists/Albums Containers
  * PlaylistPlay Containers -- Can be on All or albums/playlists page
* A number of Songplay Containers
* ProfileHeaderContainer.
* AudioPlayer Container.
* RepostsContainer
  * A number of SongPlay Containers/ Playlistplay Containers
* Follow Button


## Song Show Page
* SidebarContainer -- Pass in
  * RelatedSongsContainer - with the song in question passed in
    * This will have a number of Song widgets (SongWidgetContainer)
  * IncludedPlaylistsContainer -- With the song whose page it is.
    * This will have a number of Playlist widgets (PlaylistWidgetContainer)
  * NumberOfLikesContainer
  * NumberOfRepostsContainer
  * AudioPlayer Container
  * CommentsList Container
  * Artist Widget Container
  * Song Header Container (This needs to include some waveform functionality and a link to the AudioPlayer)
  * NavbarContainer

## Album/Playlist Show Page
* SidebarContainer -- Pass in
  * PlaylistWidgetContainers -- Other playlists/albums by this artist
  * NumberOfLikesContainer
  * NumberOfRepostsContainer
* ArtistWidgetContainer
* Playlist Header Container (This needs to include some waveform functionality and a link to the AudioPlayer)
  * This can potentially draw from the song header container
* AudioPlayer Container.
* Playlist Container
  * This will have a number of PlaylistSongPlay Containers (Without the waveform)
* NavbarContainer


## Upload Container
* NavbarContainer
* UploadForm
  * UploadImage Container (for the album artwork)


## Search
* NavbarContainer
* Depending on the results it will have:
  * Songplay Containers
  * Playlistplay Containers.
  * UserSearchContainers
* SearchSidebar
