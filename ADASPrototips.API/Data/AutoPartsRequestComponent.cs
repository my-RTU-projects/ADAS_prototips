using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ADASPrototips.API.Data;

public class AutoPartsRequestComponent
{
    [Key]
    public int Id { get; set; }
    
    public string AutoPartProductNumber { get; set; }
    
    public int RequestId { get; set; }
    
    public int Quantity { get; set; }
    
    [ForeignKey(nameof(RequestId))]
    public AutoPartsRequest Request { get; set; }
}