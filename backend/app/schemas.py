
from typing import Literal

from pydantic import BaseModel, Field


class LoanApplication(BaseModel):

    age: int = Field(ge=18, le=100)
    income: float = Field(gt=0)
    loan_amount: float = Field(gt=0)
    loan_tenure_months: int = Field(ge=1)

    num_open_accounts: int = Field(ge=0)

    credit_utilization_ratio: float = Field(
        ge=0, le=100
    )

    delinquency_ratio: float = Field(
        ge=0, le=100
    )

    avg_dpd_per_delinquency: float = Field(ge=0)

    residence_type: Literal[
        "Owned", "Rented", "Mortgage"
    ]

    loan_purpose: Literal[
        "Education", "Home", "Auto", "Personal"
    ]

    loan_type: Literal[
        "Unsecured", "Secured"
    ]


class RiskPrediction(BaseModel):

    default_probability: float
    credit_score: int
    rating: str
    risk_flag: str
    loan_to_income_ratio: float
    note: str
