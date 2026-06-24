from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from flask_mail import Mail, Message
import requests
import math
from dotenv import load_dotenv
from google import genai
import os
from pathlib import Path
env_path = Path(__file__).parent / ".env"

load_dotenv(dotenv_path=env_path)
#print("API KEY:", os.getenv("GEMINI_API_KEY"))
app = Flask(__name__)
CORS(app)

#print("API KEY:", os.getenv("GEMINI_API_KEY"))
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise Exception(
        "GEMINI_API_KEY not found in .env file"
    )

gemini_client = genai.Client(
    api_key=GEMINI_API_KEY
)
# ---------------- OPENROUTESERVICE API ----------------

ORS_API_KEY = os.getenv("ORS_API_KEY")
print("ORS KEY =", ORS_API_KEY)


# ---------------- MAIL CONFIGURATION ----------------

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'dikshavasekar2426@gmail.com'
app.config['MAIL_PASSWORD'] = 'oenm qneu btne eobq'

mail = Mail(app)

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in km

    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)

    a = (
        math.sin(d_lat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(d_lon / 2) ** 2
    )

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c

# ---------------- DATABASE CONNECTION ----------------

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Vedant@24",
    database="traffic_db"
)

cursor = conn.cursor()


@app.route('/login', methods=['POST'])
def login():

    data = request.json

    email = data.get('email')
    password = data.get('password')

    cursor.execute(
        """
        SELECT id, first_name, last_name, mobile, email
        FROM users
        WHERE email = %s AND password = %s
        """,
        (email, password)
    )

    user = cursor.fetchone()

    if not user:
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    return jsonify({
        "id": user[0],
        "firstName": user[1],
        "lastName": user[2],
        "mobile": user[3],
        "email": user[4]
    })

# ---------------- HOME ROUTE ----------------

@app.route("/")
def home():
    return "TrafficSense Backend Running"

# ---------------- FIND ROUTE API ----------------
@app.route("/find-route", methods=["POST"])
def find_route():
    try:
        data = request.json

        source = data.get("from")
        destination = data.get("to")

        print("Source:", source)
        print("Destination:", destination)

        if not source or not destination:
            return jsonify({
                "error": "Source and destination are required"
            }), 400

        geocode_url = "https://api.openrouteservice.org/geocode/search"

        headers = {
            "Authorization": ORS_API_KEY
        }

        source_res = requests.get(
            
            geocode_url,
            headers=headers,
            params={
                "text": source,
                "size": 1
            }
        ).json()

        dest_res = requests.get(
            geocode_url,
            headers=headers,
            params={
                "text": destination,
                "size": 1
            }
        ).json()

        if not source_res.get("features"):
            return jsonify({
                "error": f"Source not found: {source}"
            }), 400

        if not dest_res.get("features"):
            return jsonify({
                "error": f"Destination not found: {destination}"
            }), 400

        source_coords = source_res["features"][0]["geometry"]["coordinates"]
        dest_coords = dest_res["features"][0]["geometry"]["coordinates"]

        route_url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson"

        route_res = requests.post(
            route_url,
            headers={
                "Authorization": ORS_API_KEY,
                "Content-Type": "application/json"
            },
            json={
                "coordinates": [
                    source_coords,
                    dest_coords
                ]
            }
        ).json()

        if not route_res.get("features"):
            print(route_res)

            return jsonify({
                "error": "No routes found"
            }), 400

        feature = route_res["features"][0]

        geometry = feature["geometry"]["coordinates"]

        summary = feature["properties"]["summary"]

        distance = round(summary["distance"] / 1000, 2)

        duration = round(summary["duration"] / 60)

        return jsonify({
            "routes": [
                {
                    "geometry": geometry,
                    "distance": distance,
                    "duration": duration
                }
            ]
        })

    except Exception as e:
        print(e)

        return jsonify({
            "error": str(e)
        }), 500

# ---------------- SIGNUP API ----------------

@app.route('/signup', methods=['POST'])
def signup():

    data = request.json

    first_name = data.get('firstName')
    last_name = data.get('lastName')
    mobile = data.get('mobile')
    email = data.get('email')
    password = data.get('password')

    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({
            "error": "Email already registered"
        }), 400

    query = """
    INSERT INTO users
    (first_name, last_name, mobile, email, password)
    VALUES (%s, %s, %s, %s, %s)
    """

    cursor.execute(
        query,
        (first_name, last_name, mobile, email, password)
    )

    conn.commit()

    try:
        msg = Message(
            subject='Welcome to Traffic Sense AI',
            sender=app.config['MAIL_USERNAME'],
            recipients=[email]
        )

        msg.body = f"""
Hello {first_name},

Your registration was successful.

You can now log in to Traffic Sense AI.

Thank you,
Traffic Sense AI Team
"""

        mail.send(msg)

    except Exception as e:
        print("Mail Error:", e)

    return jsonify({
        "message": "Registration successful"
    })

# ---------------- ADD VEHICLE API ----------------

@app.route('/add-vehicle', methods=['POST'])
def add_vehicle():

    data = request.json

    email = data.get('email')
    rto = data.get('rtoNumber')
    vehicle_number = data.get('vehicleNumber')
    vehicle_type = data.get('vehicleType')
    fuel_type = data.get('fuelType')
    insurance_status = data.get('insuranceStatus')
    puc_status = data.get('pucStatus')

    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )

    user = cursor.fetchone()

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    user_id = user[0]

    cursor.execute(
        "SELECT id FROM vehicles WHERE rto_number = %s",
        (rto,)
    )

    existing = cursor.fetchone()

    if existing:
        return jsonify({
            "error": "RTO number already registered"
        }), 409

    cursor.execute(
        """
        INSERT INTO vehicles (
            user_id,
            rto_number,
            vehicle_number,
            vehicle_type,
            fuel_type,
            insurance_status,
            puc_status
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """,
        (
            user_id,
            rto,
            vehicle_number,
            vehicle_type,
            fuel_type,
            insurance_status,
            puc_status
        )
    )

    conn.commit()

    return jsonify({
        "message": "Vehicle added successfully"
    })
    
# ---------------- GET VEHICLES API ----------------

@app.route('/vehicles/<email>', methods=['GET'])
def get_vehicles(email):

    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )

    user = cursor.fetchone()

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    user_id = user[0]

    cursor.execute(
        """
        SELECT
            id,
            rto_number,
            vehicle_number,
            vehicle_type,
            fuel_type,
            insurance_status,
            puc_status
        FROM vehicles
        WHERE user_id = %s
        """,
        (user_id,)
    )

    vehicles = cursor.fetchall()

    result = []

    for vehicle in vehicles:
        result.append({
            "id": vehicle[0],
            "rtoNumber": vehicle[1],
            "vehicleNumber": vehicle[2],
            "vehicleType": vehicle[3],
            "fuelType": vehicle[4],
            "insuranceStatus": vehicle[5],
            "pucStatus": vehicle[6]
        })

    return jsonify(result)

# ---------------- PROFILE API ----------------

@app.route('/profile/<email>', methods=['GET'])
def profile(email):

    cursor.execute(
        """
        SELECT id, first_name, last_name, mobile, email
        FROM users
        WHERE email = %s
        """,
        (email,)
    )

    user = cursor.fetchone()

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    user_id = user[0]

    cursor.execute(
        """
        SELECT
            rto_number,
            vehicle_number,
            vehicle_type,
            fuel_type,
            insurance_status,
            puc_status
        FROM vehicles
        WHERE user_id = %s
        """,
        (user_id,)
    )

    vehicles = cursor.fetchall()

    vehicle_list = []

    for vehicle in vehicles:
        vehicle_list.append({
            "rtoNumber": vehicle[0],
            "vehicleNumber": vehicle[1],
            "vehicleType": vehicle[2],
            "fuelType": vehicle[3],
            "insuranceStatus": vehicle[4],
            "pucStatus": vehicle[5]
        })

    return jsonify({
        "firstName": user[1],
        "lastName": user[2],
        "mobile": user[3],
        "email": user[4],
        "rto": vehicles[0][0] if vehicles else "",
        "vehicles": vehicle_list
    })
    # ---------------- SOS API ----------------

@app.route("/send-sos", methods=["POST"])
def send_sos():
    try:
        data = request.get_json()

        user_id = data.get("user_id")
        latitude = data.get("latitude")
        longitude = data.get("longitude")

        if not user_id or latitude is None or longitude is None:
            return jsonify({
                "error": "Missing required fields"
            }), 400

        connection = mysql.connector.connect(
            host="localhost",
            user="traffic_user",
            password="vedant@24",
            database="traffic_db"
        )

        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT contact_name, phone_number
            FROM emergency_contacts
            WHERE user_id = %s
        """, (user_id,))

        contacts = cursor.fetchall()

        cursor.execute("""
            SELECT name, latitude, longitude
            FROM control_rooms
        """)

        control_rooms = cursor.fetchall()

        nearest_room = None
        min_distance = float("inf")

        for room in control_rooms:
            distance = math.sqrt(
                (latitude - room["latitude"]) ** 2 +
                (longitude - room["longitude"]) ** 2
            )

            if distance < min_distance:
                min_distance = distance
                nearest_room = room

        cursor.close()
        connection.close()

        return jsonify({
            "success": True,
            "contacts": contacts,
            "control_room": nearest_room["name"]
            if nearest_room else "No control room found"
        })

    except Exception as e:
        print(e)

        return jsonify({
            "error": str(e)
        }), 500


load_dotenv()


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()

        user_message = data.get("message", "")

        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=f"""
            You are TrafficSense AI.

            Help users with:
            - traffic rules
            - route planning
            - emergency services
            - road safety
            - fuel saving tips
            - congestion alerts

            User question:
            {user_message}
            """
        )

        return jsonify({
            "reply": response.text
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

# ---------------- RUN SERVER ----------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)