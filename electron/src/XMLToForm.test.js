"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var XMLToForm_1 = require("./XMLToForm");
var StorageManager = require("./StorageManager");
var sinon = require("sinon");
var XML_ICS210 = '<?xml version="1.0"?>\n' +
    '<RMS_Express_Form>\n' +
    '  <form_parameters>\n' +
    '    <xml_file_version>1.0</xml_file_version>\n' +
    '    <rms_express_version>1.5.12.0</rms_express_version>\n' +
    '    <submission_datetime>20180514002957</submission_datetime>\n' +
    '    <senders_callsign>W7SRG</senders_callsign>\n' +
    '    <grid_square>CN87XP</grid_square>\n' +
    '    <display_form>ICS210_Viewer.html</display_form>\n' +
    '    <reply_template></reply_template>\n' +
    '  </form_parameters>\n' +
    '  <variables>\n' +
    '    <msgto></msgto>\n' +
    '    <msgcc></msgcc>\n' +
    '    <msgsender>W7SRG</msgsender>\n' +
    '    <msgsubject>ICS217A-woah</msgsubject>\n' +
    '    <msgbody>\n' +
    'Date/Time (optional): \n' +
    'Incident/Event: woah\n' +
    'Frequency Band: OTHER\n' +
    'Description: woah\n' +
    '--------------------------------------\n' +
    '\n' +
    'CH1 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH2 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE:&lt;var RxTone2 \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH3 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH4 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH5 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH6 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH7 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH8 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH9 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH10 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH11 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH12 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH13 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH14 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH15 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH16 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH17 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH18 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH19 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS: \n' +
    '\n' +
    'CH20 CONFIG:\n' +
    '\n' +
    'CH NAME: \n' +
    'USERS: \n' +
    'RX FREQ:\n' +
    'TONE: \n' +
    'TX FREQ:\n' +
    'TONE: \n' +
    'MODE:- \n' +
    'REMARKS:  \n' +
    '\n' +
    '-----------------\n' +
    'Express Sender: W7SRG</msgbody>\n' +
    '    <msgp2p>False</msgp2p>\n' +
    '    <msgisreply>False</msgisreply>\n' +
    '    <msgisforward>False</msgisforward>\n' +
    '    <msgisacknowledgement>False</msgisacknowledgement>\n' +
    '    <msgseqnum>2</msgseqnum>\n' +
    '    <incident_name>woah</incident_name>\n' +
    '    <datefrom>1/2/3/4567</datefrom>\n' +
    '    <dateto>1/2/3/4567</dateto>\n' +
    '    <timefrom>1:23</timefrom>\n' +
    '    <timeto>1:23</timeto>\n' +
    '    <page1>1</page1>\n' +
    '    <page2>1</page2>\n' +
    '    <res1></res1>\n' +
    '    <sta1>available</sta1>\n' +
    '    <fro1></fro1>\n' +
    '    <to1></to1>\n' +
    '    <time1></time1>\n' +
    '    <date1></date1>\n' +
    '    <res2></res2>\n' +
    '    <sta2>out of service</sta2>\n' +
    '    <fro2></fro2>\n' +
    '    <to2></to2>\n' +
    '    <time2></time2>\n' +
    '    <date2></date2>\n' +
    '    <res3></res3>\n' +
    '    <sta3>assigned</sta3>\n' +
    '    <fro3>Connor</fro3>\n' +
    '    <to3>Jefferson</to3>\n' +
    '    <time3></time3>\n' +
    '    <date3></date3>\n' +
    '    <res4></res4>\n' +
    '    <sta4>------</sta4>\n' +
    '    <fro4></fro4>\n' +
    '    <to4></to4>\n' +
    '    <time4></time4>\n' +
    '    <date4></date4>\n' +
    '    <res5></res5>\n' +
    '    <sta5>------</sta5>\n' +
    '    <fro5></fro5>\n' +
    '    <to5></to5>\n' +
    '    <time5></time5>\n' +
    '    <date5></date5>\n' +
    '    <res6></res6>\n' +
    '    <sta6>------</sta6>\n' +
    '    <fro6></fro6>\n' +
    '    <to6></to6>\n' +
    '    <time6></time6>\n' +
    '    <date6></date6>\n' +
    '    <res7></res7>\n' +
    '    <sta7>------</sta7>\n' +
    '    <fro7></fro7>\n' +
    '    <to7></to7>\n' +
    '    <time7></time7>\n' +
    '    <date7></date7>\n' +
    '    <res8></res8>\n' +
    '    <sta8>------</sta8>\n' +
    '    <fro8></fro8>\n' +
    '    <to8></to8>\n' +
    '    <time8></time8>\n' +
    '    <date8></date8>\n' +
    '    <res9></res9>\n' +
    '    <sta9>------</sta9>\n' +
    '    <fro9></fro9>\n' +
    '    <to9></to9>\n' +
    '    <time9></time9>\n' +
    '    <date9></date9>\n' +
    '    <res10></res10>\n' +
    '    <sta10>------</sta10>\n' +
    '    <fro10></fro10>\n' +
    '    <to10></to10>\n' +
    '    <time10></time10>\n' +
    '    <date10></date10>\n' +
    '    <res11></res11>\n' +
    '    <sta11>------</sta11>\n' +
    '    <fro11></fro11>\n' +
    '    <to11></to11>\n' +
    '    <time11></time11>\n' +
    '    <date11></date11>\n' +
    '    <res12></res12>\n' +
    '    <sta12>------</sta12>\n' +
    '    <fro12></fro12>\n' +
    '    <to12></to12>\n' +
    '    <time12></time12>\n' +
    '    <date12></date12>\n' +
    '    <res13></res13>\n' +
    '    <sta13>------</sta13>\n' +
    '    <fro13></fro13>\n' +
    '    <to13></to13>\n' +
    '    <time13></time13>\n' +
    '    <date13></date13>\n' +
    '    <res14></res14>\n' +
    '    <sta14>------</sta14>\n' +
    '    <fro14></fro14>\n' +
    '    <to14></to14>\n' +
    '    <time14></time14>\n' +
    '    <date14></date14>\n' +
    '    <res15></res15>\n' +
    '    <sta15>------</sta15>\n' +
    '    <fro15></fro15>\n' +
    '    <to15></to15>\n' +
    '    <time15></time15>\n' +
    '    <date15></date15>\n' +
    '    <res16></res16>\n' +
    '    <sta16>------</sta16>\n' +
    '    <fro16></fro16>\n' +
    '    <to16></to16>\n' +
    '    <time16></time16>\n' +
    '    <date16></date16>\n' +
    '    <res17></res17>\n' +
    '    <sta17>------</sta17>\n' +
    '    <fro17></fro17>\n' +
    '    <to17></to17>\n' +
    '    <time17></time17>\n' +
    '    <date17></date17>\n' +
    '    <res18></res18>\n' +
    '    <sta18>------</sta18>\n' +
    '    <fro18></fro18>\n' +
    '    <to18></to18>\n' +
    '    <time18></time18>\n' +
    '    <date18></date18>\n' +
    '    <res19></res19>\n' +
    '    <sta19>------</sta19>\n' +
    '    <fro19></fro19>\n' +
    '    <to19></to19>\n' +
    '    <time19></time19>\n' +
    '    <date19></date19>\n' +
    '    <res20></res20>\n' +
    '    <sta20>------</sta20>\n' +
    '    <fro20></fro20>\n' +
    '    <to20></to20>\n' +
    '    <time20></time20>\n' +
    '    <date20></date20>\n' +
    '    <comments>woah!</comments>\n' +
    '    <submit>Submit</submit>\n' +
    '    <preparedname>woah</preparedname>\n' +
    '    <timedate>1/2/3/4567</timedate>\n' +
    '  </variables>\n' +
    '</RMS_Express_Form>';
var HTML_ICS210 = '<style>.grid:after,[class*=col-],[class*=grid]{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}[class*=col-]{float:left;min-height:1px;padding-right:20px}[class*=col-] [class*=col-]:last-child{padding-right:0}.grid{width:100%;max-width:1140px;min-width:748px;margin:0 auto;overflow:hidden}.grid:after{content:"";display:table;clear:both}.grid-pad{padding-top:20px;padding-left:20px;padding-right:0}.col-1-1{width:100%}.col-1-2{width:50%}.col-4-12{width:33.33%}.col-3-12{width:25%}.col-1-12{width:8.33%}.col-5-12{width:41.66%}.push-4-12{margin-left:33.33%}@media handheld,only screen and (max-width:767px){.grid{width:100%;min-width:0;margin-left:0;margin-right:0;padding-left:20px;padding-right:10px}[class*=col-]{width:auto;float:none;margin:10px 0;padding-left:0;padding-right:10px}[class*=col-] [class*=col-]{padding-right:0}}.text-center{text-align:center}.description-modal{display:none;position:fixed;z-index:1;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:#000;background-color:rgba(0,0,0,.4)}.modal-content{background-color:#fefefe;margin:15% auto;padding:0 20px;border:1px solid #888;width:80%}.modal-content *{font-family:Arial,Helvetica,sans-serif}.modal-close{color:#aaa;float:right;font-size:28px;font-weight:700}.modal-close:focus,.modal-close:hover{color:#000;text-decoration:none;cursor:pointer}.ics-controls{border:1px #000 solid;background-color:#cc94f3;padding:10px}.ics-controls-grid{display:none}.ics-controls h5,p{margin:0 2px}.ics-controls p{font-size:small}.ics-container{border:1px #000 solid;padding:6px;background-color:#fafaff}.ics-container *{font-family:Arial,Helvetica,sans-serif;font-size:small}.ics-table{border:1px solid #000;width:100%}.ics-table th{background:#ddd}.ics-table input{width:100%}.ics_input{width:100%;resize:none}.ics-first-row{min-height:100px}.ics_Header{background-color:#ffc;border:1px solid #000;padding:6px;margin:0}.ics_OperationPeriod input{max-width:100%}html{font-size:calc(1em + .25vw);text-rendering:optimizeLegibility}.invalid{background:#ffa07a}</style><script>function validate(){for(var e=document.querySelectorAll(".ics_input[required]"),t=!0,a=0;a<e.length;a++){var i=e[a],l=!0;switch(i.type){case"text":case"textarea":0===i.value.trim().length&&(l=!1);break;case"select-one":0===i.options[i.selectedIndex].value.trim().length&&(l=!1)}l?i.classList.remove("invalid"):(t=!1,i.classList.add("invalid"),console.log(i+" is invalid"))}return t}</script><script>function bindInputs(){var e=document.querySelectorAll(".ics_input");for(var t in e){var a=e[t];switch(a.type){case"text":a.setAttribute("value",a.value);break;case"textarea":a.innerHTML=a.value;break;case"select-one":a.options[a.selectedIndex].setAttribute("selected","selected")}}}</script><script>function validate(){for(var e=document.querySelectorAll(".ics_input[required]"),t=!0,a=0;a<e.length;a++){var i=e[a],l=!0;switch(i.type){case"text":case"textarea":0===i.value.trim().length&&(l=!1);break;case"select-one":0===i.options[i.selectedIndex].value.trim().length&&(l=!1)}l?i.classList.remove("invalid"):(t=!1,i.classList.add("invalid"),console.log(i+" is invalid"))}return t}</script><script>window.addEventListener("load",function(){var n,o,e=document.querySelector(".ics-controls-grid"),t=document.querySelector(".ics_BindData"),c=document.querySelector(".lastSaved");window.require&&window.require("electron")||(e.style.display="block"),o||(c.innerHTML="Never"),t.addEventListener("click",function(){if(console.log("click"),validate()){function e(){n++,c.innerHTML=n+(1<n?" seconds ago":" second ago")}n=0,o&&clearInterval(o),o=setInterval(e,1e3),e(),bindInputs()}})})</script><div class=\'grid grid-pad ics-controls-grid\'><div class=\'text-center col-1-1 ics-controls\'><h5>**This form is intended to be viewed with BC_ICS**</h5><p>To operate without BC_ICS, complete form as normal then click the button below</p><br><button class=\'ics_BindData\'>Bind Data to Form</button><p><span>[</span><span>Last Saved:&nbsp;</span><span class=\'lastSaved\'>Never</span><span>]</span></p><br><p><strong>Then save the web page via your browser\'s option menu or using the shortcut Ctrl+S</strong></p><p>This will provide you with an HTML file that can be shared</p></div></div><div class=\'invalid\' display=\'gone\'></div><div class=\'grid grid-pad\'><script>window.addEventListener("load",function(){var e=document.querySelector("#formInfoLink"),n=document.querySelector(".description-modal"),t=document.querySelector(".modal-close");e.addEventListener("click",function(){n.style.display="block"}),t.addEventListener("click",function(){n.style.display="none"}),window.addEventListener("click",function(e){e.target===n&&(n.style.display="none")})})</script><div class=\'text-center col-1-1 ics_Header\'><div class=\'col-4-12 ics_Title push-4-12\'><span>RESOURCE STATUS CHANGE</span></div><div class=\'col-1-12 ics_Id\'><span>ICS210</span></div><div class=\'col-1-12 ics_Version\'><span>Ver 8</span></div><div class=\'col-1-12\'><a href=\'#\' id=\'formInfoLink\'>Form Info</a></div></div><div class=\'text-center ics-container col-1-2 ics-first-row ics_IncidentName\'><span>1. Incident Name*</span><br><input class=\'ics_input\' id=\'incident_name\' type=\'text\' required=\'required\'></div><div class=\'text-center ics-container col-1-2 ics-first-row ics_OperationPeriod\'><span>2. Operational Period*</span><div><div class=\'col-3-12\'><span>Date From:</span></div><div class=\'col-3-12\'><input class=\'ics_input\' id=\'datefrom\' type=\'text\' required=\'required\'></div><div class=\'col-3-12\'><span>Date To:</span></div><div class=\'col-3-12\'><input class=\'ics_input\' id=\'dateto\' type=\'text\' required=\'required\'></div></div><div><div class=\'col-3-12\'><span>Time From:</span></div><div class=\'col-3-12\'><input class=\'ics_input\' id=\'timefrom\' type=\'text\' required=\'required\'></div><div class=\'col-3-12\'><span>Time To:</span></div><div class=\'col-3-12\'><input class=\'ics_input\' id=\'timeto\' type=\'text\' required=\'required\'></div></div></div><div class=\'text-center col-1-1 ics-container ics_Page\'><span>If additional pages are needed, use another ICS210 and paginate as needed. Page*<input class=\'ics_input\' id=\'page1\' type=\'text\' required=\'required\' style=\'width:3%\'></span><span>of*<input class=\'ics_input\' id=\'page2\' type=\'text\' required=\'required\' style=\'width:3%\'></span></div><div class=\'text-center col-1-1 ics-container ics_ResourceStatusChange\'><table border=\'1\' class=\'ics-table\'><tr><th style=\'width:10%\'>3. Resource #</th><th style=\'width:10%\'>4. New Status</th><th style=\'width:30%\'>5. From (Assignment & Status)</th><th style=\'width:30%\'>6. To (Assignment & Status)</th><th style=\'width:20%\' colspan=\'2\'>7. Time & Date of Change</th></tr><tr><td><input class=\'ics_input\' id=\'res1\' type=\'text\'></td><td><select id=\'sta1\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro1\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to1\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time1\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res2\' type=\'text\'></td><td><select id=\'sta2\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro2\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to2\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time2\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res3\' type=\'text\'></td><td><select id=\'sta3\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro3\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to3\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time3\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res4\' type=\'text\'></td><td><select id=\'sta4\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro4\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to4\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time4\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res5\' type=\'text\'></td><td><select id=\'sta5\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro5\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to5\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time5\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res6\' type=\'text\'></td><td><select id=\'sta6\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro6\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to6\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time6\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res7\' type=\'text\'></td><td><select id=\'sta7\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro7\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to7\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time7\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res8\' type=\'text\'></td><td><select id=\'sta8\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro8\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to8\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time8\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res9\' type=\'text\'></td><td><select id=\'sta9\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro9\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to9\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time9\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res10\' type=\'text\'></td><td><select id=\'sta10\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro10\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to10\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time10\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res11\' type=\'text\'></td><td><select id=\'sta11\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro11\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to11\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time11\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res12\' type=\'text\'></td><td><select id=\'sta12\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro12\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to12\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time12\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res13\' type=\'text\'></td><td><select id=\'sta13\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro13\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to13\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time13\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res14\' type=\'text\'></td><td><select id=\'sta14\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro14\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to14\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time14\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res15\' type=\'text\'></td><td><select id=\'sta15\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro15\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to15\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time15\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res16\' type=\'text\'></td><td><select id=\'sta16\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro16\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to16\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time16\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res17\' type=\'text\'></td><td><select id=\'sta17\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro17\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to17\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time17\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res18\' type=\'text\'></td><td><select id=\'sta18\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro18\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to18\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time18\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res19\' type=\'text\'></td><td><select id=\'sta19\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro19\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to19\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time19\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr><tr><td><input class=\'ics_input\' id=\'res20\' type=\'text\'></td><td><select id=\'sta20\'><option value=\'-\'>-</option><option value=\'available\'>available</option><option value=\'assigned\'>assigned</option><option value=\'out of service\'>out of service</option></select></td><td><input class=\'ics_input\' id=\'fro20\' type=\'text\'></td><td><input class=\'ics_input\' id=\'to20\' type=\'text\'></td><td><input class=\'ics_input\' id=\'time20\' type=\'text\'></td><td><input class=\'ics_input\' id=\'date\' type=\'text\'></td></tr></table></div><div class=\'text-center col-1-1 ics-container ics_Comments\'><span>8. Comments (Be brief and accurate)<textarea class=\'ics_input\' cols=\'2\' id=\'comments\'></textarea></span></div><div class=\'col-1-1 ics-container ics_Footer\'><div class=\'col-1-12\'></div><div class=\'col-5-12\'><span>9. Prepared By:</span><input class=\'ics_input\' id=\'preparedname\' type=\'text\' required=\'required\'></div><div class=\'col-5-12\'><span>Date/Time:</span><input class=\'ics_input\' id=\'timedate\' type=\'text\' required=\'required\'></div></div></div><div class=\'description-modal\'><div class=\'modal-content\'><div class=\'modal-header\'><span class=\'modal-close\'>&times;</span><div class=\'ics_Description\'><h2>ICS 205 Incident Radio Communications Plan</h2><p><strong>Purpose.</strong></p><p>The Resource Status Change (ICS 210) is used by the Incident Communications Center Manager to record status change information received on resources assigned to the incident. The ICS 210 is essentially a message form that can be used to update Resource Status Cards or T-Cards (ICS 219) for incident-level resource management.</p></div></div></div></div>';
var sandbox;
describe('XMLToForm should ', function () {
    beforeEach(function () {
        sandbox = sinon.createSandbox();
    });
    afterEach(function () {
        sandbox.restore();
    });
    it('resolve true to be true', function () {
        expect(true).toBe(true);
    });
    it('works with ICS205A', function () { return __awaiter(_this, void 0, void 0, function () {
        var stub_read;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stub_read = sandbox.stub(StorageManager, 'read');
                    stub_read.withArgs('/forms', 'bcics_ICS210').resolves(HTML_ICS210);
                    return [4 /*yield*/, XMLToForm_1.convertFromXML(XML_ICS210).then(function (result) {
                            console.log(result);
                            expect(true).toBe(true);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
