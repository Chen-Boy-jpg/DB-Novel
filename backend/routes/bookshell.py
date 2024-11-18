from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user,LoginManager
from models.bookshell import Bookshell
from models import db
import uuid

bookshell_bp = Blueprint('bookshell', __name__)


@bookshell_bp.route('/', methods=['GET'])
def get_bookshells():
    bookshells = Bookshell.query.all()
    bookshells_list = [bookshell.to_dict() for bookshell in bookshells]
    return jsonify({'bookshells': bookshells_list})

@bookshell_bp.route('/new', methods=['POST'])
def add_bookshells()->dict:
    data = request.get_json()  # 從請求中提取 JSON 資料
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # 驗證必填欄位
    required_fields = ['mId']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400
        
    # 為會員生成唯一的 bId
    unique_bId = str(uuid.uuid4())  # 使用 UUID 生成唯一值


    # 建立新的會員物件
    new_bookshell = Bookshell(
        mId=data['mId'],
        bId=unique_bId
    )

    # 新增到資料庫
    try:
        db.session.add(new_bookshell)
        db.session.commit()
        return jsonify({'message': 'Bookshell added successfully!'}), 201
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500


