from flask import Flask, render_template, jsonify, session, request
import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')

# initialize Firebase Admin SDK
cred = credentials.Certificate("service_account.json")  
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/')
def home():
    return render_template('index.html')

# Admin login endpoint
@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    try:
        # Verify ID token (client will send this after Firebase Auth)
        decoded_token = auth.verify_id_token(data['idToken'])
        session['admin_uid'] = decoded_token['uid']  # Store in server-side session
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 401

@app.route('/admin/dashboard')
def admin_dashboard():
    if not session.get('admin_uid'):
        return jsonify({"error": "Unauthorized"}), 403
    return jsonify({"message": "Welcome Admin!"})

if __name__ == '__main__':
    app.run(debug=True)