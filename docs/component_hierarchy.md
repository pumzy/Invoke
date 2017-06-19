#React Component Hierarchy

## Default Home Page

AuthForm -- Sign in vs Sign up
  * Invoke logo
  * This has to come with the respective buttons, with both buttons being embedded in the background image/logo.
Trending Songs -- Can just use the a broken down version of the charts component for this.
Search Bar


## Logged In Home Page

* StreamContainer  -- This would include:
  * Playlistplay Containers
  * Songplay Containers
  * Sidebar Container -- Pass in
    * Who to Follow
      * This will have a number of User widgets (UserWidgetContainer)
    * Recent Likes
      * This will have a number of Song widgets (SongWidgetContainer)
    * HistoryContainer with the current user passed in
 * ChartsContainer
