TEDxPerth::Application.routes.draw do |map|

  namespace :admin do
    root :to => 'dashboard#index'
    resources :users
    resources :pages
    resources :events
  end

  resources :user_session, :path => 'user-sessions'

  resources :password_resets, :path => 'password-resets'

  get   'sign-in',  :to => 'user_sessions#new', :as => :sign_in
  post  'sign-in',  :to => 'user_sessions#create'
  match 'sign-out', :to => 'user_sessions#destroy', :as => :sign_out

  resources :users do
    collection do
      get :welcome
    end
    member do
      post :add_rxp_auth
    end
  end

  resources :events, :only => [:index, :show] do
    member do
      post :withdraw
      post :attending
    end
  end

  get 'contact-us',  :to => 'contacts#new', :as => :contact_us
  post 'contact-us', :to => 'contacts#create'

  root :to => 'pages#index'
  
  get '/:id', :to => "pages#show"

end
