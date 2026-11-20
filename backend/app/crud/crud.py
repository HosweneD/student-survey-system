from sqlalchemy.orm import Session
from app.models.models import Survey, Vote, Participation, User
from app.schemas.schemas import UserCreate
from app.schemas.schemas import SurveyCreate, SurveyUpdate
from app.models.models import Question, AnswerOption
from passlib.context import CryptContext
from sqlalchemy import func

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_surveys(db: Session):
    return db.query(Survey).all()

def get_survey(db: Session, survey_id: int):
    return db.query(Survey).filter(Survey.id == survey_id).first()

def create_survey(db: Session, survey_data: SurveyCreate):
    db_survey = Survey(title=survey_data.title, description=survey_data.description)

    for q in survey_data.questions:
        db_question = Question(text=q.text, allow_multiple=q.allow_multiple)
        for o in q.options:
            db_question.options.append(AnswerOption(text=o.text))
        db_survey.questions.append(db_question)

    db.add(db_survey)
    db.commit()
    db.refresh(db_survey)
    return db_survey

def update_survey(db: Session, survey_id: int, survey_data: SurveyUpdate):
    survey = get_survey(db, survey_id)
    if not survey:
        return None

    update_data = survey_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(survey, key, value)

    db.commit()
    db.refresh(survey)
    return survey

def delete_survey(db: Session, survey_id: int):
    survey = get_survey(db, survey_id)
    if survey:
        db.delete(survey)
        db.commit()
        return True
    return False

def submit_vote(db: Session, survey_id: int, user_id: int, answers: dict):
    participation = Participation(user_id=user_id, survey_id=survey_id)
    db.add(participation)

    for question_id, option_ids in answers.items():
        for option_id in option_ids:
            vote = Vote(survey_id=survey_id, option_id=option_id)
            db.add(vote)

    db.commit()
    return True

def get_results(db: Session, survey_id: int):
    results_query = db.query(
        Vote.option_id, func.count(Vote.id).label('count')
    ).filter(Vote.survey_id == survey_id).group_by(Vote.option_id).all()

    survey = get_survey(db, survey_id)

    results = {}
    for question in survey.questions:
        results[question.id] = {opt.id: 0 for opt in question.options}

    for opt_id, count in results_query:
        for question in survey.questions:
            if any(opt.id == opt_id for opt in question.options):
                results[question.id][opt_id] = count
                break

    return results

def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(
        student_id=user.student_id, 
        full_name=user.full_name, 
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_student_id(db: Session, student_id: str):
    return db.query(User).filter(User.student_id == student_id).first()