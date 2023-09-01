from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, FloatField, SelectField
from wtforms.validators import DataRequired, ValidationError, URL, Length

class ProgressForm(FlaskForm):
    progress_date= StringField('Progress Date', validators=[DataRequired()])
    weight= IntegerField('Weight (lbs)', validators=[DataRequired()])
    body_fat_percentage= IntegerField('Body Fat %', validators=[DataRequired()])
    height= IntegerField('Height (cm)', validators=[DataRequired()])
    age= IntegerField('Age', validators=[DataRequired()])
    metabolic_age= IntegerField('Metabolic Age', validators=[DataRequired()])
