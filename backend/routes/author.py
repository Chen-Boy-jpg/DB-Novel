from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user,LoginManager
from models.author import Author
from models import db
from sqlalchemy import func
from models.novel import Novel

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
    required_fields = [ 'aName',]
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400
        
    existing_author = Author.query.filter_by(aName=data['aName']).first()
    if existing_author:
        return jsonify({'error': f'Author with aName "{data["aName"]}" already exists.'}), 409

    # 建立新的會員物件
    new_author = Author(
    
        aName=data['aName'], 
    )

    # 新增到資料庫
    try:
        db.session.add(new_author)
        db.session.commit()
        author = Author.query.filter_by(aName=data['aName']).first()
        return jsonify({'message': 'Author added successfully!',"data":author.to_dict()}), 201
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500


@author_bp.route('/count', methods=['GET'])
def get_authors_with_novel_counts():
    # 查询并计算每个作者的小说数量
    results = (
        db.session.query(Author, func.count(Novel.nId).label('novel_count'))
        .outerjoin(Novel, Author.aId == Novel.aId)
        .group_by(Author.aId)
        .all()
    )

    # 整理数据为字典列表
    authors_data = [
        {
            'aId': str(author.aId),
            'aName': author.aName,
            'follower': author.follower,
            'novel_count': novel_count
        }
        for author, novel_count in results
    ]

    return jsonify(authors_data), 200