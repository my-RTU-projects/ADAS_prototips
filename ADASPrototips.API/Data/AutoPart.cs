using System.ComponentModel.DataAnnotations;

namespace ADASPrototips.API.Data;

public class AutoPart
{
    [Key]
    public int Id { get; set; }
    
    [MaxLength(50)]
    public string Name { get; set; }
    
    [MaxLength(50)]
    public string ProductNumber { get; set; }
    
    public int Quantity { get; set; }
    
    public float Price { get; set; }
    
    public float PurchasePrice { get; set; }
}