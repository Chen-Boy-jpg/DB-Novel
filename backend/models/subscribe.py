from sqlalchemy import PrimaryKeyConstraint
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from models import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from flask_login import UserMixin

class Subscribe(db.Model, UserMixin):
    __tablename__ = 'Subscribe'
    
    # mId 和 aId 沒有必要設定default=uuid.uuid4 ，因為這些字為外鍵，從關聯實體繼承。不用default
    mId = db.Column(UUID(as_uuid=True), ForeignKey('Member.mId'), primary_key=True)
    aId = db.Column(UUID(as_uuid=True), ForeignKey('Author.aId'), primary_key=True)
    isSubscribe = db.Column(db.Boolean)
    __table_args__ = (
        PrimaryKeyConstraint('mId', 'aId'),
    )
    # 關聯到 Member 和 Author
    member = relationship('Member', backref='subscriptions', foreign_keys=[mId])
    author = relationship('Author', backref='subscribers', foreign_keys=[aId])


    
    def to_dict(self):
        return {
            'mId': str(self.mId),  # 返回 mId 轉為字串
            'aId': str(self.aId),  # 返回 nId 轉為字串
            'isSubscribe': self.isSubscribe,
        }