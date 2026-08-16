from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# --- Mock Data ---
users_db = {
    "tenant1": {"id": "t1", "username": "tenant1", "password": "password", "name": "John Doe", "role": "tenant", "room": "101", "pgName": "Monkey Shoulders", "location": "Bangalore", "profileImageUrl": ""},
    "admin1": {"id": "a1", "username": "admin1", "password": "password", "name": "Admin User", "role": "admin", "room": "Admin Office", "pgName": "Monkey Shoulders", "location": "Bangalore", "profileImageUrl": ""},
    "cook1": {"id": "c1", "username": "cook1", "password": "password", "name": "Chef Mike", "role": "cook", "room": "Kitchen", "pgName": "Monkey Shoulders", "location": "Bangalore", "profileImageUrl": ""},
    "manager1": {"id": "m1", "username": "manager1", "password": "password", "name": "Manager Sarah", "role": "manager", "room": "Manager Office", "pgName": "Monkey Shoulders", "location": "Bangalore", "profileImageUrl": ""},
    "owner1": {"id": "o1", "username": "owner1", "password": "password", "name": "Owner Alex", "role": "owner", "room": "HQ", "pgName": "Monkey Shoulders", "location": "Bangalore", "profileImageUrl": ""}
}

# Add standard fake data for each dashboard
mock_meals = [
    {"id": "m1", "type": "Breakfast", "menu": "Idli Sambar", "decision": "Undecided"},
    {"id": "m2", "type": "Lunch", "menu": "Rice Dal", "decision": "Undecided"},
    {"id": "m3", "type": "Dinner", "menu": "Chapati Curry", "decision": "Undecided"},
]

mock_payments = [
    {"id": "p1", "month": "August", "amount": 8000, "status": "Paid", "date": "2023-08-01"},
]

mock_complaints = [
    {"id": "c1", "category": "Plumbing", "description": "Leaky faucet", "status": "In Progress", "submittedAt": "2023-08-10", "tenantName": "John Doe", "room": "101"},
]

mock_announcements = [
    {"id": "a1", "title": "Water Cut", "content": "Water cut from 2 PM to 5 PM today.", "author": "Manager Sarah", "date": "2023-08-15"},
]

# --- Models ---
class ComplaintCreate(BaseModel):
    category: str
    description: str

class Token(BaseModel):
    access: str
    refresh: str
    user: dict

# --- Auth ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token/")

def get_current_user(token: str = Depends(oauth2_scheme)):
    # Very basic dummy check: token is just username
    if token in users_db:
        return users_db[token]
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# --- Routes ---
@app.post("/api/token/", response_model=Token)
async def login_for_access_token(username: str, password: str):
    # To support JSON login as used in services/apiService.ts
    pass

@app.post("/api/token/")
async def login_json(data: dict):
    username = data.get("username")
    password = data.get("password")

    if username in users_db and users_db[username]["password"] == password:
        user_info = {k: v for k, v in users_db[username].items() if k != "password"}
        return {"access": username, "refresh": "fake-refresh-token", "user": user_info}
    raise HTTPException(status_code=400, detail="Incorrect username or password")


@app.get("/api/tenant/dashboard/")
async def tenant_dashboard(current_user: dict = Depends(get_current_user)):
    return {
        "meals": mock_meals,
        "payments": mock_payments,
        "complaints": mock_complaints,
        "announcements": mock_announcements
    }

@app.get("/api/admin/dashboard/")
async def admin_dashboard(current_user: dict = Depends(get_current_user)):
    return {
        "tenants": [
            {"id": "t1", "name": "John Doe", "room": "101", "pgName": "Monkey Shoulders", "location": "Bangalore", "profileImageUrl": "", "rentStatus": "Paid", "lastPaymentDate": "2023-08-01"}
        ],
        "occupancy": {"totalRooms": 50, "occupied": 45, "occupancyRate": "90%"},
        "announcements": mock_announcements
    }

@app.get("/api/cook/dashboard/")
async def cook_dashboard(current_user: dict = Depends(get_current_user)):
    return {
        "todayMenu": mock_meals,
        "mealAttendance": [
            {"tenant": {"id": "t1", "name": "John Doe", "room": "101", "pgName": "Monkey Shoulders", "location": "Bangalore", "profileImageUrl": ""}, "decision": "Eating"}
        ]
    }

@app.get("/api/manager/dashboard/")
async def manager_dashboard(current_user: dict = Depends(get_current_user)):
    return {
        "complaints": mock_complaints
    }

@app.get("/api/owner/dashboard/")
async def owner_dashboard(current_user: dict = Depends(get_current_user)):
    return {
        "occupancy": {"totalRooms": 50, "occupied": 45, "occupancyRate": "90%"},
        "financials": {"totalRentDue": 50000, "totalRentPaid": 45000, "monthlyRevenue": 400000},
        "complaints": mock_complaints,
        "announcements": mock_announcements
    }

@app.post("/api/tenant/complaints/")
async def create_complaint(complaint: ComplaintCreate, current_user: dict = Depends(get_current_user)):
    new_complaint = {
        "id": f"c{len(mock_complaints) + 1}",
        "category": complaint.category,
        "description": complaint.description,
        "status": "Submitted",
        "submittedAt": "2023-08-15",
        "tenantName": current_user["name"],
        "room": current_user["room"]
    }
    mock_complaints.append(new_complaint)
    return new_complaint
