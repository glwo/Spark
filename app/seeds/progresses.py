from app.models import db, User, environment, SCHEMA, progress
from sqlalchemy.sql import text

# Adds sample progress data
def seed_progress():
    demo = User.query.filter_by(username='Demo').first()
    mike = User.query.filter_by(username='Mike').first()

    progress1_demo = progress(
        user=demo,
        progress_date='2022-01-01',
        weight=180,
        body_fat_percentage=20,
        height=170,
        age=25,
        metabolic_age=30
    )
    progress2_demo = progress(
        user=demo,
        progress_date='2022-02-01',
        weight=175,
        body_fat_percentage=18,
        height=170,
        age=26,
        metabolic_age=32
    )
    progress1_mike = progress(
        user=mike,
        progress_date='2022-01-01',
        weight=200,
        body_fat_percentage=15,
        height=180,
        age=30,
        metabolic_age=28
    )
    progress2_mike = progress(
        user=mike,
        progress_date='2022-02-01',
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
