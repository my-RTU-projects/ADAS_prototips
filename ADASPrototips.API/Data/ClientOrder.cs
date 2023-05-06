using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ADASPrototips.API.Data;

public class ClientOrder
{
    [Key]
    public int Id { get; set; }
    
    public int ClientId { get; set; }
    
    [MaxLength(1000)]
    public string Description { get; set; }
    
    [MaxLength(1000)]
    public string Comment { get; set; }
    
    public float? Bill { get; set; }
    
    public float? Expenses { get; set; }
    
    [ForeignKey(nameof(ClientId))]
    public Client Client { get; set; }
}