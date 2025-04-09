import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello from Flask Backend!"

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # fallback to 5000 locally
    app.run(host='0.0.0.0', port=port)



