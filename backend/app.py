from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os



app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, "database.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    init_contact_tables(conn)

    return conn

@app.route("/api/data", methods=["GET"])
def get_data():
    conn = get_db()
    rows = conn.execute("SELECT id, content FROM data").fetchall()
    conn.close()
    return jsonify(rows)

@app.route("/api/data", methods=["POST"])
def add_data():
    content = (request.json or {}).get("content")
    if not content:
        return jsonify(success=False, error="Empty content"), 400
    conn = get_db()
    conn.execute("INSERT INTO data (content) VALUES (?)", (content,))
    conn.commit()
    conn.close()
    return jsonify(success=True)


def init_contact_tables(conn):
    conn.execute("""
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

@app.route("/api/contact", methods=["POST"])
def submit_contact():
    data = request.json or {}
    message = (data.get("message") or "").strip()
    if not message:
        return jsonify(success=False, error="Message required"), 400
    conn = get_db()
    conn.execute(
        "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
        (data.get("name"), data.get("email"), message)
    )
    conn.commit()
    conn.close()
    return jsonify(success=True)




@app.route("/api/admin/stats")
def admin_stats():
    return jsonify(success=True, status="ok")


@app.route("/api/health")
def health():
    return jsonify(status="ok")

if __name__ == "__main__":
    app.run(port=5001, debug=True)
