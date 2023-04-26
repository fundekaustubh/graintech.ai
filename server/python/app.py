import requests
import pickle
import numpy as np
from flask import Flask, request, jsonify
import cv2
import openai
import os
import keras
from flask_cors import CORS
import torch
import torchvision.transforms as transforms
from PIL import Image
import ast
import io
from googletrans import Translator

translator = Translator()

openai.api_key = "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"

classes = [
    "Tomato___Late_blight",
    "Tomato___healthy",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Potato___healthy",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Tomato___Early_blight",
    "Tomato___Septoria_leaf_spot",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Strawberry___Leaf_scorch",
    "Peach___healthy",
    "Apple___Apple_scab",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Bacterial_spot",
    "Apple___Black_rot",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Peach___Bacterial_spot",
    "Apple___Cedar_apple_rust",
    "Tomato___Target_Spot",
    "Pepper,_bell___healthy",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Potato___Late_blight",
    "Tomato___Tomato_mosaic_virus",
    "Strawberry___healthy",
    "Apple___healthy",
    "Grape___Black_rot",
    "Potato___Early_blight",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Common_rust_",
    "Grape___Esca_(Black_Measles)",
    "Raspberry___healthy",
    "Tomato___Leaf_Mold",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Pepper,_bell___Bacterial_spot",
    "Corn_(maize)___healthy",
]

# MODEL DEFINITION START
import os  # for working with files
import numpy as np  # for numerical computationss
import pandas as pd  # for working with dataframes
import torch  # Pytorch module
import matplotlib.pyplot as plt  # for plotting informations on graph and images using tensors
import torch.nn as nn  # for creating  neural networks
from torch.utils.data import DataLoader  # for dataloaders
from PIL import Image  # for checking images
import torch.nn.functional as F  # for functions for calculating loss
import torchvision.transforms as transforms  # for transforming images into tensors
from torchvision.utils import make_grid  # for data checking
from torchvision.datasets import ImageFolder  # for working with classes and images


class SimpleResidualBlock(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(
            in_channels=3, out_channels=3, kernel_size=3, stride=1, padding=1
        )
        self.relu1 = nn.ReLU()
        self.conv2 = nn.Conv2d(
            in_channels=3, out_channels=3, kernel_size=3, stride=1, padding=1
        )
        self.relu2 = nn.ReLU()

    def forward(self, x):
        out = self.conv1(x)
        out = self.relu1(out)
        out = self.conv2(out)
        return (
            self.relu2(out) + x
        )  # ReLU can be applied before or after adding the input


# for calculating the accuracy
def accuracy(outputs, labels):
    _, preds = torch.max(outputs, dim=1)
    return torch.tensor(torch.sum(preds == labels).item() / len(preds))


# base class for the model
class ImageClassificationBase(nn.Module):
    def training_step(self, batch):
        images, labels = batch
        out = self(images)  # Generate predictions
        loss = F.cross_entropy(out, labels)  # Calculate loss
        return loss

    def validation_step(self, batch):
        images, labels = batch
        out = self(images)  # Generate prediction
        loss = F.cross_entropy(out, labels)  # Calculate loss
        acc = accuracy(out, labels)  # Calculate accuracy
        return {"val_loss": loss.detach(), "val_accuracy": acc}

    def validation_epoch_end(self, outputs):
        batch_losses = [x["val_loss"] for x in outputs]
        batch_accuracy = [x["val_accuracy"] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()  # Combine loss
        epoch_accuracy = torch.stack(batch_accuracy).mean()
        return {
            "val_loss": epoch_loss,
            "val_accuracy": epoch_accuracy,
        }  # Combine accuracies

    def epoch_end(self, epoch, result):
        print(
            "Epoch [{}], last_lr: {:.5f}, train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
                epoch,
                result["lrs"][-1],
                result["train_loss"],
                result["val_loss"],
                result["val_accuracy"],
            )
        )


# convolution block with BatchNormalization
def ConvBlock(in_channels, out_channels, pool=False):
    layers = [
        nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
        nn.BatchNorm2d(out_channels),
        nn.ReLU(inplace=True),
    ]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)


# resnet architecture
class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_diseases):
        super().__init__()

        self.conv1 = ConvBlock(in_channels, 64)
        self.conv2 = ConvBlock(64, 128, pool=True)  # out_dim : 128 x 64 x 64
        self.res1 = nn.Sequential(ConvBlock(128, 128), ConvBlock(128, 128))

        self.conv3 = ConvBlock(128, 256, pool=True)  # out_dim : 256 x 16 x 16
        self.conv4 = ConvBlock(256, 512, pool=True)  # out_dim : 512 x 4 x 44
        self.res2 = nn.Sequential(ConvBlock(512, 512), ConvBlock(512, 512))

        self.classifier = nn.Sequential(
            nn.MaxPool2d(4), nn.Flatten(), nn.Linear(512, num_diseases)
        )

    def forward(self, xb):  # xb is the loaded batch
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out


device = torch.device("cpu")


def to_device(data, device):
    """Move tensor(s) to chosen device"""
    if isinstance(data, (list, tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)


model_path = "./models/plant-disease-model.pth"
model_state_dict = torch.load(model_path, map_location=torch.device("cpu"))
model = to_device(ResNet9(3, len(classes)), device)
model.load_state_dict(model_state_dict)
# MODEL DEFINITION END


# Load the machine learning model
with open("./models/crop-recommendation-model.pkl", "rb") as f:
    cropPredictionModel = pickle.load(f)

# diseasePredictionModel = torch.load(
#     "./models/plant-disease-model.pth", map_location=torch.device("cpu")
# )
# diseasePredictionModel.eval()

app = Flask(__name__)
CORS(app)

# model = torch.load("./models/plant-disease-model.pth", map_location=torch.device("cpu"))
# print(checkpoint.keys())
# model = checkpoint["model"]

# Define the image transformation
transform = transforms.Compose(
    [
        transforms.Resize(256),
        transforms.CenterCrop(256),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ]
)


@app.route("/translate", methods=["GET", "POST"])
def translate():
    if request.method == "POST":
        text = "hey, this is python."
        dest = "en"
        translatedText = translator.translate("hey, this is python.", dest=dest)
        return jsonify({"message": translatedText})
    else:
        return jsonify({"message": "Hi"})


# Define the prediction endpoint
@app.route("/disease-prediction", methods=["POST"])
def disease_prediction():
    # Get the image from the POST request
    file = request.files["image"]
    image = Image.open(io.BytesIO(file.read()))
    # print(str(file.stream))
    # image = Image.open(file.stream)

    # # Prepare the image for input to the model
    # image = transform(image)

    # # Make a prediction
    # output = model(image.unsqueeze(0))
    # _, predicted = torch.max(output.data, 1)
    xb = to_device(transform(image).unsqueeze(0), device)
    # Get predictions from model
    yb = model(xb)
    # Pick index with highest probability
    _, preds = torch.max(yb, dim=1)
    # Retrieve the class label

    # Return the predicted class name as JSON
    return jsonify({"prediction": classes[preds[0].item()]})


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
        question = f"I am a farmer in India and my {Plant} plants are suffering from {Disease}. Provide me with step wise instructions for what I should do, including other details like the total duration for each step and what each step achieves."
        resp = ""
        try:
            resp = openai.Completion.create(
                model="text-davinci-003",
                # prompt=,
                prompt=f"Hi",
                max_tokens=2048,
                temperature=0,
            )["choices"][0]["text"]
        except:
            try:
                payload = {"question": question}
                headers = {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "X-API-KEY": "bca69546-4a00-4437-beba-bdbc922a30b5",
                }
                url = "https://api.writesonic.com/v2/business/content/ans-my-ques?engine=good&num_copies=1"
                resp = requests.post(url, json=payload, headers=headers)
                resp = ast.literal_eval(resp.text)[0]["text"]
            except:
                resp = ""

        return jsonify({"recommendation": resp})


if __name__ == "__main__":
    app.run(debug=True)
