from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user,LoginManager,logout_user
from models.subscrible import Subscrible
from models import db
import uuid
subscrible_bp = Blueprint('Subscrible', __name__)


def is_valid_uuid(value):
    try:
        uuid.UUID(str(value))
        return True
    except ValueError:
        return False

@subscrible_bp.route('/', methods=['GET'])
def get_subscribles():
    subscribles = Subscrible.query.all()
    subscribles_list = [subscrible.to_dict() for subscrible in subscribles]
    return jsonify({'Subscrible': subscribles_list})

@subscrible_bp.route('/new', methods=['POST'])
def add_subscribles()->dict:
    data = request.get_json()  # 從請求中提取 JSON 資料
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # 驗證必填欄位
    required_fields = ['isSubscribe']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400
    
    for field in ['mId' , 'nId']:
        if not is_valid_uuid(data[field]):
            return jsonify({'error': f'Invalid UUID format for {field}.'}), 400
    


    # 建立新的subscrible紀錄
    new_subscrible = Subscrible(
        isSubscribe=data['isSubscribe'],
        
    )

    # 新增到資料庫
    try:
        db.session.add(new_subscrible)
        db.session.commit()
        return jsonify({'message': 'Subscrible added successfully!', 'collection': new_subscrible.to_dict()}), 201
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500