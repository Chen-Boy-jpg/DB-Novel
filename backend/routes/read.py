from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user,LoginManager
from models.read import Read
from models import db
from datetime import datetime
import uuid


read_bp = Blueprint('read', __name__)


def is_valid_uuid(value):
    try:
        uuid.UUID(str(value))
        return True
    except ValueError:
        return False

@read_bp.route('/', methods=['GET'])
def get_raeds():
    reads = Read.query.all()
    reads_list = [read.to_dict() for read in reads]
    return jsonify({'reads': reads_list})

@read_bp.route('/new', methods=['POST'])
def add_reads()->dict:
    data = request.get_json()  # 從請求中提取 JSON 資料
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # 驗證必填欄位
    required_fields = ['mId','nId','chapter']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400
    
    for field in ['mId' , 'nId']:
        if not is_valid_uuid(data[field]):
            return jsonify({'error': f'Invalid UUID format for {field}.'}), 400
    
    parsed_time = datetime.now()
    formatted_date = parsed_time.strftime("%Y-%m-%d")





    # 建立新的Read紀錄
    new_read = Read(
        mId=data['mId'],
        nId=data['nId'],
        chapter=data['chapter'],
        readTime=formatted_date
    )

    # 新增到資料庫
    try:
        db.session.add(new_read)
        db.session.commit()
        return jsonify({'message': 'Read added successfully!', 'collection': new_read.to_dict()}), 201
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500