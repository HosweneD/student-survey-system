from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas import schemas
from app.crud import crud
from app.core.security import create_access_token, get_current_user

router = APIRouter()

@router.post("/login", response_model=schemas.Token)
def login(form_data: schemas.UserCreate, db: Session = Depends(get_db)):
    user = crud.get_user_by_student_id(db, form_data.student_id)
    if not user or not crud.pwd_context.verify(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Неверный номер билета или пароль")
    
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/surveys", response_model=List[schemas.SurveyResponse])
def get_surveys(db: Session = Depends(get_db)):
    return crud.get_surveys(db)

@router.get("/surveys/{survey_id}", response_model=schemas.SurveyResponse)
def get_survey(survey_id: int, db: Session = Depends(get_db)):
    survey = crud.get_survey(db, survey_id)
    if not survey:
        raise HTTPException(status_code=404, detail="Опрос не найден")
    return survey

@router.post("/surveys/{survey_id}/vote")
def vote(survey_id: int, vote_data: schemas.VoteSubmit, db: Session = Depends(get_db), current_user: schemas.UserResponse = Depends(get_current_user)):
    survey = crud.get_survey(db, survey_id)
    if not survey:
        raise HTTPException(status_code=404, detail="Опрос не найден")
    if survey.status == "completed":
        raise HTTPException(status_code=400, detail="Опрос завершён")

    crud.submit_vote(db, survey_id, current_user.id, vote_data.answers)
    return {"status": "ok", "message": "Голос учтён"}

@router.get("/surveys/{survey_id}/results")
def get_results(survey_id: int, db: Session = Depends(get_db)):
    survey = crud.get_survey(db, survey_id)
    if not survey:
        raise HTTPException(status_code=404, detail="Опрос не найден")
    if survey.status != "completed":
        raise HTTPException(status_code=403, detail="Результаты доступны только после завершения опроса")

    return crud.get_results(db, survey_id)

@router.post("/surveys", response_model=schemas.SurveyResponse, status_code=201)
def create_survey(survey: schemas.SurveyCreate, db: Session = Depends(get_db)):
    """Создание нового опроса с вопросами и вариантами ответов."""
    return crud.create_survey(db, survey)

@router.put("/surveys/{survey_id}", response_model=schemas.SurveyResponse)
def update_survey(survey_id: int, survey: schemas.SurveyUpdate, db: Session = Depends(get_db)):
    """Обновление опроса (название, описание или статус)."""
    updated = crud.update_survey(db, survey_id, survey)
    if not updated:
        raise HTTPException(status_code=404, detail="Опрос не найден")
    return updated

@router.delete("/surveys/{survey_id}")
def delete_survey(survey_id: int, db: Session = Depends(get_db)):
    """Удаление опроса вместе со всеми связанными вопросами и голосами."""
    if not crud.delete_survey(db, survey_id):
        raise HTTPException(status_code=404, detail="Опрос не найден")
    return {"message": "Опрос успешно удалён"}