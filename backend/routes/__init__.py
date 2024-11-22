from flask import Blueprint
from routes.member import member_bp
from routes.novel import novel_bp
from routes.author import author_bp
from routes.bookshell import bookshell_bp
from routes.collection import collection_bp
from routes.read import read_bp
from routes.Subscribe import subscribe_bp

api_bp = Blueprint('api', __name__)
api_bp.register_blueprint(member_bp, url_prefix='/member')
api_bp.register_blueprint(novel_bp, url_prefix='/novel')
api_bp.register_blueprint(author_bp, url_prefix='/author')
api_bp.register_blueprint(bookshell_bp, url_prefix='/bookshell')
api_bp.register_blueprint(collection_bp, url_prefix='/collection')
api_bp.register_blueprint(read_bp, url_prefix='/read')
api_bp.register_blueprint(subscribe_bp, url_prefix='/subscribe')




def init_app(app):
    
    app.register_blueprint(api_bp, url_prefix='/api')