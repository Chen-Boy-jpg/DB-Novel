from models import db
import uuid
from sqlalchemy.dialects.postgresql import UUID
from flask_login import UserMixin

class Novel(db.Model, UserMixin):
    __tablename__ = 'Novel'
    
    # 將 nId 類型改為 UUID，並設置為默認自動生成
    nId = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chapter = db.Column(db.String(10), nullable=False)
    aId = db.Column(UUID(as_uuid=True), db.ForeignKey('Author.aId'), nullable=False)
    desc = db.Column(db.Text)
    nName = db.Column(db.String(20))
    isSubscribe = db.Column(db.Boolean, default=False)

    def to_dict(self):
            return {
                'nId': str(self.nId),  # 返回 mId 轉為字串
                'chapter': self.chapter,
                'aId':self.aId,
                'desc': self.desc,
                'nName': self.nName,
                'isSubscribe':self.isSubscribe,
            }