
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()

class Truck(BaseModel):
    volgnummer: int
    transportfirma: str
    aantal_colli: int
    cubage: float
    lane: str
    timestamp: datetime = datetime.now()

active_trucks = []
archived_trucks = []

@app.post("/add_truck/")
def add_truck(truck: Truck):
    active_trucks.append(truck)
    return {"message": "Truck added successfully"}

@app.get("/get_trucks/", response_model=List[Truck])
def get_trucks():
    return active_trucks

@app.post("/archive_truck/{volgnummer}")
def archive_truck(volgnummer: int):
    for truck in active_trucks:
        if truck.volgnummer == volgnummer:
            active_trucks.remove(truck)
            archived_trucks.append(truck)
            return {"message": "Truck archived successfully"}
    raise HTTPException(status_code=404, detail="Truck not found")

@app.get("/get_archived_trucks/", response_model=List[Truck])
def get_archived_trucks():
    return archived_trucks
