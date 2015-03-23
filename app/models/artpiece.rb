class Artpiece < ActiveRecord::Base
  belongs_to :user
  belongs_to :artform
  has_many :pacts
end
