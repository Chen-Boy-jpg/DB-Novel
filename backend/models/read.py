from models import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from flask_login import UserMixin

class Read(db.Model, UserMixin):
    __tablename__ = 'Read'
    
    # 將 mId 類型改為 UUID，並設置為默認自動生成
    mId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chapter = db.Column(db.String)
    readTime = db.Column(db.Date)
    star = db.Column(db.INT)


    
    def to_dict(self):
        return {
            'mId': str(self.mId),  # 返回 mId 轉為字串
            'nId': str(self.mId),  # 返回 nId 轉為字串
            'chapter': self.chapter,
            'readTime': self.readTime,
            'star': self.star
        }