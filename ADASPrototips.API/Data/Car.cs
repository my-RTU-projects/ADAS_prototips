using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ADASPrototips.API.Data;

public class Car
{
    [Key]
    public int Id { get; set; }
    
    public int OwnerId { get; set; }
    
    [MaxLength(10)]
    public string LicensePlate { get; set; }
    
    [MaxLength(50)]
    public string Model { get; set; }
    
    [ForeignKey(nameof(OwnerId))]
    public Client Owner { get; set; }
}