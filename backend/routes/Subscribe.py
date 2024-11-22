from flask import Blueprint, jsonify, request
from models.subscribe import Subscribe
from models.author import Author
from models.member import Member
from models import db
import uuid
subscribe_bp = Blueprint('subscribe', __name__)


def is_valid_uuid(value):
    try:
        uuid.UUID(str(value))
        return True
    except ValueError:
        return False

@subscribe_bp.route('/', methods=['GET'])
def get_Subscribes():
    Subscribes = Subscribe.query.all()
    Subscribes_list = [subscrible.to_dict() for subscrible in Subscribes]
    return jsonify({'Subscribe': Subscribes_list})

#訂閱、解除訂閱
@subscribe_bp.route('/new', methods=['POST'])
def add_Subscribes()->dict:
    data = request.get_json()  # 從請求中提取 JSON 資料
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # # 驗證必填欄位
    # required_fields = ['isSubscribe']
    # for field in required_fields:
    #     if field not in data:
    #         return jsonify({'error': f'Missing field: {field}'}), 400
    
    # 根據 mId 查詢 Member 資料表
    member = Member.query.filter_by(mId=data['mId']).first()
    if not member:
        return jsonify({'error': 'Member not found'}), 404

    # 根據 aId 查詢 Author 資料表
    author = Author.query.filter_by(aId=data['aId']).first()
    if not author:
        return jsonify({'error': 'Author not found'}), 404
    

    existing_subscription = Subscribe.query.filter_by(mId=member.mId, aId=author.aId).first()
    if existing_subscription:
        # 如果存在，將 isSubscribe 更新為 False
        existing_subscription.isSubscribe = not existing_subscription.isSubscribe
        try:
            db.session.commit()
            return jsonify({
                'message': 'Subscription updated to false.',
                'Subscribe': existing_subscription.to_dict()
            }), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    else:
        # 如果不存在，新增新的訂閱紀錄
        new_subscribe = Subscribe(
            mId=member.mId,# 使用查詢到的 mId
            aId=author.aId,
            isSubscribe=data['isSubscribe'],
        )


    # 新增到資料庫
    try:
        db.session.add(new_subscribe)
        db.session.commit()
        return jsonify({'message': 'Subscrible added successfully!', 'Subscrible': new_subscribe.to_dict()}), 201
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500