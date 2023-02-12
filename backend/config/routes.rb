Rails.application.routes.draw do
 get '/pins', to: 'pins#index'
 post '/pins', to: 'pins#create'

 post '/login', to: 'sessions#create'
 delete '/logout', to: 'sessions#destroy'
 post '/register', to: 'users#create'

end
