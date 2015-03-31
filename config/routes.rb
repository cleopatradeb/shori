Rails.application.routes.draw do  resources :artforms
  devise_for :users
  get 'shori/gallery/:id' => 'static#index', as: 'gallery'
  get 'shori/venue/:id' => 'static#index', as: 'venue'
  get 'shori/artpiece/:id' => 'static#index', as: 'artpiece'
  get "/" => redirect("/shori/home")
  get "/users" => redirect("/shori/dashboard")
  get '/shori/*path' => 'static#index'
  root 'static#index'
  get '/shori/home' => 'static#index', as: 'home'
  get '/shori/dashboard' => 'static#index', as: 'dashboard'
  get 'users/user_data' => 'users#user_data'
  get 'pacts/pacts_data' => 'pacts#pacts_data'
  get 'artpieces/artpieces_data' => 'artpieces#artpieces_data'
  get 'artpieces/buy_art' => 'artpieces#buy_art'
  resources :artpieces
  resources :followings
  resources :artforms
  resources :pacts
  resources :pacts_users

end
