class Artpiece < ActiveRecord::Base
  belongs_to :user
  has_one :artform
  has_many :pacts
end
