namespace ADASPrototips.API.Models;

public class WorkerModel
{
    public int Id { get; set; }
    
    public int PositionId { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string Phone { get; set; }

    public string Email { get; set; }

    public string Skills { get; set; }

    public float Salary { get; set; }
    
    public DateTime BirthDay { get; set; }
}