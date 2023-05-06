namespace ADASPrototips.API.Models;

public class ClientOrderModel
{
    public int Id { get; set; }
    
    public int ClientId { get; set; }
    
    public string Description { get; set; }

    public string Comment { get; set; }
    
    public float? Bill { get; set; }
    
    public float? Expenses { get; set; }
}