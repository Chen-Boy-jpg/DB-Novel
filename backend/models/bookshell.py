from models import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from flask_login import UserMixin

class Bookshell(db.Model, UserMixin):
    __tablename__ = 'Bookshell'
    
    # 將 mId 類型改為 UUID，並設置為默認自動生成
    bId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    mId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    def to_dict(self):
        return {
            'bId': str(self.bId),  # 返回 bId 轉為字串
            'mId': str(self.mId),  # 返回 mId 轉為字串
        }