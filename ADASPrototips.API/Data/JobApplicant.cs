using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ADASPrototips.API.Models;

namespace ADASPrototips.API.Data;

public class JobApplicant
{
    [Key]
    public int Id { get; set; }
    
    public int VacancyId { get; set; }
    
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
    
    public JobVacancyResponse Response { get; set; }
    
    [ForeignKey(nameof(VacancyId))]
    public JobVacancy Vacancy { get; set; }
}