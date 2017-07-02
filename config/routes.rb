Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :comments
    resources :playlists
    resources :songs
    resources :users
    resources :likes
    resources :follows
    resources :search, only: [:index]
    get '/users/show2/:id', to: "users#show2"
    get '/songs/show2/:title', to: "songs#show2"
    get '/songs/userfind/:userid', to: "songs#indexuser"
    get '/comments/songfind/:songid', to: "comments#indexsong"
    get '/likes/songfind/:songid', to: "likes#indexsong"
    get '/follows/userfind/:userid', to: "follows#indexuser"
    resource :session, only: [:create, :destroy, :show]
  end


  root "static_pages#root"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
