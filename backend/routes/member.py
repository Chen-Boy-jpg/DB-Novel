from flask import Blueprint, jsonify, request
from flask_login import login_user, login_required, current_user,LoginManager,logout_user
from models.member import Member
from models import db

member_bp = Blueprint('member', __name__)




@member_bp.route('/', methods=['GET'])
def get_members():
    members = Member.query.all()
    members_list = [member.to_dict() for member in members]
    return jsonify({'members': members_list})

@member_bp.route('/regiest', methods=['POST'])
def add_members()->dict:
    data = request.get_json()['data']  # 從請求中提取 JSON 資料
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # 驗證必填欄位
    required_fields = [ 'mName', 'gender', 'email', 'birthday','password']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400
    # 檢查會員是否存在    
    member = Member.query.filter_by(email=data['email']).first()
    if  member:
        return jsonify({'error': 'Member has regiested'}), 404
    # 建立新的會員物件
    new_member = Member(
        mName=data['mName'],
        gender=data['gender'],
        email=data['email'],
        password=data['password'],
        birthday=data['birthday']
    )

    # 新增到資料庫
    try:
        db.session.add(new_member)
        db.session.commit()
        return jsonify({'message': 'Member added successfully!'}), 201
    except Exception as e:
        db.session.rollback()  # 回滾以防止錯誤
        return jsonify({'error': str(e)}), 500


@member_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()['data']
    if not data:
        return jsonify({'error': 'No input data provided'}), 400

    # 檢查必填欄位
    required_fields = ['email', 'password']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    # 檢查會員是否存在
    member = Member.query.filter_by(email=data['email']).first()
    if not member:
        return jsonify({'error': 'Member not found'}), 404

    # 假設 Member 類別中有一個 password 屬性來比對密碼
    if member.password != data['password']:
        print(member.password==data['password'])
        return jsonify({'error': 'Invalid password'}), 401

    # 登入並返回成功訊息
    user = Member()
    user.id = member.mId  # 使用 mId 作為用戶的 id
    login_user(user)  # 使用 Flask-Login 來登入用戶

    return jsonify({'message': 'Login successful!'}), 200
@member_bp.route('/logout', methods=['POST'])
@login_required  
def logout():
    logout_user()  
    return jsonify({'message': 'Logout successful!'}), 200


@member_bp.route('/profile', methods=['GET'])
@login_required
def profile():
   
    return jsonify(current_user.to_dict())

