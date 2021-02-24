import moment from 'moment';
import store from 'store2';
import { Redirect } from 'react-router-dom';
//import axios from 'axios';

export function getLoggedUserDetails(dataType) {
    const localData = store.get("loggeduser");
    return localData[dataType.toLowerCase()];
    /* ======== Local Data values =======
    id_number: "810514",
    email: "admin@uc.edu.ph",
    usertype: "Administrator",
    fullname: "James Vasquez Jr",
    courseyear: "EDP",
    coursecode: "EDP",
    courseabbr: "EDP",
    yearlevel: ""
    */
   
}

export function checkStudentType(idnumber, currentPrefix) {
    const trimmed = idnumber.replace(/\s/g,'')
    return (trimmed.length === 8 && trimmed.substring(0, 2) <= currentPrefix) ? "OLD" : "NEW";
}

export function ValidateEmail(email)
{
    let mailformat = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;  
    if(mailformat.test(email)) return true;
    else return false;
    /*
    const apiEmailCheck = stringFindAndReplace(process.env.REACT_APP_API_TRUEMAIL_VALIDATOR, "<email>", email);
    axios.get(apiEmailCheck)
    .then(response => {
        console.log(response.data);      
    }).catch(error => {
        console.log(error);
    });
    */
}

export function ValidatePassword(password) 
{
  //# Start of group
  //(?=.*\d)      #   must contains one digit from 0-9
  //(?=.*[a-z])   #   must contains one lowercase characters
  //(?=.*[A-Z])   #   must contains one uppercase characters
  //(?=.*[@#$%])  #   must contains one special symbols in the list "@#$%"
  //        .     #   match anything with previous condition checking
  //    {8,40}    #   length at least 8 characters and maximum of 40 
  let passwordformat = /((?=.*\d)(?=.*[a-z]).{6,40})/;  
    if(passwordformat.test(password)) return true;
    else return false;
   
}

export function isValidDate(dateString) //Only for YYYY-MM-DD format 
{
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
}

export function YearsBetween(start, end, sort=null)
{    
    let years = moment(end).diff(start, 'years');
    let yearsBetween = [];
    for(var year = 0; year < years + 1; year++) {
        yearsBetween.push(start.getFullYear() + year);
    }

    return (sort != null && sort.trim().toLowerCase() === "desc") ? yearsBetween.reverse() : yearsBetween;
}

export function sortArrayObjectsByProp(arrayObj, prop)
{
    return arrayObj.sort(function(a, b){
        if(a[prop] < b[prop]) { return -1; }
        if(a[prop] > b[prop]) { return 1; }
        return 0;
    });    
}

export function deleteArrayObjectsProp(arrayObj, prop)
{
    return arrayObj.map(function(item) { 
        delete item[prop]; 
        return item; 
    });
}

// created to escape reactjs error on vanilla javascript sting.replace function
export function stringFindAndReplace(haystack, needle, toreplace)
{
    return haystack.replace(needle, toreplace);
}

//Both arrays should have identical structure (same keys/index)
export function moveObjectBetweenArray(fromArray, toArray, arrayKey, objIDValuetoMove)
{
    let toReturn = {};
    let tempToArray = [];
    let tempFromArray = [];
    const foundObj = fromArray.find(el => el[arrayKey] === objIDValuetoMove);
    if(foundObj) {
        tempToArray = [...toArray];
        tempToArray.push(foundObj);
        tempFromArray = [...fromArray]; 
        tempFromArray = tempFromArray.filter(document => document[arrayKey] !== objIDValuetoMove);  
    }    
    toReturn = {
        fromArr: tempFromArray,
        toArr: tempToArray
    }

    return toReturn;
}

export function getDifferenceBetweenArrayObjects(arrayMinuens, arraySubtrahend, keyIndex)
{
    return arrayMinuens.filter(min => !arraySubtrahend.find(sub => min[keyIndex] === sub[keyIndex])); 
      
}

export function checkIfObjectExistInArray(array, key, value) 
{
    return array.filter(arrItem => arrItem[key] === value);
}

export function truncateStringAddEllipses(text, max) 
{
    return text.substr(0,max-1)+(text.length>max?'...':''); 
}

export function determineEnrollmentStepStatus(status, allStatus)
{
    // done,current, process, denied, next
    
    let toReturn = "next";
    if(status.done > 0 && status.approved > 0) toReturn = "done";
    if(status.done > 0 && status.approved === 0) toReturn = "denied";

    var currentStep = false;
    for (let i = 0; i < allStatus.length; i++) {
        //console.log("fxn", allStatus[i]);
        if(allStatus[i].done === 0) {
            if(i >= 1 && allStatus[i-1].approved === 1) {
                if(allStatus[i].step === status.step) {
                    currentStep = true;
                    break;                
                }
            }
            
        } 
    }
    /*for (let item of allStatus) {
        if (item.done === 0) {
            if(item.step === status.step) {
                
            }        
            break;
        }
    }*/
    if(currentStep) {
        toReturn = (status.step === 1 || status.step === 4 || status.step === 7) ? "current" : "process";        
    }
    
    return toReturn;   
}

export function convertMilitaryToStandardTime(militaryTime) {
        let hours24 = militaryTime.length === 3 ? parseInt(militaryTime.substring(0,1)) : parseInt(militaryTime.substring(0,2));
        let hours = ((hours24 + 11) % 12) + 1;
        let amPm = hours24 > 11 ? 'PM' : 'AM';
        let minutes =  militaryTime.length === 3 ? militaryTime.substring(1) : militaryTime.substring(2);

        return hours + ':' + minutes + ' ' + amPm;
}

export function sumValuesInArrayObjectByProp(array, propToSum) {
    return array.reduce(function(prev, current) {
        return prev + current[propToSum]
    }, 0);
}

export function mergeArrayObjectsNoDuplicate(arr1, arr2) {
    // loop over arr2, add the elements of array2 if it doesn't exist in array1
    return  arr2.reduce((acc, eachArr2Elem) => {
        if (arr1.findIndex((eachArr1Elem) => eachArr1Elem.id === eachArr2Elem.id && eachArr1Elem.name === eachArr2Elem.name)  === -1) {
        acc.push(eachArr2Elem)
        }
        return acc
    }, [...arr1]); // initialize the new Array with the contents of array1
}

export function conflictChecker(selectedSchedules, schedule)
{
    let message = "";
    let conflict = false;
    
    for (let index = 0; index < selectedSchedules.length; index++)
    {   
        for (let days = 0; days < 7; days++)
        {
            if (schedule.m_days.charAt(days).toUpperCase() === "X" && selectedSchedules[index].m_days.charAt(days).toUpperCase() === "X")
            {
                if (parseInt(schedule.m_begin_time, 10) === parseInt(selectedSchedules[index].m_begin_time, 10))
                {
                    conflict = true; 
                }
                if (parseInt(schedule.m_end_time, 10) === parseInt(selectedSchedules[index].m_end_time, 10))
                {
                    conflict = true; 
                }
                if (parseInt(schedule.m_begin_time, 10) > parseInt(selectedSchedules[index].m_begin_time, 10) &&
                    parseInt(schedule.m_begin_time, 10) < parseInt(selectedSchedules[index].m_end_time, 10))
                {
                    conflict = true; 
                }
                if (parseInt(schedule.m_end_time, 10) > parseInt(selectedSchedules[index].m_begin_time, 10) &&
                    parseInt(schedule.m_end_time, 10) < parseInt(selectedSchedules[index].m_end_time, 10))
                {
                    conflict = true;
                }
                
                if (conflict)
                {
                    const edpCodeProp = selectedSchedules[index].hasOwnProperty("edpcode") ? "edpcode" : "edp_code";
                    message = message.concat("EDP CODE: " + schedule.edpcode + "- SUBJECT: " + schedule.subject_name +
                                " is conflict with " + "EDP CODE: " + selectedSchedules[index][edpCodeProp] + "- SUBJECT: " + selectedSchedules[index].subject_name);
                    return [conflict, message];
                }
            }
        }        
    }
    
    return [conflict, message];
}

export function getTotalUnitsTaken(subjects) {
    let totalUnitsTaken = 0;
    if(subjects.length > 0) {
        subjects.forEach(schedule => {
            totalUnitsTaken += parseInt(schedule.units, 10);
        });
        /*const edpCodePropName = subjects[0].hasOwnProperty("edp_code") ? "edp_code" : "edpcode"; 
        const motherSchedules = subjects.filter(sch => sch.split_type !== "C");
        const splitSchedules = subjects.filter(sch => sch.split_type === "C");
        motherSchedules.forEach(schedule => {
            if(schedule.split_type === "S") {               
                let addCounter = 0;
                splitSchedules.forEach(sched => {
                    if(schedule[edpCodePropName] === sched.split_code && (sched.subject_type !== "L" || sched.subject_type !== "LAB") && addCounter === 0) {
                        totalUnitsTaken += parseInt(sched.units, 10);
                        addCounter++;
                    }
                });
            } 
            else {
                totalUnitsTaken += parseInt(schedule.units, 10);
            }
        }); */
    }
    return totalUnitsTaken;
}

export function getEnrollmentStepsFromStatus(status) {
    /*  0 - REGISTERED,
        1 - APPROVED_REGISTRATION_REGISTRAR,
        2 - DISAPPROVED_REGISTRATION_REGISTRAR,
        3 - APPROVED_REGISTRATION_DEAN,
        4 - DISAPPROVED_REGISTRATION_DEAN,
        5 - SELECTING_SUBJECTS,
        6 - APPROVED_BY_DEAN,
        7 - DISAPPROVED_BY_DEAN,
        8 - APPROVED_BY_ACCOUNTING,
        9 - APPROVED_BY_CASHIER,
        10 - OFFICIALLY_ENROLLED,
        11 - WITHDRAWN_ENROLLMENT_BEFORE_START_OF_CLASS,
        12 - WITHDRAWN_ENROLLMENT_START_OF_CLASS,
        13 - CANCELLED
    */
    let steps = null;
    if(status === 0) steps = [1,0,0,0,0,0,0,0];
    if(status === 1) steps = [1,1,0,0,0,0,0,0];
    if(status === 2) steps = [1,2,0,0,0,0,0,0];
    if(status === 3) steps = [1,1,1,3,0,0,0,0];
    if(status === 4) steps = [1,1,2,0,0,0,0,0];
    if(status === 5) steps = [1,1,1,3,0,0,0,0];
    if(status === 6) steps = [1,1,1,1,1,0,0,0];
    if(status === 7) steps = [1,1,1,1,2,0,0,0];
    if(status === 8) steps = [1,1,1,1,1,1,3,0];
    if(status === 9) steps = [1,1,1,1,1,1,1,0];
    if(status === 10) steps = [1,1,1,1,1,1,1,1];
    if(status === 11) steps = [2,2,2,2,2,2,2,2];
    if(status === 12) steps = [2,2,2,2,2,2,2,2];
    if(status === 13) steps = [2,2,2,2,2,2,2,2];
    return steps;
}

export function calculateTotalUnits(takenSchedules) {
    let totalUnits = 0;
    const splitSchedules = takenSchedules.filter(sch => sch.split_type === "C" || sch.split_type === "S");
    const regularSchedules = takenSchedules.filter(sch => sch.split_type !== "C" || sch.split_type !== "S");
    if(regularSchedules.length > 0) {
        regularSchedules.forEach(schedule => {
            totalUnits += parseInt(schedule.units, 10)
        });
    }
    if(splitSchedules.length > 0) {
        splitSchedules.forEach(schedule => {
            if(schedule.split_type === "S") {
                totalUnits += parseInt(schedule.units, 10)
            }            
        });
    } 
    return totalUnits;
}

export function peNstpCommonChecker(selectedSchedules, schedule)
{
    let toReturn = {nstp: false, pe: false};
    if(schedule.subject_name.startsWith("NSTP")) {
        const withNstp = selectedSchedules.filter(schedule => schedule.subject_name.startsWith("NSTP"));
        toReturn.nstp = (withNstp && withNstp.length > 0) ? true : false;
    }
    if(schedule.subject_name.startsWith("PE") || schedule.subject_name.startsWith("P.E") || schedule.subject_name.startsWith("P.E.")) {
        const withPE = selectedSchedules.filter(schedule => schedule.subject_name.startsWith("PE") || schedule.subject_name.startsWith("P.E") || schedule.subject_name.startsWith("P.E."));
        toReturn.pe = (withPE && withPE.length > 0) ? true : false;
    }   
    return toReturn;
}

export function formatMoney(number) {
    const fixedNumber = Number.parseFloat(number).toFixed(2);
    return String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

export function convertTermToReadable(term) {
    let sem = "";
    if(term.charAt(4) === "1") sem = "1st Semester";
    if(term.charAt(4) === "2") sem = "2st Semester";
    if(term.charAt(4) === "4") sem = "Summer";

    const schyearTo = term.substring(0, 4);
    const schyearFrom = parseInt(schyearTo, 10) - 1;

    return sem + " S.Y. " +  schyearFrom + " - " + schyearTo;
}

//get time diff in milliseconds
export function getTimeDifferenceInMS(start, end) {
    let d1 = new Date(0);
    let startHour = start.toString().length > 3 ? start.toString().substr(0, 2) : start.toString().substr(0, 1);
    let startMinute = start.toString().length > 3 ? start.toString().substr(2, 2) : start.toString().substr(1, 2);
    d1.setHours(parseInt(startHour, 10));
    d1.setMinutes(parseInt(startMinute, 10));
    let d2 = new Date(0);
    let endHour = end.toString().length > 3 ? end.toString().substr(0, 2) : end.toString().substr(0, 1);
    let endMinute = end.toString().length > 3 ? end.toString().substr(2, 2) : end.toString().substr(1, 2);
    d2.setHours(parseInt(endHour, 10));
    d2.setMinutes(parseInt(endMinute, 10));
    return d2.getTime() - d1.getTime();
}

//returns the split schedule pair
export function getSplitCodePair(schedules, edpCode) {
    let foundPair = [];  
    schedules.forEach((schedule, index) => {
        const edpCodeProp = schedule.hasOwnProperty("edpcode") ? "edpcode" : "edp_code";
        if(schedule[edpCodeProp] === edpCode) {
            if(schedule.split_type === 'S') {
                const filteredSched = schedules.filter(sched => sched.split_code === schedule[edpCodeProp] && sched[edpCodeProp] !== schedule[edpCodeProp]).map(sched => sched[edpCodeProp]);
                foundPair = [...foundPair, ...filteredSched]; 
            }
            if(schedule.split_type === 'C') {
                const motherCode = schedule.split_code;
                const filteredSched = schedules.filter(sched => sched.split_code === motherCode && sched[edpCodeProp] !== schedule[edpCodeProp]).map(sched => sched[edpCodeProp]);
                foundPair = [...foundPair, ...filteredSched]; 
            }
        }
    })  
    return foundPair;
    
}

export function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers)
    }
  
    // Convert Object to JSON
    const jsonObject = JSON.stringify(items)
  
    const csv = convertToCSV(jsonObject)
  
    const exportedFilename = fileTitle + '.csv' || 'export.csv'
  
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilename)
    } else {
      let link = document.createElement('a')
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', exportedFilename)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
}

export function convertToCSV(objArray) {
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            let arrItem = "";
            if (array[i][index].indexOf(",") > -1) {
                arrItem = '"' + array[i][index] + '"';
            } else {
                arrItem = array[i][index];
            }

            if (line !== '') line += ','
            line += arrItem;
        }

        str += line + '\r\n';
    }

    return str;
}

//Prospectus 
export function convertTabToYear(selectedTab){
    let year = '';
    if(selectedTab == 'first'){
        year = 1;
    }else if(selectedTab == 'second'){
        year = 2;
    }else if(selectedTab == 'third'){
        year = 3;
    }else{
        year = 4;
    }

    return year;
}

export function convertYearToTab(year){
    let selectedTab = '';
    if(year == 1){
        selectedTab = 'fourth';
    }else if(year == 2){
        selectedTab = 'second';
    }else if(year == 3){
        selectedTab = 'third';
    }else{
        selectedTab = 'fourth';
    }

    return selectedTab;
}

export function hasSubjectLab(subjects, subject){
    var hasLab = 0;
    const tempArray = subjects.filter(sub => sub.subject_name == subject 
        && sub.subject_type == 'L');
    hasLab = (tempArray && tempArray.length > 0) ? 1 : 0;

    return hasLab;
}

export function getGrade(grades, internal_code){
    var gGrade  = 0;
    var temp = 0;
    grades.filter(fil => fil.internal_code == internal_code && fil.final_grade != "").map((grade, index) => {
        if(temp <= grade.eval_id){
            gGrade = grade.final_grade;
            temp = grade.eval_id;
        }
    });
    return gGrade;
}

export function checkRequestedSubject(requestedSubjects, internal_code){
    let hasOwnProperty = false;
    if(requestedSubjects == null)
        return <Redirect to="/login" />;
    for(var index = 0; index < requestedSubjects.length;  index++){
        var object = requestedSubjects[index];
        if(object.internal_code == internal_code){
            hasOwnProperty = true;
        }
    }
    return hasOwnProperty;
}

export function toStandardTime(militaryTime) {
       let hours24 = militaryTime.length === 3 ? parseInt(militaryTime.substring(0,1)) : parseInt(militaryTime.substring(0,2));
        let hours = ((hours24 + 11) % 12) + 1;
        let minutes =  militaryTime.length === 3 ? militaryTime.substring(1) : militaryTime.substring(2);
        return hours + '' + minutes + ' ';
}
//time_end: toStandardTime(autoTimeEndSetter(time_start)),
export function autoTimeEndSetter(time_start){
    try{
        var totalInMinutes = (parseInt(time_start.split(":")[0]) * 60) + parseInt(time_start.split(":")[1]);

        var otherMinutes = 90;

        var grandTotal = otherMinutes + totalInMinutes;

        //Now using your own code

        var bookH = Math.floor(grandTotal / 60);
        var bookM = grandTotal % 60;
        if(bookH < 10){
            bookH = "0"+bookH;
        }
        if(bookM <10)
            bookM = "0"+bookM;
        var bookingDurationToHour = bookH + ':' + bookM;
        
        return bookingDurationToHour;
    }catch(e){
        
    }
     

}


