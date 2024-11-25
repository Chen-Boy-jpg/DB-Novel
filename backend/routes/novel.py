from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user,LoginManager
from models.novel import Novel
from models import db
from models.author import Author
import uuid
from models.collection import Collection

novel_bp = Blueprint('novel', __name__)

def is_valid_uuid(value):
    try:
        uuid.UUID(str(value))
        return True
    except ValueError:
        return False

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
        data = request.get_json()['data']  # 從請求中提取 JSON 資料
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


@novel_bp.route('/delete', methods=['DELETE'])
def delete_novel():
    # 從請求中提取 JSON 資料
    nId = request.args.get('nId')  
    chapter = request.args.get('chapter')
    if not nId or not chapter:
        return jsonify({'error': 'Both nId and chapter are required.'}), 400
    
    if not is_valid_uuid(nId):
        return jsonify({'error': 'Invalid UUID format for nId.'}), 400

    novel = Novel.query.filter_by(nId=nId, chapter=chapter).first()

    # 如果找不到紀錄
    if not novel:
        return jsonify({'error': 'Novel not found.'}), 404

    # 刪除該紀錄
    collections = Collection.query.filter_by(nId=nId, chapter=chapter).all()
    try:
        for collection in collections:
            db.session.delete(collection)
        db.session.delete(novel)
        db.session.commit()
        return jsonify({'message': 'Novel deleted successfully!'}), 200
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500


@novel_bp.route('/put', methods=['PUT'])
def put_novel():
    # 從查詢參數中提取 nId 和 chapter
    nId = request.args.get('nId')  
    chapter = request.args.get('chapter')

    # 驗證 nId 和 chapter 是否存在
    if not nId or not chapter:
        return jsonify({'error': 'Both nId and chapter are required.'}), 400
    
    # 驗證 UUID 格式
    if not is_valid_uuid(nId):
        return jsonify({'error': 'Invalid UUID format for nId.'}), 400

    # 從請求中提取 JSON 資料
    data = request.get_json()['data']
    if not data:
        return jsonify({'error': 'No input data provided.'}), 400

    # 查詢記錄
    novel = Novel.query.filter_by(nId=nId, chapter=chapter).first()

    # 如果找不到記錄
    if not novel:
        return jsonify({'error': 'Novel not found.'}), 404

    # 更新記錄
    try:
        # 根據請求資料更新欄位，以下是假設更新 title 和 content
        novel.desc = data.get('desc', novel.desc)  # 如果資料有提供 title，則更新；否則保持原值
        novel.nName = data.get('nName', novel.nName)

        db.session.commit()  # 提交更改
        return jsonify({'message': 'Novel updated successfully!'}), 200
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500
