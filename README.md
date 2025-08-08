# ------------------------------
# 1️⃣ Create project folder and enter it
# ------------------------------
mkdir malware_scanner
cd malware_scanner

# ------------------------------
# 2️⃣ Create virtual environment and activate it
# ------------------------------
python -m venv venv
venv\Scripts\activate       # For Windows
# source venv/bin/activate  # For Linux/Mac

# ------------------------------
# 3️⃣ Install dependencies
# ------------------------------
pip install flask requests python-dotenv

# ------------------------------
# 4️⃣ Create .env file for API key
# ------------------------------
echo VIRUSTOTAL_API_KEY=your_api_key_here > .env

# ------------------------------
# 5️⃣ Create app.py with the following code
# ------------------------------
import os
import requests
from flask import Flask, request, render_template_string
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("VIRUSTOTAL_API_KEY")
app = Flask(__name__)

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Malware Detection</title>
</head>
<body>
    <h2>Upload a File to Scan</h2>
    <form action="/scan" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" required>
        <button type="submit">Scan</button>
    </form>
    {% if result %}
        <h3>Scan Result:</h3>
        <pre>{{ result }}</pre>
    {% endif %}
</body>
</html>
"""

@app.route("/", methods=["GET"])
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route("/scan", methods=["POST"])
def scan_file():
    file = request.files["file"]
    if not file:
        return "No file uploaded!", 400
    
    files = {"file": (file.filename, file.stream, file.content_type)}
    headers = {"x-apikey": API_KEY}
    response = requests.post("https://www.virustotal.com/api/v3/files", files=files, headers=headers)

    if response.status_code == 200:
        json_data = response.json()
        analysis_url = json_data["data"]["links"]["self"]
        analysis_result = requests.get(analysis_url, headers=headers).json()
        return render_template_string(HTML_TEMPLATE, result=analysis_result)
    else:
        return f"Error: {response.text}", response.status_code

if __name__ == "__main__":
    app.run(debug=True)

# ------------------------------
# 6️⃣ Run the app
# ------------------------------
python app.py

# ------------------------------
# 7️⃣ Open in browser
# ------------------------------
# Go to http://127.0.0.1:5000
