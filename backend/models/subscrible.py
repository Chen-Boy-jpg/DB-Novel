from sqlalchemy import PrimaryKeyConstraint
from models import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from flask_login import UserMixin

class Subscrible(db.Model, UserMixin):
    __tablename__ = 'Subscrible'
    
    # 將 mId 類型改為 UUID，並設置為默認自動生成
    mId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    aId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    isSubscribe = db.Column(db.Boolean)
    __table_args__ = (
        PrimaryKeyConstraint('mId', 'aId'),
    )
    


    
    def to_dict(self):
        return {
            'mId': str(self.mId),  # 返回 mId 轉為字串
            'aId': str(self.aId),  # 返回 nId 轉為字串
            'isSubscribe': self.isSubscribe,
        }