Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/login' => "sessions#create"
  delete '/logout' => "sessions#destroy"
  get '/profile' => "users#profile"
  get '/userprofile' => "users#userprofile"
  get '/getAllUsers' => "users#getAllUsers"

  resources :users
  resources :monsters

end
