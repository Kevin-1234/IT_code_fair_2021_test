//get the device window size to decide the distance to move for each component
var windowWidth = $(window).width();

// initialize materialize form and collapasible card
$(document).ready(function () {
  $("select").formSelect();
  $(".collapsible").collapsible();
});


// initialize position of each component
$(".searchEmployee").animate({ left: "0px" });
$(".searchResults").animate({ left: windowWidth });
$(".moreInfo").animate({ left: windowWidth });

$(".savedEmployees").animate({ left: "0px" });
$(".savedMoreInfo").animate({ left: windowWidth });

// initialize bottom icon
$(".employeeSearchBtn img:first").attr(
  "src",
  "assets/images/AppIcons/baseline_person_search_black_24dp.png"
);

$(".searchEmployeesStackHeader").append(
  `<h6 class="screenTitle">Search Employee</h6>`
);





//go back
$(".searchEmployeesStackHeader .backWard").click((evt) => {
  evt.preventDefault();
  let screenTitle = document.querySelectorAll(".screenTitle");

  //If the current screen is "Search Results" screen, switch screen title and slide back to "Search Employee" screen
  if (screenTitle[0].innerHTML === "Search Results") {
    //switch title
    $(".searchEmployeesStackHeader h6").remove(".screenTitle");
    $(".searchEmployeesStackHeader").append(
      `<h6 class="screenTitle">Search Employee</h6>`
    );

    //slide back to "Search Employee" screen 
    $(".searchEmployee").show();
    $(".searchEmployee").animate({ left: 0 }, 250);
    $(".searchResults").animate({ left: windowWidth }, 300, () => {
      $(".selectedTags").remove();
      $(".resultsList").empty();
      $(".searchResults").hide();
    });
  } else if (screenTitle[0].innerHTML === "Profile") {
    $(".searchEmployeesStackHeader h6").remove(".screenTitle");
    $(".searchEmployeesStackHeader").append(
      `<h6 class="screenTitle">Search Results</h6>`
    );
  
    $(".searchResults").show();
    $(".searchResults").animate({ left: 0 }, 250);

    $(".moreInfo").animate({ left: windowWidth }, 300, () => {
      $(".profileHeader").empty();
      $(".profileBody").empty();
      $(".moreInfo").hide();
    });
  }
});

$(".savedEmployeesStackHeader .backWard").click(() => {
  let savedScreenTitle = document.querySelectorAll(".savedScreenTitle");
  if (savedScreenTitle[0].innerHTML === "Saved Employee Profile") {
    $(".savedEmployeesStackHeader h6").remove(".savedScreenTitle");
    $(".savedEmployeesStackHeader").append(
      `<h6 class="savedScreenTitle">Saved Employees</h6>`
    );
    // $(".searchResults").css("z-index", '1');
    // $(".moreInfo").css("z-index", '0');
    $(".savedEmployees").show();
    $(".savedEmployees").animate({ left: 0 }, 250);

    $(".savedMoreInfo").animate({ left: windowWidth }, 300, () => {
      $(".savedProfileHeader").empty();
      $(".savedProfileBody").empty();
      $(".savedMoreInfo").hide();
    });
  }
});







$(".employeeSearchBtn").click(() => {
  $(".employeeSearchBtn img:first").attr(
    "src",
    "assets/images/AppIcons/baseline_person_search_black_24dp.png"
  );
  $(".collectionBtn img:first").attr(
    "src",
    "assets/images/AppIcons/round_star_border_black_24dp.png"
  );
  $(".registerBtn img:first").attr(
    "src",
    "assets/images/AppIcons/outline_group_add_black_24dp.png"
  );

  //switch vertical stack to search employees

  $(".searchEmployeesStack").css({ "z-index": "2", display: "block" });
  $(".savedEmployeesStack").css({ "z-index": "1", display: "none" });
  $(".registerEmployeeStack").css({ "z-index": "1", display: "none" });
  //$('.searchEmployee').show();
  //$('.searchResults').css({ 'z-index':'2'});
  //$('.searchResults').show()
  //$('.moreInfo').css({ 'z-index':'2'}).show();
  // $('.savedEmployees').css({'z-index':'1'});
  // $('.savedMoreInfo').css({'z-index':'1'});
});

$(".collectionBtn").click(() => {
  let savedScreenTitle = document.querySelectorAll(".savedScreenTitle");
  console.log(savedScreenTitle);
  //switch button icon image
  $(".collectionBtn img:first").attr(
    "src",
    "assets/images/AppIcons/round_star_black_24dp.png"
  );
  $(".employeeSearchBtn img:first").attr(
    "src",
    "assets/images/AppIcons/outline_person_search_black_24dp.png"
  );
  $(".registerBtn img:first").attr(
    "src",
    "assets/images/AppIcons/outline_group_add_black_24dp.png"
  );

  //switch vertical stack to saved employees

  $(".savedEmployeesStack").css({ "z-index": "2", display: "block" });
  $(".searchEmployeesStack").css({ "z-index": "1", display: "none" });
  $(".registerEmployeeStack").css({ "z-index": "1", display: "none" });
  // $('.savedEmployees').css({'z-index':'2','display':'block'});
  // $('.savedMoreInfo').css({'z-index':'2'});
  // $('.searchEmployee').css({ 'z-index':'1'});
  // $('.searchResults').css({ 'z-index':'1'});
  // $('.moreInfo').css({'z-index':'1'});

  if (savedScreenTitle.length === 0) {
    $(".savedEmployeesStackHeader h6").remove(".savedScreenTitle");
    $(".savedEmployeesStackHeader").append(
      `<h6 class="savedScreenTitle">Saved Employees</h6>`
    );
  }

  $(".collection").empty();
  for (var i = 0; i < localStorage.length; i++) {
    let person = localStorage.getItem(localStorage.key(i));
    let index = i;
    console.log(localStorage.key(i));
    person = JSON.parse(person);
    $(".collection")
      .append(`<li class="collection-item avatar savedItem${i}" style="font-size: 14px; font-weight:900;">
  <img src="${person.image}" alt="" class="circle">
  <span class="title">${person.name}</span>
  <p>Email:${person.email} <br>
     Phone:${person.phone}
  </p>
  <a class="waves-effect waves-light btn-small blue darken-3 savedMoreInfoBtn${i}" ><i class="material-icons left" >read_more</i>More</a>
  <a class="waves-effect waves-light btn-small red darken-4 savedRemoveBtn${i} "><i class="material-icons left">person_remove</i>Remove</a>
</li>`);

    $(`.savedMoreInfoBtn${i}`).click(() => {
      $(".savedEmployeesStackHeader h6").remove(".savedScreenTitle");
      $(".savedEmployeesStackHeader").append(
        `<h6 class="savedScreenTitle">Saved Employee Profile</h6>`
      );
      $(".savedProfileHeader").append(
        `<img src="${person.imageLarge}" class="circle" style="height:50%; width: 50%;">
  <h6 style="font-weight: 900;">${person.name}</h6>`
      );
      if(person.area === 'it'){

        person.area = person.area.toUpperCase();

      }
      $(".savedProfileBody").append(
        `<p style="font-size:15px; color:#1565c0;">Area: <span style="font-size:14px; font-weight:600; color:#1a1919;">${person.area}</span></p>
        <p style="font-size:15px; color:#1565c0;">Teams: <span style="font-size:14px; font-weight:600;color:#1a1919;">${person.teams}</span></p>
        <p style="font-size:15px;color:#1565c0;">Organisational Skills:</p>
        <p style="font-size:14px; font-weight:600;">${person.organisationalskills}</p>
        <p style="font-size:15px;color:#1565c0;">Communication:</p>
        <p style="font-size:14px; font-weight:600;">${person.communication}</p>
        <p style="font-size:15px;color:#1565c0;">Skills:</p>
        <p style="font-size:14px; font-weight:600;">${person.skills}</p>
        <p style="font-size:15px; color:#1565c0;">Phone: <span style="font-size:14px; font-weight:600; color:#1a1919;">${person.phone}</span></p>
        <p style="font-size:15px; color:#1565c0;">Email: <span style="font-size:14px; font-weight:600; color:#1a1919;">${person.email}</span></p>
        <p style="font-size:15px; color:#1565c0;">Availability: <span style="font-size:14px; font-weight:600; color:#1a1919;">${person.availability}</span></p>
        <a class="waves-effect waves-light btn-small red darken-4 savedMoreInfoRemoveBtn"><i class="material-icons left">person_remove</i>Remove</a>`

      );

      $(".savedMoreInfoRemoveBtn").click(() => {
        console.log("avedMoreInfoRemoveBtn${i}: " + index);
        localStorage.removeItem(person.name);
        $("li").remove(`.savedItem${index}`);
        var toastHTML = `<span style="font-size:16px;">Successfully removed!</span><span class="material-icons">
    check_circle
    </span>`;
        M.toast({ html: toastHTML, classes: "rounded green darken-1" });

        //move back to collection after the person is removed
        $(".savedEmployeesStackHeader h6").remove(".savedScreenTitle");
        $(".savedEmployeesStackHeader").append(
          `<h6 class="savedScreenTitle">Saved Employees</h6>`
        );
        $(".savedEmployees").show();
        $(".savedEmployees").animate({ left: 0 }, 250);
        $(".savedMoreInfo").animate({ left: windowWidth }, 300, () => {
          $(".savedProfileHeader").empty();
          $(".savedProfileBody").empty();
          $(".savedMoreInfo").hide();
        });
      });

      $(".savedMoreInfo").show();
      $(".savedMoreInfo").animate({ left: 0 }, 250);

      $(".savedEmployees").animate({ left: 0 - windowWidth }, 300, () => {
        $(".savedEmployees").hide();
      });
    });
    $(`.savedRemoveBtn${i}`).click((evt) => {
      evt.preventDefault();

      console.log("localStorage.key(i): " + person.name);
      console.log("${i}: " + index);
      localStorage.removeItem(person.name);
      $("li").remove(`.savedItem${index}`);
      var toastHTML = `<span style="font-size:16px;">Successfully removed!</span><span class="material-icons">
  check_circle
  </span>`;
      M.toast({ html: toastHTML, classes: "rounded green darken-1" });
    });
  }
});



if ("indexedDB" in window) {
  // We have indexedDB
  var conn = indexedDB.open("employeeDB", 1.0);

  //when the db connection is successful
  conn.addEventListener("success",  (evt) => {
    var db = evt.target.result;
    console.log("connected event", evt);

    // var saveButton = document.querySelector("#saveBtn");
    // var loadButton = document.querySelector("#loadBtn");

    addData = (firstName, lastName, email, mobilephone, area, nTWW, availability) => {
      var transaction = db.transaction("employeeStore", "readwrite");
       var objectStore = transaction.objectStore("employeeStore");
      //  var idInput = document.querySelector("#idInput");
      //  var nameInput = document.querySelector("#nameInput");
      var randomId = Math.round(Math.random() * 10000000);
       var request = objectStore.add({
        id: randomId,
        name: firstName+' '+lastName,
        area: area,
        teams: nTWW,
        organisationalskills: ["leadership","conflict-management"],
        communication: ["sm chat", "face-to-face", "video call", "e-mail", "phone call", "ms teams"],
        availability: availability,
        skills: ['python', 'javascript','HTML'],
        phone: mobilephone,
        email: email,
        image: 'https://i.pravatar.cc/72',
        imageLarge: 'https://i.pravatar.cc/512',
      });
  
      request.addEventListener("success", function (evt) {
        
        console.log("Request is successfull", evt.target.result);
      });
     };



     $(".registerBtn").click(() => {
      $(".registerBtn img:first").attr(
        "src",
        "assets/images/AppIcons/baseline_group_add_black_24dp.png"
      );
      $(".employeeSearchBtn img:first").attr(
        "src",
        "assets/images/AppIcons/outline_person_search_black_24dp.png"
      );
      $(".collectionBtn img:first").attr(
        "src",
        "assets/images/AppIcons/round_star_border_black_24dp.png"
      );
    
      $(".registerEmployeeStack").css({ "z-index": "2", display: "block" });
      $(".searchEmployeesStack").css({ "z-index": "1", display: "none" });
      $(".savedEmployeesStack").css({ "z-index": "1", display: "none" }); 
      
      
      $(".registerSubmitBtn").click( (evt) => {
        evt.preventDefault();
        var firstName = $("#first_name").val();
        var lastName = $("#last_name").val();
        var email = $("#email").val();
        var mobilephone = $("#mobile_phone").val();
        var area = $(".registerArea").val(); 
        var nTWW = $('.registerNTWW').val();
        var availability = $('.registerAvailability').val();
        //var skills = $('.chips-autocomplete .chip').html();
        //var skills = $('.chips-autocomplete').chips('selectChip', 0);

        console.log("firstName: " + firstName);
        console.log("area: " + area);
        console.log("nTWW: " + nTWW);
        console.log("availability: " + availability);

      if(firstName === '' || lastName === '' || email === '' || mobilephone === '' || area === null || nTWW === null || availability === {}){
        var toastHTML = `<span style="font-size:16px;">Please fill up all the required fields!</span><span class="material-icons">
        report_problem
                    </span>`;
          M.toast({ html: toastHTML, classes: "rounded red darken-3" });
      }else{
        
      $(".registerForm")[0].reset();
      var toastHTML = `<span style="font-size:16px;">The employee is registered!</span><span class="material-icons">
                    check_circle
                    </span>`;
      M.toast({ html: toastHTML, classes: "rounded green darken-1" });
      addData(firstName, lastName, email, mobilephone, area.toLowerCase(), nTWW, availability);  

      }  
      
      //console.log("skills: " + skills.tag);
        
      })
    
    });

    loadData = () => {
      
      var transaction = db.transaction("employeeStore", "readwrite");
      var objectStore = transaction.objectStore("employeeStore");
      var cursor = objectStore.openCursor();
      var data = [];
      cursor.addEventListener("success", function (evt) {
        var thisCursor = evt.target.result;
    
        if (thisCursor) {
          
         data.push(thisCursor.value);
         
         console.log("item: " + thisCursor.value);

          thisCursor.continue();
        } else {
          var allSkillsOfData = [];
          data.forEach(employee => {
            
            employee.skills.forEach(skill => {
              if(allSkillsOfData.indexOf(skill) === -1){

                allSkillsOfData.push(skill);
              }
            });
          });

          var dataObject = {};
          allSkillsOfData.forEach(skill => {
            dataObject[skill]=null;

          });
          console.log(dataObject);

          $('.chips-autocomplete').chips({
            autocompleteOptions: {
              data: dataObject,
              limit: Infinity,
              minLength: 1,
            
            }
          });

         

          
         
          $("#searchBtn").click((evt) => {
            evt.preventDefault();
            console.log("data: " + data);
            var area = $("select").val();
            var skills = $('input[name="skills"]:checked');
            var nTWW = $('input[name="NTWW"]:checked').val();
            var organisationalSkills = $('input[name="organisationalSkills"]:checked');
            var communicationMethods = $('input[name="communicationMethods"]:checked');
            var availability = $('input[name="availability"]:checked');
          
            console.log("area: " + area);
            console.log("skills: " + skills);
            if(area === null ){
              var toastHTML = `<span style="font-size:16px;">Must select a discipline!</span><span class="material-icons">
              report_problem
                          </span>`;
                M.toast({ html: toastHTML, classes: "rounded red darken-3" });

            }else if(skills.length === 0){
              var toastHTML = `<span style="font-size:16px;">Must select a skill!</span><span class="material-icons">
              report_problem
                          </span>`;
                M.toast({ html: toastHTML, classes: "rounded red darken-3" });
            }else{
              
            // get data from the data json file
           
            var areaFilteredData = [];
            var skillFilteredData = [];
            var nTWWFilteredData = [];
            var oSFilteredData = [];
            var cMFilteredData = [];
            var availabilityFilteredData = [];
            // keep all the selected creterias
            var tags = [];
            // stores each person's match rate for sorting
            var matchRates = [];
            // match rates and individule tages with indexes
            var mRsAndITagsWithIndexes = [];
        
            // find people with selected area
            areaFilteredData = data.filter(
              (person) => person.area === area.toLowerCase()
            );
            
            tags.push(area);
        
            // look for people with selected Number of Teams Worked With from the array of people with selected area
            // nTWWFilteredData = areaFilteredData.filter(
            //   (person) => person.teams === nTWW
            // );
            tags.push(nTWW);
            // if no one was found, assign the array of people with selected area to the NTWW people array
            if (nTWWFilteredData.length === 0) {
              nTWWFilteredData = areaFilteredData;
            }
        
            for (let i = 0; i < skills.length; i++) {
              tags.push(skills[i].value);
              nTWWFilteredData.forEach((person) => {
                if (person.skills.includes(skills[i].value.toLowerCase())) {
                  if (!skillFilteredData.includes(person)) {
                    skillFilteredData.push(person);
                  }
                }
              });
            }
        
            if (skillFilteredData.length === 0) {
              skillFilteredData = nTWWFilteredData;
            }
        
            for (let i = 0; i < organisationalSkills.length; i++) {
              tags.push(organisationalSkills[i].value);
              skillFilteredData.forEach((person) => {
                if (
                  person.organisationalskills.includes(
                    organisationalSkills[i].value.toLowerCase()
                  )
                ) {
                  if (!oSFilteredData.includes(person)) {
                    oSFilteredData.push(person);
                  }
                }
              });
            }
        
            if (oSFilteredData.length === 0) {
              oSFilteredData = skillFilteredData;
            }
            console.log("oSFilteredData: " + oSFilteredData);
        
            for (let i = 0; i < communicationMethods.length; i++) {
              tags.push(communicationMethods[i].value);
              oSFilteredData.forEach((person) => {
                if (
                  person.communication.includes(
                    communicationMethods[i].value.toLowerCase()
                  )
                ) {
                  if (!cMFilteredData.includes(person)) {
                    cMFilteredData.push(person);
                  }
                }
              });
            }
        
            if (cMFilteredData.length === 0) {
              cMFilteredData = oSFilteredData;
            }
            console.log("cMFilteredData: " + cMFilteredData);
        
            for (let i = 0; i < availability.length; i++) {
              tags.push(availability[i].value);
              cMFilteredData.forEach((person) => {
                if (person.availability.includes(availability[i].value.toLowerCase())) {
                  if (!availabilityFilteredData.includes(person)) {
                    availabilityFilteredData.push(person);
                  }
                }
              });
            }
        
            if (availabilityFilteredData.length === 0) {
              availabilityFilteredData = cMFilteredData;
            }
        
            // append selected creterias
            for (let i = 0; i < tags.length; i++) {
              $(".selectedCriterias").append(
                `<div class="chip selectedTags" style="font-weight: bolder;">
                  ${tags[i]}
                </div>`
              );
            }
        
            for (let i = 0; i < availabilityFilteredData.length; i++) {
              let individualTages = [];
              let matchRate = 0;
              let mRsAndITagsWithIndex = {
                matchRate: 0,
                index: 0,
                individualTages: [],
              };
        
              //save matched tags of each individual
              tags.forEach((tag) => {
                
                if (availabilityFilteredData[i].area === tag.toLowerCase()) {
                  individualTages.push(tag);
                } else if (
                  availabilityFilteredData[i].skills.includes(tag.toLowerCase())
                ) {
                  individualTages.push(tag);
                } else if (availabilityFilteredData[i].teams === tag) {
                  individualTages.push(tag);
                } else if (
                  availabilityFilteredData[i].organisationalskills.includes(
                    tag.toLowerCase()
                  )
                ) {
                  individualTages.push(tag);
                } else if (
                  availabilityFilteredData[i].communication.includes(tag.toLowerCase())
                ) {
                  individualTages.push(tag);
                } else if (
                  availabilityFilteredData[i].availability.includes(tag.toLowerCase())
                ) {
                  individualTages.push(tag);
                }
              });
        
              //calculate the match rate of each individule
              matchRate = Math.floor((individualTages.length / tags.length) * 100);
              //keep the individual tags and match rate of each individule with this person's index in the filtered data
              mRsAndITagsWithIndex.matchRate = matchRate;
              mRsAndITagsWithIndex.index = i;
              mRsAndITagsWithIndex.individualTages = individualTages;
              mRsAndITagsWithIndexes.push(mRsAndITagsWithIndex);
            }
        
            console.log("mRsAndITagsWithIndexes: " + mRsAndITagsWithIndexes);
            console.log(
              "mRsAndITagsWithIndexes: " + mRsAndITagsWithIndexes[0].matchRate
            );
            mRsAndITagsWithIndexes.forEach((element) =>
              matchRates.push(element.matchRate)
            );
        
            // var largestMatchRates = [];
            // largestMatchRates = matchRates.forEach(rate => {
            //   if(rate === Math.max(matchRates)){
            //     largestMatchRates.push
            //   }
            // }
            //sort match rates from the lowest to the largest
            var sortedMatchRates = matchRates.sort((a, b) => {
              return a - b;
            });
        
            // generate a card for each person based on the match rate from high to low
            for (let i = sortedMatchRates.length; i >= 0; i--) {
              let personName = "";
              let image = "";
              let imageLarge = "";
              let phone = "";
              let email = "";
              let area = "";
              let teams = "";
              let organisationalSkills = [];
              let skills = [];
              let communication = [];
              let availability = [];
        
              let personIndex = -1;
              let individualTages = [];
              let matchRate = 0;
        
              for (let x = 0; x < mRsAndITagsWithIndexes.length; x++) {
                if (mRsAndITagsWithIndexes[x].matchRate === sortedMatchRates[i]) {
                  console.log(
                    "object.matchRate:" + mRsAndITagsWithIndexes[x].matchRate
                  );
                  console.log("sortedMatchRates[i]:" + sortedMatchRates[i]);
                  personName =
                    availabilityFilteredData[mRsAndITagsWithIndexes[x].index].name;
                  image =
                    availabilityFilteredData[mRsAndITagsWithIndexes[x].index].image;
                  imageLarge =
                    availabilityFilteredData[mRsAndITagsWithIndexes[x].index]
                      .imageLarge;
                  phone =
                    availabilityFilteredData[mRsAndITagsWithIndexes[x].index].phone;
                  email =
                    availabilityFilteredData[mRsAndITagsWithIndexes[x].index].email;
                  area = availabilityFilteredData[mRsAndITagsWithIndexes[x].index].area;
                  teams =
                    availabilityFilteredData[mRsAndITagsWithIndexes[x].index].teams;
                  organisationalSkills =
                    availabilityFilteredData[mRsAndITagsWithIndexes[x].index]
                      .organisationalskills;
                      
                  skills =
                    availabilityFilteredData[mRsAndITagsWithIndexes[x].index].skills;
                  communication =
                    availabilityFilteredData[mRsAndITagsWithIndexes[x].index]
                      .communication;
                  availability = availabilityFilteredData[mRsAndITagsWithIndexes[x].index].availability;
        
                  individualTages = mRsAndITagsWithIndexes[x].individualTages;
                  matchRate = mRsAndITagsWithIndexes[x].matchRate;
                  personIndex = mRsAndITagsWithIndexes[x].index;
                  mRsAndITagsWithIndexes.splice(x, 1);
                  break;
                }
              }
        
              if (personIndex !== -1) {
                console.log("personIndex is not -1");
                // append items to the result list
                $(".resultsList").append(`<li>
                <div class="collapsible-header" style="height:68px; 
                align-items:center;
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                font-weight: 900;">
                  <img src=${image} alt="" class="circle" style="height:42px; width: 42px;">
                  <div class="valign-wrapper">${personName}</div> 
                  <div class="bestMatchContainer" style="height: 52px;">
              
                    <div class="material-icons star${personIndex}" style="opacity: 0;
                    font-size: 0px;
                    font-weight: 900;
                    color: rgb(255, 153, 0);
                    position: relative;
                    top:40px;
                    left: 30%;">military_tech</div>
              
                    <div class="bestMatch${personIndex}" style="font-size: 0px;
                    font-weight: 900;
                    display: block;
                    position: relative;
                    top:20px;
                    opacity: 0;">Best Match</div> 
              
                  
                  </div>
                  <div class="gauge-container" 
                  style="display: inline-block;
                  position:relative;
                  width: 62px;
                  height: 62px;">
                    <svg class="gauge" viewBox="0 0 150 150" style="position: relative;
                    display: block;">
                      <circle transform="rotate(-90 75 75)"  class="progress${personIndex}" r="65"  cx="75" cy="75" pathLength="1000" 
                      style=" fill: rgba(250, 121, 0, 0.7);
                      stroke: rgb(250, 121, 0);
                      stroke-dasharray: 1000;
                      stroke-dashoffset: 1000;
                      animation-fill-mode: forwards;
                      animation: pulse${personIndex} 2s linear;
                      stroke-width:18;" >
                      </circle>
                    </svg>
                    <span class="center percentage" 
                    style="display: inline-block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    font-weight: 900;
                    color: rgb(27, 31, 31);">
                      <span class="value${personIndex}" style="font-size: 14px;">0</span>
                      <span class="percentSymbol" style="font-size: 9px;">%</span>
                    </span>
                  </div>        
                </div>
              <div class="collapsible-body" style="padding:12px;">
                
                <div class="individualTags${personIndex}">
                  <P>Matched Criterias: </P>
                </div>
                <div class="personalInfo">
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                </div>
                <div style="margin-top:20px;">
                <a class="waves-effect waves-light btn-small blue darken-3 moreInfoBtn${personIndex}"><i class="material-icons left">read_more</i>More</a>
                <a class="waves-effect waves-light btn-small light-blue darken-2 saveBtn${personIndex}"><i class="material-icons left">person_add_alt_1</i>Save</a>
                </div>
              </div>
              </li>`);
        
                $("head").append(
                  `<style class="matchRateKeyFrames${personIndex}"></style>`
                );
               
                $(`.saveBtn${personIndex}`).click(() => {
                  
                  let personToSave = {
                    name: personName,
                    area: area,
                    teams: teams,
                    organisationalskills: organisationalSkills,
                    communication: communication,
                    availability: availability,
                    skills: skills,
                    phone: phone,
                    email: email,
                    image: image,
                    imageLarge: imageLarge,
                  };
                  let personExists = localStorage.getItem(`${personName}`);
                  if (personExists === null) {
                    localStorage.setItem(`${personName}`, JSON.stringify(personToSave));
                    var toastHTML = `<span style="font-size:16px;">Successfully saved!</span><span class="material-icons">
                  check_circle
                  </span>`;
                    M.toast({ html: toastHTML, classes: "rounded green darken-1" });
                  } else {
                    var toastHTML = `<span style="font-size:16px;">The employee is already existed!</span><span class="material-icons">
                  error
                  </span>`;
                    M.toast({ html: toastHTML, classes: "rounded orange darken-1" });
                  }
                });
                var largestMatchRate = sortedMatchRates[sortedMatchRates.length - 1];
                console.log("largestMatchRate: " + largestMatchRate);
                //animate the match rate number
                animateMatchRate(
                  `.value${personIndex}`,
                  0,
                  matchRate,
                  2000,
                  largestMatchRate,
                  personIndex
                );
        
                // append tags for each individual
                individualTages.forEach((tag) => {
                  $(`.individualTags${personIndex}`).append(
                    `<div class="chip green lighten-1 individualTag" style="font-weight: bolder;">
                          ${tag}
                        </div>`
                  );
                });
              }
        
              $(`.moreInfoBtn${personIndex}`).click((evt) => {
                evt.preventDefault();
        
                $(".searchEmployeesStackHeader h6").remove();
                $(".searchEmployeesStackHeader").append(
                  `<h6 class="screenTitle">Profile</h6>`
                );
                $(".profileHeader").append(
                  `<img src="${imageLarge}" class="circle" style="height:50%; width: 50%;">
                  <h6 style="font-weight: 900;">${personName}</h6>`
                );
                if(area === 'it'){
                  area = area.toUpperCase();
                }
                $(".profileBody").append(
                  `<p style="font-size:15px; color:#1565c0;">Area: <span style="font-size:14px; font-weight:600; color:#1a1919;">${area}</span></p>
                    <p style="font-size:15px; color:#1565c0;">Teams: <span style="font-size:14px; font-weight:600;color:#1a1919;">${teams}</span></p>
                    <p style="font-size:15px;color:#1565c0;">Organisational Skills:</p>
                    <p style="font-size:14px; font-weight:600;">${organisationalSkills}</p>
                    <p style="font-size:15px;color:#1565c0;">Communication:</p>
                    <p style="font-size:14px; font-weight:600;">${communication}</p>
                    <p style="font-size:15px;color:#1565c0;">Skills:</p>
                    <p style="font-size:14px; font-weight:600;">${skills}</p>
                    <p style="font-size:15px; color:#1565c0;">Phone: <span style="font-size:14px; font-weight:600; color:#1a1919;">${phone}</span></p>
                    <p style="font-size:15px; color:#1565c0;">Email: <span style="font-size:14px; font-weight:600; color:#1a1919;">${email}</span></p>
                    <p style="font-size:15px; color:#1565c0;">Availability: <span style="font-size:14px; font-weight:600; color:#1a1919;">${availability}</span></p>
                    <a class="waves-effect waves-light btn-small light-blue darken-2 moreInfoSaveBtn"><i class="material-icons left">person_add_alt_1</i>Save</a>`
                );
        
                $(".moreInfoSaveBtn").click(() => {
                  let personToSave = {
                    name: personName,
                    area: area,
                    teams: teams,
                    organisationalskills: organisationalSkills,
                    communication: communication,
                    availability: availability,
                    skills: skills,
                    phone: phone,
                    email: email,
                    image: image,
                    imageLarge: imageLarge,
                  };
                  let personExists = localStorage.getItem(`${personName}`);
                  if (personExists === null) {
                    localStorage.setItem(`${personName}`, JSON.stringify(personToSave));
                    var toastHTML = `<span style="font-size:16px;">Successfully saved!</span><span class="material-icons">
                      check_circle
                      </span>`;
                    M.toast({ html: toastHTML, classes: "rounded green darken-1" });
                  } else {
                    var toastHTML = `<span style="font-size:16px;">The employee is already existed!</span><span class="material-icons">
                      error
                      </span>`;
                    M.toast({ html: toastHTML, classes: "rounded orange darken-1" });
                  }
                });
        
                $(".moreInfo").show();
                $(".moreInfo").animate({ left: 0 }, 250);
        
                $(".searchResults").animate({ left: 0 - windowWidth }, 300, () => {
                  $(".searchResults").hide();
                });
              });
            }
          
        
          $(".searchEmployeesStackHeader h6").remove();
          $(".searchEmployeesStackHeader").append(
            `<h6 class="screenTitle">Search Results</h6>`
          );
          $(".searchResults").show();
          $(".searchEmployee").animate({ left: 0 - windowWidth }, 300);
          $(".searchResults").animate({ left: 0 }, 250, () => {
            $(".searchEmployee").hide();
            $(".searchForm")[0].reset();
          });

            }
           
            
          });
          console.log("No more items");
        }
        //console.log("data: " + data);
        

       
      });
      console.log("data set: " + data);
    };

    //loadData();

    //add new data
   populateData = () => {
     
      var transaction = db.transaction("employeeStore", "readwrite");
      var objectStore = transaction.objectStore("employeeStore");
      var cursor = objectStore.openCursor();

      cursor.addEventListener("success", function (evt) {
        var thisCursor = evt.target.result;
  
        if (thisCursor) {
          console.log("Found items, do not populate");
        }
        //populate the database if there is no items in it
        else {
          console.log("No items, populate the database");

          $.get("data.json", (data) => {
            var transaction = db.transaction("employeeStore", "readwrite");
            var objectStore = transaction.objectStore("employeeStore");
            data.forEach((item) => {
              let randomId = Math.round(Math.random() * 10000000);

              objectStore.add({
                id: randomId,
                name: item.name,
                area: item.area,
                teams: item.teams,
                organisationalskills: item.organisationalskills,
                communication: item.communication,
                availability: item.availability,
                skills: item.skills,
                phone: item.phone,
                email: item.email,
                image: item.image,
                imageLarge: item.imageLarge,
              });
            });
          });

          
          
        }
        
      });

      loadData();
    };


    populateData();
    //get existing data
    //var request = objectStore.get(321);

    

    

    
   //addData();

  });
  
  //when the db connection is unsuccessful
  conn.addEventListener("error", function (evt) {
    console.log("error connecting", evt.target.error);
  });

  conn.addEventListener("upgradeneeded", function (evt) {
    console.log("upgrade needed", evt);
    var db = evt.target.result;

    // Create an objectStore for this database
    var objectStore = db.createObjectStore("employeeStore", { keyPath: "id" });

    //objectStore.createIndex("name", "name", { unique: false });

    // Listen for the completed transaction
    objectStore.transaction.addEventListener("complete", function (evt) {
      console.log("Store created");
    });
  });
}

// show different set of skills based on the discipline selected
$("select").on("change", function (e) {
  $(".skills").empty();
  if (e.target.value === "IT") {
    $(".disciplines").append(`<div class="skills" style="margin-top: 50px;">
      <label style="font-size: 18px; font-weight: 600;">Skills</label>
      <p>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="Python" class="filled-in"  />
          <span>Python</span>
        </label>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="JavaScript" class="filled-in"  />
          <span>JavaScript</span>
        </label style="margin-right: 8px;">
        <label>
          <input type="checkbox" name="skills" value="Network Engineering" class="filled-in"  />
          <span>Network Engineering</span>
        </label>
      </p>
      <p>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="C" class="filled-in"  />
          <span>C</span>
        </label>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="Cyber Security" class="filled-in"  />
          <span>Cyber Security</span>
        </label style="margin-right: 8px;">
        <label>
          <input type="checkbox" name="skills" value="SQL" class="filled-in"  />
          <span>SQL</span>
        </label>
      </p>
      <p>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="UX Design" class="filled-in"  />
          <span>UX Design</span>
        </label>
        <label style="margin-right: 8px;">
          <input type="checkbox"  name="skills" value="AI" class="filled-in"  />
          <span>AI</span>
        </label style="margin-right: 8px;">
        <label>
          <input type="checkbox" name="skills" value="Neural Networks" class="filled-in"  />
          <span>Neural Networks</span>
        </label>
      </p>
      <p>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="Blockchain" class="filled-in"  />
          <span>Blockchain</span>
        </label>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="R" class="filled-in"  />
          <span>R</span>
        </label style="margin-right: 8px;">
        <label>
          <input type="checkbox" name="skills" value="HTML" class="filled-in"  />
          <span>HTML</span>
        </label>
      </p>
    </div>`);
    $(".skills").hide().fadeIn();
  } else if (e.target.value === "Engineering") {
    $(".disciplines").append(`<div class="skills"  margin-top: 50px; ">
      <label style="font-size: 18px; font-weight: 600;">Skills</label>
      <p>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="Electrical Engineering" class="filled-in"  />
          <span>Electrical Engineering</span>
        </label>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="Chemical Engineering" class="filled-in"  />
          <span>Chemical Engineering</span>
        </label style="margin-right: 8px;">
        <label>
          <input type="checkbox" name="skills" value="Steel Engineering" class="filled-in"  />
          <span>Steel Engineering</span>
        </label>
      </p>
      <p>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="Statics" class="filled-in"  />
          <span>Statics</span>
        </label>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="Concrete Structures" class="filled-in"  />
          <span>Concrete Structures</span>
        </label style="margin-right: 8px;">
        <label>
          <input type="checkbox" name="skills" value="Mechanical Engineering" class="filled-in"  />
          <span>Mechanical Engineering</span>
        </label>
      </p>
      
    </div>`);
    $(".skills").hide().fadeIn();
  } else if (e.target.value === "Environment") {
    $(".disciplines").append(`<div class="skills" style="margin-top: 50px;">
      <label style="font-size: 18px; font-weight: 600;">Skills</label>
      <p>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="Turtles" class="filled-in"  />
          <span>Turtles</span>
        </label>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="Ecosystems" class="filled-in"  />
          <span>Ecosystems</span>
        </label style="margin-right: 8px;">
        <label>
          <input type="checkbox" name="skills" value="Microbiology" class="filled-in"  />
          <span>Microbiology</span>
        </label>
      </p>
      <p>
        <label style="margin-right: 8px;">
          <input type="checkbox"  name="skills" value="Spatial Data" class="filled-in"  />
          <span>Spatial Data</span>
        </label>
        <label style="margin-right: 8px;">
          <input type="checkbox" name="skills" value="Conservation" class="filled-in"  />
          <span>Conservation</span>
        </label style="margin-right: 8px;">
        <label>
          <input type="checkbox" name="skills" value="Fire Ecology" class="filled-in"  />
          <span>Fire Ecology</span>
        </label>
      </p>  
    </div>`);
    $(".skills").hide().fadeIn();
  }
});



function animateMatchRate(
  element,
  start,
  end,
  duration,
  largestMatchRate,
  personIndex
) {
  if (start === end) return;
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.querySelector(element);
  var timer = setInterval(function () {
    current += increment;
    obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);

  //define colors to animate
  var rAndG = 510 * (end / 100);
  var g = 0;
  var r = 255;
  if (rAndG > 255) {
    g = 255;
    r = r - (rAndG - 255);
  }else if(rAndG <= 255){
    g = rAndG;
  }

  console.log("largestMatchRate: " + largestMatchRate);
  if (end === largestMatchRate) {
    console.log("this is the largest");
    $(`.progress${personIndex}`).animate(
      { strokeDashoffset: 1000 - end * 10 },
      2000,
      "linear",
      () => {
        $(`.star${personIndex}`).animate(
          { top: "5px", fontSize: "20px", opacity: 1 },
          200,
          "linear",
          () => {
            $(`.bestMatch${personIndex}`).animate(
              { top: "2px", fontSize: "10px", opacity: 1 },
              200,
              "linear"
            );
          }
        );
      }
    );
  } else {
    $(`.progress${personIndex}`).animate(
      { strokeDashoffset: 1000 - end * 10 },
      2000,
      "linear"
    );
  }

  $(`.progress${personIndex}`).css({
    fill: `rgba(${r}, ${g}, 0, 0.7)`,
    stroke: `rgb(${r}, ${g - 50}, 0)`,
  });
  $(`.matchRateKeyFrames${personIndex}`)
    .append(` @keyframes pulse${personIndex} {
    0% {
      fill: rgb(${r}, 0, 0, 0);
      stroke: rgb(255, 0, 0);
    }
    85%{
      fill: rgb(${r}, 0, 0, 0);

    }
    100% {
      fill:rgba(${r}, ${g}, 0, 0.7);
      stroke: rgb(${r}, ${g - 50}, 0);
  }

}`);
}
