from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


# Display the website
@app.route("/")
def home():
    return render_template("index.html")


# Back-end API to add two numbers
@app.route("/api/add", methods=["POST"])
def add_numbers():
    data = request.get_json()

    try:
        num1 = float(data["num1"])
        num2 = float(data["num2"])

        result = num1 + num2

        return jsonify({
            "result": result
        })

    except (KeyError, TypeError, ValueError):
        return jsonify({
            "error": "Please provide two valid numbers."
        }), 400


if __name__ == "__main__":
    app.run(debug=True)