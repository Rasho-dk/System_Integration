namespace Paypal_server.MockData;

public class MockItems
{
    private static List<Item> _items = new()
    {
        new Item()
        {
            Id = 1,
            Name = "Item 1",
            Description = "Description for Item 1",
            Price = 10.00M,
            Currency = "DKK",
            Quantity = 1
        },
        new Item()
        {
            Id = 2,
            Name = "Item 2",
            Description = "Description for Item 2",
            Price = 20.00M,
            Currency = "DKK",
            Quantity = 1
        },
    };
        
    public static List<Item> GetMockItems()
    {
        return _items;
    }
    
}

public record Item
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Currency { get; set; }
    public int Quantity { get; set; }
}