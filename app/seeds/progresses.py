from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from ..models import Progress

# Adds sample progress data
def seed_progress():
    demo = User.query.filter_by(username='Demo').first()
    mike = User.query.filter_by(username='Mike').first()

    progress1_demo = Progress(
        user=demo,
        progress_date=datetime.strptime('2022-01-01', '%Y-%m-%d'),
        weight=180,
        body_fat_percentage=20,
        height=170,
        age=25,
        metabolic_age=30
    )
    progress2_demo = Progress(
        user=demo,
        progress_date=datetime.strptime('2022-02-01', '%Y-%m-%d'),
        weight=175,
        body_fat_percentage=18,
        height=170,
        age=26,
        metabolic_age=32
    )
    progress1_mike = Progress(
        user=mike,
        progress_date=datetime.strptime('2022-01-01', '%Y-%m-%d'),
        weight=200,
        body_fat_percentage=15,
        height=180,
        age=30,
        metabolic_age=28
    )
    progress2_mike = Progress(
        user=mike,
        progress_date=datetime.strptime('2022-02-01', '%Y-%m-%d'),
        weight=195,
        body_fat_percentage=12,
        height=180,
        age=31,
        metabolic_age=26
    )

    db.session.add(progress1_demo)
    db.session.add(progress2_demo)
    db.session.add(progress1_mike)
    db.session.add(progress2_mike)
    db.session.commit()


def undo_progress():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.progress RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM progress"))

    db.session.commit()
