using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ADASPrototips.API.Models;

namespace ADASPrototips.API.Data;

public class AutoPartsRequest
{
    [Key]
    public int Id { get; set; }

    public AutoPartsRequestStatus Status { get; set; }
    
    [MaxLength(1000)]
    public string Justification { get; set; }
    
    [InverseProperty(nameof(AutoPartsRequestComponent.Request))]
    public List<AutoPartsRequestComponent> Components { get; set; }
}