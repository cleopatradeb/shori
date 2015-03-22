class Artform < ActiveRecord::Base
  has_many :artpieces
  has_many :users, through :artpieces
end
