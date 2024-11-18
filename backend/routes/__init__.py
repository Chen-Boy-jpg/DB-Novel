from flask import Blueprint
from routes.member import member_bp
from routes.novel import novel_bp
from routes.author import author_bp

api_bp = Blueprint('api', __name__)
api_bp.register_blueprint(member_bp, url_prefix='/member')
api_bp.register_blueprint(novel_bp, url_prefix='/novel')
api_bp.register_blueprint(author_bp, url_prefix='/author')
def init_app(app):
    
    app.register_blueprint(api_bp, url_prefix='/api')