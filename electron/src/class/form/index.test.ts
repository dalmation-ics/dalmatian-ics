import * as FormParser from './index';

const HTML = '<div class=\'grid grid-pad ics-controls-grid\'><div class=\'col-1-1 text-center ics-controls\'><h5>**This form is intended to be viewed with BC_ICS**</h5><p>To operate without BC_ICS, complete form as normal then click the button below</p><br><button class=\'ics_BindData\'>Bind Data to FormComplete</button><p><span>[</span><span>Last Saved:&nbsp;</span><span class=\'lastSaved\'>Never</span><span>]</span></p><br><p><strong>Then save the web page via your browser\'s option menu or using the shortcut Ctrl+S</strong></p><p>This will provide you with an HTML file that can be shared</p></div></div><div class=\'invalid\' display=\'gone\'></div><div class=\'grid grid-pad\' id=\'ics_form\'><script>window.addEventListener("load",function(){var e=document.querySelector("#formInfoLink"),n=document.querySelector(".description-modal"),t=document.querySelector(".modal-close");e.addEventListener("click",function(){n.style.display="block"}),t.addEventListener("click",function(){n.style.display="none"}),window.addEventListener("click",function(e){e.target===n&&(n.style.display="none")})})</script><div class=\'col-1-1 text-center ics_Header\'><div class=\'col-4-12 ics_Title push-4-12\'><span>GENERAL MESSAGE</span></div><div class=\'col-1-12 ics_Id\'><span>ICS213</span></div><div class=\'col-1-12 ics_Version\'><span></span></div><div class=\'col-1-12\'><a href=\'#\' id=\'formInfoLink\'>FormComplete Info</a></div></div><div class=\'ics-container col-1-1 ics_IncidentName\'><div class=\'col-7-12\'><span>1. Incident Name: (Incident number is optional)<input class=\'ics_input\' id=\'inc_name\' type=\'text\'></span></div><div class=\'col-5-12\'><span>Msg# {Callsign}-{SeqNum}<input class=\'ics_input\' id=\'seqnum\' type=\'text\'></span></div></div><div class=\'ics-container col-1-1 ics_To\'><span>2. To (Name/Position)<input class=\'ics_input\' id=\'to_name\' type=\'text\'></span></div><div class=\'ics-container col-1-1 ics_To\'><span>3. From (Name/Position)*<input class=\'ics_input\' id=\'fm_name\' type=\'text\' required=\'required\'></span></div><div class=\'ics-container col-7-12 ics_Subject\'><span>4. Subject:<input class=\'ics_input\' id=\'subjectline\' type=\'text\'></span></div><div class=\'ics-container col-3-12 ics_Date\'><span>5. Date:<input class=\'ics_input\' id=\'mdate\' type=\'text\'></span></div><div class=\'ics-container col-2-12 ics_Time\'><span>6. Time:<input class=\'ics_Time\' id=\'mtime\' type=\'text\'></span></div><div class=\'ics-container col-1-1 ics_SpecialInstructions\'><span>7. Message (Be brief and concise)</span><textarea class=\'ics_input\' id=\'message\' rows=\'6\'></textarea></div><div class=\'ics-container col-1-1 ics_Footer\'><div class=\'col-6-12\'><span>8. Approved by:*</span><input class=\'ics_input\' id=\'approved_name\' type=\'text\' required=\'required\'></div><div class=\'col-6-12\'><span>Position / Title:</span><input class=\'ics_input\' id=\'approved_postitle\' type=\'text\' required=\'required\'></div></div><span>*required</span></div><div class=\'description-modal\'><div class=\'modal-content\'><div class=\'modal-header\'><span class=\'modal-close\'>&times;</span><div class=\'ics_Description\'><h2>ICS213 General Message</h2><p><strong>Purpose.</strong></p><p>The General Message (ICS 213) is used by incident dispatchers or others to record incoming messages that cannot or should not be orally transmitted to the intended recipients. The ICS 213 may also used by the Incident Command Post and other incident personnel to transmit messages (e.g., resource orders, incident name change, other coordination / information issues, to the Incident Communications Center for transmission via radio or telephone to the addressee. The form is used to send any message or notification to incident personnel that requires hard-copy delivery. This sent ICS 213 has the message information in plain text within the message body for non-Express users that can not view the HTML.</p><p><strong>Preparation.</strong></p><p>The ICS 213 may be initiated by incident dispatchers or any other personnel on an incident. Amateur Radio communicators make use of the 213 for messages beyond the incident and for wider purposes than designed, this is a good use of this versatile form.</p></div></div></div></div>';

describe('FormParser should ', () => {

    describe('have method parseForm that ', () => {

        it('exists', () => {

            expect(FormParser.parseForm).toBeDefined();

        });

        it('parses ICS210 correctly', () => {

            const result = FormParser.parseForm(HTML, 'dalmatian_ICS213', 'Thu Jul 5');

            expect(result.id).toEqual('ICS213');
            expect(result.name).toEqual('GENERAL MESSAGE');
            expect(result.detail).toMatch(/ICS213 General Message.*versatile form/);
            expect(result.lastModified).toEqual('Thu Jul 5');
            expect(result.fileName).toEqual('dalmatian_ICS213');

        });

    });

});
