using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ADASPrototips.API.Data;

public class Worker
{
    [Key]
    public int Id { get; set; }
    
    public int PositionId { get; set; }
    
    [MaxLength(50)]
    public string FirstName { get; set; }
    
    [MaxLength(50)]
    public string LastName { get; set; }
    
    [MaxLength(20)]
    public string Phone { get; set; }
    
    [MaxLength(40)]
    public string Email { get; set; }
    
    [MaxLength(100)]
    public string Skills { get; set; }
    
    [MaxLength(50)]
    public float Salary { get; set; }
    
    public DateTime BirthDay { get; set; }
    
    [ForeignKey(nameof(PositionId))]
    public JobPosition Position { get; set; }
}