NoragamiAdverts::Application.routes.draw do
	root 'static_pages#home'
	get "static_pages/home"

	resources :notices, controller: 'adverts', only: [:index, :create, :show]
end
