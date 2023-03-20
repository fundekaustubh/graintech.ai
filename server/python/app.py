import pickle
import numpy as np
from flask import Flask, request, jsonify
import cv2
import openai
import os

openai.api_key = "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"


# Load the machine learning model
with open("./models/crop-recommendation-model.pkl", "rb") as f:
    model = pickle.load(f)

app = Flask(__name__)


@app.route("/disease-prediction", methods=["POST"])
def predict():
    # Check if the request contains image data
    if "image" in request.files:
        image = request.files["image"].read()
        # Convert the image data to a NumPy array
        # Assuming it's a PNG image
        np_image = np.frombuffer(image, np.uint8)
        img = cv2.imdecode(np_image, cv2.IMREAD_UNCHANGED)
        # Make a prediction using the machine learning model
        prediction = model.predict(img)
        # Return the prediction as a JSON response
        return jsonify({"prediction": prediction.tolist()})
    # Check if the request contains JSON data
    elif "json" in request.json:
        data = request.json["json"]
        # Make a prediction using the machine learning model
        prediction = model.predict(data)
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
        prediction = model.predict([[N, P, K, Temperature, Humidity, Ph, Rainfall]])
        return jsonify({"crop": prediction[0]})


@app.route("/disease-consultation", methods=["POST"])
def disease_consultation():
    if request.method == "POST":
        json_data = request.get_json()
        Disease = json_data["Disease"]
        resp = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"I am a farmer in India and my plants are suffering from {Disease}, what should I do?",
            max_tokens=1024,
            temperature=0,
        )["choices"][0]["text"]
        print(resp)
        return jsonify(resp)


if __name__ == "__main__":
    app.run(debug=True)
