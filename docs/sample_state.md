```js
{
  session: {
    currentUser: {
      id: 1,
      username: "bob"
    },
    errors: []
  },
  users: {
    1: {
      id: 2,
      username: "bob2",
      avatar_url: "coolpicture.com",
      followers: {
        1: {
          id: 1,
          username: "bob"
        }
      },
      preference_arbiter: 0.05
    }
  }
  songs: {
    1: {
      id: 4,
      title: "Odovician Dreams",
      user_id: 3,
      artist: "Aftermath",
      genre: "Post Rock",
      track_url: 'toounderground4u.com',
      cover_art_url: 'thecoolestbandever.org',
      likes: {
        1: {
          id: 12,
          user_id: 19
        }
      },
      comments: {
        1 : {
          id: 17,
          user_id: 4,
          body: "Damn yo, awesome song",
          comment_time: 63,
          created_at: 07/08/2015
        }
      }
    }
  },
  playlists: {
    1: {
      title: "This is cool music, friends!",
      user_id: 5,
      album: false,
      tags: "hip,cool",
      description: "Check out my super duper cool music",
      songs: {
        1: {
          title: "Odovician Dreams",
          user_id: 3,
          artist: "Aftermath",
          genre: "Post Rock",
          track_url: 'toounderground4u.com',
          cover_art_url: 'thecoolestbandever.org',
          likes: {
            1: {
              id: 12,
              user_id: 19,
            }
          }
        },
        2: {
          title: "Lazy Eye",
          user_id: 17,
          artist: "Silversun Pickups",
          genre: "Indie",
          track_url: 'toounderground5u.com',
          cover_art_url: 'chillvibes.org',
          Album: {
            id: 45,
            title: "Carnavas"
            ...
          },
          likes: {
            1: {
              id: 1,
              user_id: 1,
            }
            2: {
              id: 90,
              user_id: 39
            }
          }
        },
        likes: {
          1: {
            id: 1000,
            user_id: 14
          }
        }
      }
    }
  }
}
```
