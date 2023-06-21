from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', img_url="https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-06.jpg")
    mike = User(
        username='Mike', email='mike@aa.io', password='password', img_url="https://www.famousbirthdays.com/headshots/mike-ohearn-5.jpg")
    arnold = User(
        username='Arnold', email='arnold@aa.io', password='password', img_url="https://upload.wikimedia.org/wikipedia/commons/3/33/Arnold_Schwarzenegger_edit%28ws%29.jpg")
    ronny = User(
        username='Ronny', email='ronny@aa.io', password='password', img_url="https://i1.sndcdn.com/artworks-000545587089-49r52b-t500x500.jpg")
    zyzz = User(
        username='Zyzz', email='zyzz@aa.io', password='password', img_url="https://www.greatestphysiques.com/wp-content/uploads/2016/10/1313244294547.jpg")

    db.session.add(demo)
    db.session.add(mike)
    db.session.add(arnold)
    db.session.add(ronny)
    db.session.add(zyzz)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
