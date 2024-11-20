from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user,LoginManager
from models.novel import Novel
from models import db
from models.author import Author

novel_bp = Blueprint('novel', __name__)


@novel_bp.route('/', methods=['GET', 'POST'])
def handle_novels():
    if request.method == 'GET':
        # 處理 GET 請求
        novels = Novel.query.all()
        novels_list = [novel.to_dict() for novel in novels]
        print(novels_list)
        return jsonify({'novel': novels_list})
    
    elif request.method == 'POST':
        # 處理 POST 請求
        data = request.get_json()  # 從請求中提取 JSON 資料
        if not data:
            return jsonify({'status': 'error', 'message': 'No input data provided'}), 400

        # 驗證必填欄位
        required_fields = ['chapter','aId', 'desc', 'nName','isSubscribe']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({'status': 'error', 'message': f'Missing fields: {", ".join(missing_fields)}'}), 400


        # 建立新的 novel 物件
        new_novel = Novel(
            chapter=data['chapter'],
            aId=data['aId'],
            desc=data['desc'],
            nName=data['nName'],
            isSubscribe=data['isSubscribe']
        )

        # 新增到資料庫
        try:
            db.session.add(new_novel)
            db.session.commit()
            return jsonify({'status': 'success', 'message': 'Novel added successfully!'}), 201
        except Exception as e:
            db.session.rollback()  # 回滾以防止錯誤
            return jsonify({'status': 'error', 'message': str(e)}), 500
        
@novel_bp.route('/<aName>', methods=['GET'])
def get_novels_by_author(aName):
    try:
        # 1. 利用 aName 查找作者的 aId
        author = Author.query.filter_by(aName=aName).first()
        if not author:
            return jsonify({'status': 'error', 'message': 'Author not found'}), 404

        # 2. 利用 aId 查找小说
        novels = Novel.query.filter_by(aId=author.aId).all()
        if not novels:
            return jsonify({'status': 'error', 'message': 'No novels found for this author'}), 404

        # 3. 返回小说列表
        novels_list = [novel.to_dict() for novel in novels]
        return jsonify({'status': 'success', 'novels': novels_list}), 200

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


