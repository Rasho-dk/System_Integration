using Microsoft.AspNetCore.Mvc;
/*
using Newtonsoft.Json;
*/
using PaypalServerSdk.Standard;
using PaypalServerSdk.Standard.Authentication;
using PaypalServerSdk.Standard.Controllers;
using PaypalServerSdk.Standard.Http.Response;
using PaypalServerSdk.Standard.Models;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;
using Newtonsoft.Json;


namespace Paypal_server.Controllers;

[Route("api/")] // This is the default route
[ApiController]
public class CheckoutController : Controller
{
    //Mock data
    private List<MockData.Item> _items;

    private const string CurrencyCode = "DKK";
    private readonly OrdersController _ordersController;
    private readonly PaymentsController _paymentsController;
    
    #region environment variables
    private IConfiguration _configuration { get; }
    private string? _paypalClientId => System.Environment.GetEnvironmentVariable("PAYPAL_CLIENT_ID");

    private string? _paypalClientSecret =>  System.Environment.GetEnvironmentVariable("PAYPAL_CLIENT_SECRET"); 
 
    #endregion
    
    #region ILogger
    private readonly ILogger<CheckoutController> _logger;
    #endregion
    
    
    public CheckoutController(IConfiguration configuration, ILogger<CheckoutController> logger)
    {
        //Mock Data
        _items = MockData.MockItems.GetMockItems();
        
        _configuration = configuration;
        _logger = logger;
        // Check if the environment variables are set
        if (string.IsNullOrEmpty(_paypalClientId) || string.IsNullOrEmpty(_paypalClientSecret))
        {
            throw new Exception("PayPal client ID and secret must be set in environment variables.");
        }
    
        // Initialize the PayPal SDK client
        PaypalServerSdkClient client = new PaypalServerSdkClient.Builder()
            // using sandbox environment for testing environment
            .Environment(PaypalServerSdk.Standard.Environment.Sandbox)
            .ClientCredentialsAuth(
                new ClientCredentialsAuthModel.Builder(_paypalClientId, _paypalClientSecret).Build()
            )
            .LoggingConfig(config =>
                config
                    .LogLevel(LogLevel.Information)
                    .RequestConfig(reqConfig => reqConfig.Body(true))
                    .ResponseConfig(respConfig => respConfig.Headers(true))
            )
            .Build();
    
        _ordersController = client.OrdersController;
        _paymentsController = client.PaymentsController;
    }
    
    
    // Health check endpoint
    [HttpGet("health")]
    public IActionResult Index()
    {
        return Ok("Server is running");
    }

    
    [HttpPost("orders")]
    [ProducesResponseType(typeof(Order), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateOrder([FromBody] CartRequest cartRequest)
    {
        try
        {
            //Create an order using the PayPal SDK; OBS: here we are integrating the PayPal SDK
            var result = await _CreateOrder(cartRequest);
            return StatusCode((int)result.StatusCode, result.Data);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine("Failed to create order:", ex);
            return StatusCode(500, new { error = "Failed to create order." });
        }
    }
    
    [HttpPost("orders/{orderID}/capture")]
    public async Task<IActionResult> CaptureOrder(string orderID)
    {
        try
        {
            var result = await _CaptureOrder(orderID);
            return StatusCode((int)result.StatusCode, result.Data);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine("Failed to capture order:", ex);
            return StatusCode(500, new { error = "Failed to capture order." });
        }
    }
    
    
    #region Helper methods to create order and capture payment
    /// <summary>
    /// This method creates an order using the PayPal SDK and validate it.
    /// </summary>
    /// <param name="cart">The cart object containing order details.</param>
    /// <returns>A dynamic object containing the order details.</returns>
    private async Task<dynamic> _CreateOrder(dynamic cart)
    {
        // Retrieve the items from the cart
        List<MockData.Item> items = GetItemsFromCart(cart);
        // Calculate the total amount
        decimal totalAmount = items.Sum(item => 
            (item.Price) * (item.Quantity));
        
        //F2: used as rounding to 2 decimal places .i.e. 123.456 becomes 123.46
        string totalAmountString = totalAmount.ToString("F2", System.Globalization.CultureInfo.InvariantCulture);
        
        
        // We are capturing the payment immediately after the order is created that's mean we are using CAPTURE intent instead of AUTHORIZE
        CheckoutPaymentIntent intent = (CheckoutPaymentIntent)
            Enum.Parse(typeof(CheckoutPaymentIntent), "CAPTURE", true);
        
        // Inegrate the PayPal SDK to create an order
        CreateOrderInput createOrderInput = new CreateOrderInput
        {
            Body = new OrderRequest
            {   
                Intent = intent,
                PurchaseUnits = new List<PurchaseUnitRequest>
                {
                    new PurchaseUnitRequest
                    {
                        Amount = new AmountWithBreakdown { CurrencyCode = CurrencyCode, MValue =  totalAmountString},
                    },
                },
            },
        };
        
        ApiResponse<Order> result = await _ordersController.CreateOrderAsync(createOrderInput);
        
        result.Data.Intent = (CheckoutPaymentIntent)MyCheckoutPaymentIntent.CAPTURE;
        return result;
    }
    
    /// <summary>
    /// This method captures the order using the PayPal SDK.
    /// </summary>
    /// <param name="orderID">The ID of the order to be captured.</param>
    /// <returns>A dynamic object containing the capture details.</returns>
    private async Task<dynamic> _CaptureOrder(string orderID)
    {
        CaptureOrderInput ordersCaptureInput = new CaptureOrderInput { Id = orderID };
    
        ApiResponse<Order> result = await _ordersController.CaptureOrderAsync(ordersCaptureInput);
    
        return result; 
    }
    
    // fetch all items and loop through them to match the id from the request
    private List<MockData.Item> GetItemsFromCart(CartRequest cartRequest)
    {
        List<MockData.Item> items = new List<MockData.Item>();

        var carts = cartRequest.Cart;
        if (carts == null || carts.Count == 0)
        {
            throw new ArgumentException("Cart is empty");
        }
        // Loop through the cart items and find the matching items in the mock data
        // Here we are using the first item in the cart to match the id
        foreach (var cart in carts)
        {
            if (cart.Id == 0)
            {
                throw new ArgumentException("Item ID is invalid");
            }
            var mockItem = _items.FirstOrDefault(i => i.Id == cart.Id);
            if (mockItem != null)
            {
                items.Add(new MockData.Item
                {
                    Price = mockItem.Price,
                    Quantity = cart.Quantity,
                    
                });
            }
            else
            {
                throw new ArgumentException($"Item with ID {cart.Id} not found");
            }
        }

        return items;
    }
    
    
    
    #endregion
    
    

}

public record CartItem
{
    [JsonProperty("id")]
    public int Id { get; set; }
    [JsonProperty("quantity")]
    public int Quantity { get; set; }
}

public record CartRequest
{
    [JsonProperty("items")]
    public List<CartItem> Cart { get; set; }
}

public enum MyCheckoutPaymentIntent
{
    CAPTURE
}
