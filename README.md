
# Credit Risk Prediction System

An end-to-end Machine Learning application that estimates
the probability of loan default using historical customer,
loan, and credit bureau information.

The project combines statistical machine learning,
experiment tracking, a FastAPI backend, and a React frontend.

> This is an educational decision-support application.
> Predictions are not official credit scores or automated
> loan approval decisions.

## 1. Project Overview

Financial institutions need to understand the risk
associated with lending money to customers.

This project estimates loan default probability based
on customer financial and credit behavior.

The system allows users to:

- Enter customer and loan information.
- Estimate the probability of loan default.
- View an illustrative credit risk score.
- Understand the customer's risk rating.
- Identify applications requiring further review.

## 2. Technology Stack

### Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- Logistic Regression
- Random Forest
- XGBoost
- Matplotlib
- Seaborn

### MLOps
- MLflow for experiment tracking
- Joblib for model serialization
- Docker for backend containerization

### Backend
- FastAPI
- Pydantic
- Uvicorn

### Frontend
- React
- JavaScript
- Vite
- CSS

### Development
- Jupyter Notebook
- Git and GitHub

## 3. Dataset

The project uses three datasets:

1. customers.csv
   Customer demographic and financial information.

2. loans.csv
   Loan characteristics and repayment information.

3. bureau_data.csv
   Credit bureau and delinquency information.

The datasets are joined using the customer ID.

Dataset files are excluded from Git tracking and are
not included in this repository.

Place the original datasets inside the root
dataset/ folder before rerunning the notebook.

## 4. Machine Learning Workflow

The project follows these steps:

1. Data loading and merging
2. Data cleaning
3. Exploratory Data Analysis (EDA)
4. Feature engineering
5. Train/test splitting
6. Model preprocessing
7. Model training and comparison
8. Model evaluation
9. Model selection
10. Model serialization
11. API integration

The train/test split is performed during model training.

Fitted preprocessing is learned using training data
to reduce data leakage.

## 5. Feature Engineering

The model uses features including:

- Customer age
- Loan tenure
- Number of open loan accounts
- Credit utilization ratio
- Loan-to-income ratio
- Delinquency ratio
- Average days past due per delinquency
- Residence type
- Loan purpose
- Loan type

Numerical features are scaled using a fitted scaler.

Categorical features are transformed using
one-hot encoding.

The same preprocessing is applied during inference.

## 6. Model Development

The following algorithms were explored:

- Logistic Regression
- Random Forest
- XGBoost

The final deployed model is Logistic Regression.

The model was selected based on classification
performance and the quality of its estimated
default probabilities.

Experiments involving class balancing were also
evaluated during development.

## 7. Model Evaluation

The final Logistic Regression model achieved the
following results on the held-out test set:

| Metric | Result |
|---|---:|
| Accuracy | 96.28% |
| ROC-AUC | 0.9827 |
| Default Precision | 82.8% |
| Default Recall | 71.6% |
| Brier Score | 0.0268 |

The test set contained 12,497 records.

These results apply to the evaluated dataset and
do not establish performance on new real-world
lending populations.

### Probability Reliability

Probability evaluation includes:

- ROC-AUC
- Precision and recall
- F1-score
- PR-AUC
- Brier score

The Brier score helps assess how closely predicted
probabilities reflect observed outcomes.

## 8. MLflow Experiment Tracking

MLflow is used to track machine learning experiments.

Tracked information includes:

- Model parameters
- Accuracy
- Precision
- Recall
- F1-score
- ROC-AUC
- PR-AUC
- Brier score
- Saved model artifacts

Run the MLflow interface:

```bash
mlflow ui
```

Open:

http://127.0.0.1:5000

Local experiment tracking files are excluded
from GitHub.



## 9. Running the Backend

Create and activate a Python virtual environment.

Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend URL:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs

### API Endpoints

GET /

Health and welcome endpoint.

POST /predict

Accepts customer loan details and returns the
model's estimated default probability.

### Example Request

```json
{
  "age": 28,
  "income": 1200000,
  "loan_amount": 2560000,
  "loan_tenure_months": 36,
  "num_open_accounts": 2,
  "credit_utilization_ratio": 30,
  "delinquency_ratio": 5,
  "avg_dpd_per_delinquency": 2,
  "residence_type": "Owned",
  "loan_purpose": "Education",
  "loan_type": "Unsecured"
}
```

### Prediction Response

The API returns:

- default_probability
- credit_score
- rating
- risk_flag
- loan_to_income_ratio
- note

The credit score is an illustrative transformation
of model probability, not an official banking score.

## 10. Running the React Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Visit:

http://localhost:5173

The React application communicates with the
FastAPI prediction endpoint.

For local development, configure:

```env
VITE_API_URL=http://127.0.0.1:8000
```

## 11. Docker

The backend includes a Dockerfile.

Build the backend image from the backend folder:

```bash
docker build -t credit-risk-api .
```

Run the container:

```bash
docker run -p 8000:8000 credit-risk-api
```

The container configuration must start Uvicorn
on 0.0.0.0:8000 and include the saved model artifact.

## 12. Application Architecture

React Frontend
       |
       v
FastAPI Routes
       |
       v
Pydantic Validation
       |
       v
Feature Engineering and Scaling
       |
       v
Trained Logistic Regression
       |
       v
Default Probability
       |
       v
Risk Assessment Response



