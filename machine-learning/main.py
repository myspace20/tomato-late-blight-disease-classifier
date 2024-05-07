import io
import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify


model = keras.models.load_model("blight.keras")


IMAGE_SIZE = 224

classes = ['Tomato_Late_blight', 'Tomato_healthy']


def transform_image(pillow_image):
    data = np.asarray(pillow_image)
    data = data / 255.0
    data = np.expand_dims(data, 0)
    # --> [1, x, y, 1]
    data = tf.image.resize(data, [IMAGE_SIZE, IMAGE_SIZE])
    return data


def predict(x):
    predictions = model.predict(x)
    threshold = 1
    predicted_class = 1 if predictions[0] > threshold else 0
    predicted_class = classes[predicted_class]
    score = round(100 * (np.max(predictions[0])), 2)
    return predicted_class, score

    

app = Flask(__name__)

@app.route("/", methods=["POST"])
def index():
    if request.method == "POST":
        file = request.files.get('file')
        if file is None or file.filename == "":
            return jsonify({"error": "no file"})

        try:
            image_bytes = file.read()
            pillow_img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            tensor = transform_image(pillow_img)
            predicted_class, confidence = predict(tensor)
            
            return jsonify({
               "predicted_class": predicted_class,
               "confidence":confidence
            })

        except Exception as e:
            return jsonify({"error": str(e)})



if __name__ == "__main__":
    app.run(debug=True)
