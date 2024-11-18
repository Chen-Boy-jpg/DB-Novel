from flask import Flask,jsonify
from config import Config
from models import db
from routes import init_app
from flask_login import LoginManager
from models.member import Member
from routes.login_init import login_init  # 更新路徑
# 建立 Flask 應用程式
app = Flask(__name__)
app.config.from_object(Config)

# 初始化資料庫
db.init_app(app)

# 初始化路由
init_app(app)

# 初始化登入管理器
login_init(app)

# 初始化資料表結構
with app.app_context():
    db.create_all()

# 啟動伺服器
if __name__ == '__main__':
    app.run(debug=True)