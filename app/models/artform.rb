class Artform < ActiveRecord::Base
  has_many :users, through :artpieces
end
