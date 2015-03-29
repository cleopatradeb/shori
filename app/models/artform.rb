class Artform < ActiveRecord::Base
  has_many :artpieces
  has_many :users, through: :artpieces
  has_many :pacts, through: :artpieces
end
