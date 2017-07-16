class Api::UsersController < ApplicationController

  # GET /api/users
  # GET /api/users.json
  def index


    if params[:token] == 'All'
      @users = User.all
    elsif params[:token] == 'search'
      @users = User.where("lower(username) LIKE ?", "%#{params[:query].downcase}%")
    else
      @users = []
      followed = Follow.where(follower_id: current_user.id).map {|a| a.followee_id}
      followed.each do |id|
        @users << User.find_by(id: id)
      end
    end
  end

  def show2
    @user = User.find_by(id: params[:id])
    render :show
  end


  # GET /api/users/1
  # GET /api/users/1.json
  def show
    @user = User.find_by(username: params[:id])
    render :show
  end

  # GET /api/users/new
  def new
    @user = User.new
  end

  # GET /api/users/1/edit
  def edit
  end

  # POST /api/users
  # POST /api/users.json
  def create
    @user = User.new(user_params)
      if @user.save
        login(@user)
       render :show
      else
       render json: @user.errors.full_messages, status: 422
      end

  end

  # PATCH/PUT /api/users/1
  # PATCH/PUT /api/users/1.json
  def update
      if @user.update(user_params)
       render :show
      else
        render json: @user.errors, status: :unprocessable_entity
      end
  end

  # DELETE /api/users/1
  # DELETE /api/users/1.json
  def destroy
    @user.destroy
     head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:username, :password, :avatar, :token)
    end
end
