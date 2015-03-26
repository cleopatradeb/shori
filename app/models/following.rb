class Following < ActiveRecord::Base
  belongs_to :user

  # VALIDATIONS
  validates_uniqueness_of :user_id, :scope => :follower_id
  validates_uniqueness_of :follower_id, :scope => :user_id
  validate :cannot_follow_self

  private
  def cannot_follow_self
    errors.add(:follower_id, 'You cannot follow yourself!') if follower_id == user_id
  end

end
