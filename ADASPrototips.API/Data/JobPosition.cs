using System.ComponentModel.DataAnnotations;

namespace ADASPrototips.API.Data;

public class JobPosition
{
    [Key]
    public int Id { get; set; }
    
    [MaxLength(50)]
    public string Name { get; set; }
}