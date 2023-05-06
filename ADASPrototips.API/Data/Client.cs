using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ADASPrototips.API.Data;

public class Client
{
    [Key]
    public int Id { get; set; }
    
    [MaxLength(50)]
    public string Name { get; set; }
    
    [MaxLength(12)]
    public string Phone { get; set; }
    
    [InverseProperty(nameof(ClientOrder.Client))]
    public List<ClientOrder> Orders { get; set; }
}