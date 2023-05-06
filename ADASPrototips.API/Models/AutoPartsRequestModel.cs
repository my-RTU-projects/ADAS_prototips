namespace ADASPrototips.API.Models;

public class AutoPartsRequestModel
{
    public int Id { get; set; }

    public AutoPartsRequestStatus Status { get; set; }
    
    public string Justification { get; set; }
    
    public List<AutoPartsRequestComponentModel> Components { get; set; }
}