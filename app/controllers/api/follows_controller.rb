class Api::FollowsController < ApplicationController
  before_action :set_follow, only: [:show, :edit, :update]

  def index
    @follows = Follow.where(follower_id: current_user.id)
  end


  def show
  end

  def new
    @follow = Follow.new
  end

  def edit
  end

  def indexuser
    @follows = Follow.where(followee_id: params[:userid])
    render :index
  end

  def create
    @follow = Follow.new(follow_params)
    @follow.user_id = current_user.id
      if @follow.save
        render :show
      else
        render json: @follow.errors, status: :unprocessable_entity
      end
  end


  def destroy
    @follow = Follow.find_by(follower_id: current_user.id, followee_id: follow_params[:followee_id])
    if @follow.destroy
      render :show
    else
      render json: @follow.errors, status: :unprocessable_entity
    end
  end

  private
    def set_follow
      @follow = Follow.find(params[:id])
    end

    def follow_params
      params.require(:follow).permit(:followee_id)
    end
end
