Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :comments
    resources :playlists
    resources :songs
    resources :users
    get '/users/show2/:id', to: "users#show2"
    get '/songs/show2/:title', to: "songs#show2"
    get '/songs/userfind/:userid', to: "songs#indexuser"
    resource :session, only: [:create, :destroy, :show]
  end


  root "static_pages#root"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
