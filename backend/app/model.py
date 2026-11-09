
from pathlib import Path

import joblib
import pandas as pd

from .schemas import LoanApplication


MODEL_PATH = (
    Path(__file__).resolve().parents[1]
    / "artifacts"
    / "model_data.joblib"
)

model_data = joblib.load(MODEL_PATH)

model = model_data["model"]
scaler = model_data["scaler"]
features = list(model_data["features"])
cols_to_scale = list(model_data["cols_to_scale"])

threshold = model_data.get("risk_threshold", 0.5)


def prepare_input(application: LoanApplication):

    values = {
        "age": application.age,
        "loan_tenure_months": application.loan_tenure_months,
        "number_of_open_accounts": application.num_open_accounts,
        "credit_utilization_ratio": application.credit_utilization_ratio,

        "loan_to_income": round(
            application.loan_amount / application.income, 2
        ),

        "delinquency_ratio": application.delinquency_ratio,
        "avg_dpd_per_delinquency": application.avg_dpd_per_delinquency,

        "residence_type_Owned": int(
            application.residence_type == "Owned"
        ),
        "residence_type_Rented": int(
            application.residence_type == "Rented"
        ),

        "loan_purpose_Education": int(
            application.loan_purpose == "Education"
        ),
        "loan_purpose_Home": int(
            application.loan_purpose == "Home"
        ),
        "loan_purpose_Personal": int(
            application.loan_purpose == "Personal"
        ),

        "loan_type_Unsecured": int(
            application.loan_type == "Unsecured"
        )
    }

    input_data = pd.DataFrame([values])

    missing = [
        name for name in features
        if name not in input_data.columns
    ]

    if missing:
        raise ValueError(
            f"Missing model features: {missing}"
        )

    input_data[cols_to_scale] = scaler.transform(
        input_data[cols_to_scale]
    )

    return input_data[features]


def predict_risk(application: LoanApplication):

    input_data = prepare_input(application)

    class_position = list(model.classes_).index(1)

    probability = float(
        model.predict_proba(input_data)[0, class_position]
    )

    # Illustrative score, not an official credit score
    credit_score = round(
        300 + 600 * (1 - probability)
    )

    if credit_score < 500:
        rating = "Poor"

    elif credit_score < 650:
        rating = "Average"

    elif credit_score < 750:
        rating = "Good"

    else:
        rating = "Excellent"

    return {
        "default_probability": round(probability, 4),
        "credit_score": credit_score,
        "rating": rating,
        "risk_flag": (
            "Review"
            if probability >= threshold
            else "Lower risk"
        ),
        "loan_to_income_ratio": round(
            application.loan_amount / application.income, 2
        ),
        "note": (
            "Educational estimate only; not a lending "
            "decision or official credit score."
        )
    }
