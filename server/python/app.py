import pickle
import numpy as np
from flask import Flask, request, jsonify
import cv2
import openai
import os
from flask_cors import CORS
import torch
import torchvision.transforms as transforms
from PIL import Image

openai.api_key = "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"

# Load the machine learning model
with open("./models/crop-recommendation-model.pkl", "rb") as f:
    cropPredictionModel = pickle.load(f)

diseasePredictionModel = torch.load(
    "./models/leaf-disease-prediction-model.pth", map_location=torch.device("cpu")
)

app = Flask(__name__)
CORS(app)


def preprocess_image(image):
    transform = transforms.Compose(
        [
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )
    image = Image.open(image)
    image = transform(image).unsqueeze(0)
    return image


@app.route("/disease-prediction", methods=["POST"])
def predict():
    # Check if the request contains image data
    if "image" in request.files:
        file = request.files["image"]
        image = preprocess_image(file)
        output = diseasePredictionModel(image)
        prediction = np.argmax(output.detach().numpy())
        return jsonify({"prediction": prediction})
    # Check if the request contains JSON data
    elif "json" in request.json:
        data = request.json["json"]
        # Make a prediction using the machine learning model
        prediction = diseasePredictionModel.predict(data)
        # Return the prediction as a JSON response
        return jsonify({"prediction": prediction.tolist()})
    else:
        # Return an error if the request contains neither image nor JSON data
        return jsonify({"error": "Request must contain either image or JSON data."})


@app.route("/crop-recommendation", methods=["GET", "POST"])
def predict_crop():
    if request.method == "GET":
        return "Hello"
    if request.method == "POST":
        # get the JSON data from the request
        json_data = request.get_json(force=True)
        # extract the values of the attributes
        N, P, K, Temperature, Humidity, Rainfall, Ph = (
            json_data["N"],
            json_data["P"],
            json_data["K"],
            json_data["Temperature"],
            json_data["Humidity"],
            json_data["Rainfall"],
            json_data["Ph"],
        )
        prediction = cropPredictionModel.predict(
            [[N, P, K, Temperature, Humidity, Ph, Rainfall]]
        )
        return jsonify({"crop": prediction[0]})


@app.route("/disease-consultation", methods=["POST"])
def disease_consultation():
    if request.method == "POST":
        json_data = request.get_json()
        Plant, Disease = json_data["Plant"], json_data["Disease"]
        resp = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"I am a farmer in India and my {Plant} plants are suffering from {Disease}. Provide me with step wise instructions for what I should do, including other details like the total duration for each step and what each step achieves.",
            max_tokens=2048,
            temperature=0,
        )["choices"][0]["text"]
        print(resp)
        return jsonify({"recommendation": resp})


if __name__ == "__main__":
    app.run(debug=True)
