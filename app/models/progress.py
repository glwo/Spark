from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func

class Progress(db.Model):
    __tablename__ = 'progress'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    progress_date = db.Column(db.Date, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    body_fat_percentage = db.Column(db.Integer, nullable=False)
    height = db.Column(db.Integer, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    metabolic_age = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

    user = db.relationship('User', backref='progress')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'progress_date': self.progress_date.isoformat(),
            'weight': self.weight,
            'body_fat_percentage': self.body_fat_percentage,
            'height': self.height,
            'age': self.age,
            'metabolic_age': self.metabolic_age
        }
