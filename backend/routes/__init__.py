from flask import Blueprint
from routes.member import member_bp

api_bp = Blueprint('api', __name__)
api_bp.register_blueprint(member_bp, url_prefix='/member')
def init_app(app):
    
    app.register_blueprint(api_bp, url_prefix='/api')