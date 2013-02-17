// JavaScript Functions 



$(document).ready(function() {

/*******************************
 **** USER DATA & Functions **** 
 *******************************
 */
var getAgeData = function(place){return AGE_DATA[place];};
var getIncomeData = function(place){return INCOME_DATA[place];};
var getGenderData = function(place){return GENDER_DATA[place];};
var getEthnicityData = function(place){return ETHNICITY_DATA[place];};
var getFamilyData = function(place){return FAMILY_GROUP_DATA[place];};
var getSocialData = function(place){return SOCIAL_TIME_DATA[place];};
var getEducationData = function(place){return 0.0;};
var USER = {
	name:"",
	income: 1,
	age: 1,
	gender: 1,
	ethnicity: 1,
	family_group: 1,
	social_group: 0,
	education: 0,
	isReady: false  // value is to tell use whether the user has actually selected values
};


var compute_happiness = function(){
	numComponents = 6;
	value = (INCOME_DATA[USER.income] + AGE_DATA[USER.age]
			+ ETHNICITY_DATA[USER.ethnicity] + FAMILY_GROUP_DATA[USER.family_group]
			+ SOCIAL_TIME_DATA[USER.social_group] + GENDER_DATA[USER.gender])/numComponents;
			console.log(value);
		return (Math.round(value*100)/100);
}


/*****************************************************
 **** Update USER Data & Click Listener Functions **** 
 *****************************************************
 */
var updateIsReady = function(){
	var answered = USER.income + USER.ethnicity + USER.age 
				  + USER.family_group + USER.social_group + USER.education + USER.gender;
	var hasName = (USER.name != "" && USER.name != "Unnamed" && USER.name != " ");
	if(hasName && answered>=0)
		USER.isReady = true;
	else 
		USER.isReady = false;
};

/* Social Group Radio Button Listeners */
 $("#social_group0").click(function () { updateSocialSelection(0);});
 $("#social_group1").click(function () { updateSocialSelection(1);});
 $("#social_group2").click(function () { updateSocialSelection(2);});
 $("#social_group3").click(function () { updateSocialSelection(3);});

var updateSocialSelection = function(value){
	USER.social_group = value;
	updateHappiness();
	$("#socialBlurbText").text("You spend " + SOCIAL_TIME_GROUP[value] + " hours being socially active per day.");
}

/* Education Group Radio Button Listeners */
 $("#edu_group0").click(function () { updateEducationSelection(0);});
 $("#edu_group1").click(function () { updateEducationSelection(1);});
 $("#edu_group2").click(function () { updateEducationSelection(2);});
 $("#edu_group3").click(function () { updateEducationSelection(3);});
var updateEducationSelection = function(value){
	USER.education = value;
	updateHappiness();
	$("#educationBlurbText").text(EDUCATION_GROUP[value] + " is your highest level of education.");
};


/* Income Group Radio Button Listeners */
 $("#income_group0").click(function () { updateIncomeSelection(0);});
 $("#income_group1").click(function () { updateIncomeSelection(1);});
 $("#income_group2").click(function () { updateIncomeSelection(2);});
 $("#income_group3").click(function () { updateIncomeSelection(3);});
var updateIncomeSelection = function(value){
	//if(value != USER.income){
		USER.income = value;
		updateHappiness();
	//}
	$("#incomeBlurbText").text("Your household brings in " +INCOME_GROUP[value] + " per year.");
};

/* Ethnicity Group Radio Button Listeners */
 $("#ethnicity_group0").click(function () { updateEthnicitySelection(0);});
 $("#ethnicity_group1").click(function () { updateEthnicitySelection(1);});
 $("#ethnicity_group2").click(function () { updateEthnicitySelection(2);});
 $("#ethnicity_group3").click(function () { updateEthnicitySelection(3);});
 $("#ethnicity_group4").click(function () { updateEthnicitySelection(4);});
var updateEthnicitySelection = function(value){
		USER.ethnicity = value;
		updateHappiness();
	$("#ethnicityBlurbText").text("Awesome!");

};

/* Ethnicity Group Radio Button Listeners */
 $("#family_group0").click(function () { updateFamilySelection(0);});
 $("#family_group1").click(function () { updateFamilySelection(1);});
 $("#family_group2").click(function () { updateFamilySelection(2);});
 $("#family_group3").click(function () { updateFamilySelection(3);});
 $("#family_group4").click(function () { updateFamilySelection(4);});
var updateFamilySelection = function(value){
	USER.family_group = value;
	updateHappiness();
	if (value == 0 || value == 3)
		$("#familyBlurbText").text("Great!");
	else 
		$("#familyBlurbText").text("Perhaps not.");
};

/* Age Group Radio Button Listeners */
 $("#age_group0").click(function () { updateAgeSelection(0);});
 $("#age_group1").click(function () { updateAgeSelection(1);});
 $("#age_group2").click(function () { updateAgeSelection(2);});
 $("#age_group3").click(function () { updateAgeSelection(3);});
 
var updateAgeSelection = function(value){
	USER.age = value;
	updateHappiness();
	$("#ageBlurbText").text("Sweet!");
};

/* Name Box Listener*/
$("#nameBox").focusout(function(){updateName();});

var updateName = function(){
	USER.name = $("#nameBox").val();
	console.log(USER.name);
	var hasName = (USER.name != "" && USER.name != "Unnamed" && USER.name != " ");
	if (hasName)
		$("#nameBlurbText").text("Hi "+USER.name +"!");
	updateHappiness();
};

/* Gender Radio Button Listeners */
 $("#gender_group0").click(function () { updateGenderSelection(0);});
 $("#gender_group1").click(function () { updateGenderSelection(1);});
var updateGenderSelection = function(value){
	USER.gender = value;
	updateHappiness();
	$("#genderBlurbText").text("Wonderful!");
};


/************************************
 **** Get User Results Functions **** 
 ************************************
 */

var getUserBreakDownText = function(){
	var output = "<br><span class='tip_title'>Well "+ USER.name + ", here's the break down:</span>";
	return output;
};
var getUserIncomeText = function(){
	var output = "<br><b>Monthly Income Range (" +INCOME_GROUP[USER.income] +"):</b> " + +getIncomeData(USER.income) +"% chance";
	return output;	
};
var getUserAgeText = function(){
	var output = "<br><b>Age Range (" +AGE_GROUP[USER.age] +"):</b> " + +getAgeData(USER.age) +"% chance";
	return output;	
};
var getUserEthnicityText = function(){
	var output = "<br><b>Ethnic Group (" +ETHNICITY_GROUP[USER.ethnicity] +"):</b> " + +getEthnicityData(USER.ethnicity) +"% chance";
	return output;	
};
var getUserFamilyText = function(){
	var output = "<br><b>Relationship Group (" +FAMILY_GROUP[USER.family_group] +"):</b> " + +getFamilyData(USER.ethnicity) +"% chance";
	return output;	
};
var getUserGenderText = function(){
	var output = "<br><b>Gender Group (" + GENDER_GROUP[USER.gender] +"):</b> " + +getGenderData(USER.gender) +"% chance";
	return output;	
};
var getUserSocialText = function(){
	var output = "<br><b>Social Activity Group (" + SOCIAL_TIME_GROUP[USER.social_group] +" hours):</b> " + +getSocialData(USER.social_group) +"% chance";
	return output;	
};


var updateBlurbs = function(){
	var NUM_TIPS = TIPS_DATA.length;
	var place = Math.round(1000*Math.random())%NUM_TIPS;
	var tip = "<br><span class='tip_title'>Suggestion</span><br>" +TIPS_DATA[place];
	extraTipsLink = '<br><a href="http://zenhabits.net/handbook-for-life-52-tips-for-happiness-and-productivity/" target=_"blank">Check out more tips here</a><br>';
	//console.log("VALUE of STRING " + place);
	//console.log("TIP:" + tip);
	$("#tip").html(tip);
	$("#moreTips").html(extraTipsLink);
};

var updateHappiness = function(){
	updateBlurbs();
	updateIsReady();
	var happiness = compute_happiness();
	console.log("UH: " + happiness)
	
	$("#breakDown")
	var breakDown = getUserBreakDownText();
	var gender = getUserGenderText();
	var age = getUserAgeText();
	var ethnicity = getUserEthnicityText();
	var education = "";
	var family = getUserFamilyText();
	var income = getUserIncomeText();
	var social = getUserSocialText();

	$("#userBreakDown").html(breakDown);
	$("#userGender").html(gender);
	$("#userAge").html(age)
	$("#userEthnicity").html(ethnicity);
	$("#userEducation").html(education);
	$("#userFamily").html(family);
	$("#userSocial").html(social);
	$("#happyProgressText").text("Overall Chance of Happiness: "+ happiness+"%");
	$("#happyProgressBar").progressbar( "option", "value", happiness);
	
};


// Attached Sliders to Divs
$("#happyProgressBar").progressbar({value:0, min: 0, max: 100}); // Progress Bar

$(function(){
	$('#accordion').multiAccordion({
		active: 0,
		click: function(event, ui) {
		},
		init: function(event, ui) {
			//console.log('whoooooha')
		},
		tabShown: function(event, ui) {

		},
		tabHidden: function(event, ui) {
			//console.log('hidden')
		},	
	});			
});


// Button Listeners
 $("#f0").click(function () { updateTab(1);});
 $("#f1").click(function () { updateTab(2);});
 $("#f2").click(function () { updateTab(3);});
 $("#f3").click(function () { updateTab(4);});
 $("#f4").click(function () { updateTab(5);});
 $("#f5").click(function () { checkHappiness();});
 
 $("#b1").click(function () { updateTab(0);});  
 $("#b2").click(function () { updateTab(1);});
 $("#b3").click(function () { updateTab(2);});
 $("#b4").click(function () { updateTab(3);});
 $("#b5").click(function () { updateTab(4);});
 


// Happiness Dialog
$(function() {
		$( "#happinessDialog" ).dialog({
			autoOpen: false, 		// set to false
			minHeight: 500,
			maxHeight: 500, 
			minWidth: 700,
			maxWidth: 700,
			modal: true,
			open: function(event, ui) {
      			  $('body').css({'max-height': 1200});
      			   	$.scrollTo( $(this), 400, {offset: -30});  
      		},
      		navigation: true 
      		
   			})
   	});
	
	
	
$(function() {
		$( "#errorDialog" ).dialog({
			autoOpen: false, 
			height: 'auto',
			minWidth: 200,
			maxWidth: 200,
			modal: true,
			close: function(event, ui){
				updateTab('all');
			},
			open: function(event, ui) {
      			  $('body').css({'max-height': 800});
      				$.scrollTo( $(this), 400, {offset: -30});
      		},
      		navigation: true
      	
			});
	});	
	
	
// Key Listener
//$("#happinessDialog").focusout(function(){$('#happinessDialog').dialog('close');});
$("#errorDialog").focusout(function(){$('#errorDialog').dialog('close');});
//$('happinessDialog').dialog({ autoOpen: true })


var updateTab = function(value){
	$('#accordion').multiAccordion({active: value});

	$('#happinessDialog').dialog('close');
	if (value == 'all'){
		//$('body').scrollTo( {top:0}, 100, {offset: -30});
	}
};

var checkHappiness = function(){	
	//USER.isReady = true;//$('#happinessDialog').dialog('open');
	if(USER.isReady){
		//updateTab(5);
		//console.log("Am I Happy?");
		$('#happinessDialog').dialog('open');
	}
	else {
		$('#errorDialog').dialog('open');
	}
};




});	// End Document.Ready Function
