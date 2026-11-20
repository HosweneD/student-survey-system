from pydantic import BaseModel
from typing import List, Dict, Literal

class UserBase(BaseModel):
    student_id: str
    full_name: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class AnswerOptionResponse(BaseModel):
    id: int
    text: str
    class Config:
        from_attributes = True

class QuestionResponse(BaseModel):
    id: int
    text: str
    options: List[AnswerOptionResponse]
    allow_multiple: bool
    class Config:
        from_attributes = True

class SurveyResponse(BaseModel):
    id: int
    title: str
    description: str
    status: Literal['active', 'completed']
    questions: List[QuestionResponse] = []
    class Config:
        from_attributes = True

class VoteSubmit(BaseModel):
    answers: Dict[int, List[int]]

class AnswerOptionCreate(BaseModel):
    text: str

class QuestionCreate(BaseModel):
    text: str
    allow_multiple: bool = False
    options: List[AnswerOptionCreate]

class SurveyCreate(BaseModel):
    title: str
    description: str
    questions: List[QuestionCreate]

class SurveyUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: Literal['active', 'completed'] | None = None