# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

user1 = User.create!(
  username: 'Coldplay',
  password: 'password',
  avatar: File.open("app/assets/images/coldplay.jpg")
  )

user2 = User.create!(
  username: 'The White Stripes',
  password: 'password',
  avatar: File.open("app/assets/images/The White Stripes.jpg")
  )

user3 = User.create!(
  username: 'The Fray',
  password: 'password',
  avatar: File.open("app/assets/images/thefray.jpg")
  )

user4 = User.create!(
  username: 'Red Hot Chili Peppers',
  password: 'password',
  avatar: File.open("app/assets/images/redhotchilipeppers.jpeg")
  )

user5 = User.create!(
  username: 'Deep Purple',
  password: 'password',
  avatar: File.open("app/assets/images/deeppurple.jpg")
  )

user6 = User.create!(
  username: 'Silversun Pickups',
  password: 'password',
  avatar: File.open("app/assets/images/silversun.jpg")
  )

user7 = User.create!(
  username: 'Fall Out Boy',
  password: 'password',
  avatar: File.open("app/assets/images/falloutboy.jpg")
  )

user8 = User.create!(
  username: 'Eagle-Eye Cherry',
  password: 'password',
  avatar: File.open("app/assets/images/eagleeye.jpg")
  )

user9 = User.create!(
  username: 'Kanye West',
  password: 'password',
  avatar: File.open("app/assets/images/kanye.jpg")
  )

user10 = User.create!(
  username: 'Foo Fighters',
  password: 'password',
  avatar: File.open("app/assets/images/foofighters.jpg")
  )

user11 = User.create!(
  username: 'Rush',
  password: 'password',
  avatar: File.open("app/assets/images/rush.jpg")
  )
user12 = User.create!(
  username: 'Oasis',
  password: 'password',
  avatar: File.open("app/assets/images/oasis.jpg")
  )

user13 = User.create!(
  username: 'Guest',
  password: 'password',
  avatar: File.open("app/assets/images/user.png")
  )

Song.destroy_all

song1 = Song.create!(
  title: 'Wonderwall',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 12,
  track: File.open("app/assets/songs/Wonderwall-26.5-65.2.mp3"),
  cover_art: File.open("app/assets/images/wonderwallcover.jpeg")
  )

song2 = Song.create!(
  title: 'Yellow',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 1,
  track: File.open("app/assets/songs/Yellow.mp3"),
  cover_art: File.open("app/assets/images/Yellow_cover_art.jpg")
  )

song3 = Song.create!(
  title: 'Tom Sawyer',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 11,
  track: File.open("app/assets/songs/Tom Sawyer.mp3"),
  cover_art: File.open("app/assets/images/rushalbum.jpg")
  )


song4 = Song.create!(
  title: 'The Pretender',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 10,
  track: File.open("app/assets/songs/The Pretenders-0-47.mp3"),
  cover_art: File.open("app/assets/images/pretenderalbum.jpg")
  )

song5 = Song.create!(
  title: 'Stronger',
  genre: 'Hip Hop',
  description: "This is a very good song, friends",
  user_id: 9,
  track: File.open("app/assets/songs/Stronger-0-56.1.mp3"),
  cover_art: File.open("app/assets/images/kanyestronger.jpeg")
  )

song6 = Song.create!(
  title: 'Save Tonight',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 8,
  track: File.open("app/assets/songs/Save-Tonight-0-50.4.mp3"),
  cover_art: File.open("app/assets/images/savetonightalbum.jpg")
  )

song7 = Song.create!(
  title: 'Thanks for the memories',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 7,
  track: File.open("app/assets/songs/07 Thanks For The Memories-0-50.1.mp3"),
  cover_art: File.open("app/assets/images/falloutboyinfinity.jpg")
  )

song8 = Song.create!(
  title: 'Lazy Eye',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 6,
  track: File.open("app/assets/songs/Lazy Eye-7.4-62.2.mp3"),
  cover_art: File.open("app/assets/images/silversunalbum.jpg")
  )

song9 = Song.create!(
  title: 'The Adventures of Rain Dance Maggie',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 4,
  track: File.open("app/assets/songs/07 The Adventures of Rain Dance Maggie-0-40.2.mp3"),
  cover_art: File.open("app/assets/images/raindancecover.jpg")
  )

song10 = Song.create!(
  title: 'Smoke on the Water',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 5,
  track: File.open("app/assets/songs/17 Smoke On The Water.mp3"),
  cover_art: File.open("app/assets/images/smokeonthewateralbum.jpg")
  )

song11 = Song.create!(
  title: 'Trouble',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 1,
  track: File.open("app/assets/songs/06 Trouble.mp3"),
  cover_art: File.open("app/assets/images/coldplay-a-rush-of-blood-to-the-head.jpg")
  )

song12 = Song.create!(
  title: 'How to Save a Life',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 3,
  track: File.open("app/assets/songs/03 How To Save A Life-0-50.6.mp3"),
  cover_art: File.open("app/assets/images/Fray-album-ar.jpg")
  )

song13 = Song.create!(
  title: 'Seven Nation Army',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 2,
  track: File.open("app/assets/songs/01 Seven Nation Army.mp3"),
  cover_art: File.open("app/assets/images/The White Stripes.jpg")
  )

song14 = Song.create!(
  title: 'Clocks',
  genre: 'Rock',
  description: "This is a very good song, friends",
  user_id: 1,
  track: File.open("app/assets/songs/01 Clocks (2002).mp3"),
  cover_art: File.open("app/assets/images/coldplay-a-rush-of-blood-to-the-head.jpg")
  )
