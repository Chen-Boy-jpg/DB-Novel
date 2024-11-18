from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user,LoginManager
from models.author import Author
from models import db

author_bp = Blueprint('author', __name__)




@author_bp.route('/', methods=['GET'])
def get_authors():
    authors = Author.query.all()
    authors_list = [author.to_dict() for author in authors]
    return jsonify({'authors': authors_list})

@author_bp.route('/new', methods=['POST'])
def add_authors()->dict:
    data = request.get_json()  # 從請求中提取 JSON 資料
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # 驗證必填欄位
    required_fields = [ 'aName', 'follower']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    # 建立新的會員物件
    new_author = Author(
    
        aName=data['aName'],
        follower=data['follower']
    )

    # 新增到資料庫
    try:
        db.session.add(new_author)
        db.session.commit()
        return jsonify({'message': 'Author added successfully!'}), 201
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500
