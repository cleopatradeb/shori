class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :artpieces
  has_many :artforms, through :artpieces
  has_and_belongs_to_many :matches
  has_and_belongs_to_many :pacts
end
