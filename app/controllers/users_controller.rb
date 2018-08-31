class UsersController < ApiController
  before_action :require_login, except: [:create]

  def create
    user = User.create!(user_params)
    render json: {token: user.auth_token}
  end

  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    user_monsters = user.monsters
    render json: {user: {username: user.username, email: user.email, name: user.name, admin: user.admin}, monsters:
     user_monsters}
  end

  def userprofile
    user = User.find_by_auth_token!(request.headers[:token])
    user_monsters = user.monsters
    render json: {user: {username: user.username, email: user.email, name: user.name, admin: user.admin}}
  end

  def getAllUsers
    users = User.all.where(admin: false)
    render json: {users: users}
  end 

  def destroy
    User.destroy(params[:id])
  end 

  def update
    user = User.find(params[:id])
    user.update_attributes(user_params)
    render json: user
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :name)
  end  
end
