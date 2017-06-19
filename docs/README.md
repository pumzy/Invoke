
# Development README for Invoke

_A note: Many of the specifications outlined in this proposal were not designed to be achieved in the allocated two weeks, and may represent post presentation ambitions for this site._

## Minimum Viable Product

_Modelled after Soundcloud.com, this website will allow users to seamlessly listen to their favourite music, as well as upload their original content_

* Hosting on Heroku
* New account creation, login, and guest/demo login
* Song CRUD
* Playing songs with progress bar with continuous play
* User pages
* Comments
* Likes
* Followers
* Playlists
* Wave Forms
* Tags and the discover feature (Using the Echo Nest API)
* History

## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: ./wireframes
[components]: ./component_hierarchy.md
[sample-state]: ./sample_state.md
[api-endpoints]: ./api_endpoints.md
[schema]: ./schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days)

**Objective:** Functioning rails project with working Auth, as well as a basic home page.

### Phase 2: Songs Model, API, and components (1 day)

**Objective:** Songs can be created, read, edited and destroyed through
the API. Use Amazon Web services in order to store songs and to upload them.

### Phase 3: Playing Songs and Song Page and Comments (3 days)

**Objective:**  Songs will have their own show page. Must implement continuous play, as well as enable comments on the song show page. The comments will need their own API. Make the play bar component

### Phase 4: User Pages (2 days)

**Objective:** Users need their own profile pages, which have multiple sections.

### Phase 5: Playlists/Albums (2 days)

**Objective:** Playlist/Album show pages, as well as doing the many to many relationship, and creating the "add to playlist" feature.

### Phase 6: PlayQueue (2 days)

**Objective:** Make songs be able to be played through a list continuously.

## Bonus Features

### Phase 7: Likes, Follows and Reposts (2 days)

**Objective:**  Implement the above features using polymorphic associations.

### Phase 8: Add Wave Forms (1 day)

**Objective:** Get the wave form functionality working.
