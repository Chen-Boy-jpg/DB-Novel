from models import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from flask_login import UserMixin

class Member(db.Model, UserMixin):
    __tablename__ = 'Member'
    
    # 將 mId 類型改為 UUID，並設置為默認自動生成
    mId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    mName = db.Column(db.String(20), nullable=False)
    gender = db.Column(db.String(10))
    email = db.Column(db.String(20))
    password = db.Column(db.String(10))
    birthday = db.Column(db.Date)

    def to_dict(self):
        return {
            'mId': str(self.mId),  # 返回 mId 轉為字串
            'mName': self.mName,
            'gender': self.gender,
            'email': self.email,
            'password': self.password,
            'birthday': self.birthday.strftime('%Y-%m-%d') if self.birthday else None,
        }