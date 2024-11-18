from flask_login import LoginManager
from flask import jsonify
from models.member import Member  # 確保 Member 正確匯入

def login_init(app):
    login_manager = LoginManager(app)
    login_manager.login_view = 'login'
    login_manager.login_message = "請先登入"

    # 加載用戶
    @login_manager.user_loader
    def load_user(user_id):
        return Member.query.get(user_id)

    # 未經授權處理
    @login_manager.unauthorized_handler
    def custom_unauthorized():
        response = {
            "error": "unauthorized",
            "message": "You must log in to access this resource."
        }
        return jsonify(response), 401