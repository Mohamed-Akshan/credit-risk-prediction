
from fastapi import APIRouter

from .model import predict_risk
from .schemas import LoanApplication, RiskPrediction


router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "Credit Risk API is running"
    }


@router.post(
    "/predict",
    response_model=RiskPrediction
)
def predict(application: LoanApplication):

    return predict_risk(application)
