Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :playlists
    resources :songs
    resources :users
    resource :session, only: [:create, :destroy, :show]
  end


  root "static_pages#root"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
