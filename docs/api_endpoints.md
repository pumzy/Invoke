# API Routes

| Path  | Component |
| ------------- | ------------- |
| "/"  | Stream  |
| "/stream"  | LoggedInHomePage > StreamContainer  |
| "/discover"  | LoggedInHomePage > DiscoverContainer  |
| "/charts"  | LoggedInHomePage > ChartsContainer  |
| "/users/:id"  | UserShowPage > AllContainer  |
| "/users/:id/songs"  | UserShowPage > SongsContainer  |
| "/users/:id/albums"  | UserShowPage > PlaylistsContainer  |
| "/users/:id/playlists"  | UserShowPage > PlaylistsContainer  |
| "/users/:id/reposts"  | UserShowPage > RepostsContainer  |
| "/users/:userId/songs/:songId"  | SongShowPage > ArtistWidget(:id)  |
| "/users/:userId/sets/:playlistId"  | PlaylistShowPage > ArtistWidget(:id)  |
| "search"  | Search   |
| "/upload"  | UploadContainer  |
