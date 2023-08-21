from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Progress
from app.forms import progress_form

progress_routes = Blueprint('progress', __name__)

@progress_routes.route('/')
def get_all_progress():
    """
    Query all progress entries for the current user and return them in a list of progress dictionaries
    """
    progress_entries = Progress.query.all()
    return {"progress_entries": [progress_entry.to_dict() for progress_entry in progress_entries]}

@progress_routes.route('/', methods=["POST"])
@login_required
def create_progress():
    """
    Create a new progress entry for the current user and return that entry in a dictionary
    """
    form = progress_form()
    form['csrf_token'].data = request.cookies['csrf_token']
    # Add and commit new business
    if form.validate_on_submit():
        newProgress = Progress(
        user_id = current_user.id,
        progress_date = form.data['progress_date'],
        weight = form.data['weight'],
        body_fat_percentage = form.data['body_fat_percentage'],
        height = form.data['height'],
        age = form.data['age'],
        metabolic_age = form.data['metabolic_age']
        )
        db.session.add(newProgress)
        db.session.commit()

        return newProgress.to_dict(), 201

@progress_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_progress(id):
    """
    Update a progress entry of the current user and return that entry in a dictionary
    """
    data = request.json
    progress_entry = Progress.query.filter_by(id=id, user_id=current_user.id).first()
    if not progress_entry:
        return {"Error": "Progress entry not found"}, 404

    progress_entry.progress_date = data['progress_date']
    progress_entry.weight = data['weight']
    progress_entry.body_fat_percentage = data['body_fat_percentage']
    progress_entry.height = data['height']
    progress_entry.age = data['age']
    progress_entry.metabolic_age = data['metabolic_age']

    db.session.commit()
    return progress_entry.to_dict(), 200

@progress_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_progress(id):
    """
    Delete a progress entry of the current user
    """
    progress_entry = Progress.query.filter_by(id=id, user_id=current_user.id).first()
    if not progress_entry:
        return {"Error": "Progress entry not found"}, 404

    db.session.delete(progress_entry)
    db.session.commit()
    return {'Message': 'The progress entry has been deleted!'}, 200
