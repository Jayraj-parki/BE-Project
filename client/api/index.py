# Importing necessary libraries
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from keras.models import load_model
# Initializing the fast API server
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading up the trained model
model = pickle.load(open('../model/rf.pkl', 'rb'))
model2 = pickle.load(open('../model/knn.pkl', 'rb'))
# model3 = pickle.load(open('../model/decision.pkl', 'rb'))
model4 = pickle.load(open('../model/nb.pkl', 'rb'))

# Defining the model input types
class Candidate(BaseModel):
    Gender: int
    Hemoglobin: float
    MCH: float
    MCHC: float
    MCV: float

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to online Anemia prediction model"}

# Setting up the prediction route
@app.post("/prediction/")
async def get_predict(data: Candidate):
    sample = [[
        data.Gender,
        data.Hemoglobin,
        data.MCH,
        data.MCHC,
        data.MCV
    ]]
    
    result = model.predict(sample).tolist()[0]
    result2 = model2.predict(sample).tolist()[0]
    # result3 = model3.predict(sample).tolist()[0]
    result4 = model4.predict(sample).tolist()[0]
    probability=((result+result2+result4)/3)*100;
   
    print("result",result, "->",result2,"->",result4)
    
    return {
        "data": {
            'result': probability,
         }
    }

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')