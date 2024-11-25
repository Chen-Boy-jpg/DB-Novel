from functools import wraps

def super_admin_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated or not current_user.is_super_admin:
            return jsonify({'error': 'Forbidden: Super Admins only'}), 403
        return func(*args, **kwargs)
    return decorated_function