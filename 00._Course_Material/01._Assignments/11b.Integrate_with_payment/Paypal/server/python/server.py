import logging
import os

from flask import Flask, request, Response
from paypalserversdk.http.auth.o_auth_2 import ClientCredentialsAuthCredentials
from paypalserversdk.logging.configuration.api_logging_configuration import (
    LoggingConfiguration,
    RequestLoggingConfiguration,
    ResponseLoggingConfiguration,
)
from paypalserversdk.paypal_serversdk_client import PaypalServersdkClient
from paypalserversdk.controllers.orders_controller import OrdersController
from paypalserversdk.models.amount_with_breakdown import AmountWithBreakdown
from paypalserversdk.models.checkout_payment_intent import CheckoutPaymentIntent
from paypalserversdk.models.order_request import OrderRequest
from paypalserversdk.models.purchase_unit_request import PurchaseUnitRequest
from paypalserversdk.api_helper import ApiHelper

app = Flask(__name__)

# Example product in DB 
# In a real-world application, we will fetch this from a database
CURRENCY_CODE = "DKK"
PRODUCTS = {
    "1": {"name": "Product 1", "price": 100},
    "2": {"name": "Product 2", "price": 200},
}

paypal_client: PaypalServersdkClient = PaypalServersdkClient(
    client_credentials_auth_credentials=ClientCredentialsAuthCredentials(
        o_auth_client_id=os.getenv("PAYPAL_CLIENT_ID"),
        o_auth_client_secret=os.getenv("PAYPAL_CLIENT_SECRET"),
    ),
    logging_configuration=LoggingConfiguration(
        log_level=logging.INFO,
        # Disable masking of sensitive headers for Sandbox testing.
        # This should be set to True (the default if unset)in production.
        mask_sensitive_headers=False,
        request_logging_config=RequestLoggingConfiguration(
            log_headers=True, log_body=True
        ),
        response_logging_config=ResponseLoggingConfiguration(
            log_headers=True, log_body=True
        ),
    ),
)

"""
Health check
"""


@app.route("/", methods=["GET"])
def index():
    return {"message": "Server is running"}


orders_controller: OrdersController = paypal_client.orders

@app.route("/api/orders", methods=["POST"])
def create_order():

    request_body = request.get_json()

    # use the cart information passed from the front-end to calculate the order amount detals
    cart = request_body["cart"]

    # Using PRODUCTS dict to get the product details
    total_amount = 0.0
    for item in cart:
        product = PRODUCTS.get(item["id"])
        print(f"Product: {product}")
        if not product:
            return Response(
                "Product not found", status=404, mimetype="application/json"
            )
        total_amount += product["price"] * item["quantity"]

    # Create purchase units based on the cart items
    purchase_units = [
        PurchaseUnitRequest(
            AmountWithBreakdown(currency_code=CURRENCY_CODE, value=f"{total_amount:.2f}")
        )
    ]
    order = orders_controller.create_order(
        {
            "body": OrderRequest(
                intent=CheckoutPaymentIntent.CAPTURE, # we are capturing the payment right away.
                purchase_units=  purchase_units, # use the cart information passed from the front-end to calculate the order amount detals
            ),
            "prefer": "return=representation",
        }
    )
    return Response(
        ApiHelper.json_serialize(order.body), status=200, mimetype="application/json"
    )


@app.route("/api/orders/<order_id>/capture", methods=["POST"])
def capture_order(order_id):
    order = orders_controller.capture_order(
        {"id": order_id, "prefer": "return=representation"}
    )
    return Response(
        ApiHelper.json_serialize(order.body), status=200, mimetype="application/json"
    )
