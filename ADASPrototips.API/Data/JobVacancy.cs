using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ADASPrototips.API.Data;

public class JobVacancy
{
    [Key]
    public int Id { get; set; }
    
    public int PositionId { get; set; }
    
    [MaxLength(1000)]
    public string DesiredSkills { get; set; }
    
    [ForeignKey(nameof(PositionId))]
    public JobPosition Position { get; set; }
}