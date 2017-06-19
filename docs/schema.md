# Database Schema

## Users

Column Name | Data Type | Additional Details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
username         | string    | not null, unique, indexed
password_digest  | string    | not null
session_token    | string    | not null, unique, indexed
avatar_url       | string    |
preference_arbiter | integer  |  default = 0

## Songs
Column Name | Data Type | Additional Details
------------|-----------|-----------------------
id          | integer   | not null, primary key
track_url   | string    | not null
title       | string    | not null
genre       | string    | not null, will use tags for this.
release_date| date      | not null
user_id   | integer   | not null, foreign key, indexed
cover_art_url   | string    | not null

## Playlists
Column Name | Data Type | Additional Details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
user_id   | integer   | not null, foreign key, indexed
description | string    |
album | boolean    | not null, default = false
tags  | string | (will eventually separate by either spaces)

## Song_Playlist_join_table
Column Name | Data Type | Additional Details
------------|-----------|-----------------------
id          | integer   | not null, primary key
song_id     | integer   | not null, foreign key (references songs), indexed, unique [song_id, playlist_id]
playlist_id | integer   | not null, foreign key (references playlists), indexed

## Comments
Column Name | Data Type | Additional Details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | string    | not null
user_id   | integer   | not null, foreign key , indexed
song_id     | integer   | not null, foreign key , indexed
comment_time | date | not null
created_at | date | not null

## Follows_join_table
Column Name | Data Type | Additional Details
------------|-----------|-----------------------
id          | integer   | not null, primary key
follower_id | integer   | not null, foreign key (references users), indexed
followee_id   | integer   | not null, foreign key (references users), indexed

## Reposts_join_table
Column Name | Data Type | Additional Details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id | integer   | not null, foreign key (references users), indexed
repostable_id  | integer   | not null, foreign key , indexed, unique [repostable_type, repostable_id]
repostable_type | string | not null, foreign key, polymorphic as we want users to be able to repost songs/playlists/ etc.

## Likes
Column Name | Data Type | Additional Details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
user_id          | integer   | not null, foreign key , indexed
likeable_type| string    | not null, foreign key, polymorphic as we want users to be able to like songs/playlists/ etc.
likeable_id   | integer   | not null, foreign key , indexed, unique [likeable_type, likeable_id]
