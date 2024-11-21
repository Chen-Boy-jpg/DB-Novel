from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user,LoginManager
from models.collection import Collection
from models import db
from datetime import datetime
import uuid


collection_bp = Blueprint('collection', __name__)


def is_valid_uuid(value):
    try:
        uuid.UUID(str(value))
        return True
    except ValueError:
        return False

@collection_bp.route('/', methods=['GET'])
def get_collections():
    collections = Collection.query.all()
    collections_list = [collection.to_dict() for collection in collections]
    return jsonify({'collections': collections_list})

@collection_bp.route('/new', methods=['POST'])
def add_collections()->dict:
    data = request.get_json()  # 從請求中提取 JSON 資料
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # 驗證必填欄位
    required_fields = ['mId','bId','nId','chapter']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400
    
    for field in ['mId', 'bId', 'nId']:
        if not is_valid_uuid(data[field]):
            return jsonify({'error': f'Invalid UUID format for {field}.'}), 400
    
    try:
        parsed_time = datetime.strptime(data['time'], "%Y-%m-%d").date()
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD.'}), 400


    # 建立新的會員物件
    new_collection = Collection(
        mId=data['mId'],
        bId=data['bId'],
        nId=data['nId'],
        chapter=data['chapter'],
        time = parsed_time
    )

    # 新增到資料庫
    try:
        db.session.add(new_collection)
        db.session.commit()
        return jsonify({'message': 'Collection added successfully!', 'collection': new_collection.to_dict()}), 201
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500
    
@collection_bp.route('/delete', methods=['DELETE'])
def delete_collection():
    # 從請求中提取 JSON 資料
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # 檢查必填欄位是否存在
    required_fields = ['mId', 'nId']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    # 驗證 UUID 格式
    for field in required_fields:
        if not is_valid_uuid(data[field]):
            return jsonify({'error': f'Invalid UUID format for {field}.'}), 400

    # 查詢該筆紀錄
    collection = Collection.query.filter_by(
        mId=data['mId'],
        nId=data['nId']
    ).first()

    # 如果找不到紀錄
    if not collection:
        return jsonify({'error': 'Collection not found.'}), 404

    # 刪除該紀錄
    try:
        db.session.delete(collection)
        db.session.commit()
        return jsonify({'message': 'Collection deleted successfully!'}), 200
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500
    
@collection_bp.route('/bookshell_data', methods=['GET'])
def get_bookshell_data():
    # 從請求中提取參數
    m_id = request.args.get('mId')

    if not m_id:
        return jsonify({'error': 'mId is required.'}), 400

    # 驗證 UUID 格式
    if not is_valid_uuid(m_id):
        return jsonify({'error': 'Invalid UUID format for mId.'}), 400

    # 查詢對應的 collection 資料
    collections = Collection.query.filter_by(mId=m_id).all()

    if not collections:
        return jsonify({'message': 'No books found for the provided mId.'}), 404

    # 將結果轉換為字典
    books_data = [{'nId': col.nId, 'chapter': col.chapter} for col in collections]
    return jsonify({'books': books_data}), 200
    