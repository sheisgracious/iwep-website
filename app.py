from flask import Flask, render_template
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)

# initialize Firebase Admin SDK
cred = credentials.Certificate("service_account.json")  
firebase_admin.initialize_app(cred)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)