from flask import Flask, request, jsonify
from forex_python.converter import CurrencyRates

app = Flask(__name__)

# Initialize the CurrencyRates class
c = CurrencyRates()

# Currency conversion route
@app.route("/convert", methods=["POST"])
def convert_currency():
    try:
        data = request.json
        from_currency = data["from_currency"]
        to_currency = data["to_currency"]
        amount = data["amount"]

        # Convert the currency
        converted_amount = c.convert(from_currency, to_currency, amount)
        
        return jsonify({"converted_amount": converted_amount})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
