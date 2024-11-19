from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user,LoginManager
from models.bookshell import Bookshell
from models import db
import uuid

bookshell_bp = Blueprint('bookshell', __name__)


@bookshell_bp.route('/', methods=['GET'])
def get_bookshells():
   # 从请求中获取 mId
    
    m_id =  request.args.get('mId')  
    print(m_id)

    # 如果没有 mId 参数，返回错误信息
    if not m_id:
        return jsonify({'error': 'mId is required'}), 400

    # 根据 mId 查找相应的数据
    bookshells = Bookshell.query.filter_by(mId=m_id).all()

    # 如果没有找到相关数据
    if not bookshells:
        return jsonify({'message': 'No bookshells found for this mId'}), 404

    # 将查询结果转化为字典并返回
    bookshells_list = [bookshell.to_dict() for bookshell in bookshells]
    return jsonify({'bookshells': bookshells_list})

@bookshell_bp.route('/new', methods=['POST'])
def add_bookshells()->dict:
    data = request.get_json()['data']  
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # 驗證必填欄位
    required_fields = ['mId']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400
        
    # 建立新的會員物件
    new_bookshell = Bookshell(
        mId=data['mId'],
    )

    # 新增到資料庫
    try:
        db.session.add(new_bookshell)
        db.session.commit()
        return jsonify({'message': 'Bookshell added successfully!'}), 201
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500


