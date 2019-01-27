class Form {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

export const mockSingleFormArchive = [
  {
    detail:
      "<h2>ICS 214 Activity Log</h2><p>" +
      "<strong>Purpose.</strong></p><p>The Activity Log (ICS 214) records details of notable activities at any ICS level, including single resources, equipment, Task Forces, etc. These logs provide basic incident activity documentation, and a reference for any afteraction report.</p><p><strong>Preparation.</strong></p><p>An ICS 214 can be initiated and maintained by personnel in various ICS positions as it is needed or appropriate. Personnel should document how relevant incident activities are occurring and progressing, or any notable events or communications.</p><p><strong>Distribution.</strong></p><p>Completed ICS 214s are submitted to supervisors, who forward them to the Documentation Unit. All completed original forms must be given to the Documentation Unit, which maintains a file of all ICS 214s. It is recommended that individuals retain a copy for their own records.</p><p><strong>Notes:</strong></p><p>Use additional copies as continuation sheets as needed, and indicate pagination as used.</p><p><strong>NOTE: The Date/Time are entered for you by clicking on the Date/Time cell. You can change by clicking again and overwrite if needed. Each click on a cell will increment the Date and Time.</strong></p>",
    fileName: "bcics_ICS214",
    id: "ICS214",
    name: "ACTIVITY LOG"
  }
];

export default [
  new Form("ics204", "dummy test forms", "An Assignment List"),
  new Form("ics214", "dummy test forms 2", "An Assignment List 2")
];
