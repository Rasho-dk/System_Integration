window.paypal
  .Buttons({
    style: {
      shape: "rect",
      layout: "vertical",
      color: "gold",
      label: "paypal",
    },

    async createOrder() {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Hardcoded cart data for the example
          body: JSON.stringify({
            cart: [
              {
                id: "1",
                quantity: 5,
              },
            ],
          }),
        });

        const orderData = await response.json();

        // Debgging: Log the order data to the console
        console.log("orderData: ", orderData);
        orderData.intent = "CAPTURE";
        console.log("intent: ", orderData.intent);
        console.log("orderData: ", orderData);


        // Check if the order was created successfully and has an ID 
        if (orderData.id) {
          return orderData.id;
        }
        // If the order was not created successfully, throw an error
        const errorDetail = orderData?.details?.[0];
        // If there is an error detail, use it to create a more informative error message
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      } catch (error) {
        console.error(error);
        resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
      }
    },  

    // This function captures the funds from the transaction using data from that created from createOrder()
    async onApprove(data, actions) {
      try {
        const response = await fetch(`/api/orders/${data.orderID}/capture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const orderData = await response.json();
       
        // Three cases to handle:
        //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart() To handle the error, restart the payment with diffrent funding source
        //   (2) Other non-recoverable errors -> Show a failure message
        //   (3) Successful transaction -> Show confirmation or thank you message

        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          // recoverable state, per
          // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
          return actions.restart();
        } else if (errorDetail) {
          // (2) Other non-recoverable errors -> Show a failure message
          throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
        } else if (!orderData.purchase_units) {
          throw new Error(JSON.stringify(orderData));
        } else {
          // (3) Successful transaction -> Show confirmation or thank you message
          // Or go to another URL:  actions.redirect('thank_you.html');
          const transaction =
            orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
            orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
          resultMessage(
            `Transaction ${transaction.status}: ${transaction.id}<br>
          <br>See console for all available details`
          );
          console.log(
            "Capture result",
            orderData,
            JSON.stringify(orderData, null, 2)
          );
        }
      } catch (error) {
        console.error(error);
        resultMessage(
          `Sorry, your transaction could not be processed...<br><br>${error}`
        );
      }
    },
  })
  .render("#paypal-button-container");

// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
}
