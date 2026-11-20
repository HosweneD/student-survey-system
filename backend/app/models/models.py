from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum
from app.db.database import Base

class SurveyStatus(str, enum.Enum):
    active = "active"
    completed = "completed"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)

class Survey(Base):
    __tablename__ = "surveys"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    status = Column(Enum(SurveyStatus), default=SurveyStatus.active)
    
    questions = relationship("Question", back_populates="survey", cascade="all, delete-orphan")

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    survey_id = Column(Integer, ForeignKey("surveys.id"))
    text = Column(String)
    allow_multiple = Column(Boolean, default=False)
    
    survey = relationship("Survey", back_populates="questions")
    options = relationship("AnswerOption", back_populates="question", cascade="all, delete-orphan")

class AnswerOption(Base):
    __tablename__ = "answer_options"
    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    text = Column(String)
    
    question = relationship("Question", back_populates="options")

class Vote(Base):
    __tablename__ = "votes"
    id = Column(Integer, primary_key=True, index=True)
    option_id = Column(Integer, ForeignKey("answer_options.id"))
    survey_id = Column(Integer, ForeignKey("surveys.id"))

class Participation(Base):
    __tablename__ = "participations"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    survey_id = Column(Integer, ForeignKey("surveys.id"))