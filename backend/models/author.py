from models import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from flask_login import UserMixin

class Author(db.Model, UserMixin):
    __tablename__ = 'Author'
    
    # 將 mId 類型改為 UUID，並設置為默認自動生成
    aId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    aName = db.Column(db.String)
    follower = db.Column(db.Integer)
    
    def to_dict(self):
        return {
            'aId': str(self.aId),  # 返回 mId 轉為字串
            'aName': self.aName,
            'follower': self.follower,
        }