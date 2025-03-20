# APIRouter og HTTPException er en dele af fastapi
from fastapi import APIRouter, HTTPException

# pydantic # vi skal ikke installere pydantic, da det er en del af fastapi
from pydantic import BaseModel

router = APIRouter()

# BaseModet er exted sådan vi extenderer den i python
class Spacecraft(BaseModel):
    id: int
    name: str

class SpacecraftRequestModel(BaseModel):
    name: str

spacecrafts = [
    Spacecraft(id=1, name="Apollo 13"),
    Spacecraft(id=2, name="Challenger"),
    Spacecraft(id=3, name="Eneterprise"),
]

# her fortæller at response_model er spacecraft
# 
@router.get("/api/spacecrafts", tags=["spacecraft"] ,response_model=list[Spacecraft])
def get_spacecrafts():
    return spacecrafts #{data : spacecrafts}

@router.get("/api/spacecrafts/{spacecraft_id}", tags=["spacecraft"], response_model=Spacecraft)
def get_spacecraft_by_id(spacecraft_id: int):
    for spacecraft in spacecrafts:
        if spacecraft.id == spacecraft_id:
            return spacecraft # {"data": spacecraft}
    # hvis spacecraft ikke findes
    raise HTTPException(status_code=404, detail="Spacecraft not found")


@router.post("/api/spacecrafts", tags=["spacecraft"], response_model=Spacecraft)
def create_spacecraft(spacecraft: Spacecraft): #(defindere vi body som spacecraft)
    spacecrafts.append(spacecraft)
    return spacecraft


