namespace ADASPrototips.API.Models;

public class AutoPartModel
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string ProductNumber { get; set; }
    
    public int Quantity { get; set; }
    
    public float Price { get; set; }
    
    public float PurchasePrice { get; set; }
}