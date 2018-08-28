class MonstersController < ApiController
  before_action :require_login, except: [:index, :show]

  def index
    monsters = Monster.all
    render json: {monsters: monsters}
  end  

  def show
    monster = Monster.find(params[:id])
    render json: {monster: monster}
  end  

  def create
    monster = Monster.new(monster_params)
    monster.user = current_user
    if monster.save
      render json: {
        message: 'ok',
        monster: monster
      }
    else
      render json:{
        message: 'Could Not Create Monster'
      }  
    end
  end 
  
  private
    def monster_params
      params.require(:monster).permit(:name, :description)
    end  

end
