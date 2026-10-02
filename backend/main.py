from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from passlib.context import CryptContext
import jwt
import datetime

# ==========================================
# 1. SECURITY CONFIGURATION (JWT & Hashing)
# ==========================================
# In a real app, hide this secret key in a .env file!
SECRET_KEY = "dream_academy_super_secret_production_key_2026"
ALGORITHM = "HS256"

# Setup Bcrypt for PIN hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    to_encode = data.copy()
    # Token expires in 2 hours
    expire = datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ==========================================
# 2. DATABASE SETUP
# ==========================================
SQLALCHEMY_DATABASE_URL = "sqlite:///./dream_academy.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class StudentDB(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    portal_id = Column(String, unique=True, index=True)
    pin_hash = Column(String)  # <--- Changed from 'pin' to 'pin_hash'
    parent_name = Column(String)
    student_name = Column(String)
    grade_level = Column(String)
    term_gpa = Column(String)
    attendance_rate = Column(String)
    fee_status = Column(String)
    
    grades = Column(JSON)
    attendance = Column(JSON)
    fees = Column(JSON)
    messages = Column(JSON)

Base.metadata.create_all(bind=engine)

# ==========================================
# 3. AUTO-SEED DATABASE (Now with Hashing!)
# ==========================================
def seed_database():
    db = SessionLocal()
    if not db.query(StudentDB).first():
        print("🌱 Seeding the database with secure, hashed student data...")
        
        # HASH THE PIN BEFORE SAVING IT TO THE DATABASE
        hashed_pin = pwd_context.hash("1234")
        
        elias = StudentDB(
            portal_id="DA-2026-8942",
            pin_hash=hashed_pin, # <--- Saving the scrambled hash, NOT "1234"
            parent_name="Kebede Tadesse",
            student_name="Elias Kebede",
            grade_level="Grade 10-A",
            term_gpa="3.86 / 4.0",
            attendance_rate="98.5%",
            fee_status="Cleared",
            grades=[
                {"subject": "Advanced Mathematics", "mid": "94%", "quiz": "92%", "grade": "A"},
                {"subject": "Physics & Mechanics", "mid": "88%", "quiz": "90%", "grade": "A-"}
            ],
            attendance=[
                {"date": "Oct 01, 2026", "status": "Present on Time", "time": "7:45 AM", "remark": "Clear"}
            ],
            fees=[
                {"title": "Term 1 Tuition", "status": "PAID", "details": ["Amount: 22,000 ETB"], "color_theme": "green"}
            ],
            messages=[
                {"sender": "Dr. Meron Haile", "date": "Yesterday", "msg": "Elias performed exceptionally well!"}
            ]
        )
        db.add(elias)
        db.commit()
    db.close()

seed_database()

# ==========================================
# 4. FASTAPI APP & ROUTES
# ==========================================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class LoginRequest(BaseModel):
    portalId: str
    pin: str
    parentName: str
    studentName: str

# ------------------------------------------
# SECURE LOGIN ENDPOINT
# ------------------------------------------
@app.post("/api/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    pid = req.portalId.strip().upper()
    parent_name = req.parentName.strip().lower()
    student_name = req.studentName.strip().lower()
    
    student = db.query(StudentDB).filter(StudentDB.portal_id == pid).first()
    
    if not student:
        raise HTTPException(status_code=401, detail="Authentication failed. Portal ID not found.")
    
    # VERIFY THE PIN AGAINST THE HASH
    if not pwd_context.verify(req.pin, student.pin_hash):
        raise HTTPException(status_code=401, detail="Invalid PIN.")
        
    if student.parent_name.lower() != parent_name or student.student_name.lower() != student_name:
        raise HTTPException(status_code=401, detail="Name mismatch. Ensure names match school records.")

    # GENERATE A REAL JSON WEB TOKEN (JWT)
    access_token = create_access_token(data={"sub": student.portal_id, "role": "parent"})

    student_data = {
        "parentName": student.parent_name,
        "studentName": student.student_name,
        "gradeLevel": student.grade_level,
        "termGpa": student.term_gpa,
        "attendanceRate": student.attendance_rate,
        "feeStatus": student.fee_status,
        "grades": student.grades,
        "attendance": student.attendance,
        "fees": student.fees,
        "messages": student.messages
    }

    return {
        "token": access_token, # Returning the real cryptographic token!
        "studentData": student_data
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)